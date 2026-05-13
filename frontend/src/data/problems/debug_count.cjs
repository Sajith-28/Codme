const fs = require('fs');
const path = require('path');

function countSlugs(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const matches = content.match(/slug:\s*['"]([^'"]+)['"]/g);
  return matches ? matches.length : 0;
}

const dir = 'frontend/src/data/problems';
const files = [
  'initial.ts',
  'arrays.ts',
  'beginner-extra.ts',
  'dp-advanced.ts',
  'intervals-greedy-bits.ts',
  'linkedlists-stacks.ts',
  'strings-advanced.ts',
  'trees-graphs.ts'
];

let total = 0;
files.forEach(f => {
  const c = countSlugs(path.join(dir, f));
  console.log(`${f}: ${c}`);
  total += c;
});

console.log('Total Slugs in Files:', total);
