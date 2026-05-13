import { AnimatePresence, motion } from 'framer-motion';
import { BookOpen, BrainCircuit, Clock, Lightbulb, Route, X } from 'lucide-react';
import type { Problem } from '../data/problems';
import { DIFFICULTY_COLORS, RANK_COLORS } from '../data/problems';

type LearnModalProps = {
  problem: Problem | null;
  onClose: () => void;
  onSolve?: (problem: Problem) => void;
};

export default function LearnModal({ problem, onClose, onSolve }: LearnModalProps) {
  return (
    <AnimatePresence>
      {problem && (
        <motion.div
          className="fixed inset-0 z-[120] grid place-items-center bg-black/70 p-3 backdrop-blur-xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.section
            role="dialog"
            aria-modal="true"
            className="learn-modal-shell w-full max-w-5xl max-h-[92dvh] overflow-hidden rounded-2xl border border-white/10 bg-[#080a10]/95 shadow-[0_30px_120px_rgba(0,0,0,0.65)]"
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.96 }}
            transition={{ duration: 0.24, ease: 'easeOut' }}
          >
            <header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-5">
              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="rounded-full border px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: DIFFICULTY_COLORS[problem.difficulty], borderColor: `${DIFFICULTY_COLORS[problem.difficulty]}66`, background: `${DIFFICULTY_COLORS[problem.difficulty]}12` }}>
                    {problem.difficulty}
                  </span>
                  <span className="rounded-full border px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-[0.2em]" style={{ color: RANK_COLORS[problem.rankTier], borderColor: `${RANK_COLORS[problem.rankTier]}66`, background: `${RANK_COLORS[problem.rankTier]}12` }}>
                    {problem.rankTier}
                  </span>
                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/45">
                    {problem.topic}
                  </span>
                </div>
                <h2 className="text-2xl font-black tracking-tight text-white md:text-4xl">{problem.order}. {problem.title}</h2>
                <p className="mt-2 max-w-3xl text-sm leading-relaxed text-white/55">{problem.shortGoal}</p>
              </div>
              <button className="icon-button" onClick={onClose} title="Close lesson">
                <X className="h-4 w-4" />
              </button>
            </header>

            <div className="custom-scrollbar max-h-[calc(92dvh-132px)] overflow-y-auto p-5">
              <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
                <article className="space-y-4">
                  <LessonBlock icon={<BookOpen className="h-4 w-4" />} title="Concept">
                    {problem.beginnerExplanation}
                  </LessonBlock>
                  <LessonBlock icon={<Lightbulb className="h-4 w-4" />} title="Real-Life Analogy">
                    Think of this like sorting school notebooks, checking each box in a checklist, or walking step by step on a path. You only need to remember the small piece that helps the next move.
                  </LessonBlock>
                  <LessonBlock icon={<BrainCircuit className="h-4 w-4" />} title="Intuition">
                    {problem.intuition}
                  </LessonBlock>
                  <LessonBlock icon={<Route className="h-4 w-4" />} title="Step-by-Step Logic">
                    {problem.optimizedApproach}
                  </LessonBlock>
                  <LessonBlock icon={<Clock className="h-4 w-4" />} title="Complexity">
                    Time: {problem.timeComplexity}. Space: {problem.spaceComplexity}.
                  </LessonBlock>
                </article>

                <aside className="space-y-4">
                  <div className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-neon-blue">Hints Before Solution</h3>
                    <ol className="space-y-2 text-sm text-white/60">
                      {problem.hints.map((hint) => <li key={hint}>{hint}</li>)}
                    </ol>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-black/25 p-4">
                    <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.24em] text-neon-green">Dry Run</h3>
                    <pre className="whitespace-pre-wrap text-xs leading-relaxed text-white/65">{problem.dryRunExample}</pre>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                    <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
                      <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-white/35">Brute Force</h3>
                      <p className="text-sm text-white/55">{problem.bruteForceApproach}</p>
                    </div>
                    <div className="rounded-xl border border-neon-blue/20 bg-neon-blue/[0.04] p-4">
                      <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-neon-blue">Optimized</h3>
                      <p className="text-sm text-white/65">{problem.optimizedApproach}</p>
                    </div>
                  </div>
                  <div className="rounded-xl border border-amber-400/15 bg-amber-400/[0.04] p-4">
                    <h3 className="mb-2 text-xs font-bold uppercase tracking-[0.24em] text-amber-300">Common Mistakes</h3>
                    <p className="text-sm text-white/58">Off-by-one loops, printing extra spaces, reading the wrong input line, or optimizing before the basic idea is clear.</p>
                  </div>
                </aside>
              </div>

              <div className="mt-5 flex flex-wrap justify-end gap-3 border-t border-white/10 pt-4">
                <button className="tool-button px-4" onClick={onClose}>Keep Reading</button>
                {onSolve && (
                  <button className="run-button px-5" onClick={() => onSolve(problem)}>Solve Now</button>
                )}
              </div>
            </div>
          </motion.section>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LessonBlock({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-white/10 bg-white/[0.035] p-4">
      <h3 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-white/38">
        <span className="text-neon-blue">{icon}</span>
        {title}
      </h3>
      <p className="text-sm leading-relaxed text-white/62">{children}</p>
    </section>
  );
}
