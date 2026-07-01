import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../store/useStore';
import { X, Lock, Mail, User, ShieldCheck, KeyRound, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { apiBase } from '../utils/config';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoginDefault?: boolean;
}

type AuthView = 'login' | 'register' | 'forgot-request' | 'forgot-reset';

export default function AuthModal({ isOpen, onClose, isLoginDefault = true }: AuthModalProps) {
  const [view, setView] = useState<AuthView>(isLoginDefault ? 'login' : 'register');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const { setToken } = useStore();
  const navigate = useNavigate();

  const isLogin = view === 'login';
  const isRegister = view === 'register';
  const isForgotRequest = view === 'forgot-request';
  const isForgotReset = view === 'forgot-reset';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Frontend Validations
    if (!email.trim() || !password.trim() || (isRegister && !username.trim())) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isRegister && password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (isRegister && password.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      // 1. Health check (Fail gracefully if backend is down)
      try {
        const healthRes = await fetch(`${apiBase}/health`, {
          signal: AbortSignal.timeout(10000) // 10 seconds timeout for Render cold starts
        });
        if (!healthRes.ok) throw new Error();
      } catch (error) {
        throw new Error('Backend connectivity issue. The server might be waking up or unreachable. Please wait 10 seconds and try again.', { cause: error });
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

      let data: { access_token?: string; detail?: string };
      try {
        data = await response.json();
      } catch (error) {
        throw new Error('Invalid response from server.', { cause: error });
      }

      if (!response.ok) {
        throw new Error(data.detail || 'Authentication failed');
      }

      // Success
      setToken(data.access_token || '');
      toast.success(isLogin ? 'Login successful' : 'Account created successfully');
      
      // Reset form
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setUsername('');
      
      onClose();
      navigate('/select');
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('An unexpected error occurred');
      // Prevent the ugly "Failed to fetch" message
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        toast.error('Network error: Cannot reach the server. Please check your connection.');
      } else if (error.name === 'TimeoutError') {
        toast.error('Request timed out. The server took too long to respond.');
      } else {
        toast.error(error.message || 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetEmail.trim()) {
      toast.error('Please enter your email address');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBase}/auth/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail }),
        signal: AbortSignal.timeout(10000)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to request password reset');
      }
      if (data.reset_code) {
        // In development: code is returned directly
        toast.success(`Your reset code: ${data.reset_code}`, { duration: 15000 });
        setResetCode(data.reset_code);
      } else {
        toast.success('If an account exists with that email, a reset code has been sent.');
      }
      setView('forgot-reset');
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('An unexpected error occurred');
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        toast.error('Network error: Cannot reach the server.');
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resetCode.trim() || !newPassword.trim() || !confirmNewPassword.trim()) {
      toast.error('Please fill in all fields');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (newPassword.length < 8) {
      toast.error('Password must be at least 8 characters long');
      return;
    }
    setIsLoading(true);
    try {
      const response = await fetch(`${apiBase}/auth/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: resetEmail,
          reset_code: resetCode,
          new_password: newPassword,
        }),
        signal: AbortSignal.timeout(10000)
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || 'Failed to reset password');
      }
      toast.success('Password reset successfully! You can now log in.');
      // Reset forgot-password state and go back to login
      setResetEmail('');
      setResetCode('');
      setNewPassword('');
      setConfirmNewPassword('');
      setView('login');
    } catch (err: unknown) {
      const error = err instanceof Error ? err : new Error('An unexpected error occurred');
      if (error.name === 'TypeError' && error.message === 'Failed to fetch') {
        toast.error('Network error: Cannot reach the server.');
      } else {
        toast.error(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setView(isLogin ? 'register' : 'login');
    setPassword('');
    setConfirmPassword('');
  };

  const goToForgotPassword = () => {
    setResetEmail(email); // Pre-fill with the email they already typed
    setResetCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setView('forgot-request');
  };

  const backToLogin = () => {
    setResetEmail('');
    setResetCode('');
    setNewPassword('');
    setConfirmNewPassword('');
    setView('login');
  };

  const getTitle = () => {
    switch (view) {
      case 'login': return 'SYSTEM LOGIN';
      case 'register': return 'INITIALIZE USER';
      case 'forgot-request': return 'RECOVER ACCESS';
      case 'forgot-reset': return 'RESET PASSWORD';
    }
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

            {/* Back button for forgot password views */}
            <AnimatePresence>
              {(isForgotRequest || isForgotReset) && (
                <motion.button
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onClick={backToLogin}
                  className="absolute top-5 left-5 text-white/50 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10 flex items-center gap-1"
                  type="button"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span className="text-xs font-mono">BACK</span>
                </motion.button>
              )}
            </AnimatePresence>

            <div className="flex justify-center mb-6">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center border shadow-[0_0_15px_rgba(0,240,255,0.2)] ${
                (isForgotRequest || isForgotReset) 
                  ? 'bg-neon-purple/10 border-neon-purple/30' 
                  : 'bg-neon-blue/10 border-neon-blue/30'
              }`}>
                {(isForgotRequest || isForgotReset) 
                  ? <KeyRound className="w-6 h-6 text-neon-purple" />
                  : <ShieldCheck className="w-6 h-6 text-neon-blue" />
                }
              </div>
            </div>

            <h2 className="text-2xl font-bold font-mono tracking-widest text-center mb-8 text-white drop-shadow-md">
              {getTitle()}
            </h2>

            {/* ============ LOGIN / REGISTER FORM ============ */}
            <AnimatePresence mode="wait">
              {(isLogin || isRegister) && (
                <motion.div
                  key="auth-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5 relative z-10">
                    <AnimatePresence mode="popLayout">
                      {isRegister && (
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
                      {isRegister && (
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

                    {/* Forgot password link - only on login view */}
                    {isLogin && (
                      <div className="flex justify-end -mt-2">
                        <button
                          type="button"
                          onClick={goToForgotPassword}
                          className="text-neon-purple/70 hover:text-neon-purple text-xs font-mono transition-colors relative after:content-[''] after:absolute after:-bottom-0.5 after:left-0 after:w-0 after:h-[1px] after:bg-neon-purple after:transition-all hover:after:w-full"
                        >
                          Forgot Password?
                        </button>
                      </div>
                    )}

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 relative group px-6 py-3.5 w-full bg-neon-blue/10 rounded-xl font-mono font-bold tracking-widest overflow-hidden border border-neon-blue/50 hover:bg-neon-blue/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(0,240,255,0.1)] hover:shadow-[0_0_30px_rgba(0,240,255,0.3)]"
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
              )}

              {/* ============ FORGOT PASSWORD — REQUEST CODE ============ */}
              {isForgotRequest && (
                <motion.div
                  key="forgot-request"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-white/50 text-sm font-mono text-center mb-6">
                    Enter your registered email to receive a password reset code.
                  </p>
                  <form onSubmit={handleForgotRequest} className="flex flex-col gap-5 relative z-10">
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-purple/60" />
                      <input
                        type="email"
                        placeholder="Email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all shadow-inner"
                        disabled={isLoading}
                        autoFocus
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 relative group px-6 py-3.5 w-full bg-neon-purple/10 rounded-xl font-mono font-bold tracking-widest overflow-hidden border border-neon-purple/50 hover:bg-neon-purple/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(176,38,255,0.1)] hover:shadow-[0_0_30px_rgba(176,38,255,0.3)]"
                    >
                      <span className="relative z-10 text-white group-hover:text-neon-purple transition-colors drop-shadow-sm">
                        {isLoading ? 'SENDING...' : 'SEND RESET CODE'}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/0 via-neon-purple/10 to-neon-purple/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </motion.button>
                  </form>
                </motion.div>
              )}

              {/* ============ FORGOT PASSWORD — ENTER CODE & NEW PASSWORD ============ */}
              {isForgotReset && (
                <motion.div
                  key="forgot-reset"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  <p className="text-white/50 text-sm font-mono text-center mb-6">
                    Enter the 6-digit code and your new password.
                  </p>
                  <form onSubmit={handleResetPassword} className="flex flex-col gap-5 relative z-10">
                    <div className="relative">
                      <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-purple/60" />
                      <input
                        type="text"
                        placeholder="6-digit Reset Code"
                        value={resetCode}
                        onChange={(e) => setResetCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-mono text-center text-xl tracking-[0.5em] placeholder:text-white/30 placeholder:text-sm placeholder:tracking-normal focus:outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all shadow-inner"
                        disabled={isLoading}
                        maxLength={6}
                        autoFocus
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-purple/60" />
                      <input
                        type="password"
                        placeholder="New Password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all shadow-inner"
                        disabled={isLoading}
                      />
                    </div>

                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neon-purple/60" />
                      <input
                        type="password"
                        placeholder="Confirm New Password"
                        value={confirmNewPassword}
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3.5 pl-12 pr-4 text-white font-mono placeholder:text-white/30 focus:outline-none focus:border-neon-purple/50 focus:bg-white/10 transition-all shadow-inner"
                        disabled={isLoading}
                      />
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="mt-2 relative group px-6 py-3.5 w-full bg-neon-purple/10 rounded-xl font-mono font-bold tracking-widest overflow-hidden border border-neon-purple/50 hover:bg-neon-purple/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(176,38,255,0.1)] hover:shadow-[0_0_30px_rgba(176,38,255,0.3)]"
                    >
                      <span className="relative z-10 text-white group-hover:text-neon-purple transition-colors drop-shadow-sm">
                        {isLoading ? 'RESETTING...' : 'RESET PASSWORD'}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-neon-purple/0 via-neon-purple/10 to-neon-purple/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                    </motion.button>
                  </form>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setView('forgot-request')}
                      className="text-white/40 hover:text-white/70 text-xs font-mono transition-colors"
                      type="button"
                    >
                      Didn't receive a code? Request again
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
