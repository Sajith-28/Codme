import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { X, Lock, Mail, User, ShieldCheck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { setToken } = useStore();
  const navigate = useNavigate();
  const apiBase = import.meta.env.VITE_API_BASE_URL || '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Frontend Validations
    if (!email.trim() || !password.trim() || (!isLogin && !username.trim())) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (!isLogin && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (!isLogin && password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Health check (Fail gracefully if backend is down)
      try {
        const healthRes = await fetch(`${apiBase}/health`, {
          signal: AbortSignal.timeout(3000) // 3 seconds timeout
        });
        if (!healthRes.ok) throw new Error();
      } catch (e) {
        throw new Error('Backend health check failed. Start FastAPI on port 8000, then retry authentication.');
      }

      // 2. Authentication
      const endpoint = isLogin ? '/auth/login' : '/auth/register';
      const payload = isLogin 
        ? { email, password }
        : { email, password, username };

      const response = await fetch(`${apiBase}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000) // 5 seconds timeout
      });

      let data;
      try {
        data = await response.json();
      } catch (e) {
        throw new Error('Invalid response from server.');
      }

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed');
      }

      // Success
      setToken(data.access_token);
      toast.success(isLogin ? 'Login successful' : 'Account created successfully');
      
      // Reset form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      
      onClose();
      navigate('/select');
    } catch (err: any) {
      // Prevent the ugly "Failed to fetch" message
      if (err.name === 'TypeError' && err.message === 'Failed to fetch') {
        toast.error('Network error: Cannot reach the server. Please check your connection.');
      } else if (err.name === 'TimeoutError') {
        toast.error('Request timed out. The server took too long to respond.');
      } else {
        toast.error(err.message || 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setPassword('');
    setConfirmPassword('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md"
        >
          <motion.div
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="w-full max-w-md p-8 relative rounded-3xl border border-white/20 bg-black/40 shadow-[0_8px_32px_rgba(0,240,255,0.15)] overflow-hidden backdrop-blur-xl"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/20 via-transparent to-neon-purple/20 pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-5 right-5 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex justify-center mb-6">
              <div className="w-12 h-12 rounded-full bg-neon-blue/10 flex items-center justify-center border border-neon-blue/30 shadow-[0_0_15px_rgba(0,240,255,0.2)]">
                <ShieldCheck className="w-6 h-6 text-neon-blue" />
              </div>
            </div>

            <h2 className="text-2xl font-bold font-mono tracking-widest text-center mb-8 text-white drop-shadow-md">
              {isLogin ? 'SYSTEM LOGIN' : 'INITIALIZE USER'}
            </h2>

            <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-blue/60" />
                    <input
                      type="text"
                      placeholder="Username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all shadow-inner"
                      disabled={isLoading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-blue/60" />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all shadow-inner"
                  disabled={isLoading}
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-blue/60" />
                <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all shadow-inner"
                  disabled={isLoading}
                />
              </div>

              <AnimatePresence mode="popLayout">
                {!isLogin && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="relative"
                  >
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-blue/60" />
                    <input
                      type="password"
                      placeholder="Confirm Password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-neon-blue/50 focus:bg-white/10 transition-all shadow-inner"
                      disabled={isLoading}
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={isLoading}
                className="mt-4 relative group px-6 py-3.5 w-full bg-neon-blue/10 rounded-xl font-mono font-bold tracking-widest overflow-hidden border border-neon-blue/50 hover:bg-neon-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
              >
                <span className="relative z-10 text-white group-hover:text-neon-blue transition-colors drop-shadow-sm">
                  {isLoading ? 'PROCESSING...' : isLogin ? 'AUTHENTICATE' : 'REGISTER'}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-neon-blue/0 via-neon-blue/10 to-neon-blue/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </motion.button>
            </form>

            <div className="mt-8 text-center">
              <button 
                onClick={toggleMode}
                className="text-white/50 hover:text-white text-sm font-mono transition-colors relative after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1px] after:bg-white after:transition-all hover:after:w-full"
                type="button"
              >
                {isLogin ? "Don't Have an Account? Register" : "Already Initialized? Login"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
