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
  'advanced interview patterns',
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

function buildProblem(seed: ProblemSeed, index: number): Problem {
  const example = seed.tests[0];
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
    order: index + 1,
  };
}

export const PROBLEMS: Problem[] = seeds.map(buildProblem);

export const LEARNING_PATHS = RANK_TIERS.map((rankTier) => ({
  stage: `${rankTier} League`,
  icon: rankTier === 'Beginner' ? '01' : rankTier === 'Silver' ? '02' : rankTier === 'Gold' ? '03' : rankTier === 'Platinum' ? '04' : rankTier === 'Diamond' ? '05' : rankTier === 'Master' ? '06' : rankTier === 'Grandmaster' ? '07' : '08',
  problems: PROBLEMS.filter((problem) => problem.rankTier === rankTier).map((problem) => problem.id),
}));

export function getProblemBySlug(slug?: string) {
  return PROBLEMS.find((problem) => problem.slug === slug || problem.id === slug);
}

export function getNextProblem(solvedIds: Set<string>) {
  return PROBLEMS.find((_, index) => index === 0 || solvedIds.has(PROBLEMS[index - 1].id));
}
