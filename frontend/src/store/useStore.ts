import { create } from 'zustand';

export type SupportedLanguage = 'java' | 'python' | 'c' | 'cpp';

interface StoreState {
  code: string;
  setCode: (code: string) => void;
  language: SupportedLanguage;
  setLanguage: (lang: SupportedLanguage) => void;
  input: string;
  setInput: (input: string) => void;
  output: { type: 'stdout' | 'stderr' | 'error', data: string, label?: string }[];
  addOutput: (out: { type: 'stdout' | 'stderr' | 'error', data: string, label?: string }) => void;
  clearOutput: () => void;
  status: string;
  setStatus: (status: string) => void;
  metrics: { time: string; memory: string } | null;
  setMetrics: (metrics: { time: string; memory: string } | null) => void;
  token: string | null;
  setToken: (token: string | null) => void;
  logout: () => void;
}

export const languageDefaults: Record<SupportedLanguage, string> = {
  java: `public class Main {\n    public static void main(String[] args) {\n        System.out.println("Hello from CODME!");\n    }\n}`,
  python: `print("Hello from CODME!")`,
  c: `#include <stdio.h>\n\nint main() {\n    printf("Hello from CODME!\\n");\n    return 0;\n}`,
  cpp: `#include <iostream>\n\nint main() {\n    std::cout << "Hello from CODME!" << std::endl;\n    return 0;\n}`
};

export const useStore = create<StoreState>((set) => ({
  code: languageDefaults.java,
  setCode: (code) => set({ code }),
  language: 'java',
  setLanguage: (language) => set({ language, code: languageDefaults[language] }),
  input: '',
  setInput: (input) => set({ input }),
  output: [],
  addOutput: (out) => set((state) => {
    const newOutput = [...state.output, out];
    // Cap output at 1000 items to prevent memory leaks and UI lag during heavy execution
    return { output: newOutput.slice(-1000) };
  }),
  clearOutput: () => set({ output: [] }),
  status: 'Idle',
  setStatus: (status) => set({ status }),
  metrics: null,
  setMetrics: (metrics) => set({ metrics }),
  token: localStorage.getItem('codme_token') || localStorage.getItem('java_palani_token'),
  setToken: (token) => {
    if (token) localStorage.setItem('codme_token', token);
    else localStorage.removeItem('codme_token');
    set({ token });
  },
  logout: () => {
    localStorage.removeItem('codme_token');
    localStorage.removeItem('java_palani_token');
    set({ token: null, code: languageDefaults.java, language: 'java', output: [], status: 'Idle', metrics: null });
  }
}));
