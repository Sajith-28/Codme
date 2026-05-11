import asyncio
import ctypes
import os
import platform
import shutil
import tempfile
import time
import uuid
from datetime import datetime
from pathlib import PurePosixPath
from typing import Optional, List

from fastapi import WebSocket

IS_WINDOWS = platform.system() == "Windows"
EXE_EXT = ".exe" if IS_WINDOWS else ""
CREATE_NO_WINDOW = 0x08000000 if IS_WINDOWS else 0

if IS_WINDOWS:
    SEM_FAILCRITICALERRORS = 0x0001
    SEM_NOGPFAULTERRORBOX = 0x0002
    SEM_NOOPENFILEERRORBOX = 0x8000
    try:
        ctypes.windll.kernel32.SetErrorMode(
            SEM_FAILCRITICALERRORS | SEM_NOGPFAULTERRORBOX | SEM_NOOPENFILEERRORBOX
        )
    except Exception:
        pass


def resolve_temp_dir() -> str:
    candidates = [
        os.getenv("CODME_TEMP_DIR"),
        os.path.join("C:\\tmp", "codme_runs") if IS_WINDOWS else None,
        os.path.join(tempfile.gettempdir(), "codme_runs"),
        os.path.join(os.path.dirname(__file__), "temp"),
    ]
    for candidate in [item for item in candidates if item]:
        try:
            os.makedirs(candidate, exist_ok=True)
            probe = os.path.join(candidate, ".codme_probe")
            with open(probe, "w", encoding="utf-8") as handle:
                handle.write("ok")
            os.remove(probe)
            return candidate
        except OSError:
            continue
    raise RuntimeError("CODME cannot create a writable execution temp directory.")


TEMP_DIR = resolve_temp_dir()


def first_existing(paths: List[str]) -> Optional[str]:
    for path in paths:
        if path and os.path.exists(path):
            return path
    return None


def resolve_tool(tool: str) -> Optional[str]:
    if tool in {"gcc", "g++"} and IS_WINDOWS:
        preferred = first_existing([
            os.path.join("C:\\Program Files", "CodeBlocks", "MinGW", "bin", f"{tool}.exe"),
            os.path.join("C:\\msys64", "mingw64", "bin", f"{tool}.exe"),
            os.path.join("C:\\mingw64", "bin", f"{tool}.exe"),
        ])
        if preferred:
            return preferred
    return shutil.which(tool)


def get_runtime_status():
    py_cmd = shutil.which("python3") or shutil.which("python")
    java_cmd = shutil.which("java")
    javac_cmd = shutil.which("javac")
    gcc_cmd = resolve_tool("gcc")
    gpp_cmd = resolve_tool("g++")
    has_local_jdk = bool(java_cmd) and bool(javac_cmd)
    return {
        "docker": bool(shutil.which("docker")),
        "java": bool(java_cmd),
        "javac": bool(javac_cmd),
        "python": bool(py_cmd),
        "gcc": bool(gcc_cmd),
        "gpp": bool(gpp_cmd),
        "sandboxMode": "local" if has_local_jdk else ("docker" if shutil.which("docker") else "local"),
        "jdk": "21",
        "gccPath": gcc_cmd or "",
        "gppPath": gpp_cmd or "",
    }


def normalize_language(language: str) -> str:
    aliases = {
        "py": "python",
        "python3": "python",
        "c++": "cpp",
        "cc": "cpp",
    }
    candidate = (language or "java").strip().lower()
    return aliases.get(candidate, candidate)


def cleanup_sync(run_dir: str):
    shutil.rmtree(run_dir, ignore_errors=True)


def safe_relative_path(file_name: str) -> Optional[str]:
    clean_name = file_name.replace("\\", "/").strip("/")
    path = PurePosixPath(clean_name)
    allowed = [".java", ".py", ".c", ".cpp", ".h"]
    if path.is_absolute() or ".." in path.parts or not any(clean_name.endswith(ext) for ext in allowed):
        return None
    return clean_name


def normalize_files(code: str, language: str, files: Optional[List[dict]]) -> List[dict]:
    language = normalize_language(language)
    default_name = {
        "java": "Main.java",
        "python": "main.py",
        "c": "main.c",
        "cpp": "main.cpp"
    }.get(language, "Main.java")

    if not files:
        return [{"name": default_name, "content": code}]

    normalized = []
    has_main = False
    for file_info in files:
        name = safe_relative_path(str(file_info.get("name", "")))
        if not name:
            continue
        content = str(file_info.get("content", ""))
        if name == default_name:
            has_main = True
        normalized.append({"name": name, "content": content})

    if not has_main:
        normalized.insert(0, {"name": default_name, "content": code})
    return normalized


def write_source_files(run_dir: str, code: str, language: str, files: Optional[List[dict]]) -> List[str]:
    written_files = []
    for file_info in normalize_files(code, language, files):
        relative = file_info["name"]
        target = os.path.abspath(os.path.join(run_dir, *relative.split("/")))
        if not target.startswith(os.path.abspath(run_dir)):
            continue
        os.makedirs(os.path.dirname(target), exist_ok=True)
        with open(target, "w", encoding="utf-8") as handle:
            handle.write(file_info["content"])
        written_files.append(relative)
    return written_files


async def send_output(websocket: WebSocket, output_type: str, data: str, label: str = ""):
    await websocket.send_json({
        "type": "output",
        "data": {"type": output_type, "data": data, "label": label},
    })


async def run_process(
    args: List[str],
    websocket: WebSocket,
    stdin_text: str = "",
    cwd: Optional[str] = None,
    timeout: float = 30.0,
    label: str = "",
    extra_path: str = "",
):
    start_time = time.perf_counter()
    env = os.environ.copy()
    if extra_path:
        env["PATH"] = f"{extra_path}{os.pathsep}{env.get('PATH', '')}"
    proc = await asyncio.create_subprocess_exec(
        *args,
        cwd=cwd,
        env=env,
        stdin=asyncio.subprocess.PIPE,
        stdout=asyncio.subprocess.PIPE,
        stderr=asyncio.subprocess.PIPE,
        creationflags=CREATE_NO_WINDOW,
    )

    if proc.stdin:
        if stdin_text:
            proc.stdin.write(stdin_text.encode("utf-8", errors="replace"))
            await proc.stdin.drain()
        proc.stdin.write_eof()

    stdout_chunks = []
    stderr_chunks = []

    async def read_stream(stream, output_type: str, sink: list):
        while True:
            chunk = await stream.read(4096)
            if not chunk:
                break
            decoded = chunk.decode("utf-8", errors="replace")
            sink.append(decoded)
            await send_output(websocket, output_type, decoded, label)

    try:
        await asyncio.wait_for(
            asyncio.gather(
                read_stream(proc.stdout, "stdout", stdout_chunks),
                read_stream(proc.stderr, "stderr", stderr_chunks),
                proc.wait(),
            ),
            timeout=timeout,
        )
    except asyncio.TimeoutError:
        try:
            proc.kill()
        except ProcessLookupError:
            pass
        message = f"\nExecution timed out after {int(timeout)}s"
        stderr_chunks.append(message)
        await send_output(websocket, "stderr", message, label)
        return {
            "status": "Timeout",
            "stdout": "".join(stdout_chunks),
            "stderr": "".join(stderr_chunks),
            "time": round(timeout * 1000, 2),
            "code": None,
        }

    elapsed_ms = round((time.perf_counter() - start_time) * 1000, 2)
    return {
        "status": "Completed" if proc.returncode == 0 else f"Exited({proc.returncode})",
        "stdout": "".join(stdout_chunks),
        "stderr": "".join(stderr_chunks),
        "time": elapsed_ms,
        "code": proc.returncode,
    }


async def compile_sources(run_dir: str, language: str, files: List[str], websocket: WebSocket, use_docker: bool):
    language = normalize_language(language)
    if language == "python":
        return {"code": 0, "stdout": "", "stderr": ""}

    await websocket.send_json({"type": "status", "data": f"Compiling {language.upper()}..."})

    if language == "java":
        if use_docker:
            args = [
                "docker", "run", "--rm",
                "-v", f"{os.path.abspath(run_dir)}:/app",
                "-w", "/app",
                "openjdk:21-jdk-slim",
                "javac", "-encoding", "UTF-8",
                *files,
            ]
            compile_result = await run_process(args, websocket, timeout=45.0)
        else:
            args = ["javac", "-encoding", "UTF-8", *[path.replace("/", os.sep) for path in files]]
            compile_result = await run_process(args, websocket, cwd=run_dir, timeout=45.0)
    elif language == "c":
        out_name = f"prog{EXE_EXT}"
        gcc_cmd = resolve_tool("gcc")
        if not gcc_cmd:
            return {"code": 1, "stdout": "", "stderr": "C compiler not found."}
        args = [gcc_cmd, "-O2", "-o", out_name, *files, "-lm"]
        compile_result = await run_process(args, websocket, cwd=run_dir, timeout=30.0, extra_path=os.path.dirname(gcc_cmd))
    elif language == "cpp":
        out_name = f"prog{EXE_EXT}"
        gpp_cmd = resolve_tool("g++")
        if not gpp_cmd:
            return {"code": 1, "stdout": "", "stderr": "C++ compiler not found."}
        args = [gpp_cmd, "-O2", "-std=c++17", "-o", out_name, *files]
        compile_result = await run_process(args, websocket, cwd=run_dir, timeout=30.0, extra_path=os.path.dirname(gpp_cmd))
    else:
        return {"code": 1, "stdout": "", "stderr": f"Unsupported language: {language}"}

    return compile_result


async def run_single_test(
    run_dir: str,
    language: str,
    user_input: str,
    websocket: WebSocket,
    label: str = "",
    timeout: float = 30.0,
    use_docker: bool = False,
):
    language = normalize_language(language)
    await websocket.send_json({"type": "status", "data": f"Running {language.upper()}{label}..."})

    if language == "java":
        if use_docker:
            args = [
                "docker", "run", "--rm", "-i",
                "--memory=512m", "--cpus=1", "--network=none",
                "-v", f"{os.path.abspath(run_dir)}:/app",
                "-w", "/app",
                "openjdk:21-jdk-slim",
                "java", "-cp", "/app", "Main",
            ]
            result = await run_process(args, websocket, user_input, timeout=timeout, label=label)
        else:
            args = ["java", "-Xmx512m", "-cp", run_dir, "Main"]
            result = await run_process(args, websocket, user_input, timeout=timeout, label=label)
    elif language == "python":
        py_cmd = "python3" if shutil.which("python3") else "python"
        args = [py_cmd, "main.py"]
        result = await run_process(args, websocket, user_input, cwd=run_dir, timeout=timeout, label=label)
    elif language in ["c", "cpp"]:
        executable = os.path.join(run_dir, f"prog{EXE_EXT}")
        args = [executable]
        compiler = resolve_tool("g++" if language == "cpp" else "gcc")
        result = await run_process(
            args,
            websocket,
            user_input,
            cwd=run_dir,
            timeout=timeout,
            label=label,
            extra_path=os.path.dirname(compiler) if compiler else "",
        )
    else:
        return {"code": 1, "stdout": "", "stderr": f"Unsupported execution language: {language}", "status": "Error", "time": 0}

    if not result.get("stdout") and not result.get("stderr"):
        await send_output(websocket, "stdout", "(program finished with no output)", label=label)
    return result


async def record_activity(activity: dict):
    try:
        from database import activities_collection
        await activities_collection.insert_one(activity)
    except Exception as exc:
        print(f"Activity logging skipped: {exc}")


async def execute_code(
    code: str,
    user_input: str,
    websocket: WebSocket,
    user_id: str,
    language: str = "java",
    test_cases: Optional[List[dict]] = None,
    files: Optional[List[dict]] = None,
):
    language = normalize_language(language)
    run_id = str(uuid.uuid4())
    run_dir = os.path.join(TEMP_DIR, run_id)
    os.makedirs(run_dir, exist_ok=True)

    runtime = get_runtime_status()
    use_docker = runtime["docker"] and not (runtime["java"] and runtime["javac"])

    try:
        missing_runtime = (
            (language == "java" and (not runtime["java"] or not runtime["javac"]))
            or (language == "python" and not runtime["python"])
            or (language == "c" and not runtime["gcc"])
            or (language == "cpp" and not runtime["gpp"])
        )
        if language not in {"java", "python", "c", "cpp"}:
            await send_output(websocket, "stderr", f"Unsupported language: {language}")
            await websocket.send_json({"type": "status", "data": "Unsupported Language"})
            return
        if missing_runtime:
            await send_output(websocket, "stderr", f"{language.upper()} runtime/compiler is not installed or not on PATH.")
            await websocket.send_json({"type": "status", "data": "Runtime Unavailable"})
            return

        await websocket.send_json({"type": "clear", "data": ""})
        written_files = write_source_files(run_dir, code, language, files)
        if not written_files:
            await send_output(websocket, "stderr", f"No valid {language} source files were provided.")
            await websocket.send_json({"type": "status", "data": "Invalid Project"})
            return

        compile_result = await compile_sources(run_dir, language, written_files, websocket, use_docker)
        if compile_result["code"] != 0:
            await websocket.send_json({"type": "status", "data": "Compilation Error"})
            await websocket.send_json({"type": "output_focus", "data": "stderr"})
            await record_activity({
                "user_id": user_id,
                "code": code,
                "status": "Compilation Error",
                "execution_time": None,
                "timestamp": datetime.utcnow(),
            })
            return

        if test_cases:
            total = len(test_cases)
            passed = 0
            max_time = 0.0

            for index, test_case in enumerate(test_cases):
                tc_input = str(test_case.get("input", ""))
                expected = str(test_case.get("expected", "")).strip()
                label = f" Test {index + 1}/{total}"
                result = await run_single_test(
                    run_dir,
                    language,
                    tc_input,
                    websocket,
                    label=label,
                    timeout=30.0,
                    use_docker=use_docker,
                )
                max_time = max(max_time, float(result["time"]))
                actual = result["stdout"].strip()
                success = result["code"] == 0 and (not expected or actual == expected)
                passed += 1 if success else 0

                await websocket.send_json({
                    "type": "testResult",
                    "data": {
                        "index": index,
                        "label": f"Test {index + 1}",
                        "status": result["status"],
                        "verdict": "PASS" if success else "FAIL",
                        "input": tc_input,
                        "expected": expected,
                        "got": actual,
                        "time": result["time"],
                    },
                })

            summary = f"\n{'-' * 40}\nTest Results: {passed}/{total} passed"
            await send_output(websocket, "stdout", summary)
            await websocket.send_json({"type": "metrics", "data": {"time": max_time, "memory": "512m limit"}})
            await websocket.send_json({"type": "status", "data": f"Done - {passed}/{total} Passed"})
        else:
            result = await run_single_test(
                run_dir,
                language,
                user_input,
                websocket,
                timeout=30.0,
                use_docker=use_docker,
            )
            await websocket.send_json({"type": "metrics", "data": {"time": result["time"], "memory": "512m limit"}})
            await websocket.send_json({"type": "status", "data": result["status"]})
            if result.get("code") != 0:
                await websocket.send_json({"type": "output_focus", "data": "stderr"})
            else:
                await websocket.send_json({"type": "output_focus", "data": "stdout"})

        await record_activity({
            "user_id": user_id,
            "code": code,
            "status": "Completed",
            "execution_time": None,
            "timestamp": datetime.utcnow(),
        })
        # Ensure a final newline to ensure the output container updates
        await send_output(websocket, "stdout", "\n", label="")
    except FileNotFoundError as exc:
        await send_output(websocket, "stderr", f"Runtime tool not found: {exc.filename}")
        await websocket.send_json({"type": "status", "data": "Runtime Unavailable"})
        await websocket.send_json({"type": "output_focus", "data": "stderr"})
    except Exception as exc:
        await send_output(websocket, "stderr", f"Server execution error: {exc}")
        await websocket.send_json({"type": "status", "data": "Server Error"})
        await websocket.send_json({"type": "output_focus", "data": "stderr"})
    finally:
        cleanup_sync(run_dir)
