import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Coffee, TerminalSquare, FileCode2, Braces } from 'lucide-react';
import type { SupportedLanguage } from '../store/useStore';

interface LanguageDropdownProps {
  value: SupportedLanguage;
  onChange: (value: SupportedLanguage) => void;
}

const LANGUAGES: { id: SupportedLanguage; name: string; Icon: any; color: string }[] = [
  { id: 'java', name: 'Java', Icon: Coffee, color: '#f89820' },
  { id: 'python', name: 'Python', Icon: TerminalSquare, color: '#3776ab' },
  { id: 'c', name: 'C', Icon: FileCode2, color: '#00599c' },
  { id: 'cpp', name: 'C++', Icon: Braces, color: '#659ad2' },
];

export default function LanguageDropdown({ value, onChange }: LanguageDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedLang = LANGUAGES.find((l) => l.id === value) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 bg-black/40 text-xs font-mono text-neon-blue hover:border-neon-blue/40 transition-all focus:outline-none focus:border-neon-blue/50 min-w-[100px] justify-between"
      >
        <div className="flex items-center gap-2">
          <selectedLang.Icon className="h-3.5 w-3.5" style={{ color: selectedLang.color }} />
          <span>{selectedLang.name}</span>
        </div>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-full min-w-[140px] z-[100] rounded-xl border border-white/10 bg-[#0f111a] shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-2xl overflow-hidden p-1"
          >
            {LANGUAGES.map((lang) => (
              <button
                key={lang.id}
                onClick={() => {
                  onChange(lang.id);
                  setIsOpen(false);
                }}
                className={`flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-xs font-mono transition-all ${
                  value === lang.id
                    ? 'bg-neon-blue/10 text-neon-blue'
                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                }`}
              >
                <lang.Icon className="h-4 w-4" style={{ color: lang.color }} />
                <span>{lang.name}</span>
                {value === lang.id && (
                  <motion.div
                    layoutId="active-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-neon-blue shadow-[0_0_8px_#00f0ff]"
                  />
                )}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
