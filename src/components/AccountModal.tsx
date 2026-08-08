import React, { useState } from 'react';
import { X, User, Lock, ArrowRight, ShieldCheck } from 'lucide-react';

interface AccountModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AccountModal: React.FC<AccountModalProps> = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggedIn(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fadeIn" />

      <div className="relative w-full max-w-md bg-[#faf7f2] border border-amber-900/10 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl space-y-6">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel text-stone-500 hover:text-stone-900 hover:bg-stone-200"
        >
          <X className="w-5 h-5" />
        </button>

        {!isLoggedIn ? (
          <div>
            <div className="text-center space-y-2 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-[#3d1a0e]/10 text-[#3d1a0e] flex items-center justify-center mx-auto">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                {isLogin ? 'Welcome Back Connoisseur' : 'Create Gourmet Account'}
              </h3>
              <p className="text-xs text-stone-600 font-medium">
                {isLogin
                  ? 'Access your saved tasting profiles & order tracking'
                  : 'Join the VIP tasting club for 15% off first order'}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs text-stone-800 font-bold">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="chef@foodii.com"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e] font-medium"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs text-stone-800 font-bold">Password</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-4 py-3 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e] font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full bg-[#3d1a0e] text-white font-extrabold text-xs hover:bg-[#2d130a] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#3d1a0e]/25"
              >
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>
            </form>

            <div className="text-center pt-4 border-t border-stone-200 mt-6">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-xs text-[#3d1a0e] font-bold hover:underline"
              >
                {isLogin ? "Don't have an account? Sign up" : 'Already registered? Sign in'}
              </button>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center space-y-4">
            <ShieldCheck className="w-12 h-12 text-[#3d1a0e] mx-auto" />
            <h3 className="font-serif text-xl font-bold text-stone-900">Logged in as {email || 'FOODII Member'}</h3>
            <p className="text-xs text-stone-600 font-medium">VIP Member Status Active • 15% VIP Discount Unlocked</p>
            <button
              onClick={() => setIsLoggedIn(false)}
              className="px-6 py-2.5 rounded-full bg-stone-200 text-xs text-stone-800 font-bold hover:bg-stone-300"
            >
              Sign Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
