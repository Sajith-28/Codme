# CODME Academy

CODME is a browser-based coding academy and execution environment for learning programming and Data Structures & Algorithms from absolute beginner level to advanced interview patterns.

Live app: https://codme.vercel.app

## What Is Included

- 100-problem DSA roadmap ordered from first program to master-level patterns
- Progressive unlock flow so beginners always know the next problem
- Learn modal on every problem with intuition, analogy, hints, dry run, brute force, optimized approach, and complexity
- Context-aware AI tutor shell for prompts like “Explain like I am 5”, “Give me a hint”, “Dry run this input”, and “How should I think?”
- XP, ranks, streaks, daily 2-problem mission, topic mastery, bookmarks, favorites, revision mode, interview prep mode, and contest simulation mode
- Monaco code editor with Java, Python, C, and C++ support
- FastAPI/WebSocket execution backend support
- Vercel production deployment

## Architecture

```text
frontend/
  src/
    components/
      AITutor.tsx          Problem-aware tutor panel
      LearnModal.tsx       Beginner-first lesson modal
      ProblemsPage.tsx     Academy dashboard and 100-problem roadmap
      ProblemSolve.tsx     Monaco solve page, tests, XP awards
      IDEWorkspace.tsx     General multi-file IDE
    data/
      problems.ts          Scalable roadmap seed database, exactly 100 problems
      debugPatterns.ts     Local debugging and complexity helpers
    services/
      aiTutor.ts           AI tutor service adapter with local fallback
    store/
      useStore.ts          Zustand language/editor/auth state
    utils/
      progress.ts          XP, ranks, streaks, bookmarks, reminders
fastapi_backend/
  main.py                  API and WebSocket execution service
  execution.py             Language runtime execution layer
```

## Tech Stack

- Frontend: React 19, TypeScript, Vite, TailwindCSS 4, Framer Motion
- Editor: Monaco Editor
- State: Zustand plus local persistence for academy progress
- Backend: FastAPI WebSocket execution service
- AI: `VITE_AI_TUTOR_API` service adapter, with local mentor fallback when no API is configured
- Deployment: GitHub + Vercel

## Environment Variables

Frontend:

```env
VITE_API_BASE_URL=https://your-backend.example.com
VITE_WS_URL=wss://your-backend.example.com
VITE_AI_TUTOR_API=https://your-ai-service.example.com/api/tutor
```

`VITE_AI_TUTOR_API` is optional. If it is not set, CODME uses a local context-aware tutor response engine. A production AI service should accept:

```json
{
  "problem": "Problem object",
  "language": "java | python | c | cpp",
  "message": "Student question",
  "code": "Current editor code"
}
```

and return:

```json
{ "answer": "Tutor response" }
```

## Local Development

Frontend:

```powershell
cd frontend
npm install
npm run dev
```

Backend:

```powershell
cd fastapi_backend
pip install -r requirements.txt
python -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
```

Production build:

```powershell
cd frontend
npm run build
```

## Deployment

This repo is connected to Vercel. Root `vercel.json` builds the frontend and serves `frontend/dist`.

Manual production deploy:

```powershell
cd frontend
npx vercel@latest --prod --yes
```

## Roadmap Data Guarantee

`frontend/src/data/problems.ts` throws at runtime if the academy roadmap does not contain exactly 100 problems. Each problem includes:

- title, slug, difficulty, rank tier, topic, subtopic
- goal, outcome, estimated time, prerequisites
- hints, intuition, beginner explanation
- brute force and optimized approaches
- time and space complexity
- dry run, test cases, tags, examples, starter code

## Notes

The current production app uses the existing React/Vite architecture for deployment stability. The data and service layers are separated so future migration to Next.js, PostgreSQL, Clerk/Auth.js, or a server-side OpenAI tutor can be done without rewriting the roadmap or UX systems.
