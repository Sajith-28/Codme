import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { PROBLEMS, LEARNING_PATHS, DIFFICULTY_COLORS } from '../data/problems';
import type { Difficulty, Topic } from '../data/problems';
import { Code2, ArrowLeft, Filter, Clock, Tag, CheckCircle2, BookOpen, Zap } from 'lucide-react';

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

  if (!token) { navigate('/'); return null; }

  return (
    <div className="problems-shell min-h-screen w-full flex flex-col relative overflow-hidden">
      <div className="lang-orb lang-orb-1" />
      <div className="lang-orb lang-orb-2" />

      {/* Header */}
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/5 relative z-10">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/select')} className="icon-button"><ArrowLeft className="h-4 w-4" /></button>
          <div className="flex items-center gap-2">
            <Code2 className="h-5 w-5 text-neon-blue" />
            <span className="text-lg font-black tracking-tighter"><span className="font-syncopate">COD</span><span className="font-michroma text-neon-blue">ME</span></span>
          </div>
          <span className="text-xs font-mono text-white/30 uppercase tracking-widest hidden md:block">Practice Arena</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={() => setView('problems')} className={`panel-tab ${view==='problems'?'active':''}`}><BookOpen className="h-3.5 w-3.5"/>Problems</button>
          <button onClick={() => setView('path')} className={`panel-tab ${view==='path'?'active':''}`}><Zap className="h-3.5 w-3.5"/>Learning Path</button>
        </div>
      </header>

      <main className="flex-1 overflow-auto custom-scrollbar p-4 md:p-8 relative z-10">
        {view === 'path' ? (
          /* Learning Path View */
          <div className="max-w-3xl mx-auto space-y-6">
            <motion.h2 initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="text-2xl font-black font-mono tracking-tight text-white mb-6">
              🎯 Guided Learning Path — <span className="text-neon-blue capitalize">{language}</span>
            </motion.h2>
            {LEARNING_PATHS.map((stage, si) => (
              <motion.div key={stage.stage} initial={{opacity:0,x:-30}} animate={{opacity:1,x:0}} transition={{delay:si*0.1}} className="glass-panel p-5">
                <h3 className="text-lg font-bold font-mono text-white mb-3 flex items-center gap-2">
                  <span className="text-2xl">{stage.icon}</span> {stage.stage}
                </h3>
                <div className="grid gap-2">
                  {stage.problems.map(pid => {
                    const prob = PROBLEMS.find(p => p.id === pid);
                    if (!prob) return null;
                    return (
                      <button key={pid} onClick={() => navigate(`/problems/${pid}`)}
                        className="flex items-center justify-between px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 hover:border-neon-blue/30 transition-all duration-200 text-left group">
                        <div className="flex items-center gap-3">
                          {solved.has(pid) ? <CheckCircle2 className="h-4 w-4 text-neon-green"/> : <div className="h-4 w-4 rounded-full border border-white/20"/>}
                          <span className="text-sm font-mono text-white/80 group-hover:text-white">{prob.title}</span>
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
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Filter className="h-4 w-4 text-white/40" />
              <select value={diffFilter} onChange={e => setDiffFilter(e.target.value as any)}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-neon-blue/50">
                <option value="all">All Difficulties</option>
                {DIFFICULTIES.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              <select value={topicFilter} onChange={e => setTopicFilter(e.target.value as any)}
                className="bg-black/40 border border-white/10 rounded-lg px-3 py-1.5 text-xs font-mono text-white outline-none focus:border-neon-blue/50">
                <option value="all">All Topics</option>
                {ALL_TOPICS.map(t => <option key={t} value={t}>{t}</option>)}
              </select>
              <span className="text-xs font-mono text-white/30 ml-auto">{filtered.length} problems · {solved.size} solved</span>
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
