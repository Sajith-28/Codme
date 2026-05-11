export interface DebugHint {
  category: 'compile' | 'runtime' | 'logic' | 'input';
  pattern: RegExp;
  title: string;
  explanation: string;
  suggestion: string;
}

const javaPatterns: DebugHint[] = [
  { category: 'compile', pattern: /cannot find symbol/i, title: 'Undefined Variable or Method', explanation: 'You\'re using a variable or method name that hasn\'t been declared yet.', suggestion: 'Check for typos in variable names. Make sure you declared the variable before using it.' },
  { category: 'compile', pattern: /class .+ is public, should be declared in a file named/i, title: 'Class Name Mismatch', explanation: 'Your public class name doesn\'t match the file name.', suggestion: 'Rename your class to "Main" or ensure it matches the file name exactly.' },
  { category: 'compile', pattern: /';' expected/i, title: 'Missing Semicolon', explanation: 'Java needs a semicolon at the end of every statement.', suggestion: 'Add a semicolon (;) at the end of the line shown in the error.' },
  { category: 'compile', pattern: /incompatible types/i, title: 'Type Mismatch', explanation: 'You\'re trying to use a value of one type where another type is expected.', suggestion: 'Check if you need to cast the value or use a different variable type.' },
  { category: 'compile', pattern: /reached end of file while parsing/i, title: 'Missing Closing Brace', explanation: 'You have an opening { without a matching closing }.', suggestion: 'Count your braces — every { needs a matching }. Add the missing one.' },
  { category: 'runtime', pattern: /NullPointerException/i, title: 'Null Reference', explanation: 'You\'re trying to use an object that is null (hasn\'t been initialized).', suggestion: 'Add a null check before using the object, or make sure it\'s properly initialized.' },
  { category: 'runtime', pattern: /ArrayIndexOutOfBoundsException/i, title: 'Array Index Out of Bounds', explanation: 'You\'re trying to access an array position that doesn\'t exist.', suggestion: 'Check your loop bounds. Arrays are 0-indexed, so an array of size n has indices 0 to n-1.' },
  { category: 'runtime', pattern: /StackOverflowError/i, title: 'Infinite Recursion', explanation: 'Your recursive function calls itself endlessly without reaching a base case.', suggestion: 'Make sure your recursive function has a proper base case that stops the recursion.' },
  { category: 'runtime', pattern: /NoSuchElementException/i, title: 'Scanner Read Error', explanation: 'Scanner tried to read input but there\'s nothing left to read.', suggestion: 'Make sure your input matches what the program expects. Check if you\'re reading more values than provided.' },
  { category: 'runtime', pattern: /NumberFormatException/i, title: 'Invalid Number Format', explanation: 'You\'re trying to convert a non-numeric string to a number.', suggestion: 'Check if the input is actually a number. Trim whitespace before parsing.' },
];

const pythonPatterns: DebugHint[] = [
  { category: 'compile', pattern: /SyntaxError/i, title: 'Syntax Error', explanation: 'Python found something it doesn\'t understand in your code structure.', suggestion: 'Check for missing colons after if/for/while/def, mismatched parentheses, or incorrect indentation.' },
  { category: 'compile', pattern: /IndentationError/i, title: 'Indentation Error', explanation: 'Python uses spaces/tabs to define code blocks, and yours are inconsistent.', suggestion: 'Use exactly 4 spaces for each indentation level. Don\'t mix tabs and spaces.' },
  { category: 'runtime', pattern: /RecursionError/i, title: 'Maximum Recursion Depth Exceeded', explanation: 'Your recursive function is calling itself too many times without stopping.', suggestion: 'Check your base case. Ensure the problem size reduces in each recursive call.' },
  { category: 'runtime', pattern: /NameError/i, title: 'Undefined Variable', explanation: 'You\'re using a variable name that hasn\'t been created yet.', suggestion: 'Check for typos. Make sure you assigned a value to the variable before using it.' },
  { category: 'runtime', pattern: /TypeError/i, title: 'Type Error', explanation: 'You\'re doing an operation on a value that doesn\'t support it.', suggestion: 'Check if you need to convert types (e.g., int() or str()). Make sure you\'re not mixing incompatible types.' },
  { category: 'runtime', pattern: /IndexError/i, title: 'Index Out of Range', explanation: 'You\'re trying to access a list position that doesn\'t exist.', suggestion: 'Check your list length with len(). Remember lists are 0-indexed. This often happens in loops over arrays/lists.' },
  { category: 'runtime', pattern: /ValueError/i, title: 'Value Error', explanation: 'A function received a value it can\'t handle.', suggestion: 'Check if you pass the right type of data. If using int(), ensure the string is a valid number.' },
  { category: 'runtime', pattern: /KeyError/i, title: 'Dictionary Key Not Found', explanation: 'You\'re trying to access a dictionary key that doesn\'t exist.', suggestion: 'Use dict.get(key, default) instead, or check if the key exists with "if key in dict".' },
  { category: 'runtime', pattern: /ZeroDivisionError/i, title: 'Division by Zero', explanation: 'You\'re dividing a number by zero, which is mathematically undefined.', suggestion: 'Add a check: if the divisor is 0, handle it separately before dividing.' },
];

const cPatterns: DebugHint[] = [
  { category: 'compile', pattern: /implicit declaration of function/i, title: 'Missing Function Declaration', explanation: 'You\'re using a function that hasn\'t been declared or included.', suggestion: 'Add the correct #include header, or declare the function before main().' },
  { category: 'compile', pattern: /expected ';'/i, title: 'Missing Semicolon', explanation: 'C needs a semicolon at the end of every statement.', suggestion: 'Add a semicolon (;) at the indicated line.' },
  { category: 'compile', pattern: /undeclared identifier/i, title: 'Undeclared Variable', explanation: 'You\'re using a variable that hasn\'t been declared.', suggestion: 'Declare the variable with its type before using it (e.g., int x;).' },
  { category: 'runtime', pattern: /segmentation fault/i, title: 'Segmentation Fault (Memory Error)', explanation: 'Your program tried to access memory it\'s not allowed to touch.', suggestion: 'This usually happens due to: accessing an array out of bounds, using uninitialized pointers, or dereferencing a NULL pointer.' },
  { category: 'runtime', pattern: /stack overflow/i, title: 'Stack Overflow', explanation: 'Your program used too much stack memory, usually due to deep recursion.', suggestion: 'Check your recursive function base cases. Consider using iteration for very deep computations.' },
  { category: 'compile', pattern: /expected declaration/i, title: 'Code Outside Function', explanation: 'You have executable code outside of any function.', suggestion: 'Move your code inside main() or another function.' },
];

const cppPatterns: DebugHint[] = [
  ...cPatterns,
  { category: 'compile', pattern: /no match for 'operator/i, title: 'Operator Not Supported', explanation: 'You\'re using an operator with types that don\'t support it.', suggestion: 'Check if you need to include the right header (like <string> or <iostream>) or convert types.' },
  { category: 'compile', pattern: /no member named/i, title: 'Member Not Found', explanation: 'The object/class doesn\'t have the method or property you\'re trying to use.', suggestion: 'Check the correct method name. Ensure you included the right header for the class.' },
  { category: 'runtime', pattern: /out_of_range/i, title: 'Out of Range Access', explanation: 'You\'re accessing a container element that doesn\'t exist.', suggestion: 'Use .at() for bounds-checked access, or verify the index before accessing with [].' },
  { category: 'compile', pattern: /undefined reference to/i, title: 'Linker Error', explanation: 'Your code compiled but the linker couldn\'t find the implementation of a function.', suggestion: 'Ensure all files are included in the project and function names match their definitions exactly.' },
];

export const DEBUG_PATTERNS: Record<string, DebugHint[]> = {
  java: javaPatterns,
  python: pythonPatterns,
  c: cPatterns,
  cpp: cppPatterns,
};

export function analyzeError(code: string, errorOutput: string, language: string): { hints: DebugHint[]; lineHint: number | null } {
  const patterns = DEBUG_PATTERNS[language] || [];
  const hints = patterns.filter(p => p.pattern.test(errorOutput));
  void code;

  let lineHint: number | null = null;
  const lineMatch = errorOutput.match(/(?:line |:)(\d+)/i);
  if (lineMatch) lineHint = parseInt(lineMatch[1], 10);

  if (hints.length === 0 && errorOutput.trim()) {
    hints.push({
      category: 'runtime',
      pattern: /.*/,
      title: 'Execution Issue Detected',
      explanation: `The program produced an error. Here\'s what happened: ${errorOutput.slice(0, 200)}`,
      suggestion: 'Review the error message carefully. Check your logic and input handling.',
    });
  }

  return { hints, lineHint };
}

/**
 * Heuristic-based complexity analysis for code
 * Estimates Big O based on loops, recursion, and data structures
 */
export function analyzeComplexity(code: string, language: string): { time: string; space: string; explanation: string } {
  let time = "O(1)";
  let space = "O(1)";
  let explanation = "The code appears to execute in constant time.";

  // Remove comments for cleaner analysis
  const cleanCode = code.replace(/\/\/.*|\/\*[\s\S]*?\*\/|#.*/g, "");

  // Time Complexity Heuristics
  const loops = (cleanCode.match(/\b(for|while)\b/g) || []).length;
  const isPython = language === "python";
  
  // Check for nested loops (very simplified)
  const nestedPatterns = isPython 
    ? [/\bfor\b.+\n\s+for\b/g, /\bwhile\b.+\n\s+while\b/g]
    : [/\b(for|while)\b[^{}]*\{[^{}]*\b(for|while)\b/g];
  
  const isNested = nestedPatterns.some(p => p.test(cleanCode));
  const hasRecursion = isPython
    ? /\bdef\s+(\w+)\b[\s\S]+\b\1\b\(/.test(cleanCode)
    : /\b\w+\s+(\w+)\s*\(.*\)\s*\{[\s\S]+\b\1\b\(/.test(cleanCode);
  
  const hasLogPattern = /\b(mid|binary|search|low|high|>>|<<)\b/i.test(cleanCode) && cleanCode.includes("2");

  if (hasRecursion) {
    time = "O(2ⁿ)";
    explanation = "Recursive calls detected. Complexity might be exponential depending on the base case.";
  } else if (isNested) {
    time = "O(n²)";
    explanation = "Nested loops detected, suggesting quadratic time complexity.";
  } else if (loops > 0) {
    if (hasLogPattern) {
      time = "O(log n)";
      explanation = "Divide and conquer pattern detected (e.g., binary search).";
    } else {
      time = "O(n)";
      explanation = "Linear loops detected. Time grows proportionally with input size.";
    }
  }

  // Space Complexity Heuristics
  const hasLargeStructures = isPython
    ? /\[.*\]|\{.*\}|\bset\b/g.test(cleanCode)
    : /\[.*\]|\b(vector|list|map|set|ArrayList|HashMap)\b/i.test(cleanCode);
  
  const hasDynamicAllocation = /\b(malloc|new|append|push|add)\b/i.test(cleanCode);

  if (hasLargeStructures || hasDynamicAllocation) {
    space = "O(n)";
  }

  return { time, space, explanation };
}
