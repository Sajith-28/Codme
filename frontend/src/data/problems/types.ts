import type { SupportedLanguage } from '../store/useStore';

export type Difficulty = 'Basic' | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | 'Master';
export type RankTier = 'Beginner' | 'Silver' | 'Gold' | 'Platinum' | 'Diamond' | 'Master' | 'Grandmaster' | 'Iridescent';
export type Topic =
  | 'input/output'
  | 'variables'
  | 'operators'
  | 'conditionals'
  | 'loops'
  | 'nested loops'
  | 'patterns'
  | 'functions'
  | 'arrays'
  | 'strings'
  | 'matrices'
  | 'sorting'
  | 'searching'
  | 'recursion'
  | 'backtracking'
  | 'hashing'
  | 'stacks'
  | 'queues'
  | 'linked lists'
  | 'trees'
  | 'BST'
  | 'heaps'
  | 'tries'
  | 'graphs'
  | 'greedy'
  | 'dynamic programming'
  | 'bit manipulation'
  | 'sliding window'
  | 'two pointers'
  | 'prefix sum'
  | 'monotonic stack'
  | 'binary search on answer'
  | 'union find'
  | 'shortest path'
  | 'topological sort'
  | 'advanced interview patterns';

export interface TestCase {
  input: string;
  expected: string;
}

export type ProblemSeed = {
  title: string;
  slug: string;
  difficulty: Difficulty;
  rankTier: RankTier;
  topic: Topic;
  subtopic: string;
  shortGoal: string;
  outcome: string;
  time: number;
  prereq: string[];
  tests: TestCase[];
  hiddenTests?: TestCase[];
  complexity: [string, string];
  companies?: string[];
  frequency?: number;
  edgeCases?: string[];
  mistakes?: string[];
};

export interface Problem {
  id: string;
  title: string;
  slug: string;
  difficulty: Difficulty;
  rankTier: RankTier;
  topic: Topic;
  subtopic: string;
  topics: Topic[];
  shortGoal: string;
  learningOutcome: string;
  estimatedSolvingTime: number;
  timeEstimate: number;
  prerequisiteKnowledge: string[];
  hints: string[];
  intuition: string;
  beginnerExplanation: string;
  bruteForceApproach: string;
  optimizedApproach: string;
  edgeCases: string[];
  commonMistakes: string[];
  timeComplexity: string;
  spaceComplexity: string;
  dryRunExample: string;
  testCases: TestCase[];
  hiddenTestCases?: TestCase[];
  tags: string[];
  companyTags: string[];
  interviewFrequency: number;
  aiExplanationMapping?: string;
  visualCompatibility?: boolean;
  revisionPriority: number;
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<SupportedLanguage, string>;
  xp: number;
  order: number;
}
