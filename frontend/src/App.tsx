import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

const LandingPage = lazy(() => import('./components/LandingPage'));
const LanguageSelect = lazy(() => import('./components/LanguageSelect'));
const IDEWorkspace = lazy(() => import('./components/IDEWorkspace'));
const ProblemsPage = lazy(() => import('./components/ProblemsPage'));
const ProblemSolve = lazy(() => import('./components/ProblemSolve'));

function AppContent() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-background text-white font-sans overflow-hidden relative">
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            fontFamily: 'monospace'
          }
        }}
      />
      <div className="grid-background"></div>
      <Suspense fallback={
        <div className="min-h-screen grid place-items-center bg-[#080a10]">
          <div className="flex flex-col items-center gap-4">
            <div className="text-4xl font-black tracking-tighter">
              <span className="font-syncopate text-white">COD</span>
              <span className="font-michroma text-neon-blue neon-text-blue">ME</span>
            </div>
            <div className="h-1 w-48 bg-white/5 rounded-full overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple animate-pulse" />
            </div>
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase">Loading</span>
          </div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/select" element={<LanguageSelect />} />
          <Route path="/ide" element={<IDEWorkspace />} />
          <Route path="/problems" element={<ProblemsPage />} />
          <Route path="/problems/:id" element={<ProblemSolve />} />
        </Routes>
      </Suspense>
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
