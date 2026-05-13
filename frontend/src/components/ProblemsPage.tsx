import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useStore } from '../store/useStore';
import {
  ALL_TOPICS,
  DIFFICULTIES,
  DIFFICULTY_COLORS,
  LEARNING_PATHS,
  PROBLEMS,
  RANK_COLORS,
  RANK_TIERS,
  type Difficulty,
  type Problem,
  type RankTier,
  type Topic,
} from '../data/problems';
import TiltCard from './TiltCard';
import {
  ArrowLeft,
  Bell,
  BookOpen,
  Bookmark,
  CheckCircle2,
  Clock,
  Flame,
  Gamepad2,
  GraduationCap,
  Heart,
  Layers,
  RotateCw,
  LineChart,
  Lock,
  Search,
  Shield,
  Sparkles,
  Star,
  Tag,
  Trophy,
  Zap,
} from 'lucide-react';
import CustomSelect from './CustomSelect';
import LearnModal from './LearnModal';
import { loadProgress, requestDailyReminderPermission, summarizeProgress, toggleBookmark, toggleFavorite } from '../utils/progress';

type ViewMode = 'roadmap' | 'revision' | 'interview' | 'contest';

export default function ProblemsPage() {
  const navigate = useNavigate();
  const { language, token } = useStore();
  const [, setProgressVersion] = useState(0);
  const [query, setQuery] = useState('');
  const [diffFilter, setDiffFilter] = useState<Difficulty | 'all'>('all');
  const [topicFilter, setTopicFilter] = useState<Topic | 'all'>('all');
  const [rankFilter, setRankFilter] = useState<RankTier | 'all'>('all');
  const [mode, setMode] = useState<ViewMode>('roadmap');
  const [learnProblem, setLearnProblem] = useState<Problem | null>(null);

  const progress = loadProgress();
  const summary = useMemo(() => summarizeProgress(progress), [progress]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return PROBLEMS.filter((problem, index) => {
      const unlocked = index === 0 || summary.solvedSet.has(PROBLEMS[index - 1].id) || summary.solvedSet.has(problem.id);
      if (mode === 'revision' && !summary.solvedSet.has(problem.id) && !summary.bookmarkedSet.has(problem.id)) return false;
      if (mode === 'interview' && !['Advanced', 'Expert', 'Master'].includes(problem.difficulty)) return false;
      if (mode === 'contest' && !['Intermediate', 'Advanced', 'Expert', 'Master'].includes(problem.difficulty)) return false;
      if (diffFilter !== 'all' && problem.difficulty !== diffFilter) return false;
      if (topicFilter !== 'all' && problem.topic !== topicFilter) return false;
      if (rankFilter !== 'all' && problem.rankTier !== rankFilter) return false;
      if (normalizedQuery && !`${problem.title} ${problem.topic} ${problem.subtopic} ${problem.tags.join(' ')}`.toLowerCase().includes(normalizedQuery)) return false;
      return unlocked || mode !== 'roadmap' || normalizedQuery.length > 0;
    });
  }, [query, diffFilter, topicFilter, rankFilter, mode, summary.solvedSet, summary.bookmarkedSet]);

  const diffOptions = useMemo(() => [{ label: 'All Difficulties', value: 'all' }, ...DIFFICULTIES.map((difficulty) => ({ label: difficulty, value: difficulty }))], []);
  const topicOptions = useMemo(() => [{ label: 'All Topics', value: 'all' }, ...ALL_TOPICS.map((topic) => ({ label: topic, value: topic }))], []);
  const rankOptions = useMemo(() => [{ label: 'All Ranks', value: 'all' }, ...RANK_TIERS.map((rank) => ({ label: rank, value: rank }))], []);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  const refreshProgress = () => setProgressVersion((value) => value + 1);
  const nextProblem = summary.nextProblem;

  return (
    <div className="problems-shell min-h-[100dvh] w-full overflow-x-hidden text-white">
      <div className="lang-orb lang-orb-1" />
      <div className="lang-orb lang-orb-2" />

      <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-white/5 px-4 py-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3 md:gap-4">
          <button onClick={() => navigate('/select')} className="icon-button" title="Back">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <div className="grid h-9 w-9 place-items-center rounded-lg border border-neon-blue/40 bg-neon-blue/10">
            <GraduationCap className="h-5 w-5 text-neon-blue" />
          </div>
          <div>
            <h1 className="text-lg font-black tracking-tighter">
              <span className="font-syncopate text-white">COD</span><span className="font-michroma text-neon-blue">ME</span>
            </h1>
            <p className="hidden text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-white/35 sm:block">{PROBLEMS.length} Problems DSA Roadmap</p>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 sm:w-auto">
          <button
            className="tool-button flex-1 gap-2 px-3 text-xs sm:flex-none"
            onClick={async () => {
              const result = await requestDailyReminderPermission();
              toast.success(result === 'granted' ? 'Daily reminders enabled' : result === 'unsupported' ? 'Notifications are not supported here' : 'Reminder permission was not granted');
              refreshProgress();
            }}
          >
            <Bell className="h-4 w-4" /> Remind
          </button>
          <button className="run-button flex-1 px-4 sm:flex-none" onClick={() => navigate(`/problems/${nextProblem.id}`)}>
            <Zap className="h-4 w-4" /> Next
          </button>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-7xl space-y-5 px-4 py-5 md:px-6 md:py-7">
        <section className="grid gap-4 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,rgba(0,240,255,0.12),rgba(255,255,255,0.04)_45%,rgba(57,255,20,0.07))] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.34)] backdrop-blur-2xl">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-neon-green/25 bg-neon-green/10 px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.24em] text-neon-green">
                  <Sparkles className="h-3.5 w-3.5" /> Guided Academy
                </div>
                <h2 className="max-w-3xl text-3xl font-black tracking-tight md:text-5xl">
                  Solve {PROBLEMS.length} problems from zero to interview-ready.
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/55">
                  You are learning in <span className="text-neon-blue">{language}</span>. CODME unlocks one step at a time, explains every idea simply, and keeps you moving toward the next best problem.
                </p>
              </div>
              <div className="min-w-[170px] rounded-xl border border-white/10 bg-black/25 p-4">
                <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/35">Current Rank</p>
                <div className="mt-2 text-2xl font-black" style={{ color: RANK_COLORS[summary.rank] }}>{summary.rank}</div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div className="h-full rounded-full bg-neon-blue" initial={{ width: 0 }} animate={{ width: `${summary.rankProgress}%` }} />
                </div>
                <p className="mt-2 text-[10px] text-white/35">{summary.nextRank ? `${summary.rankProgress}% to ${summary.nextRank}` : 'Top rank reached'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Metric icon={<Trophy className="h-4 w-4" />} label="XP" value={summary.xp.toLocaleString()} tone="text-neon-blue" />
            <Metric icon={<CheckCircle2 className="h-4 w-4" />} label="Solved" value={`${summary.solvedCount}/${PROBLEMS.length}`} tone="text-neon-green" />
            <Metric icon={<Flame className="h-4 w-4" />} label="Streak" value={`${summary.streak}d`} tone="text-amber-300" />
            <Metric icon={<LineChart className="h-4 w-4" />} label="Today" value={`${summary.todaySolved}/2`} tone="text-neon-purple" />
          </div>
        </section>

        <section className="grid gap-4 lg:grid-cols-[280px_1fr]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
              <h3 className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-white/35">
                <Shield className="h-4 w-4 text-neon-blue" /> Daily Mission
              </h3>
              <div className="relative grid place-items-center py-3">
                <svg className="h-28 w-28 -rotate-90">
                  <circle cx="56" cy="56" r="48" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="10" />
                  <motion.circle cx="56" cy="56" r="48" fill="none" stroke="#39ff14" strokeWidth="10" strokeLinecap="round" strokeDasharray="301.6" initial={{ strokeDashoffset: 301.6 }} animate={{ strokeDashoffset: 301.6 - 301.6 * Math.min(1, summary.todaySolved / summary.dailyGoal) }} />
                </svg>
                <div className="absolute text-center">
                  <div className="text-2xl font-black">{summary.todaySolved}/2</div>
                  <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-white/35">daily</div>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-white/50">Solve 2 problems daily to protect your streak and build muscle memory.</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
              <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-white/35">Topic Mastery</h3>
              <div className="space-y-3">
                {summary.topicMastery.slice(0, 8).map((item) => (
                  <div key={item.topic}>
                    <div className="mb-1 flex justify-between text-[10px] font-mono text-white/45">
                      <span>{item.topic}</span>
                      <span>{item.percent}%</span>
                    </div>
                    <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-neon-blue" style={{ width: `${item.percent}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          <section className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-3 backdrop-blur-xl">
              <div className="grid gap-3 xl:grid-cols-[1fr_auto]">
                  <div className="relative">
                    <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-neon-blue/70" />
                    <input
                      value={query}
                      onChange={(event) => setQuery(event.target.value)}
                      className="ide-input h-11 !pl-12"
                      placeholder="Search problems, topics, patterns..."
                    />
                  </div>
                <div className="grid gap-2 sm:grid-cols-3">
                  <CustomSelect value={diffFilter} onChange={(value) => setDiffFilter(value as Difficulty | 'all')} options={diffOptions} placeholder="Difficulty" icon={<Layers className="h-3.5 w-3.5" />} />
                  <CustomSelect value={topicFilter} onChange={(value) => setTopicFilter(value as Topic | 'all')} options={topicOptions} placeholder="Topic" icon={<Tag className="h-3.5 w-3.5" />} />
                  <CustomSelect value={rankFilter} onChange={(value) => setRankFilter(value as RankTier | 'all')} options={rankOptions} placeholder="Rank" icon={<Star className="h-3.5 w-3.5" />} />
                </div>
              </div>

              <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                {([
                  ['roadmap', BookOpen, 'Roadmap'],
                  ['revision', Heart, 'Revision'],
                  ['interview', Shield, 'Interview Prep'],
                  ['contest', Gamepad2, 'Contest Sim'],
                ] as const).map(([value, Icon, label]) => (
                  <button key={value} onClick={() => setMode(value)} className={`shrink-0 rounded-lg border px-3 py-2 text-xs font-mono transition-all ${mode === value ? 'border-neon-blue/50 bg-neon-blue/10 text-neon-blue' : 'border-white/10 bg-white/5 text-white/45 hover:text-white'}`}>
                    <span className="flex items-center gap-2"><Icon className="h-3.5 w-3.5" /> {label}</span>
                  </button>
                ))}
              </div>
            </div>

            {mode === 'roadmap' && !query && diffFilter === 'all' && topicFilter === 'all' && rankFilter === 'all' ? (
              <div className="space-y-5">
                {LEARNING_PATHS.map((stage) => {
                  const stageProblems = stage.problems.map((id) => PROBLEMS.find((problem) => problem.id === id)).filter(Boolean) as Problem[];
                  if (!stageProblems.length) return null;
                  return (
                    <section key={stage.stage} className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                      <div className="mb-4 flex items-center justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <div className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 font-mono text-xs text-neon-blue">{stage.icon}</div>
                          <div>
                            <h3 className="font-bold text-white">{stage.stage}</h3>
                            <p className="text-xs text-white/35">{stageProblems.length} lessons</p>
                          </div>
                        </div>
                      </div>
                      <ProblemGrid problems={stageProblems} summary={summary} onLearn={setLearnProblem} onRefresh={refreshProgress} />
                    </section>
                  );
                })}
              </div>
            ) : (
              <ProblemGrid problems={filtered} summary={summary} onLearn={setLearnProblem} onRefresh={refreshProgress} />
            )}
          </section>
        </section>
      </main>

      <LearnModal problem={learnProblem} onClose={() => setLearnProblem(null)} onSolve={(problem) => navigate(`/problems/${problem.id}`)} />
    </div>
  );
}

function Metric({ icon, label, value, tone }: { icon: React.ReactNode; label: string; value: string; tone: string }) {
  return (
    <TiltCard>
      <div className="rounded-2xl border border-white/10 bg-white/[0.035] p-4 backdrop-blur-xl">
        <div className={`mb-3 inline-flex rounded-lg border border-white/10 bg-white/5 p-2 ${tone}`}>{icon}</div>
        <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-white/35">{label}</p>
        <p className="mt-1 text-2xl font-black text-white">{value}</p>
      </div>
    </TiltCard>
  );
}

function ProblemGrid({ problems, summary, onLearn, onRefresh }: { problems: Problem[]; summary: ReturnType<typeof summarizeProgress>; onLearn: (problem: Problem) => void; onRefresh: () => void }) {
  const navigate = useNavigate();

  if (!problems.length) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-white/45">
        No problems match this view yet.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 [perspective:2000px] mt-6 p-8 pb-20">
      {problems.map((problem) => {
        const index = PROBLEMS.findIndex((item) => item.id === problem.id);
        const solved = summary.solvedSet.has(problem.id);
        const unlocked = index === 0 || summary.solvedSet.has(PROBLEMS[index - 1].id) || solved;
        const bookmarked = summary.bookmarkedSet.has(problem.id);
        const favorite = summary.favoriteSet.has(problem.id);
        return (
          <TiltCard key={problem.id} className="w-full">
            <motion.article
              layout
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              className={`problem-card group flex h-full flex-col text-left transition-all duration-500 ${!unlocked ? 'opacity-60' : ''} ${solved ? 'border-neon-green/30 bg-neon-green/[0.04] shadow-[0_0_30px_rgba(57,255,20,0.08)]' : ''}`}
            >
              <div className="mb-3 flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <div className={`grid h-8 w-8 shrink-0 place-items-center rounded-lg border transition-all duration-500 ${solved ? 'border-neon-green/60 bg-neon-green text-black scale-110 shadow-[0_0_15px_rgba(57,255,20,0.4)]' : unlocked ? 'border-neon-blue/30 bg-neon-blue/10 text-neon-blue' : 'border-white/10 bg-white/5 text-white/25'}`}>
                    {solved ? <CheckCircle2 className="h-4 w-4 stroke-[3px]" /> : unlocked ? <span className="text-xs font-black">{problem.order}</span> : <Lock className="h-4 w-4" />}
                  </div>
                  <div>
                    <h3 className={`text-sm font-bold transition-colors ${solved ? 'text-neon-green' : 'text-white/90'}`}>{problem.title}</h3>
                    <p className="mt-0.5 text-[10px] font-mono uppercase tracking-[0.18em] text-white/25">{problem.subtopic}</p>
                  </div>
                </div>
                <span className="shrink-0 rounded-full border px-2 py-0.5 text-[10px] font-mono" style={{ color: solved ? '#39ff14' : DIFFICULTY_COLORS[problem.difficulty], borderColor: solved ? 'rgba(57,255,20,0.4)' : `${DIFFICULTY_COLORS[problem.difficulty]}55`, background: solved ? 'rgba(57,255,20,0.1)' : `${DIFFICULTY_COLORS[problem.difficulty]}10` }}>
                  {problem.difficulty}
                </span>
              </div>

              <p className="line-clamp-3 flex-1 text-xs leading-relaxed text-white/45">{problem.beginnerExplanation}</p>

              <div className="my-4 flex flex-wrap gap-1.5">
                <span className={`rounded px-2 py-1 text-[10px] font-mono ${solved ? 'bg-neon-green/10 text-neon-green/60' : 'bg-white/5 text-white/30'}`}>{problem.topic}</span>
                <span className={`rounded px-2 py-1 text-[10px] font-mono ${solved ? 'bg-neon-green/10 text-neon-green/60' : 'bg-white/5 text-white/30'}`}>{problem.rankTier}</span>
                <span className={`rounded px-2 py-1 text-[10px] font-mono ${solved ? 'bg-neon-green/10 text-neon-green/60' : 'bg-white/5 text-white/30'}`}>{problem.rankTier === 'Beginner' ? 'Beginner' : problem.rankTier}</span>
              </div>

              <div className="mb-4 flex items-center justify-between text-[10px] font-mono text-white/30">
                <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {problem.timeEstimate}m</span>
                <span>{problem.timeComplexity}</span>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-auto">
                <button className="tool-button px-3 text-xs" onClick={() => onLearn(problem)}>
                  Learn
                </button>
                <button 
                  className={`px-4 flex-1 min-w-[80px] text-[11px] font-bold rounded-lg h-9 transition-all duration-300 flex items-center justify-center gap-2 ${solved ? 'bg-neon-green text-black shadow-[0_0_20px_rgba(57,255,20,0.3)] hover:scale-105 active:scale-95' : 'run-button'}`} 
                  disabled={!unlocked} 
                  onClick={() => navigate(`/problems/${problem.id}`)}
                >
                  {solved ? (
                    <><RotateCw className="h-3 w-3" /> REVIEW</>
                  ) : (
                    'SOLVE'
                  )}
                </button>
                <button className={`icon-button ${bookmarked ? 'text-neon-blue' : ''}`} onClick={() => { toggleBookmark(problem.id); onRefresh(); }} title="Bookmark">
                  <Bookmark className="h-4 w-4" />
                </button>
                <button className={`icon-button ${favorite ? 'text-red-300' : ''}`} onClick={() => { toggleFavorite(problem.id); onRefresh(); }} title="Favorite">
                  <Heart className="h-4 w-4" />
                </button>
              </div>
            </motion.article>
          </TiltCard>
        );
      })}
    </div>
  );
}
