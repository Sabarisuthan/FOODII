import React, { useState, useEffect } from 'react';
import { Clock, Flame, Tag, ShoppingBag } from 'lucide-react';
import { Product, CartItem } from '../types';
import { ProductPackageVisual } from './ProductPackageVisual';

interface TodaysDealsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  cartItems?: CartItem[];
}

export const TodaysDeals: React.FC<TodaysDealsProps> = ({
  products,
  onAddToCart,
  onQuickView,
  cartItems = [],
}) => {
  // 12 hour countdown timer state
  const [timeLeft, setTimeLeft] = useState({ hours: 11, minutes: 42, seconds: 18 });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return { hours: 12, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const deals = products.slice(0, 3);

  return (
    <section id="offers" className="py-20 relative bg-gradient-to-b from-[#faf7f2] via-[#f5ede0] to-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Bar with Countdown */}
        <div className="p-8 rounded-3xl glass-panel border border-stone-300 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-xl bg-white/80">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-[#3d1a0e] flex items-center justify-center text-white shadow-lg shadow-[#3d1a0e]/20">
              <Flame className="w-7 h-7 animate-bounce text-amber-200" />
            </div>
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-bold text-[#3d1a0e] uppercase tracking-widest">
                <Tag className="w-3.5 h-3.5 text-[#3d1a0e]" />
                <span>Flash Savings Event</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mt-1">
                Today's Gourmet Flash Deals
              </h2>
            </div>
          </div>

          {/* Countdown Display */}
          <div className="flex items-center gap-3 bg-stone-100 px-6 py-3.5 rounded-2xl border border-stone-200 shadow-inner">
            <Clock className="w-5 h-5 text-[#3d1a0e]" />
            <span className="text-xs text-stone-600 font-semibold">Ends in:</span>
            <div className="flex items-center gap-2 text-xl font-mono font-bold text-stone-900">
              <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-[#3d1a0e] shadow-sm">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-[#3d1a0e] shadow-sm">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span>:</span>
              <span className="px-2.5 py-1 rounded-lg bg-white border border-stone-300 text-[#3d1a0e] shadow-sm">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        {/* Deals Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {deals.map((product) => {
            const qty = cartItems.find((i) => i.product.id === product.id)?.quantity || 0;
            return (
              <div
                key={product.id}
                className="p-6 rounded-3xl glass-card border border-stone-200 hover:border-[#3d1a0e] transition-all duration-300 hover:-translate-y-2 flex flex-col justify-between bg-white/90 shadow-md"
              >
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#3d1a0e]/10 text-[#3d1a0e] border border-[#3d1a0e]/20">
                      SAVE ₹{product.originalPrice ? product.originalPrice - product.price : 50}
                    </span>
                    <span className="text-xs text-stone-500 font-semibold">{product.weight}</span>
                  </div>

                  <div
                    onClick={() => onQuickView(product)}
                    className="relative h-64 sm:h-72 bg-[#faf6f0] rounded-2xl border border-stone-200/80 flex items-center justify-center p-3 cursor-pointer mb-4 overflow-hidden group/deal shadow-sm"
                  >
                    {qty > 0 && (
                      <span className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#3d1a0e] text-white shadow-md uppercase tracking-wider animate-fadeIn">
                        {qty} in Cart
                      </span>
                    )}

                    <ProductPackageVisual
                      product={product}
                      size="md"
                      className="transition-transform duration-500 group-hover/deal:scale-105"
                    />
                  </div>

                  <h3 className="font-serif text-xl font-bold text-stone-900 line-clamp-1">
                    {product.flavor}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 line-clamp-2 leading-relaxed font-medium">
                    {product.shortDescription}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-200 flex items-center justify-between">
                  <div>
                    <span className="text-xs text-stone-400 block line-through font-semibold">
                      ₹{product.originalPrice || product.price + 50}
                    </span>
                    <span className="text-2xl font-serif font-extrabold text-[#3d1a0e]">
                      ₹{product.price}
                    </span>
                  </div>

                  <button
                    onClick={() => onAddToCart(product)}
                    className={`px-5 py-2.5 rounded-full text-xs font-extrabold transition-all flex items-center gap-1.5 shadow-md ${
                      qty > 0
                        ? 'bg-amber-900/10 text-[#3d1a0e] border border-[#3d1a0e] hover:bg-[#3d1a0e] hover:text-white'
                        : 'bg-[#3d1a0e] text-white hover:bg-[#2d130a] shadow-[#3d1a0e]/25'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-200" />
                    <span>{qty > 0 ? `Add (+1) • ${qty} in Cart` : 'Grab Deal'}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
