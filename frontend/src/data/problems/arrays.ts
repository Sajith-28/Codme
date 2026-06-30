import type { ProblemSeed } from './types';

export const arraySeeds: ProblemSeed[] = [
  {
    title: 'Array Product Discluding Self',
    slug: 'array-product-discluding-self',
    difficulty: 'Advanced',
    rankTier: 'Platinum',
    topic: 'arrays',
    subtopic: 'prefix suffix product',
    shortGoal: 'Calculate products of all elements except current.',
    outcome: 'Learn to avoid division using precomputed prefix/suffix products.',
    time: 25,
    prereq: ['Prefix sums'],
    tests: [{ input: '4\n1 2 3 4', expected: '24 12 8 6' }],
    complexity: ['O(n)', 'O(1) extra'],
    companies: ['Amazon', 'Google', 'Facebook', 'Apple'],
    frequency: 9,
    edgeCases: ['Zero in array', 'Multiple zeroes'],
    mistakes: ['Using division which fails with zero']
  },
  {
    title: 'Best Time to Buy and Sell Stock',
    slug: 'best-time-to-buy-and-sell-stock',
    difficulty: 'Beginner',
    rankTier: 'Silver',
    topic: 'arrays',
    subtopic: 'min tracking',
    shortGoal: 'Find maximum profit from a single buy and sell.',
    outcome: 'Master one-pass min-tracking logic.',
    time: 15,
    prereq: ['Array traversal'],
    tests: [{ input: '6\n7 1 5 3 6 4', expected: '5' }],
    complexity: ['O(n)', 'O(1)'],
    companies: ['Amazon', 'Microsoft', 'Google', 'Adobe'],
    frequency: 10
  },
  {
    title: 'Sort Colors (Dutch National Flag)',
    slug: 'sort-colors',
    difficulty: 'Intermediate',
    rankTier: 'Gold',
    topic: 'arrays',
    subtopic: 'three pointers',
    shortGoal: 'Sort 0s, 1s, and 2s in-place.',
    outcome: 'Learn the three-pointer partitioning strategy.',
    time: 20,
    prereq: ['Two pointers'],
    tests: [{ input: '6\n2 0 2 1 1 0', expected: '0 0 1 1 2 2' }],
    complexity: ['O(n)', 'O(1)'],
    companies: ['Microsoft', 'Amazon', 'Walmart'],
    frequency: 9
  },
  {
    title: 'Missing Number Finder',
    slug: 'missing-number-finder',
    difficulty: 'Beginner',
    rankTier: 'Silver',
    topic: 'arrays',
    subtopic: 'math properties',
    shortGoal: 'Find the one missing number in range [0, n].',
    outcome: 'Use mathematical sums or XOR to find gaps.',
    time: 10,
    prereq: ['Arrays'],
    tests: [{ input: '3\n3 0 1', expected: '2' }],
    complexity: ['O(n)', 'O(1)'],
    companies: ['Microsoft', 'Amazon'],
    frequency: 8
  },
  {
    title: 'Rotate Image (Matrix)',
    slug: 'rotate-image',
    difficulty: 'Advanced',
    rankTier: 'Platinum',
    topic: 'matrices',
    subtopic: 'in-place rotation',
    shortGoal: 'Rotate an n x n matrix by 90 degrees.',
    outcome: 'Learn matrix transposition and row reversal.',
    time: 30,
    prereq: ['Matrices'],
    tests: [{ input: '3\n1 2 3\n4 5 6\n7 8 9', expected: '7 4 1\n8 5 2\n9 6 3' }],
    complexity: ['O(n^2)', 'O(1)'],
    companies: ['Amazon', 'Microsoft', 'Adobe'],
    frequency: 9
  },
  {
    title: 'Maximum Points from Cards',
    slug: 'maximum-points-from-cards',
    difficulty: 'Advanced',
    rankTier: 'Platinum',
    topic: 'sliding window',
    subtopic: 'fixed size window',
    shortGoal: 'Pick k cards from either end for max sum.',
    outcome: 'Apply sliding window on a "wrap-around" or inverted logic.',
    time: 30,
    prereq: ['Sliding window'],
    tests: [{ input: '7 3\n1 2 3 4 5 6 1', expected: '12' }],
    complexity: ['O(k)', 'O(1)'],
    companies: ['Google', 'Amazon'],
    frequency: 8
  },
  {
    title: 'Find All Duplicates',
    slug: 'find-all-duplicates',
    difficulty: 'Intermediate',
    rankTier: 'Gold',
    topic: 'arrays',
    subtopic: 'array as hash map',
    shortGoal: 'Find all elements that appear twice.',
    outcome: 'Learn in-place marking using sign negation.',
    time: 20,
    prereq: ['Arrays'],
    tests: [{ input: '8\n4 3 2 7 8 2 3 1', expected: '2 3' }],
    complexity: ['O(n)', 'O(1) extra'],
    companies: ['Amazon', 'Microsoft'],
    frequency: 8
  },
  {
    title: 'Game of Life Simulator',
    slug: 'game-of-life',
    difficulty: 'Advanced',
    rankTier: 'Platinum',
    topic: 'matrices',
    subtopic: 'state encoding',
    shortGoal: 'Update a matrix based on 8 neighbors.',
    outcome: 'Learn in-place multi-state encoding.',
    time: 40,
    prereq: ['Matrices'],
    tests: [{ input: '4 3\n0 1 0\n0 0 1\n1 1 1\n0 0 0', expected: '0 0 0\n1 0 1\n0 1 1\n0 1 0' }],
    complexity: ['O(nm)', 'O(1) extra'],
    companies: ['Google', 'Uber'],
    frequency: 7
  },
  {
    title: 'Valid Sudoku Checker',
    slug: 'valid-sudoku',
    difficulty: 'Intermediate',
    rankTier: 'Gold',
    topic: 'matrices',
    subtopic: 'set validation',
    shortGoal: 'Check if a 9x9 board is valid.',
    outcome: 'Manage multiple validation sets (rows, cols, boxes).',
    time: 25,
    prereq: ['Matrices', 'Hashing'],
    tests: [{ input: 'Sudoku Board...', expected: 'Yes' }],
    complexity: ['O(1)', 'O(1)'],
    companies: ['Amazon', 'Uber'],
    frequency: 9
  },
  {
    title: 'Set Matrix Zeroes',
    slug: 'set-matrix-zeroes',
    difficulty: 'Intermediate',
    rankTier: 'Gold',
    topic: 'matrices',
    subtopic: 'in-place marking',
    shortGoal: 'Zero out rows and cols that contain a zero.',
    outcome: 'Use the first row/col as markers to save space.',
    time: 25,
    prereq: ['Matrices'],
    tests: [{ input: '3 3\n1 1 1\n1 0 1\n1 1 1', expected: '1 0 1\n0 0 0\n1 0 1' }],
    complexity: ['O(nm)', 'O(1)'],
    companies: ['Amazon', 'Microsoft'],
    frequency: 9
  },
  { title: 'Spiral Matrix II', slug: 'spiral-matrix-ii', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'matrices', subtopic: 'simulation', shortGoal: 'Generate an n x n matrix with spiral numbers.', outcome: 'Populate boundaries in spiral order.', time: 20, prereq: ['Matrices'], tests: [{ input: '3', expected: '1 2 3\n8 9 4\n7 6 5' }], complexity: ['O(n^2)', 'O(1) extra'], companies: ['Amazon'], frequency: 8 },
  { title: 'Diagonal Traverse', slug: 'diagonal-traverse', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'matrices', subtopic: 'diagonal logic', shortGoal: 'Print matrix elements in diagonal order.', outcome: 'Sum of indices i+j is constant for diagonals.', time: 25, prereq: ['Matrices'], tests: [{ input: '3 3\n1 2 3\n4 5 6\n7 8 9', expected: '1 2 4 7 5 3 6 8 9' }], complexity: ['O(nm)', 'O(1) extra'], companies: ['Google', 'Facebook'], frequency: 8 },
  { title: 'Rotate Array Left', slug: 'rotate-array-left', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'reversal', shortGoal: 'Rotate array left by k steps.', outcome: 'Reverse 0 to k, k to n, then whole array.', time: 12, prereq: ['Arrays'], tests: [{ input: '5 2\n1 2 3 4 5', expected: '3 4 5 1 2' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'First Missing Positive', slug: 'first-missing-positive', difficulty: 'Expert', rankTier: 'Diamond', topic: 'arrays', subtopic: 'index marking', shortGoal: 'Find smallest missing positive in O(n) time.', outcome: 'Place each number at its index i-1.', time: 40, prereq: ['Arrays'], tests: [{ input: '3\n1 2 0', expected: '3' }, { input: '4\n3 4 -1 1', expected: '2' }], complexity: ['O(n)', 'O(1)'], companies: ['Google', 'Amazon', 'Microsoft'], frequency: 10 },
  { title: 'Container With Most Water', slug: 'container-water', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'arrays', subtopic: 'two pointers', shortGoal: 'Find two lines that trap max water.', outcome: 'Move pointer pointing to shorter line.', time: 20, prereq: ['Two pointers'], tests: [{ input: '9\n1 8 6 2 5 4 8 3 7', expected: '49' }], complexity: ['O(n)', 'O(1)'], companies: ['Amazon', 'Google', 'Adobe'], frequency: 10 },
  { title: 'Three Sum Closest', slug: 'three-sum-closest', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'arrays', subtopic: 'two pointers + sort', shortGoal: 'Find three integers with sum closest to target.', outcome: 'Sort and use two pointers to find nearest sum.', time: 22, prereq: ['Three sum'], tests: [{ input: '4 1\n-1 2 1 -4', expected: '2' }], complexity: ['O(n^2)', 'O(1)'], companies: ['Amazon', 'Bloomberg'], frequency: 8 },
  { title: 'Subarray Sum Equals K', slug: 'subarray-sum-k', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'arrays', subtopic: 'prefix sum + hash', shortGoal: 'Count subarrays whose sum equals k.', outcome: 'Store prefix sums in a hash map.', time: 30, prereq: ['Prefix sum', 'Hashing'], tests: [{ input: '3 2\n1 1 1', expected: '2' }], complexity: ['O(n)', 'O(n)'], companies: ['Google', 'Facebook', 'Amazon'], frequency: 10 },
  { title: 'Next Permutation', slug: 'next-permutation', difficulty: 'Advanced', rankTier: 'Platinum', topic: 'arrays', subtopic: 'lexicographical order', shortGoal: 'Rearrange numbers into the next permutation.', outcome: 'Find pivot, swap, and reverse suffix.', time: 30, prereq: ['Arrays'], tests: [{ input: '3\n1 2 3', expected: '1 3 2' }], complexity: ['O(n)', 'O(1)'], companies: ['Google', 'Amazon', 'Facebook'], frequency: 10 },
  {
  "title": "Search 2D Matrix",
  "slug": "search-2d-matrix",
  "difficulty": "Intermediate",
  "rankTier": "Gold",
  "topic": "matrices",
  "subtopic": "binary search",
  "shortGoal": "Search value in sorted 2D matrix.",
  "outcome": "Treat 2D as 1D array for binary search.",
  "time": 18,
  "prereq": [
    "Binary search"
  ],
  "tests": [
    {
      "input": "3 4 3\n1 3 5 7\n10 11 16 20\n23 30 34 60",
      "expected": "Yes"
    },
    {
      "input": "1 1 1\n1",
      "expected": "Yes"
    }
  ],
  "hiddenTests": [
    {
      "input": "1 1 2\n1",
      "expected": "No"
    },
    {
      "input": "1 5 7\n1 4 7 10 13",
      "expected": "Yes"
    },
    {
      "input": "1 5 8\n1 4 7 10 13",
      "expected": "No"
    },
    {
      "input": "5 1 7\n1\n4\n7\n10\n13",
      "expected": "Yes"
    },
    {
      "input": "5 1 8\n1\n4\n7\n10\n13",
      "expected": "No"
    },
    {
      "input": "2 2 7\n1 4\n7 10",
      "expected": "Yes"
    },
    {
      "input": "2 2 8\n1 4\n7 10",
      "expected": "No"
    },
    {
      "input": "3 3 13\n1 4 7\n10 13 16\n19 22 25",
      "expected": "Yes"
    },
    {
      "input": "3 3 14\n1 4 7\n10 13 16\n19 22 25",
      "expected": "No"
    },
    {
      "input": "4 4 25\n1 4 7 10\n13 16 19 22\n25 28 31 34\n37 40 43 46",
      "expected": "Yes"
    },
    {
      "input": "4 4 26\n1 4 7 10\n13 16 19 22\n25 28 31 34\n37 40 43 46",
      "expected": "No"
    },
    {
      "input": "5 5 37\n1 4 7 10 13\n16 19 22 25 28\n31 34 37 40 43\n46 49 52 55 58\n61 64 67 70 73",
      "expected": "Yes"
    },
    {
      "input": "5 5 38\n1 4 7 10 13\n16 19 22 25 28\n31 34 37 40 43\n46 49 52 55 58\n61 64 67 70 73",
      "expected": "No"
    },
    {
      "input": "6 6 55\n1 4 7 10 13 16\n19 22 25 28 31 34\n37 40 43 46 49 52\n55 58 61 64 67 70\n73 76 79 82 85 88\n91 94 97 100 103 106",
      "expected": "Yes"
    },
    {
      "input": "6 6 56\n1 4 7 10 13 16\n19 22 25 28 31 34\n37 40 43 46 49 52\n55 58 61 64 67 70\n73 76 79 82 85 88\n91 94 97 100 103 106",
      "expected": "No"
    },
    {
      "input": "7 7 73\n1 4 7 10 13 16 19\n22 25 28 31 34 37 40\n43 46 49 52 55 58 61\n64 67 70 73 76 79 82\n85 88 91 94 97 100 103\n106 109 112 115 118 121 124\n127 130 133 136 139 142 145",
      "expected": "Yes"
    },
    {
      "input": "7 7 74\n1 4 7 10 13 16 19\n22 25 28 31 34 37 40\n43 46 49 52 55 58 61\n64 67 70 73 76 79 82\n85 88 91 94 97 100 103\n106 109 112 115 118 121 124\n127 130 133 136 139 142 145",
      "expected": "No"
    },
    {
      "input": "8 8 97\n1 4 7 10 13 16 19 22\n25 28 31 34 37 40 43 46\n49 52 55 58 61 64 67 70\n73 76 79 82 85 88 91 94\n97 100 103 106 109 112 115 118\n121 124 127 130 133 136 139 142\n145 148 151 154 157 160 163 166\n169 172 175 178 181 184 187 190",
      "expected": "Yes"
    },
    {
      "input": "8 8 98\n1 4 7 10 13 16 19 22\n25 28 31 34 37 40 43 46\n49 52 55 58 61 64 67 70\n73 76 79 82 85 88 91 94\n97 100 103 106 109 112 115 118\n121 124 127 130 133 136 139 142\n145 148 151 154 157 160 163 166\n169 172 175 178 181 184 187 190",
      "expected": "No"
    },
    {
      "input": "9 9 121\n1 4 7 10 13 16 19 22 25\n28 31 34 37 40 43 46 49 52\n55 58 61 64 67 70 73 76 79\n82 85 88 91 94 97 100 103 106\n109 112 115 118 121 124 127 130 133\n136 139 142 145 148 151 154 157 160\n163 166 169 172 175 178 181 184 187\n190 193 196 199 202 205 208 211 214\n217 220 223 226 229 232 235 238 241",
      "expected": "Yes"
    },
    {
      "input": "9 9 122\n1 4 7 10 13 16 19 22 25\n28 31 34 37 40 43 46 49 52\n55 58 61 64 67 70 73 76 79\n82 85 88 91 94 97 100 103 106\n109 112 115 118 121 124 127 130 133\n136 139 142 145 148 151 154 157 160\n163 166 169 172 175 178 181 184 187\n190 193 196 199 202 205 208 211 214\n217 220 223 226 229 232 235 238 241",
      "expected": "No"
    },
    {
      "input": "10 10 151\n1 4 7 10 13 16 19 22 25 28\n31 34 37 40 43 46 49 52 55 58\n61 64 67 70 73 76 79 82 85 88\n91 94 97 100 103 106 109 112 115 118\n121 124 127 130 133 136 139 142 145 148\n151 154 157 160 163 166 169 172 175 178\n181 184 187 190 193 196 199 202 205 208\n211 214 217 220 223 226 229 232 235 238\n241 244 247 250 253 256 259 262 265 268\n271 274 277 280 283 286 289 292 295 298",
      "expected": "Yes"
    },
    {
      "input": "10 10 152\n1 4 7 10 13 16 19 22 25 28\n31 34 37 40 43 46 49 52 55 58\n61 64 67 70 73 76 79 82 85 88\n91 94 97 100 103 106 109 112 115 118\n121 124 127 130 133 136 139 142 145 148\n151 154 157 160 163 166 169 172 175 178\n181 184 187 190 193 196 199 202 205 208\n211 214 217 220 223 226 229 232 235 238\n241 244 247 250 253 256 259 262 265 268\n271 274 277 280 283 286 289 292 295 298",
      "expected": "No"
    },
    {
      "input": "1 10 16\n1 4 7 10 13 16 19 22 25 28",
      "expected": "Yes"
    },
    {
      "input": "1 10 17\n1 4 7 10 13 16 19 22 25 28",
      "expected": "No"
    },
    {
      "input": "10 1 16\n1\n4\n7\n10\n13\n16\n19\n22\n25\n28",
      "expected": "Yes"
    },
    {
      "input": "10 1 17\n1\n4\n7\n10\n13\n16\n19\n22\n25\n28",
      "expected": "No"
    },
    {
      "input": "2 8 25\n1 4 7 10 13 16 19 22\n25 28 31 34 37 40 43 46",
      "expected": "Yes"
    },
    {
      "input": "2 8 26\n1 4 7 10 13 16 19 22\n25 28 31 34 37 40 43 46",
      "expected": "No"
    },
    {
      "input": "8 2 25\n1 4\n7 10\n13 16\n19 22\n25 28\n31 34\n37 40\n43 46",
      "expected": "Yes"
    },
    {
      "input": "8 2 26\n1 4\n7 10\n13 16\n19 22\n25 28\n31 34\n37 40\n43 46",
      "expected": "No"
    },
    {
      "input": "3 7 31\n1 4 7 10 13 16 19\n22 25 28 31 34 37 40\n43 46 49 52 55 58 61",
      "expected": "Yes"
    },
    {
      "input": "3 7 32\n1 4 7 10 13 16 19\n22 25 28 31 34 37 40\n43 46 49 52 55 58 61",
      "expected": "No"
    },
    {
      "input": "7 3 31\n1 4 7\n10 13 16\n19 22 25\n28 31 34\n37 40 43\n46 49 52\n55 58 61",
      "expected": "Yes"
    },
    {
      "input": "7 3 32\n1 4 7\n10 13 16\n19 22 25\n28 31 34\n37 40 43\n46 49 52\n55 58 61",
      "expected": "No"
    },
    {
      "input": "4 6 37\n1 4 7 10 13 16\n19 22 25 28 31 34\n37 40 43 46 49 52\n55 58 61 64 67 70",
      "expected": "Yes"
    },
    {
      "input": "4 6 38\n1 4 7 10 13 16\n19 22 25 28 31 34\n37 40 43 46 49 52\n55 58 61 64 67 70",
      "expected": "No"
    },
    {
      "input": "6 4 37\n1 4 7 10\n13 16 19 22\n25 28 31 34\n37 40 43 46\n49 52 55 58\n61 64 67 70",
      "expected": "Yes"
    },
    {
      "input": "6 4 38\n1 4 7 10\n13 16 19 22\n25 28 31 34\n37 40 43 46\n49 52 55 58\n61 64 67 70",
      "expected": "No"
    },
    {
      "input": "9 9 106\n100 102 104 106 108 110 112 114 116\n118 120 122 124 126 128 130 132 134\n136 138 140 142 144 146 148 150 152\n154 156 158 160 162 164 166 168 170\n172 174 176 178 180 182 184 186 188\n190 192 194 196 198 200 202 204 206\n208 210 212 214 216 218 220 222 224\n226 228 230 232 234 236 238 240 242\n244 246 248 250 252 254 256 258 260",
      "expected": "Yes"
    },
    {
      "input": "3 8 155\n150 152 154 156 158 160 162 164\n166 168 170 172 174 176 178 180\n182 184 186 188 190 192 194 196",
      "expected": "No"
    },
    {
      "input": "9 8 206\n200 202 204 206 208 210 212 214\n216 218 220 222 224 226 228 230\n232 234 236 238 240 242 244 246\n248 250 252 254 256 258 260 262\n264 266 268 270 272 274 276 278\n280 282 284 286 288 290 292 294\n296 298 300 302 304 306 308 310\n312 314 316 318 320 322 324 326\n328 330 332 334 336 338 340 342",
      "expected": "Yes"
    },
    {
      "input": "9 7 256\n250 252 254 256 258 260 262\n264 266 268 270 272 274 276\n278 280 282 284 286 288 290\n292 294 296 298 300 302 304\n306 308 310 312 314 316 318\n320 322 324 326 328 330 332\n334 336 338 340 342 344 346\n348 350 352 354 356 358 360\n362 364 366 368 370 372 374",
      "expected": "Yes"
    },
    {
      "input": "8 8 306\n300 302 304 306 308 310 312 314\n316 318 320 322 324 326 328 330\n332 334 336 338 340 342 344 346\n348 350 352 354 356 358 360 362\n364 366 368 370 372 374 376 378\n380 382 384 386 388 390 392 394\n396 398 400 402 404 406 408 410\n412 414 416 418 420 422 424 426",
      "expected": "Yes"
    },
    {
      "input": "8 6 355\n350 352 354 356 358 360\n362 364 366 368 370 372\n374 376 378 380 382 384\n386 388 390 392 394 396\n398 400 402 404 406 408\n410 412 414 416 418 420\n422 424 426 428 430 432\n434 436 438 440 442 444",
      "expected": "No"
    },
    {
      "input": "4 7 406\n400 402 404 406 408 410 412\n414 416 418 420 422 424 426\n428 430 432 434 436 438 440\n442 444 446 448 450 452 454",
      "expected": "Yes"
    },
    {
      "input": "9 5 456\n450 452 454 456 458\n460 462 464 466 468\n470 472 474 476 478\n480 482 484 486 488\n490 492 494 496 498\n500 502 504 506 508\n510 512 514 516 518\n520 522 524 526 528\n530 532 534 536 538",
      "expected": "Yes"
    },
    {
      "input": "4 6 505\n500 502 504 506 508 510\n512 514 516 518 520 522\n524 526 528 530 532 534\n536 538 540 542 544 546",
      "expected": "No"
    },
    {
      "input": "7 3 555\n550 552 554\n556 558 560\n562 564 566\n568 570 572\n574 576 578\n580 582 584\n586 588 590",
      "expected": "No"
    },
    {
      "input": "5 8 606\n600 602 604 606 608 610 612 614\n616 618 620 622 624 626 628 630\n632 634 636 638 640 642 644 646\n648 650 652 654 656 658 660 662\n664 666 668 670 672 674 676 678",
      "expected": "Yes"
    },
    {
      "input": "8 3 655\n650 652 654\n656 658 660\n662 664 666\n668 670 672\n674 676 678\n680 682 684\n686 688 690\n692 694 696",
      "expected": "No"
    },
    {
      "input": "4 4 705\n700 702 704 706\n708 710 712 714\n716 718 720 722\n724 726 728 730",
      "expected": "No"
    },
    {
      "input": "7 4 755\n750 752 754 756\n758 760 762 764\n766 768 770 772\n774 776 778 780\n782 784 786 788\n790 792 794 796\n798 800 802 804",
      "expected": "No"
    },
    {
      "input": "9 2 806\n800 802\n804 806\n808 810\n812 814\n816 818\n820 822\n824 826\n828 830\n832 834",
      "expected": "Yes"
    },
    {
      "input": "3 5 856\n850 852 854 856 858\n860 862 864 866 868\n870 872 874 876 878",
      "expected": "Yes"
    },
    {
      "input": "6 2 905\n900 902\n904 906\n908 910\n912 914\n916 918\n920 922",
      "expected": "No"
    },
    {
      "input": "9 4 956\n950 952 954 956\n958 960 962 964\n966 968 970 972\n974 976 978 980\n982 984 986 988\n990 992 994 996\n998 1000 1002 1004\n1006 1008 1010 1012\n1014 1016 1018 1020",
      "expected": "Yes"
    },
    {
      "input": "9 6 1006\n1000 1002 1004 1006 1008 1010\n1012 1014 1016 1018 1020 1022\n1024 1026 1028 1030 1032 1034\n1036 1038 1040 1042 1044 1046\n1048 1050 1052 1054 1056 1058\n1060 1062 1064 1066 1068 1070\n1072 1074 1076 1078 1080 1082\n1084 1086 1088 1090 1092 1094\n1096 1098 1100 1102 1104 1106",
      "expected": "Yes"
    },
    {
      "input": "7 2 1056\n1050 1052\n1054 1056\n1058 1060\n1062 1064\n1066 1068\n1070 1072\n1074 1076",
      "expected": "Yes"
    },
    {
      "input": "6 3 1105\n1100 1102 1104\n1106 1108 1110\n1112 1114 1116\n1118 1120 1122\n1124 1126 1128\n1130 1132 1134",
      "expected": "No"
    },
    {
      "input": "5 5 1156\n1150 1152 1154 1156 1158\n1160 1162 1164 1166 1168\n1170 1172 1174 1176 1178\n1180 1182 1184 1186 1188\n1190 1192 1194 1196 1198",
      "expected": "Yes"
    },
    {
      "input": "7 3 1206\n1200 1202 1204\n1206 1208 1210\n1212 1214 1216\n1218 1220 1222\n1224 1226 1228\n1230 1232 1234\n1236 1238 1240",
      "expected": "Yes"
    },
    {
      "input": "8 3 1255\n1250 1252 1254\n1256 1258 1260\n1262 1264 1266\n1268 1270 1272\n1274 1276 1278\n1280 1282 1284\n1286 1288 1290\n1292 1294 1296",
      "expected": "No"
    },
    {
      "input": "3 5 1306\n1300 1302 1304 1306 1308\n1310 1312 1314 1316 1318\n1320 1322 1324 1326 1328",
      "expected": "Yes"
    },
    {
      "input": "9 4 1356\n1350 1352 1354 1356\n1358 1360 1362 1364\n1366 1368 1370 1372\n1374 1376 1378 1380\n1382 1384 1386 1388\n1390 1392 1394 1396\n1398 1400 1402 1404\n1406 1408 1410 1412\n1414 1416 1418 1420",
      "expected": "Yes"
    },
    {
      "input": "4 4 1405\n1400 1402 1404 1406\n1408 1410 1412 1414\n1416 1418 1420 1422\n1424 1426 1428 1430",
      "expected": "No"
    },
    {
      "input": "4 7 1456\n1450 1452 1454 1456 1458 1460 1462\n1464 1466 1468 1470 1472 1474 1476\n1478 1480 1482 1484 1486 1488 1490\n1492 1494 1496 1498 1500 1502 1504",
      "expected": "Yes"
    },
    {
      "input": "2 9 1505\n1500 1502 1504 1506 1508 1510 1512 1514 1516\n1518 1520 1522 1524 1526 1528 1530 1532 1534",
      "expected": "No"
    },
    {
      "input": "4 4 1555\n1550 1552 1554 1556\n1558 1560 1562 1564\n1566 1568 1570 1572\n1574 1576 1578 1580",
      "expected": "No"
    },
    {
      "input": "7 6 1606\n1600 1602 1604 1606 1608 1610\n1612 1614 1616 1618 1620 1622\n1624 1626 1628 1630 1632 1634\n1636 1638 1640 1642 1644 1646\n1648 1650 1652 1654 1656 1658\n1660 1662 1664 1666 1668 1670\n1672 1674 1676 1678 1680 1682",
      "expected": "Yes"
    },
    {
      "input": "8 5 1655\n1650 1652 1654 1656 1658\n1660 1662 1664 1666 1668\n1670 1672 1674 1676 1678\n1680 1682 1684 1686 1688\n1690 1692 1694 1696 1698\n1700 1702 1704 1706 1708\n1710 1712 1714 1716 1718\n1720 1722 1724 1726 1728",
      "expected": "No"
    },
    {
      "input": "7 9 1706\n1700 1702 1704 1706 1708 1710 1712 1714 1716\n1718 1720 1722 1724 1726 1728 1730 1732 1734\n1736 1738 1740 1742 1744 1746 1748 1750 1752\n1754 1756 1758 1760 1762 1764 1766 1768 1770\n1772 1774 1776 1778 1780 1782 1784 1786 1788\n1790 1792 1794 1796 1798 1800 1802 1804 1806\n1808 1810 1812 1814 1816 1818 1820 1822 1824",
      "expected": "Yes"
    },
    {
      "input": "4 3 1756\n1750 1752 1754\n1756 1758 1760\n1762 1764 1766\n1768 1770 1772",
      "expected": "Yes"
    },
    {
      "input": "7 3 1806\n1800 1802 1804\n1806 1808 1810\n1812 1814 1816\n1818 1820 1822\n1824 1826 1828\n1830 1832 1834\n1836 1838 1840",
      "expected": "Yes"
    },
    {
      "input": "6 5 1855\n1850 1852 1854 1856 1858\n1860 1862 1864 1866 1868\n1870 1872 1874 1876 1878\n1880 1882 1884 1886 1888\n1890 1892 1894 1896 1898\n1900 1902 1904 1906 1908",
      "expected": "No"
    },
    {
      "input": "4 7 1906\n1900 1902 1904 1906 1908 1910 1912\n1914 1916 1918 1920 1922 1924 1926\n1928 1930 1932 1934 1936 1938 1940\n1942 1944 1946 1948 1950 1952 1954",
      "expected": "Yes"
    },
    {
      "input": "6 8 1955\n1950 1952 1954 1956 1958 1960 1962 1964\n1966 1968 1970 1972 1974 1976 1978 1980\n1982 1984 1986 1988 1990 1992 1994 1996\n1998 2000 2002 2004 2006 2008 2010 2012\n2014 2016 2018 2020 2022 2024 2026 2028\n2030 2032 2034 2036 2038 2040 2042 2044",
      "expected": "No"
    },
    {
      "input": "4 2 2006\n2000 2002\n2004 2006\n2008 2010\n2012 2014",
      "expected": "Yes"
    },
    {
      "input": "5 8 2056\n2050 2052 2054 2056 2058 2060 2062 2064\n2066 2068 2070 2072 2074 2076 2078 2080\n2082 2084 2086 2088 2090 2092 2094 2096\n2098 2100 2102 2104 2106 2108 2110 2112\n2114 2116 2118 2120 2122 2124 2126 2128",
      "expected": "Yes"
    },
    {
      "input": "2 2 2105\n2100 2102\n2104 2106",
      "expected": "No"
    },
    {
      "input": "5 4 2156\n2150 2152 2154 2156\n2158 2160 2162 2164\n2166 2168 2170 2172\n2174 2176 2178 2180\n2182 2184 2186 2188",
      "expected": "Yes"
    },
    {
      "input": "7 8 2206\n2200 2202 2204 2206 2208 2210 2212 2214\n2216 2218 2220 2222 2224 2226 2228 2230\n2232 2234 2236 2238 2240 2242 2244 2246\n2248 2250 2252 2254 2256 2258 2260 2262\n2264 2266 2268 2270 2272 2274 2276 2278\n2280 2282 2284 2286 2288 2290 2292 2294\n2296 2298 2300 2302 2304 2306 2308 2310",
      "expected": "Yes"
    },
    {
      "input": "8 7 2255\n2250 2252 2254 2256 2258 2260 2262\n2264 2266 2268 2270 2272 2274 2276\n2278 2280 2282 2284 2286 2288 2290\n2292 2294 2296 2298 2300 2302 2304\n2306 2308 2310 2312 2314 2316 2318\n2320 2322 2324 2326 2328 2330 2332\n2334 2336 2338 2340 2342 2344 2346\n2348 2350 2352 2354 2356 2358 2360",
      "expected": "No"
    },
    {
      "input": "8 8 2305\n2300 2302 2304 2306 2308 2310 2312 2314\n2316 2318 2320 2322 2324 2326 2328 2330\n2332 2334 2336 2338 2340 2342 2344 2346\n2348 2350 2352 2354 2356 2358 2360 2362\n2364 2366 2368 2370 2372 2374 2376 2378\n2380 2382 2384 2386 2388 2390 2392 2394\n2396 2398 2400 2402 2404 2406 2408 2410\n2412 2414 2416 2418 2420 2422 2424 2426",
      "expected": "No"
    },
    {
      "input": "3 4 2355\n2350 2352 2354 2356\n2358 2360 2362 2364\n2366 2368 2370 2372",
      "expected": "No"
    },
    {
      "input": "7 2 2405\n2400 2402\n2404 2406\n2408 2410\n2412 2414\n2416 2418\n2420 2422\n2424 2426",
      "expected": "No"
    },
    {
      "input": "6 7 2455\n2450 2452 2454 2456 2458 2460 2462\n2464 2466 2468 2470 2472 2474 2476\n2478 2480 2482 2484 2486 2488 2490\n2492 2494 2496 2498 2500 2502 2504\n2506 2508 2510 2512 2514 2516 2518\n2520 2522 2524 2526 2528 2530 2532",
      "expected": "No"
    },
    {
      "input": "6 9 2505\n2500 2502 2504 2506 2508 2510 2512 2514 2516\n2518 2520 2522 2524 2526 2528 2530 2532 2534\n2536 2538 2540 2542 2544 2546 2548 2550 2552\n2554 2556 2558 2560 2562 2564 2566 2568 2570\n2572 2574 2576 2578 2580 2582 2584 2586 2588\n2590 2592 2594 2596 2598 2600 2602 2604 2606",
      "expected": "No"
    },
    {
      "input": "9 3 2555\n2550 2552 2554\n2556 2558 2560\n2562 2564 2566\n2568 2570 2572\n2574 2576 2578\n2580 2582 2584\n2586 2588 2590\n2592 2594 2596\n2598 2600 2602",
      "expected": "No"
    },
    {
      "input": "6 7 2605\n2600 2602 2604 2606 2608 2610 2612\n2614 2616 2618 2620 2622 2624 2626\n2628 2630 2632 2634 2636 2638 2640\n2642 2644 2646 2648 2650 2652 2654\n2656 2658 2660 2662 2664 2666 2668\n2670 2672 2674 2676 2678 2680 2682",
      "expected": "No"
    },
    {
      "input": "8 5 2656\n2650 2652 2654 2656 2658\n2660 2662 2664 2666 2668\n2670 2672 2674 2676 2678\n2680 2682 2684 2686 2688\n2690 2692 2694 2696 2698\n2700 2702 2704 2706 2708\n2710 2712 2714 2716 2718\n2720 2722 2724 2726 2728",
      "expected": "Yes"
    },
    {
      "input": "4 5 2706\n2700 2702 2704 2706 2708\n2710 2712 2714 2716 2718\n2720 2722 2724 2726 2728\n2730 2732 2734 2736 2738",
      "expected": "Yes"
    },
    {
      "input": "7 3 2756\n2750 2752 2754\n2756 2758 2760\n2762 2764 2766\n2768 2770 2772\n2774 2776 2778\n2780 2782 2784\n2786 2788 2790",
      "expected": "Yes"
    },
    {
      "input": "5 2 2806\n2800 2802\n2804 2806\n2808 2810\n2812 2814\n2816 2818",
      "expected": "Yes"
    },
    {
      "input": "7 7 2856\n2850 2852 2854 2856 2858 2860 2862\n2864 2866 2868 2870 2872 2874 2876\n2878 2880 2882 2884 2886 2888 2890\n2892 2894 2896 2898 2900 2902 2904\n2906 2908 2910 2912 2914 2916 2918\n2920 2922 2924 2926 2928 2930 2932\n2934 2936 2938 2940 2942 2944 2946",
      "expected": "Yes"
    },
    {
      "input": "6 4 2906\n2900 2902 2904 2906\n2908 2910 2912 2914\n2916 2918 2920 2922\n2924 2926 2928 2930\n2932 2934 2936 2938\n2940 2942 2944 2946",
      "expected": "Yes"
    },
    {
      "input": "3 3 2956\n2950 2952 2954\n2956 2958 2960\n2962 2964 2966",
      "expected": "Yes"
    },
    {
      "input": "2 2 3005\n3000 3002\n3004 3006",
      "expected": "No"
    },
    {
      "input": "4 2 3055\n3050 3052\n3054 3056\n3058 3060\n3062 3064",
      "expected": "No"
    },
    {
      "input": "3 4 3106\n3100 3102 3104 3106\n3108 3110 3112 3114\n3116 3118 3120 3122",
      "expected": "Yes"
    },
    {
      "input": "2 7 3156\n3150 3152 3154 3156 3158 3160 3162\n3164 3166 3168 3170 3172 3174 3176",
      "expected": "Yes"
    },
    {
      "input": "4 4 3205\n3200 3202 3204 3206\n3208 3210 3212 3214\n3216 3218 3220 3222\n3224 3226 3228 3230",
      "expected": "No"
    },
    {
      "input": "4 2 3256\n3250 3252\n3254 3256\n3258 3260\n3262 3264",
      "expected": "Yes"
    },
    {
      "input": "9 7 3305\n3300 3302 3304 3306 3308 3310 3312\n3314 3316 3318 3320 3322 3324 3326\n3328 3330 3332 3334 3336 3338 3340\n3342 3344 3346 3348 3350 3352 3354\n3356 3358 3360 3362 3364 3366 3368\n3370 3372 3374 3376 3378 3380 3382\n3384 3386 3388 3390 3392 3394 3396\n3398 3400 3402 3404 3406 3408 3410\n3412 3414 3416 3418 3420 3422 3424",
      "expected": "No"
    },
    {
      "input": "7 6 3356\n3350 3352 3354 3356 3358 3360\n3362 3364 3366 3368 3370 3372\n3374 3376 3378 3380 3382 3384\n3386 3388 3390 3392 3394 3396\n3398 3400 3402 3404 3406 3408\n3410 3412 3414 3416 3418 3420\n3422 3424 3426 3428 3430 3432",
      "expected": "Yes"
    },
    {
      "input": "7 8 3405\n3400 3402 3404 3406 3408 3410 3412 3414\n3416 3418 3420 3422 3424 3426 3428 3430\n3432 3434 3436 3438 3440 3442 3444 3446\n3448 3450 3452 3454 3456 3458 3460 3462\n3464 3466 3468 3470 3472 3474 3476 3478\n3480 3482 3484 3486 3488 3490 3492 3494\n3496 3498 3500 3502 3504 3506 3508 3510",
      "expected": "No"
    },
    {
      "input": "4 6 3455\n3450 3452 3454 3456 3458 3460\n3462 3464 3466 3468 3470 3472\n3474 3476 3478 3480 3482 3484\n3486 3488 3490 3492 3494 3496",
      "expected": "No"
    },
    {
      "input": "2 5 3505\n3500 3502 3504 3506 3508\n3510 3512 3514 3516 3518",
      "expected": "No"
    },
    {
      "input": "8 9 3555\n3550 3552 3554 3556 3558 3560 3562 3564 3566\n3568 3570 3572 3574 3576 3578 3580 3582 3584\n3586 3588 3590 3592 3594 3596 3598 3600 3602\n3604 3606 3608 3610 3612 3614 3616 3618 3620\n3622 3624 3626 3628 3630 3632 3634 3636 3638\n3640 3642 3644 3646 3648 3650 3652 3654 3656\n3658 3660 3662 3664 3666 3668 3670 3672 3674\n3676 3678 3680 3682 3684 3686 3688 3690 3692",
      "expected": "No"
    },
    {
      "input": "4 3 3605\n3600 3602 3604\n3606 3608 3610\n3612 3614 3616\n3618 3620 3622",
      "expected": "No"
    },
    {
      "input": "2 4 3655\n3650 3652 3654 3656\n3658 3660 3662 3664",
      "expected": "No"
    },
    {
      "input": "7 7 3706\n3700 3702 3704 3706 3708 3710 3712\n3714 3716 3718 3720 3722 3724 3726\n3728 3730 3732 3734 3736 3738 3740\n3742 3744 3746 3748 3750 3752 3754\n3756 3758 3760 3762 3764 3766 3768\n3770 3772 3774 3776 3778 3780 3782\n3784 3786 3788 3790 3792 3794 3796",
      "expected": "Yes"
    },
    {
      "input": "4 5 3755\n3750 3752 3754 3756 3758\n3760 3762 3764 3766 3768\n3770 3772 3774 3776 3778\n3780 3782 3784 3786 3788",
      "expected": "No"
    },
    {
      "input": "5 3 3805\n3800 3802 3804\n3806 3808 3810\n3812 3814 3816\n3818 3820 3822\n3824 3826 3828",
      "expected": "No"
    },
    {
      "input": "9 6 3856\n3850 3852 3854 3856 3858 3860\n3862 3864 3866 3868 3870 3872\n3874 3876 3878 3880 3882 3884\n3886 3888 3890 3892 3894 3896\n3898 3900 3902 3904 3906 3908\n3910 3912 3914 3916 3918 3920\n3922 3924 3926 3928 3930 3932\n3934 3936 3938 3940 3942 3944\n3946 3948 3950 3952 3954 3956",
      "expected": "Yes"
    },
    {
      "input": "9 8 3905\n3900 3902 3904 3906 3908 3910 3912 3914\n3916 3918 3920 3922 3924 3926 3928 3930\n3932 3934 3936 3938 3940 3942 3944 3946\n3948 3950 3952 3954 3956 3958 3960 3962\n3964 3966 3968 3970 3972 3974 3976 3978\n3980 3982 3984 3986 3988 3990 3992 3994\n3996 3998 4000 4002 4004 4006 4008 4010\n4012 4014 4016 4018 4020 4022 4024 4026\n4028 4030 4032 4034 4036 4038 4040 4042",
      "expected": "No"
    },
    {
      "input": "7 2 3955\n3950 3952\n3954 3956\n3958 3960\n3962 3964\n3966 3968\n3970 3972\n3974 3976",
      "expected": "No"
    },
    {
      "input": "2 9 4006\n4000 4002 4004 4006 4008 4010 4012 4014 4016\n4018 4020 4022 4024 4026 4028 4030 4032 4034",
      "expected": "Yes"
    },
    {
      "input": "2 8 4056\n4050 4052 4054 4056 4058 4060 4062 4064\n4066 4068 4070 4072 4074 4076 4078 4080",
      "expected": "Yes"
    },
    {
      "input": "7 8 4106\n4100 4102 4104 4106 4108 4110 4112 4114\n4116 4118 4120 4122 4124 4126 4128 4130\n4132 4134 4136 4138 4140 4142 4144 4146\n4148 4150 4152 4154 4156 4158 4160 4162\n4164 4166 4168 4170 4172 4174 4176 4178\n4180 4182 4184 4186 4188 4190 4192 4194\n4196 4198 4200 4202 4204 4206 4208 4210",
      "expected": "Yes"
    },
    {
      "input": "4 6 4155\n4150 4152 4154 4156 4158 4160\n4162 4164 4166 4168 4170 4172\n4174 4176 4178 4180 4182 4184\n4186 4188 4190 4192 4194 4196",
      "expected": "No"
    },
    {
      "input": "5 9 4206\n4200 4202 4204 4206 4208 4210 4212 4214 4216\n4218 4220 4222 4224 4226 4228 4230 4232 4234\n4236 4238 4240 4242 4244 4246 4248 4250 4252\n4254 4256 4258 4260 4262 4264 4266 4268 4270\n4272 4274 4276 4278 4280 4282 4284 4286 4288",
      "expected": "Yes"
    },
    {
      "input": "6 5 4255\n4250 4252 4254 4256 4258\n4260 4262 4264 4266 4268\n4270 4272 4274 4276 4278\n4280 4282 4284 4286 4288\n4290 4292 4294 4296 4298\n4300 4302 4304 4306 4308",
      "expected": "No"
    },
    {
      "input": "6 3 4305\n4300 4302 4304\n4306 4308 4310\n4312 4314 4316\n4318 4320 4322\n4324 4326 4328\n4330 4332 4334",
      "expected": "No"
    },
    {
      "input": "8 7 4355\n4350 4352 4354 4356 4358 4360 4362\n4364 4366 4368 4370 4372 4374 4376\n4378 4380 4382 4384 4386 4388 4390\n4392 4394 4396 4398 4400 4402 4404\n4406 4408 4410 4412 4414 4416 4418\n4420 4422 4424 4426 4428 4430 4432\n4434 4436 4438 4440 4442 4444 4446\n4448 4450 4452 4454 4456 4458 4460",
      "expected": "No"
    },
    {
      "input": "9 3 4406\n4400 4402 4404\n4406 4408 4410\n4412 4414 4416\n4418 4420 4422\n4424 4426 4428\n4430 4432 4434\n4436 4438 4440\n4442 4444 4446\n4448 4450 4452",
      "expected": "Yes"
    },
    {
      "input": "3 2 4456\n4450 4452\n4454 4456\n4458 4460",
      "expected": "Yes"
    },
    {
      "input": "5 9 4505\n4500 4502 4504 4506 4508 4510 4512 4514 4516\n4518 4520 4522 4524 4526 4528 4530 4532 4534\n4536 4538 4540 4542 4544 4546 4548 4550 4552\n4554 4556 4558 4560 4562 4564 4566 4568 4570\n4572 4574 4576 4578 4580 4582 4584 4586 4588",
      "expected": "No"
    },
    {
      "input": "8 8 4555\n4550 4552 4554 4556 4558 4560 4562 4564\n4566 4568 4570 4572 4574 4576 4578 4580\n4582 4584 4586 4588 4590 4592 4594 4596\n4598 4600 4602 4604 4606 4608 4610 4612\n4614 4616 4618 4620 4622 4624 4626 4628\n4630 4632 4634 4636 4638 4640 4642 4644\n4646 4648 4650 4652 4654 4656 4658 4660\n4662 4664 4666 4668 4670 4672 4674 4676",
      "expected": "No"
    },
    {
      "input": "7 2 4606\n4600 4602\n4604 4606\n4608 4610\n4612 4614\n4616 4618\n4620 4622\n4624 4626",
      "expected": "Yes"
    },
    {
      "input": "9 2 4655\n4650 4652\n4654 4656\n4658 4660\n4662 4664\n4666 4668\n4670 4672\n4674 4676\n4678 4680\n4682 4684",
      "expected": "No"
    },
    {
      "input": "7 9 4706\n4700 4702 4704 4706 4708 4710 4712 4714 4716\n4718 4720 4722 4724 4726 4728 4730 4732 4734\n4736 4738 4740 4742 4744 4746 4748 4750 4752\n4754 4756 4758 4760 4762 4764 4766 4768 4770\n4772 4774 4776 4778 4780 4782 4784 4786 4788\n4790 4792 4794 4796 4798 4800 4802 4804 4806\n4808 4810 4812 4814 4816 4818 4820 4822 4824",
      "expected": "Yes"
    },
    {
      "input": "6 4 4756\n4750 4752 4754 4756\n4758 4760 4762 4764\n4766 4768 4770 4772\n4774 4776 4778 4780\n4782 4784 4786 4788\n4790 4792 4794 4796",
      "expected": "Yes"
    }
  ],
  "complexity": [
    "O(log nm)",
    "O(1)"
  ],
  "companies": [
    "Amazon",
    "Microsoft"
  ],
  "frequency": 9,
  "starterCode": {
    "python": "from typing import List\nimport sys\n\nclass Solution:\n    def searchMatrix(self, matrix: List[List[int]], target: int) -> bool:\n        # Write your code here\n        pass\n\n# --- DRIVER CODE (DO NOT MODIFY) ---\nif __name__ == \"__main__\":\n    lines = sys.stdin.read().split()\n    if lines:\n        rows = int(lines[0])\n        cols = int(lines[1])\n        target = int(lines[2])\n        \n        matrix = []\n        idx = 3\n        for _ in range(rows):\n            row = []\n            for _ in range(cols):\n                row.append(int(lines[idx]))\n                idx += 1\n            matrix.append(row)\n            \n        sol = Solution()\n        if sol.searchMatrix(matrix, target):\n            print(\"Yes\")\n        else:\n            print(\"No\")",
    "java": "import java.util.*;\n\nclass Solution {\n    public boolean searchMatrix(int[][] matrix, int target) {\n        // Write your code here\n        return false;\n    } \n}\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        if (!sc.hasNextInt()) return;\n        int rows = sc.nextInt();\n        int cols = sc.nextInt();\n        int target = sc.nextInt();\n        \n        int[][] matrix = new int[rows][cols];\n        for (int i = 0; i < rows; i++) {\n            for (int j = 0; j < cols; j++) {\n                matrix[i][j] = sc.nextInt();\n            } \n        } \n        \n        Solution sol = new Solution();\n        if (sol.searchMatrix(matrix, target)) {\n            System.out.println(\"Yes\");\n        } else {\n            System.out.println(\"No\");\n        } \n    } \n}",
    "cpp": "#include <iostream>\n#include <vector>\n\nusing namespace std;\n\nclass Solution {\npublic:\n    bool searchMatrix(vector<vector<int>>& matrix, int target) {\n        // Write your code here\n        return false;\n    } \n};\n\nint main() {\n    int rows, cols, target;\n    if (!(cin >> rows >> cols >> target)) return 0;\n    \n    vector<vector<int>> matrix(rows, vector<int>(cols));\n    for (int i = 0; i < rows; ++i) {\n        for (int j = 0; j < cols; ++j) {\n            cin >> matrix[i][j];\n        } \n    } \n    \n    Solution sol;\n    if (sol.searchMatrix(matrix, target)) {\n        cout << \"Yes\" << endl;\n    } else {\n        cout << \"No\" << endl;\n    } \n    return 0;\n}",
    "c": "#include <stdio.h>\n#include <stdbool.h>\n\nbool searchMatrix(int matrix[100][100], int rows, int cols, int target) {\n    // Write your code here\n    return false;\n}\n\nint main() {\n    int rows, cols, target;\n    if (scanf(\"%d %d %d\", &rows, &cols, &target) != 3) return 0;\n    \n    int matrix[100][100];\n    for (int i = 0; i < rows; i++) {\n        for (int j = 0; j < cols; j++) {\n            scanf(\"%d\", &matrix[i][j]);\n        } \n    } \n    \n    if (searchMatrix(matrix, rows, cols, target)) {\n        printf(\"Yes\\n\");\n    } else {\n        printf(\"No\\n\");\n    } \n    return 0;\n}"
  }
},
];
