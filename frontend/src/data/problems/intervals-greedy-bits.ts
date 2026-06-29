import type { ProblemSeed } from './types';

export const intervalsGreedyBitsSeeds: ProblemSeed[] = [
  // INTERVALS
  { title: 'Merge Intervals', slug: 'merge-intervals', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'greedy', subtopic: 'interval merging', shortGoal: 'Merge overlapping intervals.', outcome: 'Sort by start, extend or create new interval.', time: 25, prereq: ['Sorting'], tests: [{ input: '4\n1 3\n2 6\n8 10\n15 18', expected: '1 6\n8 10\n15 18' }], complexity: ['O(n log n)', 'O(n)'], companies: ['Google', 'Amazon', 'Facebook', 'Microsoft'], frequency: 10 },
  { title: 'Insert Interval', slug: 'insert-interval', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'greedy', subtopic: 'interval insertion', shortGoal: 'Insert a new interval and merge overlaps.', outcome: 'Collect left, merge center, collect right.', time: 28, prereq: ['Merge intervals'], tests: [{ input: '3\n1 3\n6 9\n2 5', expected: '1 5\n6 9' }], complexity: ['O(n)', 'O(n)'], companies: ['Google', 'Facebook'], frequency: 9 },
  { title: 'Non-Overlapping Intervals', slug: 'non-overlapping-intervals', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'greedy', subtopic: 'interval scheduling', shortGoal: 'Find minimum removals for non-overlapping set.', outcome: 'Keep interval with earliest end time.', time: 25, prereq: ['Sorting', 'Greedy'], tests: [{ input: '4\n1 2\n2 3\n3 4\n1 3', expected: '1' }], complexity: ['O(n log n)', 'O(1)'], companies: ['Amazon', 'Microsoft'], frequency: 9 },
  { title: 'Meeting Rooms Check', slug: 'meeting-rooms', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'greedy', subtopic: 'interval overlap', shortGoal: 'Check if a person can attend all meetings.', outcome: 'Sort and check consecutive overlaps.', time: 15, prereq: ['Sorting'], tests: [{ input: '3\n0 30\n5 10\n15 20', expected: 'No' }], complexity: ['O(n log n)', 'O(1)'], companies: ['Facebook', 'Amazon'], frequency: 9 },
  { title: 'Meeting Rooms II', slug: 'meeting-rooms-ii', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'greedy', subtopic: 'sweep line', shortGoal: 'Find minimum conference rooms needed.', outcome: 'Use min-heap or sweep line for overlaps.', time: 30, prereq: ['Heaps', 'Sorting'], tests: [{ input: '3\n0 30\n5 10\n15 20', expected: '2' }], complexity: ['O(n log n)', 'O(n)'], companies: ['Google', 'Facebook', 'Amazon', 'Bloomberg'], frequency: 10 },
  { title: 'Jump Game Reachability', slug: 'jump-game', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'greedy', subtopic: 'greedy reach', shortGoal: 'Check if you can reach the last index.', outcome: 'Track farthest reachable position.', time: 18, prereq: ['Arrays', 'Greedy'], tests: [{ input: '5\n2 3 1 1 4', expected: 'Yes' }, { input: '5\n3 2 1 0 4', expected: 'No' }], complexity: ['O(n)', 'O(1)'], companies: ['Amazon', 'Microsoft'], frequency: 10 },
  { title: 'Jump Game II', slug: 'jump-game-ii', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'greedy', subtopic: 'BFS jumps', shortGoal: 'Find minimum jumps to reach the end.', outcome: 'Treat as BFS with level = jump count.', time: 28, prereq: ['Jump game'], tests: [{ input: '5\n2 3 1 1 4', expected: '2' }], complexity: ['O(n)', 'O(1)'], companies: ['Amazon', 'Google'], frequency: 9 },
  { title: 'Gas Station Circuit', slug: 'gas-station-circuit', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'greedy', subtopic: 'circular greedy', shortGoal: 'Find starting gas station for a full circuit.', outcome: 'Track deficit and reset start when tank goes negative.', time: 30, prereq: ['Greedy'], tests: [{ input: '5\n1 2 3 4 5\n3 4 5 1 2', expected: '3' }], complexity: ['O(n)', 'O(1)'], companies: ['Amazon', 'Bloomberg'], frequency: 8 },
  { title: 'Task Scheduler', slug: 'task-scheduler', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'greedy', subtopic: 'frequency scheduling', shortGoal: 'Find minimum intervals to execute all tasks.', outcome: 'Most frequent task dictates the frame size.', time: 35, prereq: ['Greedy', 'Hashing'], tests: [{ input: '6 2\nA A A B B B', expected: '8' }], complexity: ['O(n)', 'O(1)'], companies: ['Facebook', 'Amazon', 'Microsoft'], frequency: 10 },
  // BIT MANIPULATION
  { title: 'Power of Two Check', slug: 'power-of-two', difficulty: 'Beginner', rankTier: 'Silver', topic: 'bit manipulation', subtopic: 'bit trick', shortGoal: 'Check if a number is a power of two.', outcome: 'Use n & (n-1) == 0 trick.', time: 8, prereq: ['Operators'], tests: [{ input: '16', expected: 'Yes' }, { input: '18', expected: 'No' }], complexity: ['O(1)', 'O(1)'], companies: ['Google', 'Apple'], frequency: 8 },
  { title: 'Reverse Bits', slug: 'reverse-bits', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'bit manipulation', subtopic: 'bit reversal', shortGoal: 'Reverse the bits of a 32-bit integer.', outcome: 'Extract LSB and build result from MSB.', time: 20, prereq: ['Bit manipulation'], tests: [{ input: '43261596', expected: '964176192' }], complexity: ['O(1)', 'O(1)'], companies: ['Apple', 'Amazon'], frequency: 7 },
  { title: 'Missing Two Numbers', slug: 'missing-two-numbers', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'bit manipulation', subtopic: 'XOR partition', shortGoal: 'Find two missing numbers from 1 to n.', outcome: 'XOR all then split using rightmost set bit.', time: 35, prereq: ['XOR', 'Bit manipulation'], tests: [{ input: '5\n1 3 5', expected: '2 4' }], complexity: ['O(n)', 'O(1)'], companies: ['Google', 'Microsoft'], frequency: 8 },
  { title: 'Counting Bits Array', slug: 'counting-bits-array', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'bit manipulation', subtopic: 'DP bits', shortGoal: 'Count set bits for every number 0 to n.', outcome: 'Use dp[i] = dp[i >> 1] + (i & 1).', time: 18, prereq: ['Bit manipulation', 'DP'], tests: [{ input: '5', expected: '0 1 1 2 1 2' }], complexity: ['O(n)', 'O(n)'], companies: ['Amazon'], frequency: 8 },
  // BACKTRACKING
  { title: 'Permutations Generator', slug: 'permutations-generator', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'backtracking', subtopic: 'permutation tree', shortGoal: 'Generate all permutations of distinct numbers.', outcome: 'Swap elements and recurse at each position.', time: 28, prereq: ['Recursion', 'Backtracking'], tests: [{ input: '3\n1 2 3', expected: '6' }], complexity: ['O(n!)', 'O(n)'], companies: ['Amazon', 'Microsoft', 'Facebook'], frequency: 10 },
  { title: 'Combination Sum', slug: 'combination-sum', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'backtracking', subtopic: 'unbounded choices', shortGoal: 'Find all unique combinations summing to target.', outcome: 'Allow reuse of same element, prune early.', time: 30, prereq: ['Backtracking'], tests: [{ input: '4 7\n2 3 6 7', expected: '2' }], complexity: ['O(2^t)', 'O(t)'], companies: ['Amazon', 'Airbnb', 'Facebook'], frequency: 10 },
  { title: 'Sudoku Solver', slug: 'sudoku-solver', difficulty: 'Expert', rankTier: 'Diamond', topic: 'backtracking', subtopic: 'constraint propagation', shortGoal: 'Fill a 9x9 Sudoku board.', outcome: 'Try 1-9 at each empty cell with row/col/box checks.', time: 50, prereq: ['Backtracking', 'Matrices'], tests: [{ input: 'Sudoku Board', expected: 'Solved Board' }], complexity: ['O(9^empty)', 'O(1)'], companies: ['Amazon', 'Google', 'Microsoft'], frequency: 9 },
  { title: 'Letter Combinations Phone', slug: 'letter-combinations-phone', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'backtracking', subtopic: 'mapping + recursion', shortGoal: 'Generate all letter combos for phone digits.', outcome: 'Map digits to letters and recurse.', time: 20, prereq: ['Recursion'], tests: [{ input: '23', expected: '9' }], complexity: ['O(4^n)', 'O(n)'], companies: ['Amazon', 'Facebook', 'Google'], frequency: 9 },
  // HEAPS
  { title: 'Kth Largest in Stream', slug: 'kth-largest-stream', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'heaps', subtopic: 'min heap size k', shortGoal: 'Maintain the kth largest element dynamically.', outcome: 'Use a min-heap of size k.', time: 22, prereq: ['Heaps'], tests: [{ input: '3 4\n4 5 8 2\n3\n5\n10\n9\n4', expected: '4\n5\n5\n8\n8' }], complexity: ['O(n log k)', 'O(k)'], companies: ['Amazon', 'Facebook'], frequency: 9 },
  { title: 'Find Median from Data Stream', slug: 'find-median-stream', difficulty: 'Expert', rankTier: 'Diamond', topic: 'heaps', subtopic: 'two heaps', shortGoal: 'Find median as numbers arrive one by one.', outcome: 'Balance a max-heap and min-heap.', time: 40, prereq: ['Heaps'], tests: [{ input: '4\nadd 1\nadd 2\nmedian\nadd 3\nmedian', expected: '1.5\n2' }], complexity: ['O(log n) per add', 'O(n)'], companies: ['Google', 'Amazon', 'Microsoft'], frequency: 10 },
  { title: 'Reorganize String', slug: 'reorganize-string', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'heaps', subtopic: 'greedy heap', shortGoal: 'Rearrange string so no two adjacent chars are same.', outcome: 'Always pick the most frequent unused char.', time: 30, prereq: ['Heaps', 'Greedy'], tests: [{ input: 'aab', expected: 'aba' }], complexity: ['O(n log k)', 'O(k)'], companies: ['Amazon', 'Google', 'Facebook'], frequency: 9 },
  {
  "title": "Water Bottles",
  "slug": "water-bottles",
  "difficulty": "Beginner",
  "rankTier": "Silver",
  "topic": "greedy",
  "subtopic": "simulation",
  "shortGoal": "Find the maximum number of water bottles you can drink.",
  "outcome": "Simulate the exchange process step by step.",
  "time": 15,
  "prereq": [
    "Loops"
  ],
  "tests": [
    {
      "input": "9 3",
      "expected": "13"
    },
    {
      "input": "15 4",
      "expected": "19"
    }
  ],
  "hiddenTests": [
    {
      "input": "1 2",
      "expected": "1"
    },
    {
      "input": "1 4",
      "expected": "1"
    },
    {
      "input": "1 6",
      "expected": "1"
    },
    {
      "input": "1 8",
      "expected": "1"
    },
    {
      "input": "1 10",
      "expected": "1"
    },
    {
      "input": "1 12",
      "expected": "1"
    },
    {
      "input": "1 14",
      "expected": "1"
    },
    {
      "input": "1 16",
      "expected": "1"
    },
    {
      "input": "1 18",
      "expected": "1"
    },
    {
      "input": "1 20",
      "expected": "1"
    },
    {
      "input": "1 22",
      "expected": "1"
    },
    {
      "input": "1 24",
      "expected": "1"
    },
    {
      "input": "1 26",
      "expected": "1"
    },
    {
      "input": "1 28",
      "expected": "1"
    },
    {
      "input": "1 30",
      "expected": "1"
    },
    {
      "input": "4 2",
      "expected": "7"
    },
    {
      "input": "4 4",
      "expected": "5"
    },
    {
      "input": "4 6",
      "expected": "4"
    },
    {
      "input": "4 8",
      "expected": "4"
    },
    {
      "input": "4 10",
      "expected": "4"
    },
    {
      "input": "4 12",
      "expected": "4"
    },
    {
      "input": "4 14",
      "expected": "4"
    },
    {
      "input": "4 16",
      "expected": "4"
    },
    {
      "input": "4 18",
      "expected": "4"
    },
    {
      "input": "4 20",
      "expected": "4"
    },
    {
      "input": "4 22",
      "expected": "4"
    },
    {
      "input": "4 24",
      "expected": "4"
    },
    {
      "input": "4 26",
      "expected": "4"
    },
    {
      "input": "4 28",
      "expected": "4"
    },
    {
      "input": "4 30",
      "expected": "4"
    },
    {
      "input": "7 2",
      "expected": "13"
    },
    {
      "input": "7 4",
      "expected": "9"
    },
    {
      "input": "7 6",
      "expected": "8"
    },
    {
      "input": "7 8",
      "expected": "7"
    },
    {
      "input": "7 10",
      "expected": "7"
    },
    {
      "input": "7 12",
      "expected": "7"
    },
    {
      "input": "7 14",
      "expected": "7"
    },
    {
      "input": "7 16",
      "expected": "7"
    },
    {
      "input": "7 18",
      "expected": "7"
    },
    {
      "input": "7 20",
      "expected": "7"
    },
    {
      "input": "7 22",
      "expected": "7"
    },
    {
      "input": "7 24",
      "expected": "7"
    },
    {
      "input": "7 26",
      "expected": "7"
    },
    {
      "input": "7 28",
      "expected": "7"
    },
    {
      "input": "7 30",
      "expected": "7"
    },
    {
      "input": "10 2",
      "expected": "19"
    },
    {
      "input": "10 4",
      "expected": "13"
    },
    {
      "input": "10 6",
      "expected": "11"
    },
    {
      "input": "10 8",
      "expected": "11"
    },
    {
      "input": "10 10",
      "expected": "11"
    },
    {
      "input": "10 12",
      "expected": "10"
    },
    {
      "input": "10 14",
      "expected": "10"
    },
    {
      "input": "10 16",
      "expected": "10"
    },
    {
      "input": "10 18",
      "expected": "10"
    },
    {
      "input": "10 20",
      "expected": "10"
    },
    {
      "input": "10 22",
      "expected": "10"
    },
    {
      "input": "10 24",
      "expected": "10"
    },
    {
      "input": "10 26",
      "expected": "10"
    },
    {
      "input": "10 28",
      "expected": "10"
    },
    {
      "input": "10 30",
      "expected": "10"
    },
    {
      "input": "13 2",
      "expected": "25"
    },
    {
      "input": "13 4",
      "expected": "17"
    },
    {
      "input": "13 6",
      "expected": "15"
    },
    {
      "input": "13 8",
      "expected": "14"
    },
    {
      "input": "13 10",
      "expected": "14"
    },
    {
      "input": "13 12",
      "expected": "14"
    },
    {
      "input": "13 14",
      "expected": "13"
    },
    {
      "input": "13 16",
      "expected": "13"
    },
    {
      "input": "13 18",
      "expected": "13"
    },
    {
      "input": "13 20",
      "expected": "13"
    },
    {
      "input": "13 22",
      "expected": "13"
    },
    {
      "input": "13 24",
      "expected": "13"
    },
    {
      "input": "13 26",
      "expected": "13"
    },
    {
      "input": "13 28",
      "expected": "13"
    },
    {
      "input": "13 30",
      "expected": "13"
    },
    {
      "input": "16 2",
      "expected": "31"
    },
    {
      "input": "16 4",
      "expected": "21"
    },
    {
      "input": "16 6",
      "expected": "19"
    },
    {
      "input": "16 8",
      "expected": "18"
    },
    {
      "input": "16 10",
      "expected": "17"
    },
    {
      "input": "16 12",
      "expected": "17"
    },
    {
      "input": "16 14",
      "expected": "17"
    },
    {
      "input": "16 16",
      "expected": "17"
    },
    {
      "input": "16 18",
      "expected": "16"
    },
    {
      "input": "16 20",
      "expected": "16"
    },
    {
      "input": "16 22",
      "expected": "16"
    },
    {
      "input": "16 24",
      "expected": "16"
    },
    {
      "input": "16 26",
      "expected": "16"
    },
    {
      "input": "16 28",
      "expected": "16"
    },
    {
      "input": "16 30",
      "expected": "16"
    },
    {
      "input": "19 2",
      "expected": "37"
    },
    {
      "input": "19 4",
      "expected": "25"
    },
    {
      "input": "19 6",
      "expected": "22"
    },
    {
      "input": "19 8",
      "expected": "21"
    },
    {
      "input": "19 10",
      "expected": "21"
    },
    {
      "input": "19 12",
      "expected": "20"
    },
    {
      "input": "19 14",
      "expected": "20"
    },
    {
      "input": "19 16",
      "expected": "20"
    },
    {
      "input": "19 18",
      "expected": "20"
    },
    {
      "input": "19 20",
      "expected": "19"
    },
    {
      "input": "19 22",
      "expected": "19"
    },
    {
      "input": "19 24",
      "expected": "19"
    },
    {
      "input": "19 26",
      "expected": "19"
    },
    {
      "input": "19 28",
      "expected": "19"
    },
    {
      "input": "19 30",
      "expected": "19"
    },
    {
      "input": "22 2",
      "expected": "43"
    },
    {
      "input": "22 4",
      "expected": "29"
    },
    {
      "input": "22 6",
      "expected": "26"
    },
    {
      "input": "22 8",
      "expected": "25"
    },
    {
      "input": "22 10",
      "expected": "24"
    },
    {
      "input": "22 12",
      "expected": "23"
    },
    {
      "input": "22 14",
      "expected": "23"
    },
    {
      "input": "22 16",
      "expected": "23"
    },
    {
      "input": "22 18",
      "expected": "23"
    },
    {
      "input": "22 20",
      "expected": "23"
    },
    {
      "input": "22 22",
      "expected": "23"
    },
    {
      "input": "22 24",
      "expected": "22"
    },
    {
      "input": "22 26",
      "expected": "22"
    },
    {
      "input": "22 28",
      "expected": "22"
    },
    {
      "input": "22 30",
      "expected": "22"
    },
    {
      "input": "25 2",
      "expected": "49"
    },
    {
      "input": "25 4",
      "expected": "33"
    },
    {
      "input": "25 6",
      "expected": "29"
    },
    {
      "input": "25 8",
      "expected": "28"
    },
    {
      "input": "25 10",
      "expected": "27"
    },
    {
      "input": "25 12",
      "expected": "27"
    },
    {
      "input": "25 14",
      "expected": "26"
    },
    {
      "input": "25 16",
      "expected": "26"
    },
    {
      "input": "25 18",
      "expected": "26"
    },
    {
      "input": "25 20",
      "expected": "26"
    },
    {
      "input": "25 22",
      "expected": "26"
    },
    {
      "input": "25 24",
      "expected": "26"
    },
    {
      "input": "25 26",
      "expected": "25"
    },
    {
      "input": "25 28",
      "expected": "25"
    },
    {
      "input": "25 30",
      "expected": "25"
    },
    {
      "input": "28 2",
      "expected": "55"
    },
    {
      "input": "28 4",
      "expected": "37"
    },
    {
      "input": "28 6",
      "expected": "33"
    },
    {
      "input": "28 8",
      "expected": "31"
    },
    {
      "input": "28 10",
      "expected": "31"
    },
    {
      "input": "28 12",
      "expected": "30"
    },
    {
      "input": "28 14",
      "expected": "30"
    },
    {
      "input": "28 16",
      "expected": "29"
    },
    {
      "input": "28 18",
      "expected": "29"
    },
    {
      "input": "28 20",
      "expected": "29"
    },
    {
      "input": "28 22",
      "expected": "29"
    },
    {
      "input": "28 24",
      "expected": "29"
    },
    {
      "input": "28 26",
      "expected": "29"
    },
    {
      "input": "28 28",
      "expected": "29"
    },
    {
      "input": "28 30",
      "expected": "28"
    },
    {
      "input": "31 2",
      "expected": "61"
    },
    {
      "input": "31 4",
      "expected": "41"
    },
    {
      "input": "31 6",
      "expected": "37"
    },
    {
      "input": "31 8",
      "expected": "35"
    },
    {
      "input": "31 10",
      "expected": "34"
    },
    {
      "input": "31 12",
      "expected": "33"
    },
    {
      "input": "31 14",
      "expected": "33"
    },
    {
      "input": "31 16",
      "expected": "33"
    },
    {
      "input": "31 18",
      "expected": "32"
    },
    {
      "input": "31 20",
      "expected": "32"
    },
    {
      "input": "31 22",
      "expected": "32"
    },
    {
      "input": "31 24",
      "expected": "32"
    },
    {
      "input": "31 26",
      "expected": "32"
    },
    {
      "input": "31 28",
      "expected": "32"
    },
    {
      "input": "31 30",
      "expected": "32"
    },
    {
      "input": "34 2",
      "expected": "67"
    },
    {
      "input": "34 4",
      "expected": "45"
    },
    {
      "input": "34 6",
      "expected": "40"
    },
    {
      "input": "34 8",
      "expected": "38"
    },
    {
      "input": "34 10",
      "expected": "37"
    },
    {
      "input": "34 12",
      "expected": "37"
    },
    {
      "input": "34 14",
      "expected": "36"
    },
    {
      "input": "34 16",
      "expected": "36"
    },
    {
      "input": "34 18",
      "expected": "35"
    },
    {
      "input": "34 20",
      "expected": "35"
    },
    {
      "input": "34 22",
      "expected": "35"
    },
    {
      "input": "34 24",
      "expected": "35"
    },
    {
      "input": "34 26",
      "expected": "35"
    },
    {
      "input": "34 28",
      "expected": "35"
    },
    {
      "input": "34 30",
      "expected": "35"
    },
    {
      "input": "37 2",
      "expected": "73"
    },
    {
      "input": "37 4",
      "expected": "49"
    },
    {
      "input": "37 6",
      "expected": "44"
    },
    {
      "input": "37 8",
      "expected": "42"
    },
    {
      "input": "37 10",
      "expected": "41"
    },
    {
      "input": "37 12",
      "expected": "40"
    },
    {
      "input": "37 14",
      "expected": "39"
    },
    {
      "input": "37 16",
      "expected": "39"
    },
    {
      "input": "37 18",
      "expected": "39"
    },
    {
      "input": "37 20",
      "expected": "38"
    },
    {
      "input": "37 22",
      "expected": "38"
    },
    {
      "input": "37 24",
      "expected": "38"
    },
    {
      "input": "37 26",
      "expected": "38"
    },
    {
      "input": "37 28",
      "expected": "38"
    },
    {
      "input": "37 30",
      "expected": "38"
    },
    {
      "input": "40 2",
      "expected": "79"
    },
    {
      "input": "40 4",
      "expected": "53"
    },
    {
      "input": "40 6",
      "expected": "47"
    },
    {
      "input": "40 8",
      "expected": "45"
    },
    {
      "input": "40 10",
      "expected": "44"
    },
    {
      "input": "40 12",
      "expected": "43"
    },
    {
      "input": "40 14",
      "expected": "43"
    },
    {
      "input": "40 16",
      "expected": "42"
    },
    {
      "input": "40 18",
      "expected": "42"
    },
    {
      "input": "40 20",
      "expected": "42"
    },
    {
      "input": "40 22",
      "expected": "41"
    },
    {
      "input": "40 24",
      "expected": "41"
    },
    {
      "input": "40 26",
      "expected": "41"
    },
    {
      "input": "40 28",
      "expected": "41"
    },
    {
      "input": "40 30",
      "expected": "41"
    },
    {
      "input": "43 2",
      "expected": "85"
    },
    {
      "input": "43 4",
      "expected": "57"
    },
    {
      "input": "43 6",
      "expected": "51"
    },
    {
      "input": "43 8",
      "expected": "49"
    },
    {
      "input": "43 10",
      "expected": "47"
    },
    {
      "input": "43 12",
      "expected": "46"
    },
    {
      "input": "43 14",
      "expected": "46"
    },
    {
      "input": "43 16",
      "expected": "45"
    },
    {
      "input": "43 18",
      "expected": "45"
    },
    {
      "input": "43 20",
      "expected": "45"
    },
    {
      "input": "43 22",
      "expected": "45"
    },
    {
      "input": "43 24",
      "expected": "44"
    },
    {
      "input": "43 26",
      "expected": "44"
    },
    {
      "input": "43 28",
      "expected": "44"
    },
    {
      "input": "43 30",
      "expected": "44"
    },
    {
      "input": "46 2",
      "expected": "91"
    },
    {
      "input": "46 4",
      "expected": "61"
    },
    {
      "input": "46 6",
      "expected": "55"
    },
    {
      "input": "46 8",
      "expected": "52"
    },
    {
      "input": "46 10",
      "expected": "51"
    },
    {
      "input": "46 12",
      "expected": "50"
    },
    {
      "input": "46 14",
      "expected": "49"
    },
    {
      "input": "46 16",
      "expected": "49"
    },
    {
      "input": "46 18",
      "expected": "48"
    },
    {
      "input": "46 20",
      "expected": "48"
    },
    {
      "input": "46 22",
      "expected": "48"
    },
    {
      "input": "46 24",
      "expected": "47"
    },
    {
      "input": "46 26",
      "expected": "47"
    },
    {
      "input": "46 28",
      "expected": "47"
    },
    {
      "input": "46 30",
      "expected": "47"
    },
    {
      "input": "49 2",
      "expected": "97"
    },
    {
      "input": "49 4",
      "expected": "65"
    },
    {
      "input": "49 6",
      "expected": "58"
    },
    {
      "input": "49 8",
      "expected": "55"
    },
    {
      "input": "49 10",
      "expected": "54"
    },
    {
      "input": "49 12",
      "expected": "53"
    },
    {
      "input": "49 14",
      "expected": "52"
    },
    {
      "input": "49 16",
      "expected": "52"
    },
    {
      "input": "49 18",
      "expected": "51"
    },
    {
      "input": "49 20",
      "expected": "51"
    },
    {
      "input": "49 22",
      "expected": "51"
    },
    {
      "input": "49 24",
      "expected": "51"
    },
    {
      "input": "49 26",
      "expected": "50"
    },
    {
      "input": "49 28",
      "expected": "50"
    },
    {
      "input": "49 30",
      "expected": "50"
    },
    {
      "input": "52 2",
      "expected": "103"
    },
    {
      "input": "52 4",
      "expected": "69"
    },
    {
      "input": "52 6",
      "expected": "62"
    },
    {
      "input": "52 8",
      "expected": "59"
    },
    {
      "input": "52 10",
      "expected": "57"
    },
    {
      "input": "52 12",
      "expected": "56"
    },
    {
      "input": "52 14",
      "expected": "55"
    },
    {
      "input": "52 16",
      "expected": "55"
    },
    {
      "input": "52 18",
      "expected": "55"
    },
    {
      "input": "52 20",
      "expected": "54"
    },
    {
      "input": "52 22",
      "expected": "54"
    },
    {
      "input": "52 24",
      "expected": "54"
    },
    {
      "input": "52 26",
      "expected": "54"
    },
    {
      "input": "52 28",
      "expected": "53"
    },
    {
      "input": "52 30",
      "expected": "53"
    },
    {
      "input": "55 2",
      "expected": "109"
    },
    {
      "input": "55 4",
      "expected": "73"
    },
    {
      "input": "55 6",
      "expected": "65"
    },
    {
      "input": "55 8",
      "expected": "62"
    },
    {
      "input": "55 10",
      "expected": "61"
    },
    {
      "input": "55 12",
      "expected": "59"
    },
    {
      "input": "55 14",
      "expected": "59"
    },
    {
      "input": "55 16",
      "expected": "58"
    },
    {
      "input": "55 18",
      "expected": "58"
    },
    {
      "input": "55 20",
      "expected": "57"
    },
    {
      "input": "55 22",
      "expected": "57"
    },
    {
      "input": "55 24",
      "expected": "57"
    },
    {
      "input": "55 26",
      "expected": "57"
    },
    {
      "input": "55 28",
      "expected": "57"
    },
    {
      "input": "55 30",
      "expected": "56"
    },
    {
      "input": "58 2",
      "expected": "115"
    },
    {
      "input": "58 4",
      "expected": "77"
    },
    {
      "input": "58 6",
      "expected": "69"
    },
    {
      "input": "58 8",
      "expected": "66"
    },
    {
      "input": "58 10",
      "expected": "64"
    },
    {
      "input": "58 12",
      "expected": "63"
    },
    {
      "input": "58 14",
      "expected": "62"
    },
    {
      "input": "58 16",
      "expected": "61"
    },
    {
      "input": "58 18",
      "expected": "61"
    },
    {
      "input": "58 20",
      "expected": "61"
    },
    {
      "input": "58 22",
      "expected": "60"
    },
    {
      "input": "58 24",
      "expected": "60"
    },
    {
      "input": "58 26",
      "expected": "60"
    },
    {
      "input": "58 28",
      "expected": "60"
    },
    {
      "input": "58 30",
      "expected": "59"
    },
    {
      "input": "61 2",
      "expected": "121"
    },
    {
      "input": "61 4",
      "expected": "81"
    },
    {
      "input": "61 6",
      "expected": "73"
    },
    {
      "input": "61 8",
      "expected": "69"
    },
    {
      "input": "61 10",
      "expected": "67"
    },
    {
      "input": "61 12",
      "expected": "66"
    },
    {
      "input": "61 14",
      "expected": "65"
    },
    {
      "input": "61 16",
      "expected": "65"
    },
    {
      "input": "61 18",
      "expected": "64"
    },
    {
      "input": "61 20",
      "expected": "64"
    },
    {
      "input": "61 22",
      "expected": "63"
    },
    {
      "input": "61 24",
      "expected": "63"
    },
    {
      "input": "61 26",
      "expected": "63"
    },
    {
      "input": "61 28",
      "expected": "63"
    },
    {
      "input": "61 30",
      "expected": "63"
    },
    {
      "input": "64 2",
      "expected": "127"
    },
    {
      "input": "64 4",
      "expected": "85"
    },
    {
      "input": "64 6",
      "expected": "76"
    },
    {
      "input": "64 8",
      "expected": "73"
    },
    {
      "input": "64 10",
      "expected": "71"
    },
    {
      "input": "64 12",
      "expected": "69"
    },
    {
      "input": "64 14",
      "expected": "68"
    },
    {
      "input": "64 16",
      "expected": "68"
    },
    {
      "input": "64 18",
      "expected": "67"
    },
    {
      "input": "64 20",
      "expected": "67"
    },
    {
      "input": "64 22",
      "expected": "67"
    },
    {
      "input": "64 24",
      "expected": "66"
    },
    {
      "input": "64 26",
      "expected": "66"
    },
    {
      "input": "64 28",
      "expected": "66"
    },
    {
      "input": "64 30",
      "expected": "66"
    },
    {
      "input": "67 2",
      "expected": "133"
    },
    {
      "input": "67 4",
      "expected": "89"
    },
    {
      "input": "67 6",
      "expected": "80"
    },
    {
      "input": "67 8",
      "expected": "76"
    },
    {
      "input": "67 10",
      "expected": "74"
    },
    {
      "input": "67 12",
      "expected": "73"
    },
    {
      "input": "67 14",
      "expected": "72"
    },
    {
      "input": "67 16",
      "expected": "71"
    },
    {
      "input": "67 18",
      "expected": "70"
    },
    {
      "input": "67 20",
      "expected": "70"
    },
    {
      "input": "67 22",
      "expected": "70"
    },
    {
      "input": "67 24",
      "expected": "69"
    },
    {
      "input": "67 26",
      "expected": "69"
    },
    {
      "input": "67 28",
      "expected": "69"
    },
    {
      "input": "67 30",
      "expected": "69"
    },
    {
      "input": "70 2",
      "expected": "139"
    },
    {
      "input": "70 4",
      "expected": "93"
    },
    {
      "input": "70 6",
      "expected": "83"
    },
    {
      "input": "70 8",
      "expected": "79"
    },
    {
      "input": "70 10",
      "expected": "77"
    },
    {
      "input": "70 12",
      "expected": "76"
    },
    {
      "input": "70 14",
      "expected": "75"
    },
    {
      "input": "70 16",
      "expected": "74"
    },
    {
      "input": "70 18",
      "expected": "74"
    },
    {
      "input": "70 20",
      "expected": "73"
    },
    {
      "input": "70 22",
      "expected": "73"
    },
    {
      "input": "70 24",
      "expected": "73"
    },
    {
      "input": "70 26",
      "expected": "72"
    },
    {
      "input": "70 28",
      "expected": "72"
    },
    {
      "input": "70 30",
      "expected": "72"
    },
    {
      "input": "73 2",
      "expected": "145"
    },
    {
      "input": "73 4",
      "expected": "97"
    },
    {
      "input": "73 6",
      "expected": "87"
    },
    {
      "input": "73 8",
      "expected": "83"
    },
    {
      "input": "73 10",
      "expected": "81"
    },
    {
      "input": "73 12",
      "expected": "79"
    },
    {
      "input": "73 14",
      "expected": "78"
    },
    {
      "input": "73 16",
      "expected": "77"
    },
    {
      "input": "73 18",
      "expected": "77"
    },
    {
      "input": "73 20",
      "expected": "76"
    },
    {
      "input": "73 22",
      "expected": "76"
    },
    {
      "input": "73 24",
      "expected": "76"
    },
    {
      "input": "73 26",
      "expected": "75"
    },
    {
      "input": "73 28",
      "expected": "75"
    },
    {
      "input": "73 30",
      "expected": "75"
    },
    {
      "input": "76 2",
      "expected": "151"
    },
    {
      "input": "76 4",
      "expected": "101"
    },
    {
      "input": "76 6",
      "expected": "91"
    },
    {
      "input": "76 8",
      "expected": "86"
    },
    {
      "input": "76 10",
      "expected": "84"
    },
    {
      "input": "76 12",
      "expected": "82"
    },
    {
      "input": "76 14",
      "expected": "81"
    },
    {
      "input": "76 16",
      "expected": "81"
    },
    {
      "input": "76 18",
      "expected": "80"
    },
    {
      "input": "76 20",
      "expected": "79"
    },
    {
      "input": "76 22",
      "expected": "79"
    },
    {
      "input": "76 24",
      "expected": "79"
    },
    {
      "input": "76 26",
      "expected": "79"
    },
    {
      "input": "76 28",
      "expected": "78"
    },
    {
      "input": "76 30",
      "expected": "78"
    },
    {
      "input": "79 2",
      "expected": "157"
    },
    {
      "input": "79 4",
      "expected": "105"
    },
    {
      "input": "79 6",
      "expected": "94"
    },
    {
      "input": "79 8",
      "expected": "90"
    },
    {
      "input": "79 10",
      "expected": "87"
    },
    {
      "input": "79 12",
      "expected": "86"
    },
    {
      "input": "79 14",
      "expected": "85"
    },
    {
      "input": "79 16",
      "expected": "84"
    },
    {
      "input": "79 18",
      "expected": "83"
    },
    {
      "input": "79 20",
      "expected": "83"
    },
    {
      "input": "79 22",
      "expected": "82"
    },
    {
      "input": "79 24",
      "expected": "82"
    },
    {
      "input": "79 26",
      "expected": "82"
    },
    {
      "input": "79 28",
      "expected": "81"
    },
    {
      "input": "79 30",
      "expected": "81"
    },
    {
      "input": "82 2",
      "expected": "163"
    },
    {
      "input": "82 4",
      "expected": "109"
    },
    {
      "input": "82 6",
      "expected": "98"
    },
    {
      "input": "82 8",
      "expected": "93"
    },
    {
      "input": "82 10",
      "expected": "91"
    },
    {
      "input": "82 12",
      "expected": "89"
    },
    {
      "input": "82 14",
      "expected": "88"
    },
    {
      "input": "82 16",
      "expected": "87"
    },
    {
      "input": "82 18",
      "expected": "86"
    },
    {
      "input": "82 20",
      "expected": "86"
    },
    {
      "input": "82 22",
      "expected": "85"
    },
    {
      "input": "82 24",
      "expected": "85"
    },
    {
      "input": "82 26",
      "expected": "85"
    },
    {
      "input": "82 28",
      "expected": "85"
    },
    {
      "input": "82 30",
      "expected": "84"
    },
    {
      "input": "85 2",
      "expected": "169"
    },
    {
      "input": "85 4",
      "expected": "113"
    },
    {
      "input": "85 6",
      "expected": "101"
    },
    {
      "input": "85 8",
      "expected": "97"
    },
    {
      "input": "85 10",
      "expected": "94"
    },
    {
      "input": "85 12",
      "expected": "92"
    },
    {
      "input": "85 14",
      "expected": "91"
    },
    {
      "input": "85 16",
      "expected": "90"
    },
    {
      "input": "85 18",
      "expected": "89"
    },
    {
      "input": "85 20",
      "expected": "89"
    },
    {
      "input": "85 22",
      "expected": "89"
    },
    {
      "input": "85 24",
      "expected": "88"
    },
    {
      "input": "85 26",
      "expected": "88"
    },
    {
      "input": "85 28",
      "expected": "88"
    },
    {
      "input": "85 30",
      "expected": "87"
    },
    {
      "input": "88 2",
      "expected": "175"
    },
    {
      "input": "88 4",
      "expected": "117"
    },
    {
      "input": "88 6",
      "expected": "105"
    },
    {
      "input": "88 8",
      "expected": "100"
    },
    {
      "input": "88 10",
      "expected": "97"
    },
    {
      "input": "88 12",
      "expected": "95"
    },
    {
      "input": "88 14",
      "expected": "94"
    },
    {
      "input": "88 16",
      "expected": "93"
    },
    {
      "input": "88 18",
      "expected": "93"
    },
    {
      "input": "88 20",
      "expected": "92"
    },
    {
      "input": "88 22",
      "expected": "92"
    },
    {
      "input": "88 24",
      "expected": "91"
    },
    {
      "input": "88 26",
      "expected": "91"
    },
    {
      "input": "88 28",
      "expected": "91"
    },
    {
      "input": "88 30",
      "expected": "91"
    },
    {
      "input": "91 2",
      "expected": "181"
    },
    {
      "input": "91 4",
      "expected": "121"
    },
    {
      "input": "91 6",
      "expected": "109"
    },
    {
      "input": "91 8",
      "expected": "103"
    },
    {
      "input": "91 10",
      "expected": "101"
    },
    {
      "input": "91 12",
      "expected": "99"
    },
    {
      "input": "91 14",
      "expected": "97"
    },
    {
      "input": "91 16",
      "expected": "97"
    },
    {
      "input": "91 18",
      "expected": "96"
    },
    {
      "input": "91 20",
      "expected": "95"
    },
    {
      "input": "91 22",
      "expected": "95"
    },
    {
      "input": "91 24",
      "expected": "94"
    },
    {
      "input": "91 26",
      "expected": "94"
    },
    {
      "input": "91 28",
      "expected": "94"
    },
    {
      "input": "91 30",
      "expected": "94"
    },
    {
      "input": "94 2",
      "expected": "187"
    },
    {
      "input": "94 4",
      "expected": "125"
    },
    {
      "input": "94 6",
      "expected": "112"
    },
    {
      "input": "94 8",
      "expected": "107"
    },
    {
      "input": "94 10",
      "expected": "104"
    },
    {
      "input": "94 12",
      "expected": "102"
    },
    {
      "input": "94 14",
      "expected": "101"
    },
    {
      "input": "94 16",
      "expected": "100"
    },
    {
      "input": "94 18",
      "expected": "99"
    },
    {
      "input": "94 20",
      "expected": "98"
    },
    {
      "input": "94 22",
      "expected": "98"
    },
    {
      "input": "94 24",
      "expected": "98"
    },
    {
      "input": "94 26",
      "expected": "97"
    },
    {
      "input": "94 28",
      "expected": "97"
    },
    {
      "input": "94 30",
      "expected": "97"
    },
    {
      "input": "97 2",
      "expected": "193"
    },
    {
      "input": "97 4",
      "expected": "129"
    },
    {
      "input": "97 6",
      "expected": "116"
    },
    {
      "input": "97 8",
      "expected": "110"
    },
    {
      "input": "97 10",
      "expected": "107"
    },
    {
      "input": "97 12",
      "expected": "105"
    },
    {
      "input": "97 14",
      "expected": "104"
    },
    {
      "input": "97 16",
      "expected": "103"
    },
    {
      "input": "97 18",
      "expected": "102"
    },
    {
      "input": "97 20",
      "expected": "102"
    },
    {
      "input": "97 22",
      "expected": "101"
    },
    {
      "input": "97 24",
      "expected": "101"
    },
    {
      "input": "97 26",
      "expected": "100"
    },
    {
      "input": "97 28",
      "expected": "100"
    },
    {
      "input": "97 30",
      "expected": "100"
    },
    {
      "input": "100 2",
      "expected": "199"
    },
    {
      "input": "100 4",
      "expected": "133"
    },
    {
      "input": "100 6",
      "expected": "119"
    },
    {
      "input": "100 8",
      "expected": "114"
    },
    {
      "input": "100 10",
      "expected": "111"
    },
    {
      "input": "100 12",
      "expected": "109"
    },
    {
      "input": "100 14",
      "expected": "107"
    },
    {
      "input": "100 16",
      "expected": "106"
    },
    {
      "input": "100 18",
      "expected": "105"
    },
    {
      "input": "100 20",
      "expected": "105"
    },
    {
      "input": "100 22",
      "expected": "104"
    },
    {
      "input": "100 24",
      "expected": "104"
    },
    {
      "input": "100 26",
      "expected": "103"
    },
    {
      "input": "100 28",
      "expected": "103"
    },
    {
      "input": "100 30",
      "expected": "103"
    }
  ],
  "complexity": [
    "O(log_exchange N)",
    "O(1)"
  ],
  "companies": [
    "Amazon"
  ],
  "frequency": 8
}
];
