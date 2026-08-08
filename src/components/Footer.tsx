import React from 'react';
import { Sparkles, Instagram, Twitter, Facebook, ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="footer" className="bg-[#ede6d8] border-t border-amber-900/10 pt-16 pb-12 text-stone-600 text-xs font-medium">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Col 1: Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#3d1a0e] flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-4 h-4 text-amber-200" />
              </div>
              <span className="font-serif text-lg font-bold text-stone-900 tracking-tight">
                FOODII
              </span>
            </div>
            <p className="text-stone-600 max-w-sm leading-relaxed font-medium">
              Crafting luxury artisan snacks with pure single-origin ingredients, small batch micro-roasting, and zero artificial additives.
            </p>
            <div className="flex items-center gap-3 text-stone-700">
              <a href="#" className="p-2 rounded-full glass-card hover:text-[#3d1a0e] hover:bg-white transition-all shadow-sm"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full glass-card hover:text-[#3d1a0e] hover:bg-white transition-all shadow-sm"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="p-2 rounded-full glass-card hover:text-[#3d1a0e] hover:bg-white transition-all shadow-sm"><Facebook className="w-4 h-4" /></a>
            </div>
          </div>

          {/* Col 2: Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-2">
              <li><a href="#hero" className="hover:text-[#3d1a0e] transition-colors font-semibold">3D Hero Showcase</a></li>
              <li><a href="#products" className="hover:text-[#3d1a0e] transition-colors font-semibold">All Products</a></li>
              <li><a href="#categories" className="hover:text-[#3d1a0e] transition-colors font-semibold">Categories</a></li>
              <li><a href="#offers" className="hover:text-[#3d1a0e] transition-colors font-semibold">Today's Deals</a></li>
            </ul>
          </div>

          {/* Col 3: Customer Care */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">Customer Care</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-[#3d1a0e] transition-colors font-semibold">Express Delivery</a></li>
              <li><a href="#" className="hover:text-[#3d1a0e] transition-colors font-semibold">Returns &amp; Guarantee</a></li>
              <li><a href="#" className="hover:text-[#3d1a0e] transition-colors font-semibold">Nutritional Quality</a></li>
              <li><a href="#" className="hover:text-[#3d1a0e] transition-colors font-semibold">FAQs</a></li>
            </ul>
          </div>

          {/* Col 4: Contact */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-serif text-sm font-bold text-stone-900 uppercase tracking-wider">Artisan Headquarters</h4>
            <p className="text-stone-600 leading-relaxed font-medium">
              100 Gourmet Plaza, Culinary District<br />
              New Delhi, India 110001<br />
              Concierge: +91 1800 400 2026
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-300 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500 font-semibold">
          <p>© 2026 FOODII Artisanal Luxury Food Co.</p>
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full glass-panel text-stone-700 hover:text-[#3d1a0e] hover:border-[#3d1a0e]/40 border border-stone-300 transition-all flex items-center gap-1.5 shadow-sm bg-white/70"
          >
            <span>Back to top</span>
            <ArrowUp className="w-4 h-4 text-[#3d1a0e]" />
          </button>
        </div>
      </div>
    </footer>
  );
};
