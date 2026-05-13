/* eslint-disable @typescript-eslint/no-explicit-any, react-hooks/immutability, react-hooks/exhaustive-deps */
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties, ChangeEvent, DragEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Editor from '@monaco-editor/react';
import type { OnMount } from '@monaco-editor/react';
import {
  BrainCircuit,
  BookOpen,
  Bug,
  Clock,
  Code2,
  FolderClosed,
  HardDrive,
  Import,
  LogOut,
  Maximize2,
  Play,
  Plus,
  RotateCw,
  Search,
  SplitSquareHorizontal,
  Wifi,
  WifiOff,
  ArrowLeft,
  FileCode,
  Edit2,
  Trash2,
  Save,
  Download,
  LayoutPanelLeft,
  PanelBottom,
  Gauge,
  Terminal,
  Moon,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { languageDefaults, useStore } from '../store/useStore';
import type { SupportedLanguage } from '../store/useStore';
import { analyzeError } from '../data/debugPatterns';
import LanguageDropdown from './LanguageDropdown';

type ProjectFile = {
  id: string;
  name: string;
  path: string;
  content: string;
};

type TestCase = {
  id: string;
  input: string;
  expected: string;
};

type HealthInfo = {
  status: string;
  message: string;
  database?: { mode: string; healthy: boolean; message: string };
  runtime?: {
    docker: boolean;
    javac: boolean;
    java: boolean;
    python: boolean;
    gcc: boolean;
    gpp: boolean;
    sandboxMode: string;
    jdk: string;
  };
};

type TestResult = {
  index: number;
  label: string;
  status: string;
  verdict: string;
  input: string;
  expected: string;
  got: string;
  time: number;
};

type ExecutionMessage = {
  type: string;
  data: any;
};

const projectStorageKeyBase = 'codme_project_v1';
const resultPanelWidthKey = 'codme_result_panel_width';
const apiBase = (import.meta.env.VITE_API_BASE_URL || 'https://codme-backend.onrender.com').replace(/\/$/, '');
const wsBase = (import.meta.env.VITE_WS_URL || apiBase.replace(/^http/, 'ws')).replace(/\/$/, '');

const languageMeta: Record<SupportedLanguage, { label: string; extension: string; mainFile: string; monaco: string }> = {
  java: { label: 'Java', extension: '.java', mainFile: 'Main.java', monaco: 'java' },
  python: { label: 'Python', extension: '.py', mainFile: 'main.py', monaco: 'python' },
  c: { label: 'C', extension: '.c', mainFile: 'main.c', monaco: 'c' },
  cpp: { label: 'C++', extension: '.cpp', mainFile: 'main.cpp', monaco: 'cpp' },
};

function createDefaultFiles(language: SupportedLanguage): ProjectFile[] {
  const meta = languageMeta[language];
  return [{ id: 'main', name: meta.mainFile, path: meta.mainFile, content: languageDefaults[language] }];
}

function projectStorageKey(language: SupportedLanguage) {
  return `${projectStorageKeyBase}_${language}`;
}

function filesMatchLanguage(files: ProjectFile[], language: SupportedLanguage) {
  const extension = languageMeta[language].extension.toLowerCase();
  return files.length > 0 && files.some((file) => file.name.toLowerCase().endsWith(extension));
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function normalizeImportPath(fileName: string, language: SupportedLanguage) {
  const cleaned = fileName.replace(/\\/g, '/').replace(/^\/+/, '');
  return /\.(java|py|c|cpp|h)$/i.test(cleaned) ? cleaned : `${cleaned}${languageMeta[language].extension}`;
}

function readsFromStdin(source: string, lang?: string) {
  const javaPatterns = [/System\.in/, /\bScanner\s*\(/, /\bBufferedReader\s*\(/, /\bConsole\s+\w+\s*=/, /\.readLine\s*\(/, /\.next(?:Int|Long|Double|Float|Boolean|Byte|Short|Line)?\s*\(/];
  const pythonPatterns = [/\binput\s*\(/];
  const cPatterns = [/\bscanf\s*\(/, /\bgets\s*\(/, /\bfgets\s*\(/, /\bgetchar\s*\(/];
  const cppPatterns = [...cPatterns, /\bcin\s*>>/, /\bgetline\s*\(/];
  const patterns = lang === 'python' ? pythonPatterns : lang === 'c' ? cPatterns : lang === 'cpp' ? cppPatterns : javaPatterns;
  return patterns.some((pattern) => pattern.test(source));
}

function extractPrompts(source: string, language: string): string[] {
  const prompts: string[] = [];
  let regex: RegExp;

  if (language === 'java') {
    regex = /System\.out\.print(?:ln)?\s*\(\s*"([^"]+)"\s*\)/g;
  } else if (language === 'python') {
    regex = /(?:input|print)\s*\(\s*["']([^"']+)["']\s*\)/g;
  } else if (language === 'c' || language === 'cpp') {
    regex = /(?:printf|std::cout\s*<<|std::print)\s*\(?\s*["']([^"']+)["']\s*\)?/g;
  } else {
    return [];
  }

  let match;
  while ((match = regex.exec(source)) !== null) {
    const text = match[1].trim();
    if (text.toLowerCase().includes('enter') || text.includes(':') || text.toLowerCase().includes('input')) {
      prompts.push(text);
    }
  }
  return prompts;
}

export default function IDEWorkspace() {
  const {
    code,
    setCode,
    language,
    setLanguage,
    input,
    setInput,
    output,
    addOutput,
    clearOutput,
    status,
    setStatus,
    metrics,
    setMetrics,
    token,
    setToken,
  } = useStore();
  const navigate = useNavigate();
  const outputEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<WebSocket | null>(null);
  const editorRef = useRef<Parameters<OnMount>[0] | null>(null);
  const reconnectRef = useRef(0);
  const allowReconnectRef = useRef(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const projectInputRef = useRef<HTMLInputElement>(null);

  const [files, setFiles] = useState<ProjectFile[]>(() => {
    const initialLanguage = useStore.getState().language;
    const saved = localStorage.getItem(projectStorageKey(initialLanguage));
    if (!saved) return createDefaultFiles(useStore.getState().language);
    try {
      const parsed = JSON.parse(saved) as ProjectFile[];
      return filesMatchLanguage(parsed, initialLanguage) ? parsed : createDefaultFiles(initialLanguage);
    } catch {
      return createDefaultFiles(initialLanguage);
    }
  });
  const [activeFileId, setActiveFileId] = useState(() => files[0]?.id || 'main');
  const [splitFileId, setSplitFileId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [theme, setTheme] = useState<'aurora' | 'eclipse' | 'solar'>('aurora');
  const [health, setHealth] = useState<HealthInfo | null>(null);
  const [connectionState, setConnectionState] = useState<'checking' | 'connecting' | 'connected' | 'reconnecting' | 'offline'>('checking');
  const [connectionMessage, setConnectionMessage] = useState('Checking backend...');
  const [testCases, setTestCases] = useState<TestCase[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [runWithTests, setRunWithTests] = useState(false);
  const [activePanel, setActivePanel] = useState<'stdout' | 'stderr' | 'tests' | 'terminal'>('stdout');
  const [terminalCommand, setTerminalCommand] = useState('');
  const [terminalLines, setTerminalLines] = useState<string[]>(['JDK console online.']);
  const [inputPromptOpen, setInputPromptOpen] = useState(false);
  const [pendingRunWithTests, setPendingRunWithTests] = useState(false);
  const [draftInput, setDraftInput] = useState(input);
  const [resultPanelWidth, setResultPanelWidth] = useState(() => {
    const saved = Number(localStorage.getItem(resultPanelWidthKey));
    return Number.isFinite(saved) && saved >= 300 ? saved : 390;
  });
  const [isResizingResult, setIsResizingResult] = useState(false);
  const [booted, setBooted] = useState(false);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renamingName, setRenamingName] = useState('');
  const [detectedPrompts, setDetectedPrompts] = useState<string[]>([]);
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [inputLines, setInputLines] = useState<string[]>([]);
  const [debugHints, setDebugHints] = useState<ReturnType<typeof analyzeError> | null>(null);
  const [showDebugPanel, setShowDebugPanel] = useState(false);

  const activeFile = useMemo(
    () => files.find((file) => file.id === activeFileId) || files[0],
    [files, activeFileId],
  );
  const splitFile = useMemo(
    () => files.find((file) => file.id === splitFileId) || null,
    [files, splitFileId],
  );
  const filteredFiles = useMemo(
    () => files.filter((file) => file.path.toLowerCase().includes(searchQuery.toLowerCase())),
    [files, searchQuery],
  );
  const stdoutText = useMemo(() => {
    return output
      .filter(item => item.type === 'stdout')
      .map(item => item.data)
      .join('');
  }, [output]);
  
  const stderrText = useMemo(() => {
    return output
      .filter(item => item.type === 'stderr' || item.type === 'error')
      .map(item => item.data)
      .join('');
  }, [output]);
  const isBusy = !['Idle', 'Completed', 'Compilation Error', 'Timeout', 'Runtime Unavailable', 'Server Error'].some((item) => status.includes(item)) && !status.startsWith('Done') && !status.startsWith('Exited');
  const canRun = !isBusy;

  const checkHealth = useCallback(async () => {
    setConnectionState((current) => (current === 'connected' ? current : 'checking'));
    try {
      const response = await fetch(`${apiBase}/health`, { signal: AbortSignal.timeout(3000) });
      const data = (await response.json()) as HealthInfo;
      setHealth(data);
      const runtimeReady = data.runtime && data.runtime.java && data.runtime.javac && data.runtime.python && data.runtime.gcc && data.runtime.gpp;
      if (!response.ok || !runtimeReady) {
        setConnectionState('offline');
        setConnectionMessage('Backend is online, but one or more language runtimes are unavailable.');
        return false;
      }
      setConnectionMessage(data.runtime?.docker ? 'Connected with Docker sandbox' : 'Connected with local runtimes');
      return true;
    } catch {
      setConnectionMessage('Connecting directly to execution engine...');
      return false;
    }
  }, []);

  const applyExecutionMessage = useCallback((message: ExecutionMessage) => {
    if (message.type === 'output') {
      console.log('📡 Received Output:', message.data);
      addOutput(message.data);
      if (message.data.type === 'stderr' || message.data.type === 'error') {
        setActivePanel('stderr');
      } else {
        setActivePanel('stdout');
      }
    }
    if (message.type === 'status') {
      console.log('📊 Status Update:', message.data);
      setStatus(message.data);
      if (message.data.includes('Error') || message.data.includes('Timeout') || message.data.startsWith('Exited')) {
        setActivePanel('stderr');
      }
    }
    if (message.type === 'metrics') {
      setMetrics({ time: String(message.data.time), memory: String(message.data.memory) });
    }
    if (message.type === 'clear') {
      clearOutput();
      setTestResults([]);
    }
    if (message.type === 'testResult') {
      setTestResults((current) => [...current, message.data]);
      setActivePanel('tests');
    }
    if (message.type === 'diagnostic') {
      setTerminalLines((current) => [...current, message.data.message]);
    }
    if (message.type === 'output_focus') {
      setActivePanel(message.data as any);
      if (message.data === 'stdout') setShowDebugPanel(false);
    }
  }, [addOutput, clearOutput, setMetrics, setStatus, setActivePanel]);

  const connectSocket = useCallback(async () => {
    if (!token) return;
    
    // Attempt health check in background
    void checkHealth();

    socketRef.current?.close();
    setConnectionState(reconnectRef.current > 0 ? 'reconnecting' : 'connecting');
    
    const url = `${wsBase}/ws/execute?token=${encodeURIComponent(token || '')}`;
    
    console.log('🔌 Connecting to WebSocket:', url);
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      reconnectRef.current = 0;
      setConnectionState('connected');
      setConnectionMessage('Realtime channel connected');
      setStatus('Idle');
    };

    ws.onmessage = (event) => {
      applyExecutionMessage(JSON.parse(event.data));
    };

    ws.onerror = () => {
      setConnectionState('offline');
      setConnectionMessage('Realtime channel failed. Retrying with the Vite WebSocket proxy.');
    };

    ws.onclose = (event) => {
      if (!allowReconnectRef.current || socketRef.current !== ws) return;
      if (event.code === 1008) {
        setToken(null);
        navigate('/');
        return;
      }
      if (reconnectRef.current < 3) {
        reconnectRef.current += 1;
        setConnectionState('reconnecting');
        setConnectionMessage(`Realtime channel reconnecting (${reconnectRef.current}/3)...`);
        window.setTimeout(connectSocket, 1200 * reconnectRef.current);
      } else {
        setConnectionState('offline');
        setConnectionMessage('Realtime channel is offline. Retry after the backend is running.');
      }
    };
  }, [applyExecutionMessage, checkHealth, navigate, setStatus, setToken, token]);

  useEffect(() => {
    if (!token) {
      navigate('/');
      return;
    }
    allowReconnectRef.current = true;
    const bootTimer = window.setTimeout(() => setBooted(true), 900);
    void connectSocket();
    return () => {
      allowReconnectRef.current = false;
      window.clearTimeout(bootTimer);
      socketRef.current?.close();
    };
  }, [connectSocket, navigate, token]);

  useEffect(() => {
    localStorage.setItem(projectStorageKey(language), JSON.stringify(files));
  }, [files, language]);

  useEffect(() => {
    if (activeFile) setCode(activeFile.content);
  }, [activeFile, setCode]);

  useEffect(() => {
    outputEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, [output]);

  useEffect(() => {
    localStorage.setItem(resultPanelWidthKey, String(resultPanelWidth));
  }, [resultPanelWidth]);

  useEffect(() => {
    if (!isResizingResult) return;

    const handlePointerMove = (event: PointerEvent) => {
      const nextWidth = window.innerWidth - event.clientX - 16;
      setResultPanelWidth(Math.min(720, Math.max(300, nextWidth)));
    };
    const handlePointerUp = () => setIsResizingResult(false);
    const previousCursor = document.body.style.cursor;
    const previousSelect = document.body.style.userSelect;

    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);

    return () => {
      document.body.style.cursor = previousCursor;
      document.body.style.userSelect = previousSelect;
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
    };
  }, [isResizingResult]);

  const updateActiveFile = useCallback((content: string) => {
    setFiles((current) => current.map((file) => (file.id === activeFileId ? { ...file, content } : file)));
    setCode(content);
  }, [activeFileId, setCode]);

  const changeLanguage = useCallback((nextLanguage: SupportedLanguage) => {
    setLanguage(nextLanguage);
    const saved = localStorage.getItem(projectStorageKey(nextLanguage));
    let nextFiles: ProjectFile[];
    try {
      const parsed = saved ? JSON.parse(saved) as ProjectFile[] : null;
      nextFiles = (parsed && filesMatchLanguage(parsed, nextLanguage)) ? parsed : createDefaultFiles(nextLanguage);
    } catch {
      nextFiles = createDefaultFiles(nextLanguage);
    }
    
    setFiles(nextFiles);
    setActiveFileId(nextFiles[0].id);
    setSplitFileId(null);
    setInput('');
    clearOutput();
    setTestResults([]);
    setStatus('Idle');
    setMetrics(null);
  }, [clearOutput, setInput, setLanguage, setMetrics, setStatus]);

  const addNewFile = () => {
    const ext = languageMeta[language].extension;
    const mainExists = files.some(f => f.name.toLowerCase() === languageMeta[language].mainFile.toLowerCase());
    const name = mainExists ? `Solution${files.length + 1}` : 'Main';
    const fileName = mainExists ? `${name}${ext}` : languageMeta[language].mainFile;

    const file: ProjectFile = {
      id: createId('file'),
      name: fileName,
      path: fileName,
      content: language === 'java'
        ? `public class ${name} {\n    public static void main(String[] args) {\n        \n    }\n}`
        : '',
    };
    setFiles((current) => [...current, file]);
    setActiveFileId(file.id);
  };

  const startRenaming = (file: ProjectFile) => {
    setRenamingId(file.id);
    setRenamingName(file.name.replace(languageMeta[language].extension, ''));
  };

  const confirmRename = () => {
    if (!renamingId || !renamingName.trim()) {
      setRenamingId(null);
      return;
    }
    const baseName = renamingName.trim();
    const newName = baseName.endsWith(languageMeta[language].extension) ? baseName : `${baseName}${languageMeta[language].extension}`;

    setFiles((current) => current.map((file) => (file.id === renamingId ? { ...file, name: newName, path: newName } : file)));
    setRenamingId(null);
  };

  const removeFile = (fileId: string) => {
    if (files.length === 1) {
      toast.error(`Project needs at least one ${languageMeta[language].label} file`);
      return;
    }
    setFiles((current) => current.filter((file) => file.id !== fileId));
    if (activeFileId === fileId) {
      const nextFile = files.find((file) => file.id !== fileId);
      if (nextFile) setActiveFileId(nextFile.id);
    }
    if (splitFileId === fileId) setSplitFileId(null);
  };

  const waitForSocket = useCallback(async () => {
    if (socketRef.current?.readyState === WebSocket.OPEN) {
      return socketRef.current;
    }

    if (!socketRef.current || socketRef.current.readyState === WebSocket.CLOSED || socketRef.current.readyState === WebSocket.CLOSING) {
      void connectSocket();
    }

    const socket = socketRef.current;
    if (!socket) return null;
    if (socket.readyState === WebSocket.OPEN) return socket;
    if (socket.readyState !== WebSocket.CONNECTING) return null;

    setStatus('Connecting realtime channel...');

    return new Promise<WebSocket | null>((resolve) => {
      let settled = false;
      const finish = (readySocket: WebSocket | null) => {
        if (settled) return;
        settled = true;
        window.clearTimeout(timeoutId);
        socket.removeEventListener('open', handleOpen);
        socket.removeEventListener('error', handleFailure);
        socket.removeEventListener('close', handleFailure);
        resolve(readySocket);
      };
      const handleOpen = () => finish(socket);
      const handleFailure = () => finish(null);
      const timeoutId = window.setTimeout(() => finish(null), 15000);

      socket.addEventListener('open', handleOpen);
      socket.addEventListener('error', handleFailure);
      socket.addEventListener('close', handleFailure);
    });
  }, [connectSocket, setStatus]);

  const executeCode = useCallback(async (withTests: boolean, stdinText: string) => {
    if (!token) {
      navigate('/');
      return;
    }

    const payload = {
      action: 'execute',
      language,
      code: editorRef.current?.getValue() || code,
      input: stdinText,
      testCases: withTests ? testCases : null,
      files: files.map(f => ({ name: f.name, content: f.content })),
      activeFile: activeFile?.name,
    };

    console.log('🚀 Sending execution request for:', language);
    const socket = await waitForSocket();
    if (socket) {
      socket.send(JSON.stringify(payload));
      return;
    }

    toast('Realtime is still waking up. Running through HTTP fallback...');

    try {
      setStatus('Running through HTTP fallback...');
      const response = await fetch(`${apiBase}/execute`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...payload, token }),
        signal: AbortSignal.timeout(60000),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail || 'Execution request failed.');
      }
      if (Array.isArray(data.messages)) {
        data.messages.forEach((message: ExecutionMessage) => applyExecutionMessage(message));
      }
    } catch (error: any) {
      const message = error?.name === 'TimeoutError'
        ? 'Execution timed out while contacting the backend.'
        : error?.message || 'Execution failed because the backend could not be reached.';
      clearOutput();
      addOutput({ type: 'error', data: message });
      setStatus('Server Error');
      setActivePanel('stderr');
    }
  }, [activeFile?.name, addOutput, applyExecutionMessage, clearOutput, code, files, language, navigate, setStatus, testCases, token, waitForSocket]);

  const handleRun = useCallback((withTests = runWithTests) => {
    const source = editorRef.current?.getValue() ?? activeFile?.content ?? code;
    if (!withTests && readsFromStdin(source, language)) {
      setPendingRunWithTests(false);
      const prompts = extractPrompts(source, language);
      setDetectedPrompts(prompts);
      setCurrentPromptIndex(0);
      setInputLines([]);
      setDraftInput('');
      setInputPromptOpen(true);
      setActivePanel('stdout');
      return;
    }
    setActivePanel('stdout');
    void executeCode(withTests, withTests ? '' : input);
  }, [activeFile?.content, code, executeCode, input, language, runWithTests]);

  const handleStepSubmit = () => {
    if (detectedPrompts.length > 0) {
      const nextLines = [...inputLines, draftInput];
      if (currentPromptIndex < detectedPrompts.length - 1) {
        setInputLines(nextLines);
        setCurrentPromptIndex(currentPromptIndex + 1);
        setDraftInput('');
      } else {
        const finalInput = nextLines.join('\n');
        setInput(finalInput);
        setInputPromptOpen(false);
        void executeCode(pendingRunWithTests, finalInput);
      }
    } else {
      submitPromptedInput();
    }
  };

  const submitPromptedInput = () => {
    setInput(draftInput);
    setInputPromptOpen(false);
    void executeCode(pendingRunWithTests, draftInput);
  };

  const saveProject = () => {
    localStorage.setItem(projectStorageKey(language), JSON.stringify(files));
    toast.success(`${languageMeta[language].label} project saved locally`);
  };

  const exportProject = () => {
    const blob = new Blob([JSON.stringify(files, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'codeme-project.json';
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importFiles = async (fileList: FileList | null) => {
    if (!fileList?.length) return;
    const imported = await Promise.all(
      Array.from(fileList).map(async (file) => ({
        id: createId('import'),
        name: file.name,
        path: normalizeImportPath(file.webkitRelativePath || file.name, language),
        content: await file.text(),
      })),
    );
    setFiles((current) => [...current, ...imported]);
    if (imported[0]) setActiveFileId(imported[0].id);
  };

  const importProject = async (event: ChangeEvent<HTMLInputElement>) => {
    const projectFile = event.target.files?.[0];
    if (!projectFile) return;
    const parsed = JSON.parse(await projectFile.text()) as ProjectFile[];
    if (!Array.isArray(parsed) || !parsed.length) {
      toast.error('Project file is empty');
      return;
    }
    setFiles(parsed.map((file) => ({ ...file, id: file.id || createId('project') })));
    setActiveFileId(parsed[0].id || 'main');
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    void importFiles(event.dataTransfer.files);
  };

  const runTerminalCommand = () => {
    const command = terminalCommand.trim();
    if (!command) return;
    const response = command === 'clear'
      ? []
      : [
        ...terminalLines,
        `> ${command}`,
        command === 'health' ? JSON.stringify(health, null, 2) : `Command routed inside browser console: ${command}`,
      ];
    setTerminalLines(response);
    setTerminalCommand('');
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      void document.documentElement.requestFullscreen();
    } else {
      void document.exitFullscreen();
    }
  };

  const configureMonaco = (monaco: typeof import('monaco-editor')) => {
    monaco.editor.defineTheme('codeme-aurora', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'keyword', foreground: '00f0ff', fontStyle: 'bold' },
        { token: 'string', foreground: '39ff14' },
        { token: 'number', foreground: 'ffcc66' },
        { token: 'comment', foreground: '7c8aa5', fontStyle: 'italic' },
      ],
      colors: {
        'editor.background': '#070910',
        'editorLineNumber.foreground': '#334155',
        'editorCursor.foreground': '#00f0ff',
        'editor.lineHighlightBackground': '#00f0ff10',
        'editor.selectionBackground': '#b026ff44',
      },
    });
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') {
        event.preventDefault();
        handleRun();
      }
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 's') {
        event.preventDefault();
        saveProject();
      }
      if (event.key === 'F11') {
        event.preventDefault();
        toggleFullscreen();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleRun]);

  const statusTone = connectionState === 'connected' ? 'text-neon-green' : connectionState === 'offline' ? 'text-red-300' : 'text-neon-blue';

  return (
    <div className={`ide-shell theme-${theme} h-screen w-screen overflow-hidden text-white`} onDrop={handleDrop} onDragOver={(event) => event.preventDefault()}>
      <AnimatePresence>
        {!booted && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-black"
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-6">
              <div className="text-6xl md:text-8xl font-black tracking-tighter flex items-center">
                <span className="text-white font-syncopate">COD</span>
                <span className="text-neon-blue font-michroma neon-text-blue">ME</span>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="h-1 w-64 bg-white/5 rounded-full overflow-hidden relative">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple"
                    initial={{ left: '-100%' }}
                    animate={{ left: '0%' }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
                <span className="text-[10px] font-mono tracking-[0.3em] text-white/40 uppercase">Initializing Multi-Language Engine</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="ide-workspace-frame h-full w-full grid grid-rows-[64px_1fr_32px] gap-2 p-2">
        <header className="glass-panel ide-topbar ide-workspace-header flex items-center justify-between px-6 relative z-50 rounded-2xl border-white/15">
          <div className="flex items-center gap-5 min-w-0">
            <div className="flex items-center gap-3 pr-4 border-r border-white/10">
              <button onClick={() => navigate('/select')} className="icon-button h-10 w-10" title="Back to Selection">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="h-10 w-10 rounded-xl border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-[0_0_24px_rgba(0,240,255,0.25)]">
                <Code2 className="h-6 w-6 text-neon-blue" />
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] leading-none text-white/40 uppercase tracking-[0.3em] font-bold">Workspace</span>
                <span className="text-xl font-black tracking-tighter text-white uppercase leading-none mt-1">Cod<span className="text-neon-blue">me</span></span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <LanguageDropdown
                value={language}
                onChange={(val) => changeLanguage(val)}
              />
              <div className="h-6 w-[1px] bg-white/10" />
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <div className={`h-1.5 w-1.5 rounded-full ${connectionState === 'connected' ? 'bg-neon-green shadow-[0_0_8px_#39ff14]' : 'bg-red-400 shadow-[0_0_8px_#f87171] animate-pulse'}`} />
                  <span className={`text-[10px] leading-none uppercase tracking-widest font-black ${statusTone}`}>{connectionState}</span>
                </div>
                <span className="text-[10px] text-white/50 truncate max-w-[160px] font-mono mt-1 opacity-70 italic">{connectionMessage}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {metrics && (
              <div className="hidden md:flex gap-3 text-[11px] font-mono text-text-secondary bg-black/35 px-3 py-2 rounded-lg border border-white/10">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-neon-blue" />{metrics.time}ms</span>
                <span className="flex items-center gap-1"><HardDrive className="h-3 w-3 text-neon-purple" />{metrics.memory}</span>
              </div>
            )}
            <button className="icon-button" onClick={() => navigate('/problems')} title="Practice Problems">
              <BookOpen className="h-4 w-4" />
            </button>
            <button className="icon-button" onClick={() => void connectSocket()} title="Reconnect">
              {connectionState === 'connected' ? <Wifi className="h-4 w-4" /> : <WifiOff className="h-4 w-4" />}
            </button>
            <button className="icon-button" onClick={() => setSplitFileId(splitFileId ? null : files.find((file) => file.id !== activeFileId)?.id || null)} title="Split editor">
              <SplitSquareHorizontal className="h-4 w-4" />
            </button>
            <button className="icon-button" onClick={toggleFullscreen} title="Fullscreen">
              <Maximize2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => {
                const src = editorRef.current?.getValue() || code;
                const errText = stderrText || stdoutText;
                setDebugHints(analyzeError(src, errText, language));
                setShowDebugPanel(true);
                setActivePanel('stdout');
              }}
              className="flex items-center gap-1.5 px-3 h-9 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono hover:bg-amber-500/20 transition-all"
              title="Debug Assistant"
            >
              <Bug className="h-3.5 w-3.5" /> DEBUG
            </button>
            <motion.button
              whileHover={{ y: -1, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleRun(false)}
              disabled={!canRun}
              className="run-button"
            >
              {isBusy ? <RotateCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4 fill-current" />}
              EXECUTE
            </motion.button>
            <button className="icon-button danger" onClick={() => { setToken(null); navigate('/'); }} title="Logout">
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </header>

        <main
          className="ide-main-grid min-h-0 grid gap-2"
          style={{ '--result-panel-width': `${resultPanelWidth}px` } as CSSProperties}
        >
          <aside className="glass-panel min-h-0 flex flex-col overflow-hidden">
            <div className="h-11 px-4 border-b border-white/10 flex items-center justify-between">
              <span className="font-mono text-[11px] tracking-[0.24em] text-text-secondary">EXPLORER</span>
              <div className="flex gap-1">
                <button className="mini-icon" onClick={addNewFile} title="New file"><Plus className="h-3.5 w-3.5" /></button>
                <button className="mini-icon" onClick={() => fileInputRef.current?.click()} title="Import files"><Import className="h-3.5 w-3.5" /></button>
              </div>
            </div>
            <div className="p-3 border-b border-white/10">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-neon-blue/70" />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search files"
                  className="ide-input search-input"
                />
              </div>
            </div>
            <div className="px-3 py-2 flex items-center gap-2 text-neon-blue font-mono text-xs">
              <FolderClosed className="h-4 w-4" /> src
            </div>
            <div className="flex-1 min-h-0 overflow-auto custom-scrollbar px-2 pb-3">
              {filteredFiles.map((file) => (
                <div
                  key={file.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setActiveFileId(file.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault();
                      setActiveFileId(file.id);
                    }
                  }}
                  className={`file-row group ${file.id === activeFileId ? 'active' : ''}`}
                >
                  {renamingId === file.id ? (
                    <input
                      autoFocus
                      className="flex-1 bg-black/40 border border-neon-blue/50 rounded px-1 text-xs outline-none text-white"
                      value={renamingName}
                      onChange={(e) => setRenamingName(e.target.value)}
                      onBlur={confirmRename}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') confirmRename();
                        if (e.key === 'Escape') setRenamingId(null);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <>
                      <FileCode className="h-4 w-4 shrink-0" />
                      <span className="truncate flex-1 text-left">{file.name}</span>
                      <div className="hidden group-hover:flex items-center gap-1">
                        <button
                          type="button"
                          title="Rename file"
                          className="mini-icon hover:text-neon-blue"
                          onClick={(event) => { event.stopPropagation(); startRenaming(file); }}
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                        </button>
                        <button
                          type="button"
                          title="Delete file"
                          className="file-delete hover:text-red-400"
                          onClick={(event) => { event.stopPropagation(); removeFile(file.id); }}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-3 gap-2 p-3 border-t border-white/10">
              <button className="tool-button" onClick={saveProject} title="Save"><Save className="h-4 w-4" /></button>
              <button className="tool-button" onClick={exportProject} title="Export"><Download className="h-4 w-4" /></button>
              <button className="tool-button" onClick={() => projectInputRef.current?.click()} title="Open project"><LayoutPanelLeft className="h-4 w-4" /></button>
            </div>
            <input ref={fileInputRef} type="file" multiple className="hidden" onChange={(event) => void importFiles(event.target.files)} />
            <input ref={projectInputRef} type="file" accept=".json" className="hidden" onChange={(event) => void importProject(event)} />
          </aside>

          <section className="min-w-0 min-h-0 grid grid-rows-[42px_1fr] glass-panel overflow-hidden">
            <div className="flex items-center overflow-x-auto border-b border-white/10">
              {files.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setActiveFileId(file.id)}
                  className={`tab-button ${file.id === activeFileId ? 'active' : ''}`}
                >
                  <FileCode className="h-3.5 w-3.5" /> {file.name}
                </button>
              ))}
            </div>
            <div className={`min-h-0 ${splitFile ? 'grid grid-cols-2' : 'grid grid-cols-1'}`}>
              <Editor
                height="100%"
                language={languageMeta[language].monaco}
                theme="codeme-aurora"
                value={activeFile?.content || ''}
                beforeMount={configureMonaco}
                onMount={(editor) => {
                  editorRef.current = editor;
                }}
                onChange={(value) => updateActiveFile(value || '')}
                options={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 15,
                  minimap: { enabled: true },
                  smoothScrolling: true,
                  cursorBlinking: 'smooth',
                  cursorSmoothCaretAnimation: 'on',
                  automaticLayout: true,
                  bracketPairColorization: { enabled: true },
                  guides: { bracketPairs: true, indentation: true },
                  formatOnPaste: true,
                  formatOnType: true,
                  padding: { top: 18, bottom: 18 },
                  scrollBeyondLastLine: false,
                  suggest: { preview: true },
                }}
              />
              {splitFile && (
                <Editor
                  height="100%"
                  language={languageMeta[language].monaco}
                  theme="codeme-aurora"
                  value={splitFile.content}
                  options={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 15,
                    minimap: { enabled: false },
                    readOnly: true,
                    smoothScrolling: true,
                    automaticLayout: true,
                    padding: { top: 18, bottom: 18 },
                    scrollBeyondLastLine: false,
                  }}
                />
              )}
            </div>
          </section>

          <button
            type="button"
            className={`resize-divider ${isResizingResult ? 'active' : ''}`}
            title="Drag to resize results"
            onPointerDown={(event) => {
              event.preventDefault();
              setIsResizingResult(true);
            }}
            onDoubleClick={() => setResultPanelWidth(390)}
          />

          <aside className="min-h-0 flex flex-col gap-2">
            <AnimatePresence>
              {inputPromptOpen && (
                <motion.section
                  initial={{ opacity: 0, x: 28, height: 0 }}
                  animate={{ opacity: 1, x: 0, height: 220 }}
                  exit={{ opacity: 0, x: 28, height: 0 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                  className="glass-panel shrink-0 grid grid-rows-[42px_1fr_44px] overflow-hidden"
                >
                  <div className="px-4 border-b border-white/10 flex items-center justify-between">
                    <span className="font-mono text-[11px] tracking-[0.24em] text-text-secondary">USER INPUT</span>
                    <button className={`toggle-pill ${runWithTests ? 'active' : ''}`} onClick={() => setRunWithTests(!runWithTests)}>TESTS</button>
                  </div>
                  <div className="min-h-0 p-3 flex flex-col gap-3">
                    {detectedPrompts.length > 0 ? (
                      <div className="space-y-4">
                        <div className="flex flex-wrap gap-1.5">
                          {detectedPrompts.map((p, i) => (
                            <span
                              key={i}
                              className={`text-[10px] font-mono px-2 py-0.5 rounded transition-all duration-300 ${i === currentPromptIndex
                                  ? 'bg-neon-blue text-black border-neon-blue shadow-[0_0_12px_rgba(0,240,255,0.4)]'
                                  : i < currentPromptIndex
                                    ? 'bg-neon-green/20 text-neon-green border-neon-green/30'
                                    : 'bg-white/5 text-white/40 border-white/10'
                                } border`}
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            value={draftInput}
                            onChange={(event) => setDraftInput(event.target.value)}
                            onKeyDown={(event) => {
                              if (event.key === 'Enter') {
                                event.preventDefault();
                                handleStepSubmit();
                              }
                            }}
                            placeholder={detectedPrompts[currentPromptIndex] || "Enter value..."}
                            autoFocus
                            className="w-full bg-black/40 rounded-lg border border-neon-blue/30 outline-none p-4 font-mono text-base text-white shadow-[inset_0_0_20px_rgba(0,240,255,0.05)] focus:border-neon-blue"
                          />
                          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neon-blue/50">
                            STEP {currentPromptIndex + 1} OF {detectedPrompts.length}
                          </div>
                        </div>
                        {inputLines.length > 0 && (
                          <div className="bg-black/20 rounded border border-white/5 p-2 space-y-1">
                            {inputLines.map((line, i) => (
                              <div key={i} className="flex gap-2 text-[11px] font-mono">
                                <span className="text-white/30">{detectedPrompts[i]}:</span>
                                <span className="text-neon-green">{line}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <textarea
                        value={draftInput}
                        onChange={(event) => setDraftInput(event.target.value)}
                        onKeyDown={(event) => {
                          if (event.key === 'Enter' && !event.shiftKey) {
                            event.preventDefault();
                            submitPromptedInput();
                          }
                        }}
                        placeholder="Enter stdin here (multiple lines allowed)"
                        spellCheck={false}
                        autoFocus
                        className="flex-1 w-full resize-none bg-black/25 rounded-lg border border-white/10 outline-none p-3 font-mono text-sm text-white/85 custom-scrollbar focus:border-neon-blue/60"
                      />
                    )}
                  </div>
                  <div className="px-3 pb-3 flex gap-2">
                    <button className="run-button flex-1" onClick={handleStepSubmit} disabled={!canRun}>
                      <Play className="h-4 w-4" />
                      {detectedPrompts.length > 0 && currentPromptIndex < detectedPrompts.length - 1 ? 'Next Step' : 'Execute'}
                    </button>
                    <button className="tool-button" onClick={() => setInputPromptOpen(false)}>
                      Cancel
                    </button>
                  </div>
                </motion.section>
              )}
            </AnimatePresence>

            <section className="glass-panel flex-1 min-h-0 grid grid-rows-[42px_1fr] overflow-hidden">
              <div className="flex items-center justify-between border-b border-white/10">
                <div className="flex items-center min-w-0">
                  {(['stdout', 'stderr', 'tests', 'terminal'] as const).map((panel) => (
                    <button key={panel} className={`panel-tab ${activePanel === panel ? 'active' : ''}`} onClick={() => setActivePanel(panel)}>
                      {panel === 'stdout' && <PanelBottom className="h-3.5 w-3.5" />}
                      {panel === 'stderr' && <Gauge className="h-3.5 w-3.5" />}
                      {panel === 'tests' && <BrainCircuit className="h-3.5 w-3.5" />}
                      {panel === 'terminal' && <Terminal className="h-3.5 w-3.5" />}
                      {panel}
                    </button>
                  ))}
                </div>
                <button className={`toggle-pill mr-3 ${runWithTests ? 'active' : ''}`} onClick={() => setRunWithTests(!runWithTests)}>TESTS</button>
              </div>
              <div className="min-h-0 overflow-auto custom-scrollbar p-3 font-mono text-sm bg-black/35">
                {activePanel === 'stdout' && !showDebugPanel && (
                  <>
                    {stdoutText ? (
                      <pre className="terminal-output text-white/90">{stdoutText}</pre>
                    ) : isBusy ? (
                      <div className="flex flex-col items-center justify-center h-full text-white/20 gap-3 mt-8">
                        <RotateCw className="h-5 w-5 animate-spin" />
                        <span className="text-xs font-mono uppercase tracking-widest">Execution in progress...</span>
                      </div>
                    ) : (
                      <div className="text-white/20 text-xs text-center mt-8">Run your code to see output here</div>
                    )}
                  </>
                )}
                {activePanel === 'stderr' && stderrText && (
                  <pre className="terminal-output text-red-300 stack-trace">{stderrText}</pre>
                )}
                {activePanel === 'tests' && (
                  <div className="space-y-3">
                    {testCases.map((testCase, index) => (
                      <div key={testCase.id} className="test-row">
                        <div className="flex items-center justify-between mb-2">
                          <span>Test {index + 1}</span>
                          <button className="mini-icon" onClick={() => setTestCases((current) => current.filter((item) => item.id !== testCase.id))}><Trash2 className="h-3 w-3" /></button>
                        </div>
                        <textarea className="ide-smallarea" value={testCase.input} placeholder="input" onChange={(event) => setTestCases((current) => current.map((item) => item.id === testCase.id ? { ...item, input: event.target.value } : item))} />
                        <textarea className="ide-smallarea" value={testCase.expected} placeholder="expected output" onChange={(event) => setTestCases((current) => current.map((item) => item.id === testCase.id ? { ...item, expected: event.target.value } : item))} />
                        {testResults[index] && <div className={testResults[index].verdict === 'PASS' ? 'text-neon-green' : 'text-red-300'}>{testResults[index].verdict} - {testResults[index].time}ms</div>}
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <button className="tool-button flex-1" onClick={() => setTestCases((current) => [...current, { id: createId('tc'), input: '', expected: '' }])}><Plus className="h-4 w-4" /></button>
                      <button className="tool-button flex-1" onClick={() => handleRun(true)} disabled={!canRun}><Play className="h-4 w-4" /></button>
                    </div>
                  </div>
                )}
                {activePanel === 'terminal' && (
                  <div className="space-y-2">
                    {terminalLines.map((line, index) => <pre key={`${line}-${index}`} className="terminal-line text-neon-green/90">{line}</pre>)}
                    <div className="flex gap-2 pt-2">
                      <input value={terminalCommand} onChange={(event) => setTerminalCommand(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') runTerminalCommand(); }} className="ide-input" placeholder="health, clear, javac -version" />
                      <button className="tool-button" onClick={runTerminalCommand}><Terminal className="h-4 w-4" /></button>
                    </div>
                  </div>
                )}

                {/* Debug Panel Overlay */}
                {showDebugPanel && activePanel === 'stdout' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-xs text-amber-400 uppercase tracking-wider flex items-center gap-2 font-bold"><Bug className="h-3.5 w-3.5" />Debug Assistant</h3>
                      <button onClick={() => setShowDebugPanel(false)} className="text-[10px] font-mono text-white/30 hover:text-white/60 px-2 py-0.5 rounded border border-white/10 hover:border-white/20">Close</button>
                    </div>
                    <p className="text-[10px] text-white/25 italic">Analysis only — your code will NOT be modified.</p>
                    {debugHints && debugHints.hints.length > 0 ? (
                      debugHints.hints.map((h, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
                          className="bg-amber-500/5 border border-amber-500/15 rounded-lg p-3 space-y-2">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 uppercase font-bold">{h.category}</span>
                            <span className="text-xs font-bold text-white/90">{h.title}</span>
                          </div>
                          {debugHints.lineHint && <p className="text-[10px] text-amber-400/50">📍 Likely around line {debugHints.lineHint}</p>}
                          <p className="text-xs text-white/50 leading-relaxed">💡 <strong>What happened:</strong> {h.explanation}</p>
                          <p className="text-xs text-neon-green/70 leading-relaxed">✏️ <strong>How to fix:</strong> {h.suggestion}</p>
                        </motion.div>
                      ))
                    ) : (
                      <div className="bg-white/5 border border-white/5 rounded-lg p-4 text-center">
                        <p className="text-xs text-white/30">✅ No obvious issues detected.</p>
                        <p className="text-[10px] text-white/15 mt-1">Run your code first to get error-specific debugging help.</p>
                      </div>
                    )}
                  </div>
                )}
                <div ref={outputEndRef} />
              </div>
            </section>
          </aside>
        </main>

        <footer className="glass-panel flex items-center justify-between px-4 font-mono text-[11px] text-text-secondary">
          <span>{status} - {connectionMessage}</span>
          <div className="flex items-center gap-4">
            <button onClick={() => setTheme(theme === 'aurora' ? 'eclipse' : theme === 'eclipse' ? 'solar' : 'aurora')} className="flex items-center gap-1 hover:text-white"><Moon className="h-3.5 w-3.5" />{theme}</button>
            <span>{health?.database?.mode || 'storage'} / {health?.runtime?.sandboxMode || 'runtime'}</span>
            <span>Ctrl+Enter Run</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
