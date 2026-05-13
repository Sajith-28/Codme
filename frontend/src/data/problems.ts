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
  timeComplexity: string;
  spaceComplexity: string;
  dryRunExample: string;
  testCases: TestCase[];
  tags: string[];
  description: string;
  examples: { input: string; output: string; explanation?: string }[];
  constraints: string[];
  starterCode: Record<SupportedLanguage, string>;
  xp: number;
  order: number;
}

type ProblemSeed = {
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
  complexity: [string, string];
};

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

const seeds: ProblemSeed[] = [
  { title: 'Print Your First Message', slug: 'print-your-first-message', difficulty: 'Basic', rankTier: 'Beginner', topic: 'input/output', subtopic: 'standard output', shortGoal: 'Print a fixed greeting exactly.', outcome: 'Understand how programs show output.', time: 3, prereq: ['Open the editor', 'Run code'], tests: [{ input: '', expected: 'Hello, CODME!' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Read and Echo a Name', slug: 'read-and-echo-a-name', difficulty: 'Basic', rankTier: 'Beginner', topic: 'input/output', subtopic: 'standard input', shortGoal: 'Read one word and print it back.', outcome: 'Learn how input flows into a program.', time: 4, prereq: ['Printing text'], tests: [{ input: 'Asha', expected: 'Asha' }, { input: 'Dev', expected: 'Dev' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Add Two Numbers', slug: 'add-two-numbers', difficulty: 'Basic', rankTier: 'Beginner', topic: 'variables', subtopic: 'integer variables', shortGoal: 'Store two numbers and print their sum.', outcome: 'Use variables as labeled boxes for values.', time: 5, prereq: ['Input', 'Output'], tests: [{ input: '3 5', expected: '8' }, { input: '-4 9', expected: '5' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Swap Two Values', slug: 'swap-two-values', difficulty: 'Basic', rankTier: 'Beginner', topic: 'variables', subtopic: 'temporary variable', shortGoal: 'Swap and print two values.', outcome: 'Understand temporary storage.', time: 6, prereq: ['Variables'], tests: [{ input: '7 2', expected: '2 7' }, { input: '10 10', expected: '10 10' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Calculate Rectangle Area', slug: 'calculate-rectangle-area', difficulty: 'Basic', rankTier: 'Beginner', topic: 'operators', subtopic: 'arithmetic', shortGoal: 'Multiply length and width.', outcome: 'Use arithmetic operators in code.', time: 5, prereq: ['Variables'], tests: [{ input: '4 6', expected: '24' }, { input: '9 3', expected: '27' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Remainder Finder', slug: 'remainder-finder', difficulty: 'Basic', rankTier: 'Beginner', topic: 'operators', subtopic: 'modulo', shortGoal: 'Print the remainder after division.', outcome: 'Use modulo for divisibility logic.', time: 5, prereq: ['Division'], tests: [{ input: '17 5', expected: '2' }, { input: '20 4', expected: '0' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Even or Odd Gate', slug: 'even-or-odd-gate', difficulty: 'Basic', rankTier: 'Beginner', topic: 'conditionals', subtopic: 'if else', shortGoal: 'Classify a number as Even or Odd.', outcome: 'Make decisions with if and else.', time: 6, prereq: ['Modulo'], tests: [{ input: '8', expected: 'Even' }, { input: '13', expected: 'Odd' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Largest of Three', slug: 'largest-of-three', difficulty: 'Basic', rankTier: 'Beginner', topic: 'conditionals', subtopic: 'comparisons', shortGoal: 'Find the biggest of three values.', outcome: 'Compare multiple possibilities safely.', time: 7, prereq: ['If else'], tests: [{ input: '4 9 2', expected: '9' }, { input: '-5 -1 -3', expected: '-1' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Leap Year Switch', slug: 'leap-year-switch', difficulty: 'Basic', rankTier: 'Beginner', topic: 'conditionals', subtopic: 'compound conditions', shortGoal: 'Detect whether a year is leap.', outcome: 'Combine conditions using AND/OR.', time: 8, prereq: ['Modulo', 'Boolean logic'], tests: [{ input: '2000', expected: 'Leap' }, { input: '1900', expected: 'Not Leap' }, { input: '2024', expected: 'Leap' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Count From One to N', slug: 'count-from-one-to-n', difficulty: 'Basic', rankTier: 'Beginner', topic: 'loops', subtopic: 'for loop', shortGoal: 'Print numbers from 1 to n.', outcome: 'Use loops for repeated work.', time: 7, prereq: ['Output'], tests: [{ input: '5', expected: '1 2 3 4 5' }, { input: '1', expected: '1' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Sum First N Numbers', slug: 'sum-first-n-numbers', difficulty: 'Basic', rankTier: 'Beginner', topic: 'loops', subtopic: 'accumulator', shortGoal: 'Add numbers from 1 to n.', outcome: 'Build an answer step by step.', time: 8, prereq: ['For loop'], tests: [{ input: '5', expected: '15' }, { input: '100', expected: '5050' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Multiplication Table Trainer', slug: 'multiplication-table-trainer', difficulty: 'Basic', rankTier: 'Beginner', topic: 'loops', subtopic: 'repeated multiplication', shortGoal: 'Print first ten multiples of n.', outcome: 'Practice loop counters and formatting.', time: 8, prereq: ['For loop'], tests: [{ input: '2', expected: '2 4 6 8 10 12 14 16 18 20' }, { input: '5', expected: '5 10 15 20 25 30 35 40 45 50' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Factorial Builder', slug: 'factorial-builder', difficulty: 'Basic', rankTier: 'Beginner', topic: 'loops', subtopic: 'product accumulator', shortGoal: 'Compute n factorial with a loop.', outcome: 'Understand repeated multiplication.', time: 10, prereq: ['Loops'], tests: [{ input: '5', expected: '120' }, { input: '0', expected: '1' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Prime Number Detective', slug: 'prime-number-detective', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'divisor checking', shortGoal: 'Decide if a number is prime.', outcome: 'Reduce unnecessary checks.', time: 12, prereq: ['Loops', 'Modulo'], tests: [{ input: '7', expected: 'Prime' }, { input: '1', expected: 'Not Prime' }, { input: '21', expected: 'Not Prime' }], complexity: ['O(sqrt n)', 'O(1)'] },
  { title: 'Reverse Digits', slug: 'reverse-digits', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'digit extraction', shortGoal: 'Reverse an integer digit by digit.', outcome: 'Use modulo and division together.', time: 12, prereq: ['While loop'], tests: [{ input: '1234', expected: '4321' }, { input: '900', expected: '9' }], complexity: ['O(d)', 'O(1)'] },
  { title: 'Digit Sum Machine', slug: 'digit-sum-machine', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'digit processing', shortGoal: 'Add all digits of a number.', outcome: 'Break a number into smaller pieces.', time: 10, prereq: ['Modulo'], tests: [{ input: '12345', expected: '15' }, { input: '0', expected: '0' }], complexity: ['O(d)', 'O(1)'] },
  { title: 'Nested Loop Grid', slug: 'nested-loop-grid', difficulty: 'Beginner', rankTier: 'Silver', topic: 'nested loops', subtopic: '2D repetition', shortGoal: 'Print an n by m block of stars.', outcome: 'Think in rows and columns.', time: 10, prereq: ['Loops'], tests: [{ input: '2 3', expected: '***\n***' }, { input: '1 4', expected: '****' }], complexity: ['O(nm)', 'O(1)'] },
  { title: 'Right Triangle Pattern', slug: 'right-triangle-pattern', difficulty: 'Beginner', rankTier: 'Silver', topic: 'patterns', subtopic: 'increasing rows', shortGoal: 'Print a staircase of stars.', outcome: 'Connect loop limits to shapes.', time: 12, prereq: ['Nested loops'], tests: [{ input: '4', expected: '*\n**\n***\n****' }], complexity: ['O(n^2)', 'O(1)'] },
  { title: 'Number Pyramid', slug: 'number-pyramid', difficulty: 'Beginner', rankTier: 'Silver', topic: 'patterns', subtopic: 'center alignment', shortGoal: 'Print a centered number pyramid.', outcome: 'Control spaces and values together.', time: 15, prereq: ['Nested loops'], tests: [{ input: '3', expected: '  1\n 1 2\n1 2 3' }], complexity: ['O(n^2)', 'O(1)'] },
  { title: 'Function Calculator', slug: 'function-calculator', difficulty: 'Beginner', rankTier: 'Silver', topic: 'functions', subtopic: 'reusable logic', shortGoal: 'Write a function that returns a square.', outcome: 'Separate logic into reusable blocks.', time: 10, prereq: ['Variables'], tests: [{ input: '6', expected: '36' }, { input: '-4', expected: '16' }], complexity: ['O(1)', 'O(1)'] },
  { title: 'Array Sum Sprint', slug: 'array-sum-sprint', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'traversal', shortGoal: 'Read an array and print its sum.', outcome: 'Traverse a list once.', time: 10, prereq: ['Loops'], tests: [{ input: '5\n1 2 3 4 5', expected: '15' }, { input: '3\n-1 5 2', expected: '6' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Maximum in Array', slug: 'maximum-in-array', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'tracking best', shortGoal: 'Find the largest element.', outcome: 'Update a best-so-far answer.', time: 10, prereq: ['Array traversal'], tests: [{ input: '5\n3 9 2 8 1', expected: '9' }, { input: '3\n-7 -2 -9', expected: '-2' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Minimum in Array', slug: 'minimum-in-array', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'tracking best', shortGoal: 'Find the smallest element.', outcome: 'Mirror max logic for minimum.', time: 10, prereq: ['Array traversal'], tests: [{ input: '5\n3 9 2 8 1', expected: '1' }, { input: '3\n-7 -2 -9', expected: '-9' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Second Largest Distinct', slug: 'second-largest-distinct', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'two trackers', shortGoal: 'Find the second largest distinct number.', outcome: 'Maintain two best candidates.', time: 14, prereq: ['Maximum in array'], tests: [{ input: '5\n10 20 4 45 99', expected: '45' }, { input: '3\n7 7 7', expected: '-1' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Reverse an Array', slug: 'reverse-an-array', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'in-place swaps', shortGoal: 'Print an array in reverse order.', outcome: 'Use two ends of a list.', time: 10, prereq: ['Array indexes'], tests: [{ input: '4\n1 2 3 4', expected: '4 3 2 1' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Rotate Array Once', slug: 'rotate-array-once', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'right rotation', shortGoal: 'Move the last item to the front.', outcome: 'Understand array shifting.', time: 12, prereq: ['Arrays'], tests: [{ input: '5\n1 2 3 4 5', expected: '5 1 2 3 4' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Remove Duplicates Sorted', slug: 'remove-duplicates-sorted', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'arrays', subtopic: 'write pointer', shortGoal: 'Print unique elements from a sorted array.', outcome: 'Use one pointer to write answers.', time: 14, prereq: ['Sorted arrays'], tests: [{ input: '7\n1 1 2 2 3 4 4', expected: '1 2 3 4' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Move Zeroes to End', slug: 'move-zeroes-to-end', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'arrays', subtopic: 'stable partition', shortGoal: 'Keep non-zero order and push zeroes right.', outcome: 'Use a write pointer without extra arrays.', time: 15, prereq: ['Array traversal'], tests: [{ input: '5\n0 1 0 3 12', expected: '1 3 12 0 0' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Merge Two Sorted Arrays', slug: 'merge-two-sorted-arrays', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'arrays', subtopic: 'merge process', shortGoal: 'Merge two sorted lists.', outcome: 'Compare front elements like zipper teeth.', time: 18, prereq: ['Sorted arrays'], tests: [{ input: '3 3\n1 3 5\n2 4 6', expected: '1 2 3 4 5 6' }], complexity: ['O(n+m)', 'O(n+m)'] },
  { title: 'String Length Counter', slug: 'string-length-counter', difficulty: 'Beginner', rankTier: 'Silver', topic: 'strings', subtopic: 'characters', shortGoal: 'Count characters in a string.', outcome: 'Treat strings as arrays of characters.', time: 8, prereq: ['Input'], tests: [{ input: 'codme', expected: '5' }, { input: 'a', expected: '1' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Reverse a String', slug: 'reverse-a-string', difficulty: 'Beginner', rankTier: 'Silver', topic: 'strings', subtopic: 'two pointers', shortGoal: 'Print characters from back to front.', outcome: 'Walk through a string backwards.', time: 10, prereq: ['Strings'], tests: [{ input: 'hello', expected: 'olleh' }, { input: 'CODME', expected: 'EMDOC' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Palindrome Word', slug: 'palindrome-word', difficulty: 'Beginner', rankTier: 'Silver', topic: 'strings', subtopic: 'symmetry', shortGoal: 'Check whether a word reads the same both ways.', outcome: 'Compare mirrored characters.', time: 12, prereq: ['Two pointers'], tests: [{ input: 'racecar', expected: 'Yes' }, { input: 'hello', expected: 'No' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Count Vowels', slug: 'count-vowels', difficulty: 'Beginner', rankTier: 'Silver', topic: 'strings', subtopic: 'character categories', shortGoal: 'Count vowels in a word.', outcome: 'Use membership checks.', time: 10, prereq: ['Strings'], tests: [{ input: 'education', expected: '5' }, { input: 'rhythm', expected: '0' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Character Frequency Map', slug: 'character-frequency-map', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'strings', subtopic: 'frequency counting', shortGoal: 'Count each lowercase character.', outcome: 'Turn characters into counters.', time: 16, prereq: ['Arrays', 'Strings'], tests: [{ input: 'banana', expected: 'a:3 b:1 n:2' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'First Unique Character', slug: 'first-unique-character', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'strings', subtopic: 'frequency + scan', shortGoal: 'Find the first non-repeating character.', outcome: 'Combine counting and order.', time: 16, prereq: ['Frequency map'], tests: [{ input: 'leetcode', expected: 'l' }, { input: 'aabb', expected: '-1' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Valid Anagram', slug: 'valid-anagram', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'strings', subtopic: 'balanced counts', shortGoal: 'Check if two words have same letters.', outcome: 'Compare character inventories.', time: 14, prereq: ['Frequency map'], tests: [{ input: 'listen silent', expected: 'Yes' }, { input: 'apple pale', expected: 'No' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Matrix Row Sum', slug: 'matrix-row-sum', difficulty: 'Beginner', rankTier: 'Silver', topic: 'matrices', subtopic: '2D traversal', shortGoal: 'Print sum of each row.', outcome: 'Read and process table-shaped data.', time: 14, prereq: ['Nested loops'], tests: [{ input: '2 3\n1 2 3\n4 5 6', expected: '6 15' }], complexity: ['O(nm)', 'O(1)'] },
  { title: 'Matrix Diagonal Sum', slug: 'matrix-diagonal-sum', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'matrices', subtopic: 'diagonals', shortGoal: 'Sum primary and secondary diagonals.', outcome: 'Recognize index relationships.', time: 15, prereq: ['Matrices'], tests: [{ input: '3\n1 2 3\n4 5 6\n7 8 9', expected: '25' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Transpose Matrix', slug: 'transpose-matrix', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'matrices', subtopic: 'row column swap', shortGoal: 'Turn rows into columns.', outcome: 'Understand matrix coordinates.', time: 15, prereq: ['Matrices'], tests: [{ input: '2 3\n1 2 3\n4 5 6', expected: '1 4\n2 5\n3 6' }], complexity: ['O(nm)', 'O(nm)'] },
  { title: 'Spiral Matrix Walk', slug: 'spiral-matrix-walk', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'matrices', subtopic: 'boundary shrinking', shortGoal: 'Print a matrix in spiral order.', outcome: 'Control four moving boundaries.', time: 22, prereq: ['Matrices'], tests: [{ input: '3 3\n1 2 3\n4 5 6\n7 8 9', expected: '1 2 3 6 9 8 7 4 5' }], complexity: ['O(nm)', 'O(1)'] },
  { title: 'Selection Sort Lab', slug: 'selection-sort-lab', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'sorting', subtopic: 'minimum selection', shortGoal: 'Sort numbers by repeatedly picking the minimum.', outcome: 'Understand simple sorting mechanics.', time: 18, prereq: ['Arrays'], tests: [{ input: '5\n5 3 8 1 2', expected: '1 2 3 5 8' }], complexity: ['O(n^2)', 'O(1)'] },
  { title: 'Bubble Sort Lab', slug: 'bubble-sort-lab', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'sorting', subtopic: 'adjacent swaps', shortGoal: 'Sort by bubbling large values right.', outcome: 'See local swaps create global order.', time: 18, prereq: ['Arrays'], tests: [{ input: '5\n5 1 4 2 8', expected: '1 2 4 5 8' }], complexity: ['O(n^2)', 'O(1)'] },
  { title: 'Insertion Sort Cards', slug: 'insertion-sort-cards', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'sorting', subtopic: 'sorted prefix', shortGoal: 'Sort like arranging cards in hand.', outcome: 'Grow a sorted prefix one item at a time.', time: 18, prereq: ['Arrays'], tests: [{ input: '5\n9 5 1 4 3', expected: '1 3 4 5 9' }], complexity: ['O(n^2)', 'O(1)'] },
  { title: 'Merge Sort Splitter', slug: 'merge-sort-splitter', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'sorting', subtopic: 'divide and conquer', shortGoal: 'Sort by splitting and merging.', outcome: 'Learn recursive divide-and-conquer.', time: 28, prereq: ['Recursion', 'Merge arrays'], tests: [{ input: '6\n5 2 9 1 3 6', expected: '1 2 3 5 6 9' }], complexity: ['O(n log n)', 'O(n)'] },
  { title: 'Quick Sort Pivot', slug: 'quick-sort-pivot', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'sorting', subtopic: 'partitioning', shortGoal: 'Sort around a pivot.', outcome: 'Understand partition-based sorting.', time: 30, prereq: ['Recursion'], tests: [{ input: '5\n4 2 7 1 3', expected: '1 2 3 4 7' }], complexity: ['O(n log n) average', 'O(log n)'] },
  { title: 'Linear Search Finder', slug: 'linear-search-finder', difficulty: 'Beginner', rankTier: 'Silver', topic: 'searching', subtopic: 'scan', shortGoal: 'Find target index by checking each item.', outcome: 'Know the simplest search strategy.', time: 10, prereq: ['Arrays'], tests: [{ input: '5 7\n1 2 7 4 5', expected: '2' }, { input: '3 9\n1 2 3', expected: '-1' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Binary Search Finder', slug: 'binary-search-finder', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'searching', subtopic: 'sorted search', shortGoal: 'Find target by halving the search space.', outcome: 'Use sorted order to skip work.', time: 18, prereq: ['Sorted arrays'], tests: [{ input: '5 4\n1 2 3 4 5', expected: '3' }, { input: '4 9\n1 3 5 7', expected: '-1' }], complexity: ['O(log n)', 'O(1)'] },
  { title: 'First and Last Position', slug: 'first-and-last-position', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'searching', subtopic: 'binary boundary', shortGoal: 'Find first and last target positions.', outcome: 'Use binary search for boundaries.', time: 24, prereq: ['Binary search'], tests: [{ input: '6 2\n1 2 2 2 3 4', expected: '1 3' }, { input: '3 5\n1 2 3', expected: '-1 -1' }], complexity: ['O(log n)', 'O(1)'] },
  { title: 'Recursive Factorial', slug: 'recursive-factorial', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'recursion', subtopic: 'base case', shortGoal: 'Compute factorial recursively.', outcome: 'Understand base case and smaller problem.', time: 18, prereq: ['Functions'], tests: [{ input: '5', expected: '120' }, { input: '0', expected: '1' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Fibonacci Memo Starter', slug: 'fibonacci-memo-starter', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'recursion', subtopic: 'overlapping subproblems', shortGoal: 'Compute nth Fibonacci efficiently.', outcome: 'See why remembering work matters.', time: 22, prereq: ['Recursion'], tests: [{ input: '10', expected: '55' }, { input: '0', expected: '0' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Power Function', slug: 'power-function', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'recursion', subtopic: 'fast exponentiation', shortGoal: 'Compute a^b using divide and conquer.', outcome: 'Cut repeated multiplication in half.', time: 22, prereq: ['Recursion'], tests: [{ input: '2 10', expected: '1024' }, { input: '5 0', expected: '1' }], complexity: ['O(log b)', 'O(log b)'] },
  { title: 'Generate Subsets', slug: 'generate-subsets', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'backtracking', subtopic: 'choose skip', shortGoal: 'Print count of all subsets.', outcome: 'Explore include/exclude decisions.', time: 28, prereq: ['Recursion'], tests: [{ input: '3', expected: '8' }, { input: '0', expected: '1' }], complexity: ['O(2^n)', 'O(n)'] },
  { title: 'Balanced Parentheses Generator', slug: 'balanced-parentheses-generator', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'backtracking', subtopic: 'valid choices', shortGoal: 'Count valid parentheses strings for n pairs.', outcome: 'Backtrack with constraints.', time: 30, prereq: ['Backtracking'], tests: [{ input: '3', expected: '5' }, { input: '1', expected: '1' }], complexity: ['O(Catalan n)', 'O(n)'] },
  { title: 'N Queens Counter', slug: 'n-queens-counter', difficulty: 'Expert', rankTier: 'Diamond', topic: 'backtracking', subtopic: 'constraint placement', shortGoal: 'Count safe queen arrangements.', outcome: 'Use columns and diagonals as constraints.', time: 40, prereq: ['Backtracking'], tests: [{ input: '4', expected: '2' }, { input: '1', expected: '1' }], complexity: ['O(n!)', 'O(n)'] },
  { title: 'Two Sum Hash Map', slug: 'two-sum-hash-map', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'hashing', subtopic: 'complements', shortGoal: 'Find two indices adding to target.', outcome: 'Trade memory for speed.', time: 20, prereq: ['Arrays'], tests: [{ input: '4 9\n2 7 11 15', expected: '0 1' }, { input: '3 6\n3 2 4', expected: '1 2' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Contains Duplicate', slug: 'contains-duplicate', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'hashing', subtopic: 'set membership', shortGoal: 'Detect any repeated value.', outcome: 'Use a set for instant lookup.', time: 14, prereq: ['Arrays'], tests: [{ input: '4\n1 2 3 1', expected: 'Yes' }, { input: '3\n1 2 3', expected: 'No' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Longest Consecutive Sequence', slug: 'longest-consecutive-sequence', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'hashing', subtopic: 'sequence starts', shortGoal: 'Find longest run of consecutive numbers.', outcome: 'Start counting only at sequence beginnings.', time: 28, prereq: ['Hash set'], tests: [{ input: '6\n100 4 200 1 3 2', expected: '4' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Valid Parentheses Stack', slug: 'valid-parentheses-stack', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'stacks', subtopic: 'matching pairs', shortGoal: 'Validate bracket order.', outcome: 'Use stack as a memory of opens.', time: 18, prereq: ['Strings'], tests: [{ input: '(){}[]', expected: 'Valid' }, { input: '(]', expected: 'Invalid' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Min Stack Simulator', slug: 'min-stack-simulator', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'stacks', subtopic: 'auxiliary stack', shortGoal: 'Support push, pop, min queries.', outcome: 'Store helper state for fast answers.', time: 28, prereq: ['Stacks'], tests: [{ input: '6\npush 3\npush 1\nmin\npop\nmin\npop', expected: '1\n3' }], complexity: ['O(q)', 'O(q)'] },
  { title: 'Queue Using Two Stacks', slug: 'queue-using-two-stacks', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'queues', subtopic: 'stack transfer', shortGoal: 'Process queue operations with stacks.', outcome: 'Reverse order twice to restore FIFO.', time: 28, prereq: ['Stacks', 'Queues'], tests: [{ input: '5\npush 1\npush 2\nfront\npop\nfront', expected: '1\n2' }], complexity: ['O(q) amortized', 'O(q)'] },
  { title: 'Circular Queue Basics', slug: 'circular-queue-basics', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'queues', subtopic: 'fixed buffer', shortGoal: 'Simulate circular queue operations.', outcome: 'Use modulo to wrap indexes.', time: 24, prereq: ['Arrays', 'Queues'], tests: [{ input: '5 4\nenq 10\nenq 20\ndeq\nenq 30', expected: '20 30' }], complexity: ['O(q)', 'O(k)'] },
  { title: 'Build a Linked List', slug: 'build-a-linked-list', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'linked lists', subtopic: 'nodes', shortGoal: 'Insert values at tail and print.', outcome: 'Understand node links.', time: 24, prereq: ['Pointers or references'], tests: [{ input: '4\n1 2 3 4', expected: '1 2 3 4' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Reverse Linked List', slug: 'reverse-linked-list', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'linked lists', subtopic: 'pointer reversal', shortGoal: 'Reverse next links.', outcome: 'Move through nodes while preserving future.', time: 30, prereq: ['Linked list basics'], tests: [{ input: '5\n1 2 3 4 5', expected: '5 4 3 2 1' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Detect Linked List Cycle', slug: 'detect-linked-list-cycle', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'linked lists', subtopic: 'fast slow pointers', shortGoal: 'Detect if a cycle exists.', outcome: 'Use two speeds to reveal loops.', time: 30, prereq: ['Linked lists', 'Two pointers'], tests: [{ input: '5 1\n1 2 3 4 5', expected: 'Cycle' }, { input: '3 -1\n1 2 3', expected: 'No Cycle' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Tree Height', slug: 'tree-height', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'trees', subtopic: 'DFS depth', shortGoal: 'Find height of a binary tree.', outcome: 'Use recursion on left and right subtrees.', time: 24, prereq: ['Recursion'], tests: [{ input: '7\n1 2 3 4 5 -1 -1', expected: '3' }], complexity: ['O(n)', 'O(h)'] },
  { title: 'Binary Tree Level Order', slug: 'binary-tree-level-order', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'trees', subtopic: 'BFS', shortGoal: 'Print nodes level by level.', outcome: 'Use a queue to explore breadth first.', time: 30, prereq: ['Queues', 'Trees'], tests: [{ input: '7\n1 2 3 4 5 -1 -1', expected: '1\n2 3\n4 5' }], complexity: ['O(n)', 'O(w)'] },
  { title: 'Lowest Common Ancestor', slug: 'lowest-common-ancestor', difficulty: 'Expert', rankTier: 'Diamond', topic: 'trees', subtopic: 'ancestor search', shortGoal: 'Find first shared ancestor of two nodes.', outcome: 'Combine answers from subtrees.', time: 38, prereq: ['Tree DFS'], tests: [{ input: '7\n3 5 1 6 2 0 8\n5 1', expected: '3' }], complexity: ['O(n)', 'O(h)'] },
  { title: 'Validate BST', slug: 'validate-bst', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'BST', subtopic: 'range constraints', shortGoal: 'Check if a tree obeys BST rules.', outcome: 'Pass allowed value ranges downward.', time: 32, prereq: ['Trees'], tests: [{ input: '3\n2 1 3', expected: 'Valid' }, { input: '3\n5 1 4', expected: 'Invalid' }], complexity: ['O(n)', 'O(h)'] },
  { title: 'BST Search', slug: 'bst-search', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'BST', subtopic: 'ordered traversal', shortGoal: 'Find whether a value exists.', outcome: 'Use ordering to skip half a tree.', time: 20, prereq: ['Binary search'], tests: [{ input: '5 4\n4 2 7 1 3', expected: 'Found' }, { input: '5 9\n4 2 7 1 3', expected: 'Not Found' }], complexity: ['O(h)', 'O(1)'] },
  { title: 'Kth Smallest in BST', slug: 'kth-smallest-in-bst', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'BST', subtopic: 'inorder order', shortGoal: 'Find kth smallest value.', outcome: 'Use inorder traversal as sorted order.', time: 30, prereq: ['BST traversal'], tests: [{ input: '5 3\n5 3 6 2 4', expected: '4' }], complexity: ['O(h+k)', 'O(h)'] },
  { title: 'Heap Top K', slug: 'heap-top-k', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'heaps', subtopic: 'priority queue', shortGoal: 'Find k largest numbers.', outcome: 'Keep only the best k candidates.', time: 30, prereq: ['Arrays'], tests: [{ input: '6 2\n3 2 1 5 6 4', expected: '6 5' }], complexity: ['O(n log k)', 'O(k)'] },
  { title: 'Merge K Sorted Lists', slug: 'merge-k-sorted-lists', difficulty: 'Expert', rankTier: 'Diamond', topic: 'heaps', subtopic: 'multiway merge', shortGoal: 'Merge many sorted streams.', outcome: 'Use a heap to pick the next smallest.', time: 42, prereq: ['Heaps', 'Linked lists'], tests: [{ input: '3\n3 1 4 5\n3 1 3 4\n2 2 6', expected: '1 1 2 3 4 4 5 6' }], complexity: ['O(n log k)', 'O(k)'] },
  { title: 'Trie Insert Search', slug: 'trie-insert-search', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'tries', subtopic: 'prefix tree', shortGoal: 'Insert words and answer search queries.', outcome: 'Store characters as a tree.', time: 35, prereq: ['Trees', 'Strings'], tests: [{ input: '5\ninsert cat\ninsert car\nsearch cat\nsearch cap\nprefix ca', expected: 'Yes\nNo\nYes' }], complexity: ['O(total characters)', 'O(total characters)'] },
  { title: 'Word Break with Trie', slug: 'word-break-with-trie', difficulty: 'Expert', rankTier: 'Diamond', topic: 'tries', subtopic: 'dictionary segmentation', shortGoal: 'Check if a string can be split into dictionary words.', outcome: 'Combine prefix search with DP.', time: 45, prereq: ['Tries', 'DP'], tests: [{ input: 'leetcode\n2\nleet code', expected: 'Yes' }, { input: 'catsandog\n5\ncats dog sand and cat', expected: 'No' }], complexity: ['O(n^2)', 'O(n + dictionary)'] },
  { title: 'Graph Adjacency Builder', slug: 'graph-adjacency-builder', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'graphs', subtopic: 'adjacency list', shortGoal: 'Build and print degree of each node.', outcome: 'Represent connections efficiently.', time: 22, prereq: ['Arrays'], tests: [{ input: '4 3\n1 2\n2 3\n2 4', expected: '1 3 1 1' }], complexity: ['O(n+m)', 'O(n+m)'] },
  { title: 'Graph BFS Distance', slug: 'graph-bfs-distance', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'graphs', subtopic: 'BFS', shortGoal: 'Find shortest unweighted distance.', outcome: 'Use BFS layers as distance steps.', time: 32, prereq: ['Queues', 'Graphs'], tests: [{ input: '5 4 1 5\n1 2\n2 3\n3 4\n4 5', expected: '4' }], complexity: ['O(n+m)', 'O(n)'] },
  { title: 'Graph DFS Components', slug: 'graph-dfs-components', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'graphs', subtopic: 'connected components', shortGoal: 'Count connected components.', outcome: 'Restart DFS when a new island appears.', time: 30, prereq: ['DFS'], tests: [{ input: '5 2\n1 2\n4 5', expected: '3' }], complexity: ['O(n+m)', 'O(n)'] },
  { title: 'Island Counter', slug: 'island-counter', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'graphs', subtopic: 'grid DFS', shortGoal: 'Count groups of connected land cells.', outcome: 'Apply graph traversal to a grid.', time: 35, prereq: ['DFS', 'Matrices'], tests: [{ input: '3 3\n1 1 0\n0 1 0\n1 0 1', expected: '3' }], complexity: ['O(nm)', 'O(nm)'] },
  { title: 'Activity Selection', slug: 'activity-selection', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'greedy', subtopic: 'earliest finish', shortGoal: 'Pick maximum non-overlapping activities.', outcome: 'Choose the activity that frees time soonest.', time: 24, prereq: ['Sorting'], tests: [{ input: '4\n1 3\n2 4\n3 5\n0 6', expected: '2' }], complexity: ['O(n log n)', 'O(1)'] },
  { title: 'Minimum Coins Greedy', slug: 'minimum-coins-greedy', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'greedy', subtopic: 'canonical coins', shortGoal: 'Use fewest Indian-style denominations.', outcome: 'Take the largest useful coin first.', time: 20, prereq: ['Loops'], tests: [{ input: '93', expected: '5' }, { input: '10', expected: '1' }], complexity: ['O(d)', 'O(1)'] },
  { title: 'Fractional Knapsack', slug: 'fractional-knapsack', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'greedy', subtopic: 'value density', shortGoal: 'Maximize value with divisible items.', outcome: 'Sort by value per weight.', time: 32, prereq: ['Sorting'], tests: [{ input: '3 50\n10 60\n20 100\n30 120', expected: '240' }], complexity: ['O(n log n)', 'O(1)'] },
  { title: 'Climbing Stairs DP', slug: 'climbing-stairs-dp', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'dynamic programming', subtopic: 'one dimensional DP', shortGoal: 'Count ways to climb n stairs.', outcome: 'Build answers from smaller answers.', time: 20, prereq: ['Fibonacci'], tests: [{ input: '5', expected: '8' }, { input: '1', expected: '1' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'House Robber Street', slug: 'house-robber-street', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'dynamic programming', subtopic: 'take skip', shortGoal: 'Max money without adjacent houses.', outcome: 'Choose between taking now or skipping.', time: 30, prereq: ['1D DP'], tests: [{ input: '5\n2 7 9 3 1', expected: '12' }], complexity: ['O(n)', 'O(1)'] },
  { title: '0/1 Knapsack Core', slug: 'zero-one-knapsack-core', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'dynamic programming', subtopic: 'capacity DP', shortGoal: 'Maximize value under weight capacity.', outcome: 'Build choices by item and capacity.', time: 40, prereq: ['2D DP'], tests: [{ input: '3 50\n10 60\n20 100\n30 120', expected: '220' }], complexity: ['O(nW)', 'O(W)'] },
  { title: 'Longest Common Subsequence', slug: 'longest-common-subsequence', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'dynamic programming', subtopic: 'two string DP', shortGoal: 'Find LCS length for two strings.', outcome: 'Compare taking or skipping characters.', time: 40, prereq: ['2D DP'], tests: [{ input: 'abcde\nace', expected: '3' }, { input: 'abc\ndef', expected: '0' }], complexity: ['O(nm)', 'O(nm)'] },
  { title: 'Edit Distance', slug: 'edit-distance', difficulty: 'Expert', rankTier: 'Diamond', topic: 'dynamic programming', subtopic: 'string transformation', shortGoal: 'Find minimum edits to convert one word to another.', outcome: 'Model insert, delete, replace choices.', time: 45, prereq: ['2D DP'], tests: [{ input: 'horse\nros', expected: '3' }, { input: 'intention\nexecution', expected: '5' }], complexity: ['O(nm)', 'O(nm)'] },
  { title: 'Bit Count Basics', slug: 'bit-count-basics', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'bit manipulation', subtopic: 'set bits', shortGoal: 'Count 1 bits in an integer.', outcome: 'Use binary representation practically.', time: 18, prereq: ['Loops'], tests: [{ input: '5', expected: '2' }, { input: '15', expected: '4' }], complexity: ['O(log n)', 'O(1)'] },
  { title: 'Single Number XOR', slug: 'single-number-xor', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'bit manipulation', subtopic: 'xor cancellation', shortGoal: 'Find the number appearing once.', outcome: 'Use XOR to cancel pairs.', time: 18, prereq: ['XOR'], tests: [{ input: '5\n4 1 2 1 2', expected: '4' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Subarray Sum Equals K', slug: 'subarray-sum-equals-k', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'prefix sum', subtopic: 'hash prefix counts', shortGoal: 'Count subarrays with sum k.', outcome: 'Turn subarray sums into prefix differences.', time: 32, prereq: ['Hashing'], tests: [{ input: '3 2\n1 1 1', expected: '2' }, { input: '3 3\n1 2 3', expected: '2' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Range Sum Queries', slug: 'range-sum-queries', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'prefix sum', subtopic: 'static queries', shortGoal: 'Answer many range sum queries.', outcome: 'Precompute once, answer fast.', time: 24, prereq: ['Arrays'], tests: [{ input: '5 2\n1 2 3 4 5\n1 3\n2 5', expected: '6\n14' }], complexity: ['O(n+q)', 'O(n)'] },
  { title: 'Two Pointer Pair Sum', slug: 'two-pointer-pair-sum', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'two pointers', subtopic: 'sorted pair', shortGoal: 'Find if a sorted array has a target pair.', outcome: 'Move inward based on sum.', time: 20, prereq: ['Sorted arrays'], tests: [{ input: '5 9\n1 2 4 5 7', expected: 'Yes' }, { input: '4 20\n1 2 3 4', expected: 'No' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Container With Most Water', slug: 'container-with-most-water', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'two pointers', subtopic: 'max area', shortGoal: 'Find best pair of vertical lines.', outcome: 'Move the shorter wall.', time: 30, prereq: ['Two pointers'], tests: [{ input: '9\n1 8 6 2 5 4 8 3 7', expected: '49' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Longest Unique Window', slug: 'longest-unique-window', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'sliding window', subtopic: 'variable window', shortGoal: 'Find longest substring without repeating characters.', outcome: 'Grow and shrink a clean window.', time: 32, prereq: ['Hashing'], tests: [{ input: 'abcabcbb', expected: '3' }, { input: 'bbbbb', expected: '1' }], complexity: ['O(n)', 'O(k)'] },
  { title: 'Maximum Sum Window K', slug: 'maximum-sum-window-k', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'sliding window', subtopic: 'fixed window', shortGoal: 'Find max sum among windows of size k.', outcome: 'Update a window by removing left and adding right.', time: 22, prereq: ['Arrays'], tests: [{ input: '6 3\n2 1 5 1 3 2', expected: '9' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Next Greater Element', slug: 'next-greater-element', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'monotonic stack', subtopic: 'decreasing stack', shortGoal: 'Find next greater value for each element.', outcome: 'Use a stack of waiting elements.', time: 30, prereq: ['Stacks'], tests: [{ input: '4\n4 5 2 10', expected: '5 10 10 -1' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Largest Rectangle Histogram', slug: 'largest-rectangle-histogram', difficulty: 'Expert', rankTier: 'Diamond', topic: 'monotonic stack', subtopic: 'nearest smaller', shortGoal: 'Find largest rectangle area in bars.', outcome: 'Use nearest smaller boundaries.', time: 45, prereq: ['Monotonic stack'], tests: [{ input: '6\n2 1 5 6 2 3', expected: '10' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'Minimum Eating Speed', slug: 'minimum-eating-speed', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'binary search on answer', subtopic: 'feasibility check', shortGoal: 'Find minimum speed to finish piles in h hours.', outcome: 'Binary search an answer, not an index.', time: 35, prereq: ['Binary search'], tests: [{ input: '4 8\n3 6 7 11', expected: '4' }], complexity: ['O(n log max)', 'O(1)'] },
  { title: 'Ship Packages Capacity', slug: 'ship-packages-capacity', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'binary search on answer', subtopic: 'capacity planning', shortGoal: 'Find least ship capacity for D days.', outcome: 'Convert optimization to yes/no check.', time: 36, prereq: ['Binary search on answer'], tests: [{ input: '10 5\n1 2 3 4 5 6 7 8 9 10', expected: '15' }], complexity: ['O(n log sum)', 'O(1)'] },
  { title: 'Union Find Provinces', slug: 'union-find-provinces', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'union find', subtopic: 'disjoint sets', shortGoal: 'Count connected groups using union find.', outcome: 'Merge components efficiently.', time: 34, prereq: ['Graphs'], tests: [{ input: '3\n1 1 0\n1 1 0\n0 0 1', expected: '2' }], complexity: ['O(n^2 alpha n)', 'O(n)'] },
  { title: 'Cycle Detection DSU', slug: 'cycle-detection-dsu', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'union find', subtopic: 'undirected cycle', shortGoal: 'Detect cycle while adding edges.', outcome: 'Recognize when endpoints already share a set.', time: 34, prereq: ['Union find'], tests: [{ input: '3 3\n1 2\n2 3\n1 3', expected: 'Cycle' }], complexity: ['O(m alpha n)', 'O(n)'] },
  { title: 'Dijkstra Shortest Path', slug: 'dijkstra-shortest-path', difficulty: 'Expert', rankTier: 'Diamond', topic: 'shortest path', subtopic: 'positive weights', shortGoal: 'Find shortest distance from source to target.', outcome: 'Always expand the currently closest node.', time: 45, prereq: ['Graphs', 'Heaps'], tests: [{ input: '5 6 1 5\n1 2 2\n1 3 4\n2 3 1\n2 4 7\n3 5 3\n4 5 1', expected: '6' }], complexity: ['O((n+m) log n)', 'O(n+m)'] },
  { title: 'Bellman Ford Guard', slug: 'bellman-ford-guard', difficulty: 'Expert', rankTier: 'Diamond', topic: 'shortest path', subtopic: 'negative edges', shortGoal: 'Find shortest paths with possible negative edges.', outcome: 'Relax every edge repeatedly.', time: 45, prereq: ['Graphs'], tests: [{ input: '3 3 1 3\n1 2 4\n1 3 5\n2 3 -2', expected: '2' }], complexity: ['O(nm)', 'O(n)'] },
  { title: 'Course Schedule Order', slug: 'course-schedule-order', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'topological sort', subtopic: 'DAG ordering', shortGoal: 'Decide if all courses can be finished.', outcome: 'Use indegrees to process prerequisites.', time: 35, prereq: ['Graphs', 'Queues'], tests: [{ input: '2 1\n1 0', expected: 'Possible' }, { input: '2 2\n1 0\n0 1', expected: 'Impossible' }], complexity: ['O(n+m)', 'O(n+m)'] },
  { title: 'Alien Dictionary Order', slug: 'alien-dictionary-order', difficulty: 'Expert', rankTier: 'Diamond', topic: 'topological sort', subtopic: 'character graph', shortGoal: 'Infer character order from sorted words.', outcome: 'Build rules from first differing letters.', time: 45, prereq: ['Topological sort', 'Strings'], tests: [{ input: '5\nbaa\nabcd\nabca\ncab\ncad', expected: 'Valid Order' }], complexity: ['O(total characters)', 'O(letters)'] },
  { title: 'Median of Two Sorted Arrays', slug: 'median-of-two-sorted-arrays', difficulty: 'Expert', rankTier: 'Grandmaster', topic: 'advanced interview patterns', subtopic: 'partition binary search', shortGoal: 'Find median without fully merging.', outcome: 'Binary search the smaller partition.', time: 50, prereq: ['Binary search'], tests: [{ input: '2 1\n1 3\n2', expected: '2' }, { input: '2 2\n1 2\n3 4', expected: '2.5' }], complexity: ['O(log min(n,m))', 'O(1)'] },
  { title: 'Trapping Rain Water', slug: 'trapping-rain-water', difficulty: 'Expert', rankTier: 'Grandmaster', topic: 'advanced interview patterns', subtopic: 'two pointers', shortGoal: 'Compute water trapped between bars.', outcome: 'Track left and right maximums.', time: 45, prereq: ['Two pointers'], tests: [{ input: '12\n0 1 0 2 1 0 1 3 2 1 2 1', expected: '6' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Serialize Binary Tree', slug: 'serialize-binary-tree', difficulty: 'Expert', rankTier: 'Grandmaster', topic: 'advanced interview patterns', subtopic: 'tree encoding', shortGoal: 'Convert tree to string and back conceptually.', outcome: 'Preserve structure with null markers.', time: 50, prereq: ['Trees', 'Recursion'], tests: [{ input: '5\n1 2 3 -1 -1', expected: '1,2,3,#,#' }], complexity: ['O(n)', 'O(n)'] },
  { title: 'LRU Cache Simulation', slug: 'lru-cache-simulation', difficulty: 'Expert', rankTier: 'Grandmaster', topic: 'advanced interview patterns', subtopic: 'hash map + list', shortGoal: 'Simulate least recently used cache.', outcome: 'Combine fast lookup with recency order.', time: 55, prereq: ['Hashing', 'Linked lists'], tests: [{ input: '2 5\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2', expected: '1\n-1' }], complexity: ['O(q)', 'O(capacity)'] },
  { title: 'Minimum Window Substring', slug: 'minimum-window-substring', difficulty: 'Expert', rankTier: 'Grandmaster', topic: 'advanced interview patterns', subtopic: 'sliding window counts', shortGoal: 'Find shortest window containing all target chars.', outcome: 'Shrink only when the window is valid.', time: 50, prereq: ['Sliding window', 'Hashing'], tests: [{ input: 'ADOBECODEBANC\nABC', expected: 'BANC' }], complexity: ['O(n)', 'O(k)'] },
  { title: 'Word Ladder Length', slug: 'word-ladder-length', difficulty: 'Expert', rankTier: 'Grandmaster', topic: 'advanced interview patterns', subtopic: 'BFS transformations', shortGoal: 'Find shortest word transformation length.', outcome: 'Treat words as graph nodes.', time: 55, prereq: ['BFS', 'Hashing'], tests: [{ input: 'hit cog\n6\nhot dot dog lot log cog', expected: '5' }], complexity: ['O(n wordLength^2)', 'O(n)'] },
  { title: 'Maximum Subarray Kadane', slug: 'maximum-subarray-kadane', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'advanced interview patterns', subtopic: 'Kadane algorithm', shortGoal: 'Find maximum sum contiguous subarray.', outcome: 'Drop a harmful prefix.', time: 28, prereq: ['Arrays'], tests: [{ input: '9\n-2 1 -3 4 -1 2 1 -5 4', expected: '6' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Product Except Self', slug: 'product-except-self', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'advanced interview patterns', subtopic: 'prefix suffix', shortGoal: 'Compute product of all other elements.', outcome: 'Use left and right products without division.', time: 32, prereq: ['Prefix ideas'], tests: [{ input: '4\n1 2 3 4', expected: '24 12 8 6' }], complexity: ['O(n)', 'O(1) extra'] },
  { title: 'Maximum Product Subarray', slug: 'maximum-product-subarray', difficulty: 'Expert', rankTier: 'Grandmaster', topic: 'advanced interview patterns', subtopic: 'min max tracking', shortGoal: 'Find maximum product contiguous subarray.', outcome: 'Track negative flips with min and max.', time: 42, prereq: ['Kadane'], tests: [{ input: '4\n2 3 -2 4', expected: '6' }, { input: '3\n-2 0 -1', expected: '0' }], complexity: ['O(n)', 'O(1)'] },
  { title: 'Regular Expression Mini Match', slug: 'regular-expression-mini-match', difficulty: 'Master', rankTier: 'Iridescent', topic: 'advanced interview patterns', subtopic: 'DP pattern matching', shortGoal: 'Support . and * pattern matching.', outcome: 'Model pattern choices carefully.', time: 65, prereq: ['2D DP', 'Strings'], tests: [{ input: 'aa\na*', expected: 'Yes' }, { input: 'ab\n.*', expected: 'Yes' }], complexity: ['O(nm)', 'O(nm)'] },
  { title: 'Hard Stock Trader', slug: 'hard-stock-trader', difficulty: 'Master', rankTier: 'Iridescent', topic: 'dynamic programming', subtopic: 'state machine', shortGoal: 'Max profit with at most k transactions.', outcome: 'Represent buy/sell states clearly.', time: 65, prereq: ['DP states'], tests: [{ input: '2 6\n3 2 6 5 0 3', expected: '7' }], complexity: ['O(kn)', 'O(k)'] },
  { title: 'Palindrome Partition Cuts', slug: 'palindrome-partition-cuts', difficulty: 'Master', rankTier: 'Iridescent', topic: 'dynamic programming', subtopic: 'partition DP', shortGoal: 'Minimum cuts so every substring is palindrome.', outcome: 'Precompute valid pieces before cutting.', time: 65, prereq: ['DP', 'Palindromes'], tests: [{ input: 'aab', expected: '1' }, { input: 'a', expected: '0' }], complexity: ['O(n^2)', 'O(n^2)'] },
  { title: 'Strongly Connected Components', slug: 'strongly-connected-components', difficulty: 'Master', rankTier: 'Iridescent', topic: 'graphs', subtopic: 'Kosaraju or Tarjan', shortGoal: 'Count strongly connected groups in a directed graph.', outcome: 'Understand reachability both ways.', time: 70, prereq: ['DFS', 'Graphs'], tests: [{ input: '5 5\n1 2\n2 3\n3 1\n3 4\n4 5', expected: '3' }], complexity: ['O(n+m)', 'O(n+m)'] },
  { title: 'Network Delay Time', slug: 'network-delay-time', difficulty: 'Expert', rankTier: 'Grandmaster', topic: 'shortest path', subtopic: 'Dijkstra application', shortGoal: 'Find when all nodes receive a signal.', outcome: 'Use shortest paths as propagation times.', time: 48, prereq: ['Dijkstra'], tests: [{ input: '4 3 2\n2 1 1\n2 3 1\n3 4 1', expected: '2' }], complexity: ['O((n+m) log n)', 'O(n+m)'] },
  { title: 'Build Order Planner', slug: 'build-order-planner', difficulty: 'Expert', rankTier: 'Grandmaster', topic: 'topological sort', subtopic: 'dependency planning', shortGoal: 'Return one valid build order.', outcome: 'Use indegrees to safely schedule work.', time: 45, prereq: ['Topological sort'], tests: [{ input: '4 3\n1 2\n1 3\n3 4', expected: 'Valid Order' }], complexity: ['O(n+m)', 'O(n+m)'] },
  { title: 'Sliding Window Median', slug: 'sliding-window-median', difficulty: 'Master', rankTier: 'Iridescent', topic: 'advanced interview patterns', subtopic: 'two heaps', shortGoal: 'Find median for every window of size k.', outcome: 'Balance lower and upper halves dynamically.', time: 70, prereq: ['Heaps', 'Sliding window'], tests: [{ input: '8 3\n1 3 -1 -3 5 3 6 7', expected: '1 -1 -1 3 5 6' }], complexity: ['O(n log k)', 'O(k)'] },
  { title: 'Minimum Spanning Tree', slug: 'minimum-spanning-tree', difficulty: 'Master', rankTier: 'Iridescent', topic: 'graphs', subtopic: 'Kruskal', shortGoal: 'Find total weight of the cheapest connected network.', outcome: 'Sort edges and union safe choices.', time: 65, prereq: ['Union find', 'Greedy'], tests: [{ input: '4 5\n1 2 10\n1 3 6\n1 4 5\n2 4 15\n3 4 4', expected: '19' }], complexity: ['O(m log m)', 'O(n)'] },
  { title: 'Segment Tree Range Minimum', slug: 'segment-tree-range-minimum', difficulty: 'Master', rankTier: 'Iridescent', topic: 'advanced interview patterns', subtopic: 'range query tree', shortGoal: 'Answer updates and range minimum queries.', outcome: 'Store interval answers in a tree.', time: 75, prereq: ['Recursion', 'Arrays'], tests: [{ input: '5 3\n5 2 4 7 1\nmin 1 3\nupdate 2 0\nmin 1 3', expected: '2\n0' }], complexity: ['O((n+q) log n)', 'O(n)'] },
];

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
    ],
    intuition: `${seed.title} is about ${seed.subtopic}. Imagine solving one tiny piece, then repeating that same calm move until the whole input is handled.`,
    beginnerExplanation: `The goal is simple: ${seed.shortGoal} You do not need magic. Read the input, keep track of the important value, and print the final answer exactly. The main lesson is: ${seed.outcome}`,
    bruteForceApproach: `Try every direct possibility first. This is useful because it teaches what the answer means, even if it repeats work.`,
    optimizedApproach: `Use the pattern for ${seed.subtopic}: keep only the state that matters, skip work that cannot change the answer, and update the answer in a predictable order.`,
    timeComplexity: seed.complexity[0],
    spaceComplexity: seed.complexity[1],
    dryRunExample: `Input: ${example.input || '(empty input)'}\nExpected output: ${example.expected}\nWalkthrough: read the sample, apply the ${seed.subtopic} rule step by step, and stop only when the required output is formed.`,
    testCases: seed.tests,
    tags: [seed.topic, seed.subtopic, seed.difficulty, seed.rankTier].map(String),
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

// Problems count check removed to support dynamic roadmap expansion

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
