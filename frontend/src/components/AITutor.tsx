import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bot, Send, Sparkles } from 'lucide-react';
import type { Problem } from '../data/problems';
import type { SupportedLanguage } from '../store/useStore';
import { askTutor, getTutorPrompt, type TutorIntent } from '../services/aiTutor';

type Message = {
  role: 'student' | 'tutor';
  text: string;
};

const quickPrompts: TutorIntent[] = ['eli5', 'hint', 'intuition', 'dry-run', 'visualize', 'recursion', 'better', 'think'];

export default function AITutor({ problem, language, code }: { problem: Problem; language: SupportedLanguage; code?: string }) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'tutor', text: `I am your CODME tutor for "${problem.title}". Ask for a hint, dry run, intuition, or a child-simple explanation.` },
  ]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || busy) return;
    setDraft('');
    setBusy(true);
    setMessages((current) => [...current, { role: 'student', text: trimmed }]);
    try {
      const answer = await askTutor(problem, language, trimmed, code);
      setMessages((current) => [...current, { role: 'tutor', text: answer }]);
    } finally {
      setBusy(false);
    }
  };

  return (
    <section className="glass-panel flex min-h-[360px] flex-col overflow-hidden border-white/10">
      <header className="flex items-center justify-between border-b border-white/10 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg border border-neon-blue/30 bg-neon-blue/10 text-neon-blue">
            <Bot className="h-4 w-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white">AI Tutor</h3>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/30">context aware mentor</p>
          </div>
        </div>
        <Sparkles className="h-4 w-4 text-neon-green" />
      </header>

      <div className="custom-scrollbar flex-1 space-y-3 overflow-auto p-4">
        {messages.map((message, index) => (
          <motion.div
            key={`${message.role}-${index}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={`rounded-xl border p-3 text-sm leading-relaxed ${message.role === 'tutor' ? 'border-neon-blue/15 bg-neon-blue/[0.045] text-white/70' : 'ml-6 border-white/10 bg-white/[0.055] text-white/85'}`}
          >
            <pre className="whitespace-pre-wrap font-sans">{message.text}</pre>
          </motion.div>
        ))}
        {busy && <div className="text-xs font-mono uppercase tracking-[0.2em] text-white/30">Tutor is thinking...</div>}
      </div>

      <div className="border-t border-white/10 p-3">
        <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
          {quickPrompts.map((intent) => (
            <button key={intent} className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] font-mono text-white/50 transition-colors hover:border-neon-blue/35 hover:text-neon-blue" onClick={() => send(getTutorPrompt(intent))}>
              {getTutorPrompt(intent)}
            </button>
          ))}
        </div>
        <form
          className="flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void send(draft);
          }}
        >
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
            placeholder="Ask anything about this problem..."
            className="ide-input h-10 flex-1"
          />
          <button className="icon-button h-10 w-10" type="submit" disabled={busy} title="Send">
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </section>
  );
}
