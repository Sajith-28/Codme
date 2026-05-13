const CODE_PERSIST_KEY = 'codme_saved_code_v1';
const RESULTS_PERSIST_KEY = 'codme_saved_results_v1';

export function saveCode(problemId: string, language: string, code: string) {
  try {
    const raw = localStorage.getItem(CODE_PERSIST_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[`${problemId}_${language}`] = code;
    localStorage.setItem(CODE_PERSIST_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save code:', e);
  }
}

export function loadCode(problemId: string, language: string, defaultCode: string): string {
  try {
    const raw = localStorage.getItem(CODE_PERSIST_KEY);
    if (!raw) return defaultCode;
    const data = JSON.parse(raw);
    return data[`${problemId}_${language}`] || defaultCode;
  } catch {
    return defaultCode;
  }
}

export function saveLastResults(problemId: string, language: string, results: any[], status: string) {
  try {
    const raw = localStorage.getItem(RESULTS_PERSIST_KEY);
    const data = raw ? JSON.parse(raw) : {};
    data[`${problemId}_${language}`] = { results, status, timestamp: Date.now() };
    localStorage.setItem(RESULTS_PERSIST_KEY, JSON.stringify(data));
  } catch (e) {
    console.error('Failed to save results:', e);
  }
}

export function loadLastResults(problemId: string, language: string) {
  try {
    const raw = localStorage.getItem(RESULTS_PERSIST_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    const entry = data[`${problemId}_${language}`];
    // Expire results after 1 hour
    if (!entry || Date.now() - entry.timestamp > 3600000) return null;
    return entry;
  } catch {
    return null;
  }
}
