import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { PROBLEMS, LEARNING_PATHS, DIFFICULTY_COLORS } from '../data/problems';
import type { Difficulty, Topic } from '../data/problems';
import { Code2, ArrowLeft, Filter, Clock, Tag, CheckCircle2, BookOpen, Zap, Layers } from 'lucide-react';
import CustomSelect from './CustomSelect';

const ALL_TOPICS: Topic[] = ['basics','arrays','strings','math','sorting','searching','recursion','dp','stacks','queues','linked-lists','greedy','hashing'];
const DIFFICULTIES: Difficulty[] = ['beginner','easy','medium','hard'];

export default function ProblemsPage() {
  const navigate = useNavigate();
  const { language, token } = useStore();
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState<Topic | 'all'>('all');
  const [view, setView] = useState<'problems' | 'path'>('problems');

  const solved = useMemo(() => {
    try { return new Set(JSON.parse(localStorage.getItem('codme_solved') || '[]')); } catch { return new Set(); }
  }, []);

  const filtered = useMemo(() => {
    return PROBLEMS.filter(p => {
      if (diffFilter !== 'all' && p.difficulty !== diffFilter) return false;
      if (topicFilter !== 'all' && !p.topics.includes(topicFilter)) return false;
      return true;
    });
  }, [diffFilter, topicFilter]);

  const diffOptions = useMemo(() => [
    { label: 'All Difficulties', value: 'all' },
    ...DIFFICULTIES.map(d => ({ label: d.charAt(0).toUpperCase() + d.slice(1), value: d }))
  ], []);

  const topicOptions = useMemo(() => [
    { label: 'All Topics', value: 'all' },
    ...ALL_TOPICS.map(t => ({ label: t.charAt(0).toUpperCase() + t.slice(1).replace('-', ' '), value: t }))
  ], []);

  if (!token) { navigate('/'); return null; }

  return (
    <div className="problems-shell min-h-[100dvh] md:h-screen w-full flex flex-col relative overflow-x-hidden md:overflow-hidden">
      <div className="lang-orb lang-orb-1" />
      <div className="lang-orb lang-orb-2" />

      {/* Header */}
      <header className="flex flex-wrap items-center justify-between gap-3 px-4 md:px-6 py-4 border-b border-white/5 relative z-10 shrink-0">
        <div className="flex items-center gap-3 md:gap-4 min-w-0">
          <button onClick={() => navigate('/select')} className="icon-button"><ArrowLeft className="h-4 w-4" /></button>
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg border border-neon-blue/40 bg-neon-blue/10 grid place-items-center">
              <Code2 className="h-4 w-4 text-neon-blue" />
            </div>
            <span className="text-lg font-black tracking-tighter"><span className="font-syncopate text-white">COD</span><span className="font-michroma text-neon-blue">ME</span></span>
          </div>
          <div className="h-4 w-[1px] bg-white/10 mx-2 hidden md:block" />
          <span className="text-[10px] font-mono text-white/40 uppercase tracking-[0.2em] font-bold hidden md:block">Practice Arena</span>
        </div>
        <div className="flex w-full sm:w-auto items-center gap-2 sm:gap-3 p-1 bg-white/5 rounded-xl border border-white/5 overflow-x-auto">
          <button onClick={() => setView('problems')} className={`flex-1 sm:flex-none justify-center px-3 sm:px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all whitespace-nowrap ${view==='problems'?'bg-white/10 text-white shadow-lg':'text-white/40 hover:text-white'}`}><BookOpen className="h-3.5 w-3.5"/>Problems</button>
          <button onClick={() => setView('path')} className={`flex-1 sm:flex-none justify-center px-3 sm:px-4 py-2 rounded-lg text-xs font-mono flex items-center gap-2 transition-all whitespace-nowrap ${view==='path'?'bg-white/10 text-white shadow-lg':'text-white/40 hover:text-white'}`}><Zap className="h-3.5 w-3.5"/>Learning Path</button>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 md:p-8 relative z-10">
        {view === 'path' ? (
          /* Learning Path View */
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="mb-8">
              <h2 className="text-3xl font-black font-mono tracking-tight text-white mb-2">
                🎯 Guided Learning Path
              </h2>
              <p className="text-white/40 font-mono text-xs uppercase tracking-widest">Mastering <span className="text-neon-blue">{language}</span> step-by-step</p>
            </motion.div>
            
            {LEARNING_PATHS.map((stage, si) => (
              <motion.div key={stage.stage} initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:si*0.1}} className="glass-panel p-6 border-white/10 hover:border-white/20 transition-colors">
                <h3 className="text-lg font-bold font-mono text-white mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-xl shadow-inner">{stage.icon}</span> 
                  <div>
                    <p className="text-[10px] text-white/30 uppercase tracking-[0.2em] leading-none mb-1">Stage {si + 1}</p>
                    {stage.stage}
                  </div>
                </h3>
                <div className="grid gap-2">
                  {stage.problems.map(pid => {
                    const prob = PROBLEMS.find(p => p.id === pid);
                    if (!prob) return null;
                    return (
                      <button key={pid} onClick={() => navigate(`/problems/${pid}`)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/[0.02] hover:bg-white/[0.06] border border-white/5 hover:border-neon-blue/30 transition-all duration-200 text-left group">
                        <div className="flex items-center gap-3">
                          {solved.has(pid) ? <CheckCircle2 className="h-4 w-4 text-neon-green"/> : <div className="h-4 w-4 rounded-full border border-white/20"/>}
                          <span className="text-sm font-mono text-white/70 group-hover:text-white">{prob.title}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border" style={{color:DIFFICULTY_COLORS[prob.difficulty], borderColor:DIFFICULTY_COLORS[prob.difficulty]+'40'}}>{prob.difficulty}</span>
                          <span className="text-[10px] font-mono text-white/30 flex items-center gap-1"><Clock className="h-3 w-3"/>{prob.timeEstimate}m</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Problems Grid View */
          <div className="max-w-6xl mx-auto">
            {/* Filters */}
            <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-8 bg-white/5 p-3 md:p-4 rounded-2xl border border-white/5">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-white/5 rounded-lg border border-white/5">
                <Filter className="h-3.5 w-3.5 text-neon-blue" />
                <span className="text-[10px] font-mono text-white/40 uppercase tracking-widest font-bold">Filters</span>
              </div>
              
              <CustomSelect
                value={diffFilter}
                onChange={(val) => setDiffFilter(val as any)}
                options={diffOptions}
                placeholder="Difficulty"
                icon={<Layers className="h-3.5 w-3.5" />}
              />

              <CustomSelect
                value={topicFilter}
                onChange={(val) => setTopicFilter(val as any)}
                options={topicOptions}
                placeholder="Topic"
                icon={<Tag className="h-3.5 w-3.5" />}
              />

              <div className="h-8 w-[1px] bg-white/10 mx-2 hidden md:block" />
              
              <span className="text-[10px] font-mono text-white/30 md:ml-auto flex w-full md:w-auto items-center justify-between md:justify-start gap-4">
                <span className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-neon-blue"/> {filtered.length} Problems</span>
                <span className="flex items-center gap-1.5"><div className="h-1 w-1 rounded-full bg-neon-green"/> {solved.size} Solved</span>
              </span>
            </div>

            {/* Problem Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filtered.map((prob, i) => (
                <motion.button key={prob.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:i*0.04}}
                  onClick={() => navigate(`/problems/${prob.id}`)}
                  className="problem-card group text-left">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {solved.has(prob.id) ? <CheckCircle2 className="h-4 w-4 text-neon-green shrink-0"/> : <div className="h-4 w-4 rounded-full border border-white/20 shrink-0"/>}
                      <h3 className="text-sm font-bold font-mono text-white/90 group-hover:text-white transition-colors">{prob.title}</h3>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0" style={{color:DIFFICULTY_COLORS[prob.difficulty], borderColor:DIFFICULTY_COLORS[prob.difficulty]+'40', background:DIFFICULTY_COLORS[prob.difficulty]+'10'}}>
                      {prob.difficulty}
                    </span>
                  </div>
                  <p className="text-xs text-white/40 leading-relaxed mb-3 line-clamp-2">{prob.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {prob.topics.slice(0,3).map(t => (
                        <span key={t} className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-white/30 flex items-center gap-1"><Tag className="h-2.5 w-2.5"/>{t}</span>
                      ))}
                    </div>
                    <span className="text-[10px] font-mono text-white/20 flex items-center gap-1"><Clock className="h-3 w-3"/>{prob.timeEstimate}m</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
