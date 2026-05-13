import type { Problem } from '../data/problems';
import type { SupportedLanguage } from '../store/useStore';

export type TutorIntent = 'eli5' | 'hint' | 'intuition' | 'line' | 'better' | 'dry-run' | 'visualize' | 'recursion' | 'think';

const intentLabels: Record<TutorIntent, string> = {
  eli5: 'Explain like I am 5',
  hint: 'Give me a hint',
  intuition: 'Show me intuition',
  line: 'Explain line by line',
  better: 'Why is this better?',
  'dry-run': 'Dry run this input',
  visualize: 'Visualize the solution',
  recursion: 'Explain recursion slowly',
  think: 'How should I think?',
};

export function getTutorPrompt(intent: TutorIntent) {
  return intentLabels[intent];
}

export async function askTutor(problem: Problem, language: SupportedLanguage, message: string, code?: string) {
  const apiUrl = import.meta.env.VITE_AI_TUTOR_API;
  if (apiUrl) {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ problem, language, message, code }),
    });
    if (response.ok) {
      const data = await response.json();
      return data.answer || data.message || buildLocalTutorAnswer(problem, language, message, code);
    }
  }
  return buildLocalTutorAnswer(problem, language, message, code);
}

function buildLocalTutorAnswer(problem: Problem, language: SupportedLanguage, message: string, code?: string) {
  const lower = message.toLowerCase();
  if (lower.includes('hint')) {
    return `Tiny hint first: ${problem.hints[0]}\n\nNext hint: ${problem.hints[1]}\n\nTry writing just the input-reading part in ${language} before solving the whole thing.`;
  }
  if (lower.includes('5') || lower.includes('simple')) {
    return `Imagine the input is a small pile of cards. For "${problem.title}", your job is: ${problem.shortGoal}\n\nDo one card first. Then do the same move for the next card. Keep a tiny notebook variable for the answer. At the end, read the notebook out loud with print.`;
  }
  if (lower.includes('dry')) {
    return `Dry run for the sample:\n${problem.dryRunExample}\n\nA good dry run table has: current input item, important variables, and what changed after this step.`;
  }
  if (lower.includes('recursion')) {
    return `Recursion slowly:\n1. Decide the smallest case that is already solved.\n2. Ask the function to solve a smaller version.\n3. Add your tiny piece of work on top.\n\nFor this problem, the key idea is: ${problem.intuition}`;
  }
  if (lower.includes('better') || lower.includes('optimized')) {
    return `The optimized idea is better because it avoids repeated work.\n\nBrute force: ${problem.bruteForceApproach}\nOptimized: ${problem.optimizedApproach}\n\nThat gives ${problem.timeComplexity} time and ${problem.spaceComplexity} space.`;
  }
  if (lower.includes('line') && code?.trim()) {
    return `Line-by-line reading tip for your ${language} code:\n1. Check input lines first. Are you reading exactly what the problem gives?\n2. Check the variable that stores the answer.\n3. Check the loop or recursion boundary.\n4. Check final printing format.\n\nFor "${problem.title}", the output must match the sample exactly.`;
  }
  if (lower.includes('visual')) {
    return `Visual model:\n[Input] -> [Small repeated decision: ${problem.subtopic}] -> [Answer variable] -> [Print]\n\nFor this problem, draw the sample on paper and mark what changes after each step.`;
  }
  if (lower.includes('think')) {
    return `Thinking path:\n1. What is the smallest input?\n2. What answer should it produce?\n3. What information must I remember while scanning?\n4. Can I skip useless work?\n\nFor this one, focus on: ${problem.learningOutcome}`;
  }
  return `${problem.beginnerExplanation}\n\nIn ${language}, start by reading the input. Then implement this plan:\n${problem.optimizedApproach}\n\nAsk me for a hint, dry run, or simpler explanation if you get stuck.`;
}
