import { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Editor } from '@monaco-editor/react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { PROBLEMS, DIFFICULTY_COLORS } from '../data/problems';
import { analyzeError, analyzeComplexity } from '../data/debugPatterns';
import { ArrowLeft, Play, RotateCw, Send, Bug, Clock, Tag, ChevronRight, BrainCircuit, Activity, HardDrive, SplitSquareHorizontal } from 'lucide-react';
import { toast } from 'react-hot-toast';
import LanguageDropdown from './LanguageDropdown';

const wsBase = import.meta.env.VITE_WS_URL || `${window.location.protocol === 'https:' ? 'wss' : 'ws'}://${window.location.host}`;
const monacoLangMap: Record<string, string> = { java: 'java', python: 'python', c: 'c', cpp: 'cpp' };

export default function ProblemSolve() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language, token, code, setCode } = useStore();
  const problem = PROBLEMS.find(p => p.id === id);
  const editorRef = useRef<any>(null);
  const socketRef = useRef<WebSocket | null>(null);

  const [isBusy, setIsBusy] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [stderrText, setStderrText] = useState('');
  const [status, setStatus] = useState('Idle');
  const [activeTab, setActiveTab] = useState<'description' | 'info'>('description');
  const [activePanel, setActivePanel] = useState<'results' | 'debug' | 'stdout'>('results');
  const [debugHints, setDebugHints] = useState<any>(null);
  const [, setShowDebug] = useState(false);

  const complexity = useMemo(() => {
    if (results.length > 0 && !isBusy) {
      return analyzeComplexity(editorRef.current?.getValue() || code, language);
    }
    return null;
  }, [results, isBusy, language, code]);

  useEffect(() => {
    if (problem && !code) {
      // Initialize code if empty (not doing it every time to preserve state if user navigates back and forth)
    }
  }, [problem, code]);

  if (!problem) return <div className="p-8 text-center">Problem not found</div>;

  const handleRun = (submit = false) => {
    if (isBusy) return;
    
    const src = editorRef.current?.getValue() || code;
    setIsBusy(true);
    setResults([]);
    setStderrText('');
    setDebugHints(null);
    setShowDebug(false);
    setStatus('Connecting...');
    setActivePanel('results');

    const url = `${wsBase}/ws/execute?token=${encodeURIComponent(token || '')}`;
    const ws = new WebSocket(url);
    socketRef.current = ws;

    ws.onopen = () => {
      setStatus('Running...');
      const cases = submit ? problem.testCases : problem.testCases.slice(0, 2);
      ws.send(JSON.stringify({
        action: 'execute',
        code: src,
        language,
        input: '',
        testCases: cases.map(tc => ({ input: tc.input, expected: tc.expected })),
        files: null
      }));
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      if (message.type === 'status') {
        setStatus(message.data);
        if (message.data.startsWith('Done') || message.data.includes('Error') || message.data.includes('Timeout') || message.data.startsWith('Exited')) {
          setIsBusy(false);
        }
      } else if (message.type === 'testResult') {
        setResults(prev => [...prev, message.data]);
      } else if (message.type === 'output') {
        if (message.data.type === 'stderr' || message.data.type === 'error') {
          setStderrText(prev => prev + message.data.data);
        }
      }
    };

    ws.onclose = (event) => {
      setIsBusy(false);
      if (event.code === 1008) {
        setStatus('Authentication Error');
      } else if (event.code !== 1000) {
        // Only set error if not closed normally
        if (status === 'Connecting...') setStatus('Connection Error');
      }
    };

    ws.onerror = () => {
      setStatus('Connection Error');
      setIsBusy(false);
    };
  };

  useEffect(() => {
    if (!isBusy && results.length > 0) {
      const allPass = results.length === (problem.testCases.length) && results.every(r => r.verdict === 'PASS');
      if (results.length > 0) {
        setStatus(allPass ? 'Accepted ✓' : 'Results Ready');
      }
      
      if (stderrText.trim()) {
        const src = editorRef.current?.getValue() || code;
        setDebugHints(analyzeError(src, stderrText, language));
        setShowDebug(true);
        setActivePanel('debug');
      }
    }
  }, [isBusy, results, stderrText, problem.testCases.length, language]);

  return (
    <div className="h-screen w-screen overflow-hidden flex flex-col text-white" style={{ background: '#080a10' }}>
      {/* Top bar */}
      <header className="h-14 flex items-center justify-between px-4 border-b border-white/5 shrink-0 relative z-50">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/problems')} className="icon-button"><ArrowLeft className="h-4 w-4" /></button>
          <div className="flex items-center gap-2">
            <h1 className="text-sm font-bold font-mono text-white truncate">{problem.title}</h1>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{ color: DIFFICULTY_COLORS[problem.difficulty], borderColor: DIFFICULTY_COLORS[problem.difficulty] + '40' }}>{problem.difficulty}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <LanguageDropdown
            value={language}
            onChange={(val) => useStore.getState().setLanguage(val)}
          />
          <button onClick={() => setActivePanel('debug')} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-400 text-xs font-mono hover:bg-amber-500/20 transition-all">
            <Bug className="h-3.5 w-3.5" /> Debug
          </button>
          <button onClick={() => handleRun(false)} disabled={isBusy} className="run-button">
            {isBusy ? <RotateCw className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />} RUN
          </button>
          <button onClick={() => handleRun(true)} disabled={isBusy} className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-neon-blue text-black font-bold text-xs hover:bg-neon-blue/80 transition-all shadow-[0_0_15px_rgba(0,240,255,0.3)]">
            <Send className="h-3.5 w-3.5" /> SUBMIT
          </button>
        </div>
      </header>

      <main className="flex-1 min-h-0 flex gap-2 p-2">
        {/* Left: Description */}
        <div className="w-[30%] glass-panel flex flex-col min-w-[300px]">
          <div className="flex border-b border-white/5">
            <button onClick={() => setActiveTab('description')} className={`px-4 py-2 text-xs font-mono transition-colors ${activeTab === 'description' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-white/40'}`}>Description</button>
            <button onClick={() => setActiveTab('info')} className={`px-4 py-2 text-xs font-mono transition-colors ${activeTab === 'info' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-white/40'}`}>Info</button>
          </div>
          <div className="flex-1 overflow-auto p-6 custom-scrollbar">
            {activeTab === 'description' ? (
              <div className="space-y-6">
                <h2 className="text-2xl font-black font-mono">{problem.title}</h2>
                <div className="flex gap-2">
                  {problem.topics.map(t => <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40 flex items-center gap-1"><Tag className="h-3 w-3"/>{t}</span>)}
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40 flex items-center gap-1"><Clock className="h-3 w-3"/>{problem.timeEstimate}min</span>
                </div>
                <p className="text-sm text-white/70 leading-relaxed whitespace-pre-wrap">{problem.description}</p>
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Examples</h4>
                  {problem.examples.map((ex, i) => (
                    <div key={i} className="bg-white/5 rounded-lg p-3 space-y-2 border border-white/5">
                      <div className="text-[10px] font-mono text-white/30">Example {i+1}</div>
                      <div className="text-xs"><span className="text-neon-blue">Input:</span> <code className="text-white/80">{ex.input || '(none)'}</code></div>
                      <div className="text-xs"><span className="text-neon-green">Output:</span> <code className="text-white/80">{ex.output}</code></div>
                    </div>
                  ))}
                </div>
                <div className="space-y-2">
                   <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Constraints</h4>
                   <ul className="list-disc list-inside text-xs text-white/50 space-y-1">
                     <li>Output must be exactly matching with correct punctuation</li>
                     <li>Time limit: 2.0s</li>
                     <li>Memory limit: 256MB</li>
                   </ul>
                </div>
              </div>
            ) : (
              <div className="text-sm text-white/40 font-mono">Statistical info and leaderboard coming soon...</div>
            )}
          </div>
        </div>

        {/* Center: Editor */}
        <div className="flex-1 glass-panel flex flex-col min-w-0">
          <div className="h-10 flex items-center px-4 border-b border-white/5 text-[10px] font-mono text-white/30 bg-white/5">
            Solution.{language === 'python' ? 'py' : language === 'c' ? 'c' : 'cpp'}
          </div>
          <div className="flex-1 relative">
            <Editor
              theme="vs-dark"
              language={monacoLangMap[language]}
              value={code}
              onChange={val => setCode(val || '')}
              onMount={editor => editorRef.current = editor}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                fontFamily: 'JetBrains Mono',
                scrollBeyondLastLine: false,
                padding: { top: 16 },
                cursorSmoothCaretAnimation: 'on',
                smoothScrolling: true,
              }}
            />
          </div>
        </div>

        {/* Right: Results & Debug */}
        <div className="w-[25%] glass-panel flex flex-col min-w-[280px]">
          <div className="flex border-b border-white/5">
            <button onClick={() => setActivePanel('results')} className={`px-4 py-2 text-xs font-mono transition-colors flex items-center gap-2 ${activePanel === 'results' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-white/40'}`}>
              <BrainCircuit className="h-3 w-3"/> Results
            </button>
            <button onClick={() => setActivePanel('debug')} className={`px-4 py-2 text-xs font-mono transition-colors flex items-center gap-2 ${activePanel === 'debug' ? 'text-neon-blue border-b-2 border-neon-blue' : 'text-white/40'}`}>
              <Bug className="h-3 w-3"/> Debug
            </button>
          </div>
          <div className="flex-1 overflow-auto p-4 custom-scrollbar">
            {activePanel === 'results' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Execution Summary</span>
                </div>

                <AnimatePresence>
                  {(results.length > 0 || isBusy) && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }} 
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 mb-6 relative overflow-hidden"
                    >
                      <div className="relative z-10 flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                           <div className="flex flex-col">
                             <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em]">Overall Verdict</span>
                             <span className={`text-xl font-black font-syncopate tracking-tighter ${status.includes('Accepted') ? 'text-neon-green neon-text-green' : status.includes('Error') || status.includes('FAIL') ? 'text-red-400' : 'text-neon-blue'}`}>
                               {isBusy ? 'TESTING...' : status.includes('Accepted') ? 'ACCEPTED' : results.some(r => r.verdict === 'FAIL') ? 'WRONG ANSWER' : 'PROCESSED'}
                             </span>
                           </div>
                           <div className="h-12 w-12 rounded-full border-2 border-white/5 flex items-center justify-center relative">
                             <svg className="h-full w-full -rotate-90">
                               <circle 
                                 cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="2" 
                                 className="text-white/5" 
                               />
                               <motion.circle 
                                 cx="24" cy="24" r="20" fill="transparent" stroke="currentColor" strokeWidth="3" 
                                 strokeDasharray="125.6"
                                 initial={{ strokeDashoffset: 125.6 }}
                                 animate={{ strokeDashoffset: 125.6 - (125.6 * (results.length / problem.testCases.length)) }}
                                 className={results.some(r => r.verdict === 'FAIL') ? 'text-red-400' : 'text-neon-blue'}
                               />
                             </svg>
                             <span className="absolute text-[10px] font-bold font-mono">{Math.round((results.length / problem.testCases.length) * 100)}%</span>
                           </div>
                        </div>
                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                           <motion.div 
                             initial={{ width: 0 }}
                             animate={{ width: `${(results.length / problem.testCases.length) * 100}%` }}
                             className={`h-full ${results.some(r => r.verdict === 'FAIL') ? 'bg-red-400' : 'bg-neon-blue shadow-[0_0_10px_rgba(0,240,255,0.5)]'}`}
                           />
                        </div>
                        <div className="flex justify-between text-[9px] font-mono uppercase tracking-widest text-white/30">
                           <span>{results.filter(r => r.verdict === 'PASS').length} Passed</span>
                           <span>{results.length} / {problem.testCases.length} Tests</span>
                        </div>

                        {complexity && (
                          <div className="pt-3 border-t border-white/5 grid grid-cols-2 gap-4">
                            <div className="flex flex-col gap-1">
                               <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Time Complexity</span>
                               <div className="flex items-center gap-2 text-neon-blue font-mono text-xs">
                                 <Activity className="h-3 w-3" />
                                 {complexity.time}
                               </div>
                            </div>
                            <div className="flex flex-col gap-1">
                               <span className="text-[8px] font-mono text-white/20 uppercase tracking-widest">Space Complexity</span>
                               <div className="flex items-center gap-2 text-neon-purple font-mono text-xs">
                                 <HardDrive className="h-3 w-3" />
                                 {complexity.space}
                               </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="absolute top-0 right-0 -mr-4 -mt-4 h-24 w-24 bg-neon-blue/5 rounded-full blur-3xl" />
                    </motion.div>
                  )}
                </AnimatePresence>
                
                {results.length === 0 && !isBusy && (
                   <div className="text-center py-10 text-white/20 text-xs font-mono">
                     Click Run or Submit to see results
                   </div>
                )}

                {isBusy && results.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-10 gap-3">
                    <RotateCw className="h-6 w-6 animate-spin text-neon-blue/40" />
                    <span className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{status}</span>
                  </div>
                )}

                <div className="space-y-3">
                  <AnimatePresence mode="popLayout">
                    {results.map((res, i) => (
                      <motion.div
                        layout
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ 
                          type: 'spring',
                          stiffness: 300,
                          damping: 25,
                          delay: i * 0.05 
                        }}
                        key={i}
                        className={`bg-white/5 rounded-xl border ${res.verdict === 'PASS' ? 'border-neon-green/20' : 'border-red-500/20'} overflow-hidden shadow-lg`}
                      >
                        <div className="flex items-center justify-between px-4 py-2.5 bg-white/5 border-b border-white/5">
                          <div className="flex items-center gap-2">
                            <div className={`h-1.5 w-1.5 rounded-full ${res.verdict === 'PASS' ? 'bg-neon-green animate-pulse' : 'bg-red-500'}`} />
                            <span className="text-[10px] font-mono text-white/40 font-bold uppercase tracking-widest">Test {i+1}</span>
                          </div>
                          <span className={`text-[10px] font-mono font-black ${res.verdict === 'PASS' ? 'text-neon-green' : 'text-red-400'}`}>{res.verdict}</span>
                        </div>
                        <div className="p-4 space-y-3 font-mono text-[10px]">
                           <div className="space-y-1">
                             <div className="text-white/20 uppercase tracking-tighter text-[9px]">Input</div>
                             <div className="bg-black/40 rounded p-2 text-white/60 truncate border border-white/5">{res.input || '(none)'}</div>
                           </div>
                           <div className="grid grid-cols-2 gap-2">
                             <div className="space-y-1">
                               <div className="text-white/20 uppercase tracking-tighter text-[9px]">Expected</div>
                               <div className="bg-black/40 rounded p-2 text-neon-green/60 truncate border border-neon-green/10">{res.expected}</div>
                             </div>
                             <div className="space-y-1">
                               <div className="text-white/20 uppercase tracking-tighter text-[9px]">Actual</div>
                               <div className={`${res.verdict === 'PASS' ? 'text-neon-green/60' : 'text-red-400/60'} bg-black/40 rounded p-2 truncate border ${res.verdict === 'PASS' ? 'border-neon-green/10' : 'border-red-400/10'}`}>{res.got}</div>
                             </div>
                           </div>
                           <div className="flex items-center justify-between pt-2 border-t border-white/5">
                             <div className="flex items-center gap-1.5">
                               <Clock className="h-3 w-3 text-white/20" />
                               <span className="text-white/40">{res.time}ms</span>
                             </div>
                             {res.verdict === 'FAIL' && (
                               <button 
                                 onClick={() => {
                                   const expected = res.expected;
                                   const actual = res.got;
                                   let diffIdx = -1;
                                   for (let j = 0; j < Math.max(expected.length, actual.length); j++) {
                                     if (expected[j] !== actual[j]) {
                                       diffIdx = j;
                                       break;
                                     }
                                   }
                                   toast((t: { id: string }) => (
                                     <div className="flex flex-col gap-3 font-mono text-xs max-w-md">
                                       <div className="font-bold text-red-400 uppercase tracking-widest">Mismatch Found</div>
                                       <div className="space-y-2 bg-black/50 p-3 rounded-lg border border-white/10">
                                         <div>
                                           <span className="text-neon-green/50">EXP: </span>
                                           <span>{expected.substring(0, diffIdx)}<span className="bg-neon-green/30 text-white underline">{expected[diffIdx]}</span>{expected.substring(diffIdx + 1)}</span>
                                         </div>
                                         <div>
                                           <span className="text-red-400/50">GOT: </span>
                                           <span>{actual.substring(0, diffIdx)}<span className="bg-red-500/30 text-white underline">{actual[diffIdx]}</span>{actual.substring(diffIdx + 1)}</span>
                                         </div>
                                       </div>
                                       <button onClick={() => toast.dismiss(t.id)} className="text-white/40 hover:text-white transition-colors text-[10px] uppercase text-right">Close</button>
                                     </div>
                                   ), { duration: 6000, position: 'bottom-right', style: { background: '#0a0c14', border: '1px solid rgba(255,255,255,0.1)', color: '#fff' } });
                                 }}
                                 className="flex items-center gap-1 px-2 py-1 rounded bg-white/5 hover:bg-white/10 text-white/40 hover:text-white transition-all text-[9px] font-bold uppercase tracking-wider"
                               >
                                 <SplitSquareHorizontal className="h-3 w-3" /> Difference
                               </button>
                             )}
                           </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>

                {stderrText && (
                   <div className="mt-4 p-3 rounded-lg bg-red-500/5 border border-red-500/10">
                     <div className="text-[10px] font-mono text-red-400/60 mb-2 uppercase tracking-widest">Error Log</div>
                     <pre className="text-[10px] font-mono text-red-300/80 whitespace-pre-wrap break-all">{stderrText}</pre>
                   </div>
                )}
              </div>
            )}

            {activePanel === 'debug' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-white/30">Debug Assistant</span>
                </div>
                {debugHints ? (
                   <div className="space-y-4">
                     <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                       <h4 className="text-xs font-bold text-amber-400 flex items-center gap-2 mb-2">
                         <Bug className="h-3.5 w-3.5"/> Potential Issue Found
                       </h4>
                       <p className="text-[11px] text-amber-200/80 leading-relaxed">{debugHints.message}</p>
                     </div>
                     <div className="space-y-2">
                       <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/20">Suggestions</h4>
                       {debugHints.suggestions.map((s: string, i: number) => (
                         <div key={i} className="p-2.5 rounded-lg bg-white/5 border border-white/5 text-[11px] text-white/60 flex items-start gap-2">
                           <ChevronRight className="h-3 w-3 mt-0.5 text-neon-blue shrink-0"/> {s}
                         </div>
                       ))}
                     </div>
                   </div>
                ) : (
                  <div className="text-center py-10 text-white/20 text-xs font-mono">
                    Run code with errors to see debug assistance
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
