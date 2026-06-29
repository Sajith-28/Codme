import type { ProblemSeed } from './types';

export const beginnerExtraSeeds: ProblemSeed[] = [
  // MORE BEGINNER I/O & VARIABLES
  { title: 'Greeting Generator', slug: 'greeting-generator', difficulty: 'Basic', rankTier: 'Beginner', topic: 'input/output', subtopic: 'string concatenation', shortGoal: 'Read a name and print a greeting sentence.', outcome: 'Learn to combine strings with variables.', time: 4, prereq: ['Input', 'Output'], tests: [{ input: 'Alex', expected: 'Hello, Alex!' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 8 },
  { title: 'Temperature Converter', slug: 'temperature-converter', difficulty: 'Basic', rankTier: 'Beginner', topic: 'variables', subtopic: 'floating point', shortGoal: 'Convert Celsius to Fahrenheit.', outcome: 'Work with decimal numbers and formulas.', time: 5, prereq: ['Variables', 'Operators'], tests: [{ input: '100', expected: '212' }, { input: '0', expected: '32' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Circle Area Calculator', slug: 'circle-area-calculator', difficulty: 'Basic', rankTier: 'Beginner', topic: 'operators', subtopic: 'floating point math', shortGoal: 'Compute the area of a circle given its radius.', outcome: 'Use pi and power operations.', time: 6, prereq: ['Variables'], tests: [{ input: '5', expected: '78.54' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 6 },
  { title: 'Simple Interest Calculator', slug: 'simple-interest', difficulty: 'Basic', rankTier: 'Beginner', topic: 'operators', subtopic: 'formula application', shortGoal: 'Calculate simple interest from P, R, T.', outcome: 'Apply mathematical formulas in code.', time: 6, prereq: ['Variables', 'Operators'], tests: [{ input: '1000 5 2', expected: '100' }], complexity: ['O(1)', 'O(1)'], companies: ['Goldman Sachs', 'JP Morgan'], frequency: 7 },
  // CONDITIONALS
  { title: 'Grade Classifier', slug: 'grade-classifier', difficulty: 'Basic', rankTier: 'Beginner', topic: 'conditionals', subtopic: 'if else chain', shortGoal: 'Assign letter grade from a percentage.', outcome: 'Chain if-else for range-based decisions.', time: 8, prereq: ['Conditionals'], tests: [{ input: '85', expected: 'A' }, { input: '45', expected: 'F' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 8 },
  { title: 'Vowel or Consonant', slug: 'vowel-or-consonant', difficulty: 'Basic', rankTier: 'Beginner', topic: 'conditionals', subtopic: 'character check', shortGoal: 'Classify a letter as vowel or consonant.', outcome: 'Use character comparison or set lookup.', time: 6, prereq: ['Conditionals'], tests: [{ input: 'a', expected: 'Vowel' }, { input: 'b', expected: 'Consonant' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Absolute Value', slug: 'absolute-value', difficulty: 'Basic', rankTier: 'Beginner', topic: 'conditionals', subtopic: 'sign check', shortGoal: 'Print the absolute value of a number.', outcome: 'Handle negative numbers with a condition.', time: 5, prereq: ['Conditionals'], tests: [{ input: '-7', expected: '7' }, { input: '5', expected: '5' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 7 },
  // LOOPS EXTRA
  { title: 'Fibonacci Sequence Printer', slug: 'fibonacci-printer', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'series generation', shortGoal: 'Print first n Fibonacci numbers.', outcome: 'Generate a series using previous values.', time: 12, prereq: ['Loops'], tests: [{ input: '7', expected: '0 1 1 2 3 5 8' }], complexity: ['O(n)', 'O(1)'], companies: ['Google', 'Amazon'], frequency: 9 },
  { title: 'Power Calculator', slug: 'power-calculator', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'exponentiation', shortGoal: 'Compute a raised to power b using a loop.', outcome: 'Understand repeated multiplication.', time: 10, prereq: ['Loops'], tests: [{ input: '2 10', expected: '1024' }, { input: '3 0', expected: '1' }], complexity: ['O(b)', 'O(1)'], companies: ['General'], frequency: 8 },
  { title: 'Armstrong Number Check', slug: 'armstrong-number', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'digit math', shortGoal: 'Check if a number equals sum of cubes of digits.', outcome: 'Extract digits and compute powers.', time: 12, prereq: ['Digit extraction'], tests: [{ input: '153', expected: 'Yes' }, { input: '123', expected: 'No' }], complexity: ['O(d)', 'O(1)'], companies: ['Adobe'], frequency: 7 },
  { title: 'GCD of Two Numbers', slug: 'gcd-two-numbers', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'Euclidean algorithm', shortGoal: 'Find greatest common divisor.', outcome: 'Learn the Euclidean reduction technique.', time: 12, prereq: ['Modulo', 'Loops'], tests: [{ input: '48 18', expected: '6' }], complexity: ['O(log min(a,b))', 'O(1)'], companies: ['Google', 'Microsoft'], frequency: 9 },
  { title: 'LCM of Two Numbers', slug: 'lcm-two-numbers', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'GCD relationship', shortGoal: 'Find least common multiple using GCD.', outcome: 'LCM = (a * b) / GCD(a, b).', time: 10, prereq: ['GCD'], tests: [{ input: '12 18', expected: '36' }], complexity: ['O(log min(a,b))', 'O(1)'], companies: ['General'], frequency: 7 },
  // PATTERNS EXTRA
  { title: 'Inverted Triangle', slug: 'inverted-triangle', difficulty: 'Beginner', rankTier: 'Silver', topic: 'patterns', subtopic: 'decreasing rows', shortGoal: 'Print an inverted right triangle.', outcome: 'Reverse the loop direction.', time: 10, prereq: ['Nested loops'], tests: [{ input: '4', expected: '****\n***\n**\n*' }], complexity: ['O(n^2)', 'O(1)'], companies: ['General'], frequency: 6 },
  { title: 'Diamond Pattern', slug: 'diamond-pattern', difficulty: 'Beginner', rankTier: 'Silver', topic: 'patterns', subtopic: 'symmetric shape', shortGoal: 'Print a diamond shape of stars.', outcome: 'Combine upper and lower pyramid logic.', time: 18, prereq: ['Number pyramid'], tests: [{ input: '3', expected: '  *\n ***\n*****\n ***\n  *' }], complexity: ['O(n^2)', 'O(1)'], companies: ['General'], frequency: 6 },
  { title: 'Hollow Rectangle', slug: 'hollow-rectangle', difficulty: 'Beginner', rankTier: 'Silver', topic: 'patterns', subtopic: 'boundary detection', shortGoal: 'Print a hollow rectangle of stars.', outcome: 'Print stars only on boundaries.', time: 12, prereq: ['Nested loops'], tests: [{ input: '4 6', expected: '******\n*    *\n*    *\n******' }], complexity: ['O(nm)', 'O(1)'], companies: ['General'], frequency: 6 },
  // FUNCTIONS EXTRA
  { title: 'Palindrome Number Checker', slug: 'palindrome-number', difficulty: 'Beginner', rankTier: 'Silver', topic: 'functions', subtopic: 'function returns', shortGoal: 'Check if a number reads the same forwards and backwards.', outcome: 'Write a function that returns boolean.', time: 12, prereq: ['Functions', 'Reverse digits'], tests: [{ input: '121', expected: 'Yes' }, { input: '-121', expected: 'No' }], complexity: ['O(d)', 'O(1)'], companies: ['Amazon', 'Microsoft'], frequency: 9 },
  { title: 'Check Perfect Square', slug: 'check-perfect-square', difficulty: 'Beginner', rankTier: 'Silver', topic: 'functions', subtopic: 'math functions', shortGoal: 'Check if a number is a perfect square.', outcome: 'Use square root and verify.', time: 10, prereq: ['Functions'], tests: [{ input: '16', expected: 'Yes' }, { input: '14', expected: 'No' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 7 },
  // ARRAY EXTRAS
  { title: 'Count Occurrences', slug: 'count-occurrences', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'counting', shortGoal: 'Count how many times a value appears in an array.', outcome: 'Use a simple counter variable.', time: 10, prereq: ['Array traversal'], tests: [{ input: '5 3\n1 3 5 3 3', expected: '3' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 8 },
  { title: 'Leaders in Array', slug: 'leaders-in-array', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'right scan', shortGoal: 'Find all elements greater than everything to their right.', outcome: 'Scan from right tracking the maximum.', time: 14, prereq: ['Arrays'], tests: [{ input: '6\n16 17 4 3 5 2', expected: '17 5 2' }], complexity: ['O(n)', 'O(1)'], companies: ['Amazon', 'Microsoft'], frequency: 8 },
  { title: 'Rotate Array by K', slug: 'rotate-array-k', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'arrays', subtopic: 'triple reversal', shortGoal: 'Rotate array right by k positions in-place.', outcome: 'Use the triple-reversal trick.', time: 18, prereq: ['Reverse array'], tests: [{ input: '7 3\n1 2 3 4 5 6 7', expected: '5 6 7 1 2 3 4' }], complexity: ['O(n)', 'O(1)'], companies: ['Amazon', 'Microsoft'], frequency: 9 },
  { title: 'Majority Element', slug: 'majority-element', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'arrays', subtopic: 'Boyer-Moore voting', shortGoal: 'Find element appearing more than n/2 times.', outcome: 'Use voting algorithm for O(1) space.', time: 18, prereq: ['Arrays'], tests: [{ input: '7\n2 2 1 1 1 2 2', expected: '2' }], complexity: ['O(n)', 'O(1)'], companies: ['Amazon', 'Google', 'Adobe'], frequency: 10 },
  // STRING EXTRAS
  { title: 'Remove Duplicate Characters', slug: 'remove-duplicate-chars', difficulty: 'Beginner', rankTier: 'Silver', topic: 'strings', subtopic: 'set tracking', shortGoal: 'Print string with duplicate characters removed.', outcome: 'Use a set to track seen characters.', time: 12, prereq: ['Strings'], tests: [{ input: 'programming', expected: 'progamin' }], complexity: ['O(n)', 'O(k)'], companies: ['Adobe'], frequency: 7 },
  { title: 'Check Subsequence', slug: 'check-subsequence', difficulty: 'Beginner', rankTier: 'Silver', topic: 'strings', subtopic: 'two pointers', shortGoal: 'Check if s is a subsequence of t.', outcome: 'Advance s pointer only on match.', time: 12, prereq: ['Strings', 'Two pointers'], tests: [{ input: 'abc ahbgdc', expected: 'Yes' }], complexity: ['O(n)', 'O(1)'], companies: ['Google', 'Facebook'], frequency: 8 },
  // 20 MORE BEGINNER PROBLEMS
  { title: 'Check Even Sum', slug: 'check-even-sum', difficulty: 'Basic', rankTier: 'Beginner', topic: 'operators', subtopic: 'modulo sum', shortGoal: 'Check if sum of two numbers is even.', outcome: 'Sum then modulo check.', time: 4, prereq: ['Operators'], tests: [{ input: '5 7', expected: 'Yes' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 6 },
  { title: 'Square Root Floor', slug: 'square-root-floor', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'math simulation', shortGoal: 'Find floor of square root without sqrt function.', outcome: 'Use a loop to find i*i <= n.', time: 10, prereq: ['Loops'], tests: [{ input: '8', expected: '2' }, { input: '16', expected: '4' }], complexity: ['O(sqrt n)', 'O(1)'], companies: ['Microsoft'], frequency: 8 },
  { title: 'Reverse Array Elements', slug: 'reverse-array-elements', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'reversal', shortGoal: 'Print array in reverse.', outcome: 'Loop from n-1 to 0.', time: 8, prereq: ['Arrays'], tests: [{ input: '3\n1 2 3', expected: '3 2 1' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Count Negative Numbers', slug: 'count-negative-numbers', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'counting', shortGoal: 'Count how many negative numbers in array.', outcome: 'Condition within a loop.', time: 8, prereq: ['Arrays'], tests: [{ input: '4\n1 -2 -3 4', expected: '2' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Sum of Odd Numbers', slug: 'sum-of-odd-numbers', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'accumulator', shortGoal: 'Sum all odd numbers from 1 to N.', outcome: 'Selective accumulation.', time: 8, prereq: ['Loops'], tests: [{ input: '5', expected: '9' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 6 },
  { title: 'String Length Match', slug: 'string-length-match', difficulty: 'Beginner', rankTier: 'Silver', topic: 'strings', subtopic: 'length check', shortGoal: 'Check if two strings have same length.', outcome: 'Compare string properties.', time: 5, prereq: ['Strings'], tests: [{ input: 'abc def', expected: 'Yes' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 6 },
  { title: 'Power Of Three', slug: 'power-of-three', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'math', shortGoal: 'Check if number is power of 3.', outcome: 'Repeated division.', time: 10, prereq: ['Loops'], tests: [{ input: '27', expected: 'Yes' }], complexity: ['O(log3 n)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Character Is Digit', slug: 'character-is-digit', difficulty: 'Basic', rankTier: 'Beginner', topic: 'conditionals', subtopic: 'ASCII range', shortGoal: 'Check if character is a digit.', outcome: 'Compare char range 0-9.', time: 5, prereq: ['Conditionals'], tests: [{ input: '5', expected: 'Yes' }, { input: 'a', expected: 'No' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Multiply Without Operator', slug: 'multiply-without-op', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'repeated addition', shortGoal: 'Multiply a and b using loops.', outcome: 'Add a to sum b times.', time: 12, prereq: ['Loops'], tests: [{ input: '3 4', expected: '12' }], complexity: ['O(b)', 'O(1)'], companies: ['Adobe'], frequency: 6 },
  { title: 'Count Word Spaces', slug: 'count-word-spaces', difficulty: 'Beginner', rankTier: 'Silver', topic: 'strings', subtopic: 'counting', shortGoal: 'Count spaces in a sentence.', outcome: 'Traverse string and check chars.', time: 8, prereq: ['Strings'], tests: [{ input: 'hello world codme', expected: '2' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 6 },
  { title: 'Array Mean Calculator', slug: 'array-mean', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'math', shortGoal: 'Find average of array elements.', outcome: 'Sum / count.', time: 8, prereq: ['Arrays'], tests: [{ input: '4\n1 2 3 4', expected: '2.5' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Find Min Max Array', slug: 'min-max-array', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'tracking', shortGoal: 'Find both min and max in one pass.', outcome: 'Update two variables.', time: 10, prereq: ['Arrays'], tests: [{ input: '5\n3 1 4 1 5', expected: '1 5' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 8 },
  { title: 'Reverse Digits Only', slug: 'reverse-digits-only', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'digit extraction', shortGoal: 'Print digits in reverse.', outcome: 'Modulo and division.', time: 10, prereq: ['Loops'], tests: [{ input: '123', expected: '321' }], complexity: ['O(d)', 'O(1)'], companies: ['General'], frequency: 8 },
  { title: 'Check Prime Range', slug: 'check-prime-range', difficulty: 'Intermediate', rankTier: 'Gold', topic: 'loops', subtopic: 'nested loops', shortGoal: 'Count primes from 1 to N.', outcome: 'Use sieve or nested checks.', time: 20, prereq: ['Loops'], tests: [{ input: '10', expected: '4' }], complexity: ['O(n log log n)', 'O(n)'], companies: ['Google'], frequency: 9 },
  { title: 'Uppercase to Lowercase', slug: 'upper-to-lower', difficulty: 'Basic', rankTier: 'Beginner', topic: 'strings', subtopic: 'ASCII shift', shortGoal: 'Convert uppercase to lowercase.', outcome: 'Add 32 to ASCII value.', time: 6, prereq: ['Strings'], tests: [{ input: 'A', expected: 'a' }], complexity: ['O(1)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Count Capital Letters', slug: 'count-capitals', difficulty: 'Beginner', rankTier: 'Silver', topic: 'strings', subtopic: 'ASCII check', shortGoal: 'Count capital letters in string.', outcome: 'Check range A-Z.', time: 8, prereq: ['Strings'], tests: [{ input: 'Hello World', expected: '2' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 6 },
  { title: 'Print Every Other Item', slug: 'print-every-other', difficulty: 'Beginner', rankTier: 'Silver', topic: 'arrays', subtopic: 'step loop', shortGoal: 'Print elements at even indices.', outcome: 'Use index += 2.', time: 6, prereq: ['Arrays'], tests: [{ input: '5\n1 2 3 4 5', expected: '1 3 5' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 6 },
  { title: 'Smallest Divisor Finder', slug: 'smallest-divisor', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'divisor', shortGoal: 'Find smallest divisor > 1.', outcome: 'Start loop from 2.', time: 8, prereq: ['Loops'], tests: [{ input: '15', expected: '3' }], complexity: ['O(sqrt n)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Perfect Number Check', slug: 'perfect-number', difficulty: 'Beginner', rankTier: 'Silver', topic: 'loops', subtopic: 'math', shortGoal: 'Check if number equals sum of proper divisors.', outcome: 'Find all divisors and sum.', time: 12, prereq: ['Loops'], tests: [{ input: '6', expected: 'Yes' }, { input: '10', expected: 'No' }], complexity: ['O(n)', 'O(1)'], companies: ['General'], frequency: 7 },
  { title: 'Concatenate N Times', slug: 'concat-n-times', difficulty: 'Basic', rankTier: 'Beginner', topic: 'strings', subtopic: 'concatenation', shortGoal: 'Repeat a string N times.', outcome: 'Build string with a loop.', time: 8, prereq: ['Loops'], tests: [{ input: 'hi 3', expected: 'hihihi' }], complexity: ['O(n)', 'O(n)'], companies: ['General'], frequency: 6 },
  {
  "title": "Count Digits in a Number",
  "slug": "count-digits-in-a-number",
  "difficulty": "Basic",
  "rankTier": "Beginner",
  "topic": "loops",
  "subtopic": "digit processing",
  "shortGoal": "Count the number of digits in N.",
  "outcome": "Use division or logs to count digits.",
  "time": 5,
  "prereq": [
    "Loops",
    "Modulo"
  ],
  "tests": [
    {
      "input": "12345",
      "expected": "5"
    },
    {
      "input": "7789",
      "expected": "4"
    }
  ],
  "hiddenTests": [
    {
      "input": "1",
      "expected": "1"
    },
    {
      "input": "2",
      "expected": "1"
    },
    {
      "input": "3",
      "expected": "1"
    },
    {
      "input": "4",
      "expected": "1"
    },
    {
      "input": "5",
      "expected": "1"
    },
    {
      "input": "6",
      "expected": "1"
    },
    {
      "input": "7",
      "expected": "1"
    },
    {
      "input": "8",
      "expected": "1"
    },
    {
      "input": "9",
      "expected": "1"
    },
    {
      "input": "10",
      "expected": "2"
    },
    {
      "input": "17",
      "expected": "2"
    },
    {
      "input": "24",
      "expected": "2"
    },
    {
      "input": "31",
      "expected": "2"
    },
    {
      "input": "38",
      "expected": "2"
    },
    {
      "input": "45",
      "expected": "2"
    },
    {
      "input": "52",
      "expected": "2"
    },
    {
      "input": "59",
      "expected": "2"
    },
    {
      "input": "66",
      "expected": "2"
    },
    {
      "input": "73",
      "expected": "2"
    },
    {
      "input": "80",
      "expected": "2"
    },
    {
      "input": "87",
      "expected": "2"
    },
    {
      "input": "100",
      "expected": "3"
    },
    {
      "input": "157",
      "expected": "3"
    },
    {
      "input": "214",
      "expected": "3"
    },
    {
      "input": "271",
      "expected": "3"
    },
    {
      "input": "328",
      "expected": "3"
    },
    {
      "input": "385",
      "expected": "3"
    },
    {
      "input": "442",
      "expected": "3"
    },
    {
      "input": "499",
      "expected": "3"
    },
    {
      "input": "556",
      "expected": "3"
    },
    {
      "input": "613",
      "expected": "3"
    },
    {
      "input": "670",
      "expected": "3"
    },
    {
      "input": "727",
      "expected": "3"
    },
    {
      "input": "784",
      "expected": "3"
    },
    {
      "input": "841",
      "expected": "3"
    },
    {
      "input": "898",
      "expected": "3"
    },
    {
      "input": "955",
      "expected": "3"
    },
    {
      "input": "1000",
      "expected": "4"
    },
    {
      "input": "1631",
      "expected": "4"
    },
    {
      "input": "2262",
      "expected": "4"
    },
    {
      "input": "2893",
      "expected": "4"
    },
    {
      "input": "3524",
      "expected": "4"
    },
    {
      "input": "4155",
      "expected": "4"
    },
    {
      "input": "4786",
      "expected": "4"
    },
    {
      "input": "5417",
      "expected": "4"
    },
    {
      "input": "6048",
      "expected": "4"
    },
    {
      "input": "6679",
      "expected": "4"
    },
    {
      "input": "7310",
      "expected": "4"
    },
    {
      "input": "7941",
      "expected": "4"
    },
    {
      "input": "8572",
      "expected": "4"
    },
    {
      "input": "9203",
      "expected": "4"
    },
    {
      "input": "9834",
      "expected": "4"
    },
    {
      "input": "10000",
      "expected": "5"
    },
    {
      "input": "16311",
      "expected": "5"
    },
    {
      "input": "22622",
      "expected": "5"
    },
    {
      "input": "28933",
      "expected": "5"
    },
    {
      "input": "35244",
      "expected": "5"
    },
    {
      "input": "41555",
      "expected": "5"
    },
    {
      "input": "47866",
      "expected": "5"
    },
    {
      "input": "54177",
      "expected": "5"
    },
    {
      "input": "60488",
      "expected": "5"
    },
    {
      "input": "66799",
      "expected": "5"
    },
    {
      "input": "73110",
      "expected": "5"
    },
    {
      "input": "79421",
      "expected": "5"
    },
    {
      "input": "85732",
      "expected": "5"
    },
    {
      "input": "92043",
      "expected": "5"
    },
    {
      "input": "98354",
      "expected": "5"
    },
    {
      "input": "100000",
      "expected": "6"
    },
    {
      "input": "163112",
      "expected": "6"
    },
    {
      "input": "226224",
      "expected": "6"
    },
    {
      "input": "289336",
      "expected": "6"
    },
    {
      "input": "352448",
      "expected": "6"
    },
    {
      "input": "415560",
      "expected": "6"
    },
    {
      "input": "478672",
      "expected": "6"
    },
    {
      "input": "541784",
      "expected": "6"
    },
    {
      "input": "604896",
      "expected": "6"
    },
    {
      "input": "668008",
      "expected": "6"
    },
    {
      "input": "731120",
      "expected": "6"
    },
    {
      "input": "794232",
      "expected": "6"
    },
    {
      "input": "857344",
      "expected": "6"
    },
    {
      "input": "920456",
      "expected": "6"
    },
    {
      "input": "983568",
      "expected": "6"
    },
    {
      "input": "1000000",
      "expected": "7"
    },
    {
      "input": "1631124",
      "expected": "7"
    },
    {
      "input": "2262248",
      "expected": "7"
    },
    {
      "input": "2893372",
      "expected": "7"
    },
    {
      "input": "3524496",
      "expected": "7"
    },
    {
      "input": "4155620",
      "expected": "7"
    },
    {
      "input": "4786744",
      "expected": "7"
    },
    {
      "input": "5417868",
      "expected": "7"
    },
    {
      "input": "6048992",
      "expected": "7"
    },
    {
      "input": "6680116",
      "expected": "7"
    },
    {
      "input": "7311240",
      "expected": "7"
    },
    {
      "input": "7942364",
      "expected": "7"
    },
    {
      "input": "8573488",
      "expected": "7"
    },
    {
      "input": "9204612",
      "expected": "7"
    },
    {
      "input": "9835736",
      "expected": "7"
    },
    {
      "input": "10000000",
      "expected": "8"
    },
    {
      "input": "16311245",
      "expected": "8"
    },
    {
      "input": "22622490",
      "expected": "8"
    },
    {
      "input": "28933735",
      "expected": "8"
    },
    {
      "input": "35244980",
      "expected": "8"
    },
    {
      "input": "41556225",
      "expected": "8"
    },
    {
      "input": "47867470",
      "expected": "8"
    },
    {
      "input": "54178715",
      "expected": "8"
    },
    {
      "input": "60489960",
      "expected": "8"
    },
    {
      "input": "66801205",
      "expected": "8"
    },
    {
      "input": "73112450",
      "expected": "8"
    },
    {
      "input": "79423695",
      "expected": "8"
    },
    {
      "input": "85734940",
      "expected": "8"
    },
    {
      "input": "92046185",
      "expected": "8"
    },
    {
      "input": "98357430",
      "expected": "8"
    },
    {
      "input": "100000000",
      "expected": "9"
    },
    {
      "input": "163112457",
      "expected": "9"
    },
    {
      "input": "226224914",
      "expected": "9"
    },
    {
      "input": "289337371",
      "expected": "9"
    },
    {
      "input": "352449828",
      "expected": "9"
    },
    {
      "input": "415562285",
      "expected": "9"
    },
    {
      "input": "478674742",
      "expected": "9"
    },
    {
      "input": "541787199",
      "expected": "9"
    },
    {
      "input": "604899656",
      "expected": "9"
    },
    {
      "input": "668012113",
      "expected": "9"
    },
    {
      "input": "731124570",
      "expected": "9"
    },
    {
      "input": "794237027",
      "expected": "9"
    },
    {
      "input": "857349484",
      "expected": "9"
    },
    {
      "input": "920461941",
      "expected": "9"
    },
    {
      "input": "983574398",
      "expected": "9"
    },
    {
      "input": "1000000000",
      "expected": "10"
    },
    {
      "input": "1112457813",
      "expected": "10"
    },
    {
      "input": "1224915626",
      "expected": "10"
    },
    {
      "input": "1337373439",
      "expected": "10"
    },
    {
      "input": "1449831252",
      "expected": "10"
    },
    {
      "input": "1562289065",
      "expected": "10"
    },
    {
      "input": "1674746878",
      "expected": "10"
    },
    {
      "input": "1787204691",
      "expected": "10"
    },
    {
      "input": "1899662504",
      "expected": "10"
    },
    {
      "input": "2012120317",
      "expected": "10"
    },
    {
      "input": "2124578130",
      "expected": "10"
    },
    {
      "input": "2147483647",
      "expected": "10"
    },
    {
      "input": "999999999",
      "expected": "9"
    }
  ],
  "complexity": [
    "O(log N)",
    "O(1)"
  ],
  "companies": [
    "Google",
    "Amazon",
    "Microsoft"
  ],
  "frequency": 10
}
];
