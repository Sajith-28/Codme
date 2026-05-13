# CODME Frontend

React + TypeScript + Vite frontend for the CODME Academy.

## Scripts

```powershell
npm install
npm run dev
npm run build
npm run lint
```

## Important Files

- `src/data/problems.ts` - exactly 100 roadmap problems
- `src/components/ProblemsPage.tsx` - academy dashboard
- `src/components/ProblemSolve.tsx` - solve page with Monaco, tests, tutor, Learn modal
- `src/components/LearnModal.tsx` - beginner-friendly explanation surface
- `src/components/AITutor.tsx` - context-aware tutor panel
- `src/services/aiTutor.ts` - AI integration adapter
- `src/utils/progress.ts` - XP, ranks, streaks, daily goals, bookmarks

## Optional AI Tutor API

Set `VITE_AI_TUTOR_API` to connect a backend/OpenAI service. Without it, the app uses the local mentor fallback.
