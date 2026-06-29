import type { SupportedLanguage } from '../store/useStore';
import { ALL_SEEDS } from './problems/index';
import type { 
  Difficulty, 
  RankTier, 
  Topic, 
  Problem, 
  ProblemSeed, 
  TestCase 
} from './problems/types';

export type { Difficulty, RankTier, Topic, Problem, ProblemSeed, TestCase };

const DIFFICULTY_XP: Record<Difficulty, number> = {
  Basic: 30,
  Beginner: 45,
  Intermediate: 70,
  Advanced: 100,
  Expert: 140,
  Master: 200,
};

export const DIFFICULTY_COLORS: Record<Difficulty, string> = {
  Basic: '#39ff14',
  Beginner: '#00f0ff',
  Intermediate: '#ffcc66',
  Advanced: '#ff7a45',
  Expert: '#ff4c8b',
  Master: '#b026ff',
};

export const RANK_COLORS: Record<RankTier, string> = {
  Beginner: '#39ff14',
  Silver: '#b8c7d9',
  Gold: '#ffcc66',
  Platinum: '#72f7ff',
  Diamond: '#6ea8ff',
  Master: '#b026ff',
  Grandmaster: '#ff4c4c',
  Iridescent: '#ff7ad9',
};

export const ALL_TOPICS: Topic[] = [
  'input/output', 'variables', 'operators', 'conditionals', 'loops', 'nested loops', 'patterns', 'functions',
  'arrays', 'strings', 'matrices', 'sorting', 'searching', 'recursion', 'backtracking', 'hashing',
  'stacks', 'queues', 'linked lists', 'trees', 'BST', 'heaps', 'tries', 'graphs', 'greedy',
  'dynamic programming', 'bit manipulation', 'sliding window', 'two pointers', 'prefix sum',
  'monotonic stack', 'binary search on answer', 'union find', 'shortest path', 'topological sort',
  'advanced interview patterns', 'oop', 'exceptions', 'file handling', 'modules', 'iterators', 'practical',
];

export const DIFFICULTIES: Difficulty[] = ['Basic', 'Beginner', 'Intermediate', 'Advanced', 'Expert', 'Master'];
export const RANK_TIERS: RankTier[] = ['Beginner', 'Silver', 'Gold', 'Platinum', 'Diamond', 'Master', 'Grandmaster', 'Iridescent'];

const seeds: ProblemSeed[] = ALL_SEEDS;

function starterCode(title: string, goal: string): Record<SupportedLanguage, string> {
  return {
    java: `import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        // ${title}: ${goal}\n        // Read input, build the answer, and print exactly what the problem asks.\n    }\n}`,
    python: `# ${title}: ${goal}\n# Read input, build the answer, and print exactly what the problem asks.\n`,
    c: `#include <stdio.h>\n\nint main() {\n    // ${title}: ${goal}\n    // Read input, build the answer, and print exactly what the problem asks.\n    return 0;\n}`,
    cpp: `#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    // ${title}: ${goal}\n    // Read input, build the answer, and print exactly what the problem asks.\n    return 0;\n}`,
  };
}

function inferModule(seed: ProblemSeed): number {
  if (seed.module) return seed.module;
  const t = seed.topic;
  const title = seed.title.toLowerCase();
  const slug = seed.slug.toLowerCase();
  
  if (t === 'input/output' || t === 'variables') return 1;
  if (t === 'operators') {
    if (title.includes('xor') || title.includes('bitwise') || title.includes('set bit')) return 2;
    return 1;
  }
  if (t === 'conditionals') return 3;
  if (t === 'patterns') return 4;
  if (t === 'loops' || t === 'nested loops') {
    if (title.includes('pattern') || title.includes('pyramid') || title.includes('triangle') || title.includes('diamond') || title.includes('hollow') || title.includes('floyd') || title.includes('pascal')) return 4;
    if (title.includes('prime') || title.includes('fibonacci') || title.includes('factorial') || title.includes('palindrome') || title.includes('armstrong') || title.includes('digit') || title.includes('gcd') || title.includes('lcm') || title.includes('perfect number') || title.includes('strong number') || title.includes('root') || title.includes('divisor') || title.includes('reverse digit')) return 5;
    return 4;
  }
  if (t === 'strings') return 6;
  if (t === 'oop') return 11;
  if (t === 'exceptions') return 12;
  if (t === 'file handling') return 13;
  if (t === 'modules') return 14;
  if (t === 'iterators') return 15;
  if (t === 'practical') return 18;
  if (t === 'functions') return 9;
  if (t === 'recursion' || t === 'backtracking') return 10;
  if (t === 'hashing') {
    if (slug === 'two-sum-hash-map' || slug === 'contains-duplicate') return 8;
    return 17;
  }
  if (t === 'arrays' || t === 'matrices') {
    // Check if it's foundational
    if (slug === 'transpose-matrix' || slug === 'matrix-multiplication' || slug === 'reverse-an-array' || slug === 'maximum-subarray-kadane' || slug === 'maximum-in-array' || slug === 'minimum-in-array' || slug === 'second-largest-distinct') {
      return 16;
    }
    return 7; // standard lists & tuples
  }
  
  // Foundational DSA topics: basic implementations
  const foundationalSlugs = [
    'linear-search-finder', 'binary-search-finder', 
    'bubble-sort-lab', 'selection-sort-lab', 'insertion-sort-cards', 
    'merge-sort-splitter', 'quick-sort-pivot',
    'valid-parentheses-stack', 'valid-parentheses-check', 'valid-parentheses',
    'build-a-linked-list', 'reverse-linked-list',
    'two-pointer-pair-sum', 'maximum-sum-window-k',
    'transpose-matrix', 'matrix-row-sum', 'matrix-diagonal-sum'
  ];
  if (foundationalSlugs.includes(slug)) {
    return 16;
  }
  
  if (['sorting', 'searching', 'stacks', 'queues', 'linked lists'].includes(t)) {
    if (slug.includes('implementation') || slug.includes('basics') || slug.includes('reverse-linked-list') || slug.includes('bubble') || slug.includes('selection') || slug.includes('insertion') || slug.includes('linear-search') || slug.includes('binary-search')) {
      return 16;
    }
  }

  // The rest of the intermediate/advanced DSA topics map to Module 17
  return 17;
}

function buildProblem(seed: ProblemSeed, index: number): Problem {
  const example = seed.tests[0];
  const mod = inferModule(seed);
  return {
    id: seed.slug,
    title: seed.title,
    slug: seed.slug,
    difficulty: seed.difficulty,
    rankTier: seed.rankTier,
    topic: seed.topic,
    subtopic: seed.subtopic,
    topics: [seed.topic],
    shortGoal: seed.shortGoal,
    learningOutcome: seed.outcome,
    estimatedSolvingTime: seed.time,
    timeEstimate: seed.time,
    prerequisiteKnowledge: seed.prereq,
    hints: [
      `Start with the input shape: ${example.input ? `try the sample "${example.input.replace(/\n/g, ' | ')}"` : 'there is no input for this one'}.`,
      `Solve the smallest version by hand before coding ${seed.title}.`,
      `Keep one clear variable for the current answer, then update it as you scan or recurse.`,
      ...(seed.mistakes ? [`Avoid this common mistake: ${seed.mistakes[0]}`] : []),
    ],
    intuition: seed.slug === 'print-your-first-message' ? 'Welcome to CODME!' : `${seed.title} is about ${seed.subtopic}. Imagine solving one tiny piece, then repeating that same calm move until the whole input is handled.`,
    beginnerExplanation: `The goal is simple: ${seed.shortGoal} You do not need magic. Read the input, keep track of the important value, and print the final answer exactly. The main lesson is: ${seed.outcome}`,
    bruteForceApproach: `Try every direct possibility first. This is useful because it teaches what the answer means, even if it repeats work.`,
    optimizedApproach: `Use the pattern for ${seed.subtopic}: keep only the state that matters, skip work that cannot change the answer, and update the answer in a predictable order.`,
    edgeCases: seed.edgeCases || ['Empty input', 'Single element', 'Maximum constraints'],
    commonMistakes: seed.mistakes || ['Incorrect loop boundaries', 'Integer overflow', 'Missing base case'],
    timeComplexity: seed.complexity[0],
    spaceComplexity: seed.complexity[1],
    dryRunExample: `Input: ${example.input || '(empty input)'}\nExpected output: ${example.expected}\nWalkthrough: read the sample, apply the ${seed.subtopic} rule step by step, and stop only when the required output is formed.`,
    testCases: seed.tests,
    hiddenTestCases: seed.hiddenTests || [],
    tags: [seed.topic, seed.subtopic, seed.difficulty, seed.rankTier].map(String),
    companyTags: seed.companies || ['General'],
    interviewFrequency: seed.frequency || 5,
    aiExplanationMapping: `explain_${seed.slug}`,
    visualCompatibility: true,
    revisionPriority: 5,
    description: `${seed.shortGoal}\n\nLearning target: ${seed.outcome}`,
    examples: seed.tests.slice(0, 2).map((test, i) => ({
      input: test.input,
      output: test.expected,
      explanation: i === 0 ? `This sample demonstrates ${seed.subtopic} in the most direct way.` : undefined,
    })),
    constraints: [
      'Print output exactly as shown in the examples.',
      'Use standard input and standard output only.',
      'Prefer the optimized approach after the brute-force idea is clear.',
    ],
    starterCode: starterCode(seed.title, seed.shortGoal),
    xp: DIFFICULTY_XP[seed.difficulty],
    order: seed.order || (index + 1),
    module: mod,
  };
}

export const PROBLEMS: Problem[] = seeds.map(buildProblem);

const MODULE_NAMES: Record<number, string> = {
  1: 'Module 1 — Python Basics: Variables, I/O & Data Types',
  2: 'Module 2 — Operators & Expressions',
  3: 'Module 3 — Control Flow (if / elif / else)',
  4: 'Module 4 — Loops & Pattern Printing',
  5: 'Module 5 — Classic Numeric Interview Problems',
  6: 'Module 6 — Strings & Slicing',
  7: 'Module 7 — Lists & Tuples',
  8: 'Module 8 — Sets & Dictionaries',
  9: 'Module 9 — Functions, Scope & Functional Tools',
  10: 'Module 10 — Recursion',
  11: 'Module 11 — Object-Oriented Programming',
  12: 'Module 12 — Exception Handling',
  13: 'Module 13 — File Handling',
  14: 'Module 14 — Modules, Packages & Comprehensions',
  15: 'Module 15 — Iterators, Generators & Decorators',
  16: 'Module 16 — Foundational Data Structures & Algorithms',
  17: 'Module 17 — Company Coding-Round Rapid-Fire Set',
  18: 'Module 18 — Practical Extras',
};

const MODULE_ICONS: Record<number, string> = {
  1: '01', 2: '02', 3: '03', 4: '04', 5: '05', 6: '06',
  7: '07', 8: '08', 9: '09', 10: '10', 11: '11', 12: '12',
  13: '13', 14: '14', 15: '15', 16: '16', 17: '17', 18: '18',
};

export const LEARNING_PATHS = Array.from({ length: 18 }, (_, i) => {
  const modNum = i + 1;
  const moduleProblems = PROBLEMS.filter((p) => p.module === modNum);
  moduleProblems.sort((a, b) => a.order - b.order);
  return {
    stage: MODULE_NAMES[modNum],
    icon: MODULE_ICONS[modNum],
    problems: moduleProblems.map((p) => p.id),
  };
});

export function getProblemBySlug(slug?: string) {
  return PROBLEMS.find((problem) => problem.slug === slug || problem.id === slug);
}

export function getNextProblem(solvedIds: Set<string>) {
  return PROBLEMS.find((_, index) => index === 0 || solvedIds.has(PROBLEMS[index - 1].id));
}
