import React, { useState } from 'react';
import { Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <section className="py-20 relative bg-gradient-to-r from-[#f7f1e5] via-[#faf7f2] to-[#f5eee0] border-t border-amber-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-amber-600/30 relative overflow-hidden shadow-xl bg-white/90">
          <div className="w-12 h-12 rounded-2xl bg-[#3d1a0e]/10 text-[#3d1a0e] flex items-center justify-center mx-auto mb-4">
            <Mail className="w-6 h-6" />
          </div>

          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#3d1a0e] uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#3d1a0e]" />
            <span>VIP TASTING CLUB</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 mb-3">
            Unlock 15% Off Your First Order
          </h2>
          <p className="text-sm text-stone-600 max-w-xl mx-auto mb-8 font-medium">
            Subscribe to receive exclusive access to limited micro-batch releases, tasting invites, and seasonal discounts.
          </p>

          {!subscribed ? (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="flex-1 px-5 py-3.5 rounded-full bg-white border border-stone-300 text-stone-900 placeholder-stone-400 text-sm focus:outline-none focus:border-[#3d1a0e] shadow-inner font-medium"
              />
              <button
                type="submit"
                className="px-8 py-3.5 rounded-full bg-[#3d1a0e] text-white font-extrabold text-sm hover:bg-[#2d130a] transition-colors shadow-md shadow-[#3d1a0e]/25 whitespace-nowrap"
              >
                Claim 15% Off
              </button>
            </form>
          ) : (
            <div className="p-4 rounded-2xl bg-[#3d1a0e]/10 border border-[#3d1a0e]/20 text-[#3d1a0e] flex items-center justify-center gap-2 text-sm font-bold animate-fadeIn">
              <CheckCircle2 className="w-5 h-5 text-[#3d1a0e]" />
              <span>Welcome! Use code <strong className="underline text-stone-900">FOODII15</strong> at checkout for 15% off!</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
