import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';

interface CustomSelectProps {
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
  placeholder: string;
  icon?: React.ReactNode;
}

export default function CustomSelect({ value, onChange, options, placeholder, icon }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative w-full sm:w-auto" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex w-full sm:w-auto items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-200 min-w-0 sm:min-w-[160px] justify-between
          ${isOpen 
            ? 'border-neon-blue/50 bg-neon-blue/10 shadow-[0_0_20px_rgba(0,240,255,0.15)]' 
            : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20'
          }`}
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-white/40">{icon}</span>}
          <span className="text-sm font-mono text-white/90">
            {selectedOption ? selectedOption.label : placeholder}
          </span>
        </div>
        <ChevronDown className={`h-4 w-4 text-white/30 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute top-full left-0 mt-2 w-full min-w-full sm:min-w-[200px] glass-panel border-white/10 p-1.5 z-[100] shadow-2xl backdrop-blur-2xl"
          >
            <div className="max-h-[300px] overflow-auto custom-scrollbar">
              {options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-left transition-all duration-200 group
                    ${value === option.value 
                      ? 'bg-neon-blue/20 text-white' 
                      : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`}
                >
                  <span className="text-sm font-mono">{option.label}</span>
                  {value === option.value && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                      <Check className="h-3.5 w-3.5 text-neon-blue" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
