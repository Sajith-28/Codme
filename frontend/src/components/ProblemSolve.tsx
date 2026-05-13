/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { Activity, ArrowLeft, BookOpen, Bug, CheckCircle2, Clock, Play, RotateCw, Send, Tag, Trophy } from 'lucide-react';
import { useStore } from '../store/useStore';
import { DIFFICULTY_COLORS, RANK_COLORS, getProblemBySlug } from '../data/problems';
import { analyzeError, analyzeComplexity } from '../data/debugPatterns';
import LanguageDropdown from './LanguageDropdown';
import LearnModal from './LearnModal';
import AITutor from './AITutor';
import { markSolved } from '../utils/progress';
import { loadCode, saveCode, loadLastResults, saveLastResults } from '../utils/persistence';

const wsBase = import.meta.env.VITE_WS_URL || 'wss://codme-backend.onrender.com';
const monacoLangMap: Record<string, string> = { java: 'java', python: 'python', c: 'c', cpp: 'cpp' };

type TestRunResult = {
  verdict: string;
  input: string;
  expected: string;
  got: string;
  time: number;
};

type DebugHints = ReturnType<typeof analyzeError>;

export default function ProblemSolve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, token, code, setCode } = useStore();
  const problem = getProblemBySlug(id);

  const [isBusy, setIsBusy] = useState(false);
  const [results, setResults] = useState<TestRunResult[]>([]);
  const [stdoutText, setStdoutText] = useState('');
  const [stderrText, setStderrText] = useState('');
  const [status, setStatus] = useState('Idle');
  const [activeTab, setActiveTab] = useState<'description' | 'learn'>('description');
  const [activePanel, setActivePanel] = useState<'results' | 'stdout' | 'debug'>('results');
  const [debugHints, setDebugHints] = useState<DebugHints | null>(null);
  const [learnOpen, setLearnOpen] = useState(false);
  const [hasAwarded, setHasAwarded] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const complexity = useMemo(() => {
    if (results.length > 0 && !isBusy) return analyzeComplexity(code, language);
    return null;
  }, [results.length, isBusy, code, language]);

  useEffect(() => {
    if (!token) navigate('/');
  }, [navigate, token]);

  useEffect(() => {
    if (!problem) return;
    const saved = loadCode(problem.id, language, problem.starterCode[language]);
    setCode(saved);
    
    const savedResults = loadLastResults(problem.id, language);
    if (savedResults) {
      setResults(savedResults.results);
      setStatus(savedResults.status);
    } else {
      setResults([]);
      setStatus('Idle');
    }
    
    setStdoutText('');
    setStderrText('');
    setHasAwarded(false);
  }, [problem, language, setCode]);

  useEffect(() => {
    if (!problem || !code) return;
    saveCode(problem.id, language, code);
  }, [code, problem, language]);

  useEffect(() => {
    if (!problem || results.length === 0) return;
    saveLastResults(problem.id, language, results, status);
  }, [results, status, problem, language]);

  useEffect(() => {
    if (!problem || isBusy || results.length === 0) return;
    const allPass = results.length === problem.testCases.length && results.every((result) => result.verdict === 'PASS');
    setStatus(allPass ? 'Accepted' : 'Results Ready');
    if (allPass && !hasAwarded) {
      markSolved(problem);
      setHasAwarded(true);
      setShowSuccess(true);
      
      // Premium sequence of success feedback
      toast.success(`Accepted! Great job on ${problem.title}!`, { icon: '🏆', duration: 4000 });
      
      setTimeout(() => {
        toast(`+${problem.xp} XP Earned. Moving to Problems Arena...`, { 
          icon: '⚡',
          duration: 3000,
          style: {
            background: '#0a0a0f',
            color: '#00f0ff',
            border: '1px solid #00f0ff33',
            fontSize: '13px',
            fontWeight: '600'
          }
        });
      }, 1000);

      setTimeout(() => {
        navigate('/problems');
      }, 4000);
    }
    if (stderrText.trim()) {
      const src = code;
      setDebugHints(analyzeError(src, stderrText, language));
      setActivePanel('debug');
    }
  }, [isBusy, results, stderrText, problem, language, code, hasAwarded]);

  if (!problem) return <div className="min-h-screen bg-[#080a10] p-8 text-center text-white">Problem not found</div>;

  const handleRun = async (submit = false) => {
    const src = code;
    if (!src.trim()) {
      toast.error('Please write some code first.');
      return;
    }

    setIsBusy(true);
    setResults([]);
    setStdoutText('');
    setStderrText('');
    setDebugHints(null);
    setStatus('Connecting...');
    setActivePanel('results');

    try {
      const base = wsBase.replace(/\/$/, '');
      const wsUrl = new URL(`${base}/ws/execute`);
      wsUrl.searchParams.set('token', token || '');
      const ws = new WebSocket(wsUrl.toString());

      const connectionTimeout = window.setTimeout(() => {
        if (ws.readyState !== WebSocket.OPEN) {
          ws.close();
          setStatus('Connection Timeout');
          setIsBusy(false);
          toast.error('Execution backend is unreachable right now. Please retry.');
        }
      }, 15000);

      ws.onopen = () => {
        window.clearTimeout(connectionTimeout);
        setStatus('Running...');
        const cases = submit ? problem.testCases : problem.testCases.slice(0, 2);
        ws.send(JSON.stringify({
          action: 'execute',
          code: src,
          language,
          input: '',
          testCases: cases.map((test) => ({ input: test.input, expected: test.expected })),
          files: null,
        }));
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data);
        if (message.type === 'status') {
          setStatus(message.data);
          if (message.data.startsWith('Done') || message.data.includes('Error') || message.data.includes('Timeout') || message.data.startsWith('Exited')) setIsBusy(false);
        }
        if (message.type === 'testResult') setResults((current) => [...current, message.data as TestRunResult]);
        if (message.type === 'output') {
          if (message.data.type === 'stderr' || message.data.type === 'error') setStderrText((current) => current + message.data.data);
          if (message.data.type === 'stdout') setStdoutText((current) => current + message.data.data);
        }
      };

      ws.onclose = (event) => {
        window.clearTimeout(connectionTimeout);
        setIsBusy(false);
        if (event.code === 1008) {
          setStatus('Authentication Error');
          toast.error('Authentication expired. Please log in again.');
        }
      };

      ws.onerror = () => {
        window.clearTimeout(connectionTimeout);
        setStatus('Connection Error');
        setIsBusy(false);
        toast.error('Execution backend is unreachable right now.');
      };
    } catch {
      setStatus('Setup Error');
      setIsBusy(false);
      toast.error('Failed to initialize execution.');
    }
  };

  return (
    <div className="min-h-[100dvh] w-full overflow-x-hidden overflow-y-auto bg-[#080a10] text-white md:h-screen md:w-screen md:overflow-hidden">
      <header className="flex min-h-14 flex-wrap items-center justify-between gap-3 border-b border-white/5 px-3 py-2 md:px-4">
        <div className="flex min-w-0 items-center gap-3">
          <button onClick={() => navigate('/problems')} className="icon-button" title="Back to roadmap">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="min-w-0">
            <div className="flex min-w-0 flex-wrap items-center gap-2">
              <h1 className="truncate text-sm font-bold font-mono text-white">{problem.order}. {problem.title}</h1>
              <span className="rounded-full border px-2 py-0.5 text-[10px] font-mono" style={{ color: DIFFICULTY_COLORS[problem.difficulty], borderColor: `${DIFFICULTY_COLORS[problem.difficulty]}55` }}>{problem.difficulty}</span>
              <span className="rounded-full border px-2 py-0.5 text-[10px] font-mono" style={{ color: RANK_COLORS[problem.rankTier], borderColor: `${RANK_COLORS[problem.rankTier]}55` }}>{problem.rankTier}</span>
            </div>
            <p className="mt-1 hidden text-[10px] font-mono uppercase tracking-[0.2em] text-white/30 md:block">{problem.topic} / {problem.subtopic}</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-end gap-2">
          <LanguageDropdown value={language} onChange={(value) => useStore.getState().setLanguage(value)} />
          <button onClick={() => setLearnOpen(true)} className="tool-button gap-1.5 px-3 text-xs">
            <BookOpen className="h-3.5 w-3.5" /> Learn
          </button>
          <button onClick={() => void handleRun(false)} disabled={isBusy} className="run-button">
            {isBusy ? <RotateCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} RUN
          </button>
          <button onClick={() => void handleRun(true)} disabled={isBusy} className="flex h-9 items-center gap-2 rounded-lg bg-neon-blue px-4 text-xs font-bold text-black shadow-[0_0_15px_rgba(0,240,255,0.3)] transition-all hover:bg-neon-blue/80">
            <Send className="h-3.5 w-3.5" /> SUBMIT
          </button>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col gap-2 p-2 md:h-[calc(100vh-57px)] md:flex-row">
        <aside className="glass-panel flex min-h-[360px] w-full min-w-0 flex-col md:min-h-0 md:w-[28%] md:min-w-[300px]">
          <div className="flex overflow-x-auto border-b border-white/5">
            <button onClick={() => setActiveTab('description')} className={`px-4 py-2 text-xs font-mono transition-colors ${activeTab === 'description' ? 'border-b-2 border-neon-blue text-neon-blue' : 'text-white/40'}`}>Description</button>
            <button onClick={() => setActiveTab('learn')} className={`px-4 py-2 text-xs font-mono transition-colors ${activeTab === 'learn' ? 'border-b-2 border-neon-blue text-neon-blue' : 'text-white/40'}`}>Learning</button>
          </div>
          <div className="custom-scrollbar flex-1 overflow-auto p-5">
            {activeTab === 'description' ? (
              <div className="space-y-5">
                <h2 className="text-2xl font-black font-mono">{problem.title}</h2>
                <div className="flex flex-wrap gap-2">
                  <span className="rounded bg-white/5 px-2 py-1 text-[10px] font-mono text-white/40"><Tag className="mr-1 inline h-3 w-3" />{problem.topic}</span>
                  <span className="rounded bg-white/5 px-2 py-1 text-[10px] font-mono text-white/40"><Clock className="mr-1 inline h-3 w-3" />{problem.timeEstimate}min</span>
                  <span className="rounded bg-white/5 px-2 py-1 text-[10px] font-mono text-white/40"><Trophy className="mr-1 inline h-3 w-3" />{problem.xp} XP</span>
                </div>
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-white/70">{problem.description}</p>
                <section className="rounded-xl border border-neon-blue/15 bg-neon-blue/[0.04] p-4">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-neon-blue">Beginner Explanation</h3>
                  <p className="text-sm leading-relaxed text-white/65">{problem.beginnerExplanation}</p>
                </section>
                <section className="space-y-3">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/30">Examples</h3>
                  {problem.examples.map((example, index) => (
                    <div key={`${example.input}-${index}`} className="rounded-lg border border-white/5 bg-white/5 p-3 text-xs">
                      <div className="mb-2 text-[10px] font-mono text-white/30">Example {index + 1}</div>
                      <div><span className="text-neon-blue">Input:</span> <code className="text-white/80"> {example.input || '(none)'}</code></div>
                      <div className="mt-1"><span className="text-neon-green">Output:</span> <code className="text-white/80"> {example.output}</code></div>
                    </div>
                  ))}
                </section>
                <section>
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-white/30">Constraints</h3>
                  <ul className="list-inside list-disc space-y-1 text-xs text-white/50">
                    {problem.constraints.map((constraint) => <li key={constraint}>{constraint}</li>)}
                  </ul>
                </section>
              </div>
            ) : (
              <div className="space-y-4">
                <InfoBlock title="Intuition" text={problem.intuition} />
                <InfoBlock title="Brute Force" text={problem.bruteForceApproach} />
                <InfoBlock title="Optimized Thinking" text={problem.optimizedApproach} />
                <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                  <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-white/30">Dry Run</h3>
                  <pre className="whitespace-pre-wrap text-xs leading-relaxed text-white/60">{problem.dryRunExample}</pre>
                </div>
              </div>
            )}
          </div>
        </aside>

        <section className="glass-panel flex min-h-[460px] flex-1 flex-col overflow-hidden md:min-h-0">
          <div className="flex h-10 items-center justify-between border-b border-white/5 bg-white/5 px-4 text-[10px] font-mono text-white/30">
            <span>Solution.{language === 'python' ? 'py' : language === 'c' ? 'c' : language === 'java' ? 'java' : 'cpp'}</span>
            <span>{problem.timeComplexity} / {problem.spaceComplexity}</span>
          </div>
          <div className="relative flex-1">
            <Editor
              theme="vs-dark"
              language={monacoLangMap[language]}
              value={code}
              onChange={(value) => setCode(value || '')}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'JetBrains Mono',
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                cursorSmoothCaretAnimation: 'on',
                smoothScrolling: true,
                automaticLayout: true,
              }}
            />
          </div>
        </section>

        <aside className="flex min-h-[520px] w-full min-w-0 flex-col gap-2 md:h-full md:min-h-0 md:w-[30%] md:min-w-[320px] md:overflow-y-auto custom-scrollbar pb-4">
          <AITutor problem={problem} language={language} code={code} />
          <section className="glass-panel grid min-h-[280px] flex-shrink-0 grid-rows-[42px_1fr] overflow-hidden">
            <div className="flex overflow-x-auto border-b border-white/5">
              {(['results', 'stdout', 'debug'] as const).map((panel) => (
                <button key={panel} onClick={() => setActivePanel(panel)} className={`px-4 py-2 text-xs font-mono capitalize transition-colors ${activePanel === panel ? 'border-b-2 border-neon-blue text-neon-blue' : 'text-white/40'}`}>
                  {panel}
                </button>
              ))}
            </div>
            <div className="custom-scrollbar overflow-auto p-4">
              {activePanel === 'results' && <ResultsPanel results={results} isBusy={isBusy} status={status} problemTestCount={problem.testCases.length} complexity={complexity} />}
              {activePanel === 'stdout' && <pre className="min-h-[180px] whitespace-pre-wrap rounded-xl border border-white/5 bg-black/35 p-4 text-xs text-white/75">{stdoutText || results.map((result, index) => `--- Test ${index + 1} ---\n${result.got || '(no output)'}`).join('\n\n') || 'No output yet. Click RUN to execute.'}</pre>}
              {activePanel === 'debug' && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-amber-300"><Bug className="h-4 w-4" /> Debug Assistant</div>
                  {debugHints ? (
                    <div className="rounded-xl border border-amber-500/20 bg-amber-500/10 p-3 text-sm text-amber-100/80">
                      {debugHints.hints.length ? 'A possible issue was detected.' : 'No specific pattern matched yet.'}
                      {debugHints.hints.map((hint) => (
                        <div key={hint.title} className="mt-3 rounded-lg border border-white/10 bg-black/20 p-2 text-xs text-white/65">
                          <div className="font-bold text-amber-200">{hint.title}</div>
                          <div className="mt-1">{hint.explanation}</div>
                          <div className="mt-1 text-neon-blue">{hint.suggestion}</div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-white/35">Run code with errors to see beginner-friendly debugging help.</p>
                  )}
                  {stderrText && <pre className="whitespace-pre-wrap rounded-xl border border-red-500/10 bg-red-500/5 p-3 text-xs text-red-200/80">{stderrText}</pre>}
                </div>
              )}
            </div>
          </section>
        </aside>
      </main>

      <LearnModal problem={learnOpen ? problem : null} onClose={() => setLearnOpen(false)} />

      {/* Success Celebration Overlay */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 100 }}
              className="relative max-w-sm w-full p-8 text-center"
            >
              <div className="absolute inset-0 bg-neon-blue/10 blur-[100px] rounded-full" />
              <div className="relative glass-panel p-10 rounded-[32px] border-neon-blue/30 shadow-[0_0_50px_rgba(0,240,255,0.25)] bg-[#0a0a0f]/80">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring' }}
                  className="mx-auto mb-6 h-20 w-20 rounded-2xl bg-gradient-to-br from-neon-blue to-neon-purple p-0.5"
                >
                  <div className="flex h-full w-full items-center justify-center rounded-2xl bg-[#0a0a0f]">
                    <Trophy className="h-10 w-10 text-neon-blue animate-pulse" />
                  </div>
                </motion.div>
                
                <h2 className="text-3xl font-black tracking-tight text-white font-syncopate mb-2 uppercase italic">Solved!</h2>
                <p className="text-neon-blue font-mono text-[10px] tracking-[0.3em] mb-8 uppercase font-bold opacity-80">Challenge Mastered</p>
                
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between px-5 py-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <span className="text-[10px] font-mono uppercase text-white/30 tracking-widest">XP Awarded</span>
                    <span className="text-neon-green font-black text-xl leading-none">+{problem.xp} XP</span>
                  </div>
                  
                  <div className="mt-6 flex flex-col items-center gap-3">
                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 3.8, ease: 'linear' }}
                        className="h-full bg-gradient-to-r from-neon-blue to-neon-purple shadow-[0_0_15px_#00f0ff]"
                      />
                    </div>
                    <span className="text-[9px] font-mono text-white/30 uppercase tracking-[0.4em] font-bold">Arena Re-entry In Progress</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function InfoBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
      <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-white/30">{title}</h3>
      <p className="text-sm leading-relaxed text-white/60">{text}</p>
    </section>
  );
}

function ResultsPanel({ results, isBusy, status, problemTestCount, complexity }: { results: TestRunResult[]; isBusy: boolean; status: string; problemTestCount: number; complexity: { time: string; space: string } | null }) {
  if (results.length === 0 && !isBusy) return <div className="py-10 text-center text-xs font-mono text-white/20">Click Run or Submit to see results</div>;
  return (
    <div className="space-y-4">
      <AnimatePresence>
        {(results.length > 0 || isBusy) && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-white/10 bg-gradient-to-br from-white/5 to-transparent p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-white/40">Overall Verdict</p>
                <p className={`text-xl font-black ${status.includes('Accepted') ? 'text-neon-green' : status.includes('Error') ? 'text-red-400' : 'text-neon-blue'}`}>
                  {isBusy ? 'TESTING...' : status.includes('Accepted') ? 'ACCEPTED' : results.some((result) => result.verdict === 'FAIL') ? 'WRONG ANSWER' : 'PROCESSED'}
                </p>
              </div>
              <CheckCircle2 className={`h-8 w-8 ${status.includes('Accepted') ? 'text-neon-green' : 'text-white/15'}`} />
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/5">
              <motion.div initial={{ width: 0 }} animate={{ width: `${(results.length / problemTestCount) * 100}%` }} className="h-full bg-neon-blue" />
            </div>
            {complexity && <p className="mt-3 text-[10px] font-mono text-white/35">Detected: {complexity.time} time / {complexity.space} space</p>}
          </motion.div>
        )}
      </AnimatePresence>

      {isBusy && results.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-3 py-8">
          <RotateCw className="h-6 w-6 animate-spin text-neon-blue/40" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-white/20">{status}</span>
        </div>
      )}

      {results.map((result, index) => (
        <div key={index} className={`rounded-xl border ${result.verdict === 'PASS' ? 'border-neon-green/20' : 'border-red-500/20'} bg-white/5`}>
          <div className="flex items-center justify-between border-b border-white/5 px-4 py-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">Test {index + 1}</span>
            <span className={`text-[10px] font-black ${result.verdict === 'PASS' ? 'text-neon-green' : 'text-red-400'}`}>{result.verdict}</span>
          </div>
          <div className="space-y-2 p-4 text-[10px] font-mono">
            <ResultLine label="Input" value={result.input || '(none)'} />
            <ResultLine label="Expected" value={result.expected} />
            <ResultLine label="Actual" value={result.got} />
            <div className="flex items-center gap-1 text-white/35"><Activity className="h-3 w-3" /> {result.time}ms</div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ResultLine({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="mb-1 text-white/20">{label}</div>
      <div className="truncate rounded border border-white/5 bg-black/35 p-2 text-white/65">{value}</div>
    </div>
  );
}
