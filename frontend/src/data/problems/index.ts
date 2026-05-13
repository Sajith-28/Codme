import type { ProblemSeed } from '../problems';
import { initialSeeds } from './initial';
import { arraySeeds } from './arrays';
import { stringsAdvancedSeeds } from './strings-advanced';
import { treesGraphsSeeds } from './trees-graphs';
import { dpAdvancedSeeds } from './dp-advanced';
import { linkedListsStacksSeeds } from './linkedlists-stacks';
import { intervalsGreedyBitsSeeds } from './intervals-greedy-bits';
import { beginnerExtraSeeds } from './beginner-extra';

/**
 * CODME Problem Bank — Modular Index
 *
 * Architecture:
 *   initial.ts          — Original 123 core roadmap problems
 *   arrays.ts           — Extra array/matrix problems
 *   strings-advanced.ts — Advanced string patterns
 *   trees-graphs.ts     — Trees + graph traversal
 *   dp-advanced.ts      — DP patterns (coin, LIS, grid, subset)
 *   linkedlists-stacks.ts — Lists, stacks, queues
 *   intervals-greedy-bits.ts — Intervals, greedy, bits, backtracking, heaps
 *   beginner-extra.ts   — Reinforcement for beginners
 *
 * To add more problems:
 *   1. Create a new file in this folder
 *   2. Export a ProblemSeed[] array
 *   3. Import and add it to ALL_SEEDS below
 */

// Merge order matters — initial seeds define the core roadmap ordering
// New seeds are appended after, sorted by difficulty within their rank tier
const RANK_ORDER: Record<string, number> = {
  Beginner: 0,
  Silver: 1,
  Gold: 2,
  Platinum: 3,
  Diamond: 4,
  Master: 5,
  Grandmaster: 6,
  Iridescent: 7,
};

const DIFF_ORDER: Record<string, number> = {
  Basic: 0,
  Beginner: 1,
  Intermediate: 2,
  Advanced: 3,
  Expert: 4,
  Master: 5,
};

// Collect all expansion seeds (everything except initial)
const expansionSeeds: ProblemSeed[] = [
  ...beginnerExtraSeeds,
  ...arraySeeds,
  ...stringsAdvancedSeeds,
  ...treesGraphsSeeds,
  ...dpAdvancedSeeds,
  ...linkedListsStacksSeeds,
  ...intervalsGreedyBitsSeeds,
];

// Remove duplicates (by slug) — initial seeds take priority
const initialSlugs = new Set(initialSeeds.map(s => s.slug));
const uniqueExpansion = expansionSeeds.filter(s => !initialSlugs.has(s.slug));

// Sort expansion seeds by rank tier then difficulty
uniqueExpansion.sort((a, b) => {
  const rankDiff = (RANK_ORDER[a.rankTier] ?? 99) - (RANK_ORDER[b.rankTier] ?? 99);
  if (rankDiff !== 0) return rankDiff;
  return (DIFF_ORDER[a.difficulty] ?? 99) - (DIFF_ORDER[b.difficulty] ?? 99);
});

export const ALL_SEEDS: ProblemSeed[] = [...initialSeeds, ...uniqueExpansion];
