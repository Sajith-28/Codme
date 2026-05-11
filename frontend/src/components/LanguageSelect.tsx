import { motion } from 'framer-motion';
import type { Variants } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../store/useStore';
import type { SupportedLanguage } from '../store/useStore';
import { ArrowLeft, ArrowRight, BookOpen, Braces, Code2, Coffee, FileCode2, LogOut, TerminalSquare } from 'lucide-react';

const LANGUAGES: { id: SupportedLanguage; name: string; Icon: typeof Code2; color: string; glow: string; desc: string }[] = [
  { id: 'java', name: 'Java', Icon: Coffee, color: '#f89820', glow: 'rgba(248,152,32,0.4)', desc: 'Enterprise-grade OOP language. Perfect for DSA and system design.' },
  { id: 'python', name: 'Python', Icon: TerminalSquare, color: '#3776ab', glow: 'rgba(55,118,171,0.4)', desc: 'Elegant and readable. Great for quick prototyping and algorithms.' },
  { id: 'c', name: 'C', Icon: FileCode2, color: '#00599c', glow: 'rgba(0,89,156,0.4)', desc: 'Low-level power. Understand memory and build blazing-fast programs.' },
  { id: 'cpp', name: 'C++', Icon: Braces, color: '#659ad2', glow: 'rgba(101,154,210,0.4)', desc: 'Performance meets flexibility. The go-to for competitive programming.' },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 60, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { delay: 0.15 + i * 0.12, duration: 0.6, ease: 'easeOut' as const },
  }),
};

export default function LanguageSelect() {
  const navigate = useNavigate();
  const { setLanguage, token, setToken } = useStore();

  const handleSelect = (lang: SupportedLanguage) => {
    setLanguage(lang);
    navigate('/ide');
  };

  if (!token) {
    navigate('/');
    return null;
  }

  return (
    <div className="lang-select-shell min-h-screen w-full flex flex-col items-center justify-center p-4 md:p-8 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:56px_56px] opacity-40" />

      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-lg border border-white/10 bg-white/5 text-white/50 hover:text-white hover:border-white/20 transition-all font-mono text-xs uppercase tracking-widest"
      >
        <ArrowLeft className="h-4 w-4" /> Back
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="flex flex-col items-center mb-8 md:mb-10 relative z-10"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="h-10 w-10 rounded-xl border border-neon-blue/40 bg-neon-blue/10 grid place-items-center shadow-[0_0_24px_rgba(0,240,255,0.25)]">
            <Code2 className="h-6 w-6 text-neon-blue" />
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter">
            <span className="font-syncopate text-white">COD</span>
            <span className="font-michroma text-neon-blue neon-text-blue">ME</span>
          </h1>
        </div>
        <p className="text-white/50 text-sm md:text-base font-mono tracking-wider uppercase">
          Select Your Language
        </p>
      </motion.div>

      <div className="w-full max-w-5xl relative z-10 space-y-5">
        <motion.button
          initial={{ opacity: 0, y: 28, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.55, ease: 'easeOut' }}
          whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.22 } }}
          whileTap={{ scale: 0.985 }}
          onClick={() => navigate('/problems')}
          className="group relative w-full overflow-hidden rounded-[20px] border border-neon-blue/25 bg-[linear-gradient(135deg,rgba(0,240,255,0.14),rgba(255,255,255,0.055)_46%,rgba(57,255,20,0.08))] p-5 md:p-6 text-left shadow-[0_22px_70px_rgba(0,0,0,0.42),0_0_42px_rgba(0,240,255,0.10)] backdrop-blur-2xl transition-all duration-300 hover:border-neon-blue/60 hover:shadow-[0_26px_90px_rgba(0,0,0,0.48),0_0_54px_rgba(0,240,255,0.24)]"
        >
          <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-[radial-gradient(circle_at_18%_20%,rgba(0,240,255,0.22),transparent_28%),radial-gradient(circle_at_82%_70%,rgba(57,255,20,0.14),transparent_30%)]" />
          <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-2xl border border-neon-blue/35 bg-neon-blue/10 grid place-items-center text-neon-blue shadow-[0_0_34px_rgba(0,240,255,0.24)] transition-transform duration-300 group-hover:scale-110">
                <BookOpen className="h-8 w-8" />
              </div>
              <div>
                <div className="mb-2 inline-flex items-center rounded-full border border-neon-green/25 bg-neon-green/10 px-3 py-1 text-[10px] font-mono font-bold tracking-[0.22em] text-neon-green">
                  PRACTICE
                </div>
                <h2 className="text-2xl md:text-4xl font-black tracking-tight text-white font-mono">Practice Problems</h2>
                <p className="mt-2 max-w-2xl text-sm text-white/48 leading-relaxed">
                  Solve curated CODME problems, run tests, submit answers, and move through beginner to pro tracks.
                </p>
              </div>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:border-neon-blue/40 group-hover:text-neon-blue">
              <ArrowRight className="h-5 w-5" />
            </div>
          </div>
        </motion.button>

        <div className="flex items-center gap-3 pt-3">
          <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/12 to-white/5" />
          <span className="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-[10px] font-mono font-bold tracking-[0.28em] text-white/45">
            COMPILER
          </span>
          <span className="h-px flex-1 bg-gradient-to-r from-white/5 via-white/12 to-transparent" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6 w-full">
          {LANGUAGES.map((lang, i) => (
            <motion.button
              key={lang.id}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover={{ y: -10, scale: 1.04, filter: 'blur(0px)', transition: { duration: 0.25 } }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleSelect(lang.id)}
              className="lang-card group"
              style={{ '--lang-color': lang.color, '--lang-glow': lang.glow } as React.CSSProperties}
            >
              <div className="lang-card-glow" />

              <div
                className="h-16 w-16 mb-4 rounded-2xl border border-white/10 bg-white/5 grid place-items-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6"
                style={{ color: lang.color, boxShadow: `0 0 28px ${lang.glow}` }}
              >
                <lang.Icon className="h-9 w-9" />
              </div>

              <h2 className="text-xl md:text-2xl font-black tracking-tight text-white mb-2 font-mono">
                {lang.name}
              </h2>

              <p className="text-white/40 text-xs md:text-sm leading-relaxed text-center px-2 group-hover:text-white/60 transition-colors duration-300">
                {lang.desc}
              </p>

              <div
                className="absolute bottom-0 left-0 right-0 h-[3px] rounded-b-xl opacity-0 group-hover:opacity-100 transition-opacity duration-400"
                style={{ background: `linear-gradient(90deg, transparent, ${lang.color}, transparent)` }}
              />
            </motion.button>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="flex items-center gap-4 mt-8 relative z-10"
      >
        <button
          onClick={() => { setToken(null); navigate('/'); }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-white/10 bg-white/5 text-white/40 hover:text-red-300 hover:border-red-400/40 transition-all duration-300 text-sm font-mono"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </motion.div>
    </div>
  );
}
