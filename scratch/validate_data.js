import { PROBLEMS } from './frontend/src/data/problems.js';
console.log('PROBLEMS count:', PROBLEMS.length);
PROBLEMS.forEach((p, i) => {
    if (!p.id || !p.title) console.error(`Problem at index ${i} is missing id or title`);
    if (!p.testCases || p.testCases.length === 0) console.error(`Problem ${p.id} has no test cases`);
});
