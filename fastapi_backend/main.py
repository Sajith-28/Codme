from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Query
from fastapi.middleware.cors import CORSMiddleware
from auth import router as auth_router, SECRET_KEY, ALGORITHM
from execution import execute_code, get_runtime_status
from database import init_database, get_storage_status
from jose import jwt, JWTError
from pydantic import BaseModel
from typing import Optional, List
import json

app = FastAPI(title="CODME API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router, prefix="/auth", tags=["auth"])


class ExecuteRequest(BaseModel):
    token: str
    code: str
    input: str = ""
    testCases: Optional[List[dict]] = None
    files: Optional[List[dict]] = None
    language: str = "java"


class MessageCollector:
    def __init__(self):
        self.messages = []

    async def send_json(self, payload):
        self.messages.append(payload)


@app.on_event("startup")
async def startup_event():
    await init_database()


@app.get("/health", tags=["health"])
async def health_check():
    runtime = get_runtime_status()
    database = get_storage_status()
    required_runtimes_ready = (
        runtime["java"]
        and runtime["javac"]
        and runtime["python"]
        and runtime["gcc"]
        and runtime["gpp"]
    )
    ready = required_runtimes_ready and database["healthy"]
    return {
        "status": "ok" if ready else "degraded",
        "message": "CODME Backend Operational",
        "database": database,
        "runtime": runtime,
    }


def verify_ws_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            return None
        return user_id
    except JWTError:
        return None


@app.post("/execute", tags=["execute"])
async def execute_http(payload: ExecuteRequest):
    user_id = verify_ws_token(payload.token) or "offline-practice-user"

    collector = MessageCollector()
    await execute_code(
        payload.code,
        payload.input,
        collector,
        user_id,
        payload.language,
        payload.testCases,
        payload.files,
    )
    return {"ok": True, "messages": collector.messages}


@app.websocket("/ws/execute")
async def websocket_execute(websocket: WebSocket, token: Optional[str] = Query(None)):
    user_id = verify_ws_token(token) if token else None
    if not user_id:
        # Allow offline/practice mode if token is missing or invalid
        user_id = "offline-practice-user"

    await websocket.accept()

    try:
        while True:
            data_str = await websocket.receive_text()
            try:
                data = json.loads(data_str)
            except json.JSONDecodeError:
                await websocket.send_json({
                    "type": "output",
                    "data": {"type": "stderr", "data": "Invalid execution payload."},
                })
                continue

            if data.get("action") == "execute":
                code = data.get("code", "")
                user_input = data.get("input", "")
                test_cases = data.get("testCases", None)
                files = data.get("files", None)
                language = data.get("language", "java")
                if not code:
                    await websocket.send_json({
                        "type": "output",
                        "data": {"type": "stderr", "data": "No code provided."},
                    })
                    continue

                await execute_code(code, user_input, websocket, user_id, language, test_cases, files)

    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"WS Error: {e}")
        try:
            await websocket.send_json({"type": "output", "data": {"type": "error", "data": f"Server error: {str(e)}"}})
        except:
            pass
