import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplineScene } from "./ui/splite";
import { Spotlight } from "./ui/spotlight"
import { Terminal } from 'lucide-react';
import { useStore } from '../store/useStore';
import AuthModal from './AuthModal';

export default function LandingPage() {
  const navigate = useNavigate();
  const { token } = useStore();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const handleInitialize = () => {
    if (token) {
      navigate('/select');
    } else {
      setIsAuthModalOpen(true);
    }
  };

  return (
    <div className="min-h-screen w-full bg-black/[0.96] relative overflow-hidden flex flex-col md:flex-row">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      {/* Left content */}
      <div className="flex-1 w-full p-6 pt-20 md:p-12 lg:p-24 relative z-10 flex flex-col justify-center items-center md:items-start text-center md:text-left min-h-[50vh] md:min-h-screen">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-400 tracking-tighter flex items-center">
          <span className="font-syncopate">COD</span>
          <span className="font-michroma text-neon-blue neon-text-blue">ME</span>
        </h1>
        <p className="mt-6 text-neutral-300 max-w-xl text-lg md:text-xl lg:text-2xl font-light font-hk-wide tracking-wide">
          A cinematic, immersive 3D execution environment. Bring your DSA and competitive programming to life with ultra-performance.
        </p>
        <button
          onClick={handleInitialize}
          className="mt-10 relative group px-8 py-4 w-max bg-transparent rounded-lg font-hk-wide font-bold tracking-widest overflow-hidden border border-white/20 hover:border-white/50 transition-all hover:scale-105 active:scale-95"
        >
          <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors" />
          <span className="relative z-10 flex items-center justify-center gap-3 text-white uppercase text-sm">
            <Terminal className="w-5 h-5 md:w-6 md:h-6" />
            Initialize Workspace
          </span>
        </button>
      </div>

      {/* Right content */}
      <div className="flex-1 relative w-full h-[50vh] md:h-screen min-h-[400px]">
        <SplineScene 
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>

      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </div>
  )
}
