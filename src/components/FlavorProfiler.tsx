import React, { useState } from 'react';
import { Sparkles, CheckCircle2, RotateCcw, ArrowRight } from 'lucide-react';
import { Product } from '../types';

interface FlavorProfilerProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const FlavorProfiler: React.FC<FlavorProfilerProps> = ({
  products,
  onAddToCart,
  onQuickView,
}) => {
  const [prefSpice, setPrefSpice] = useState<number | null>(null);
  const [prefSavory, setPrefSavory] = useState<number | null>(null);
  const [matchedProduct, setMatchedProduct] = useState<Product | null>(null);

  const handleRecommend = () => {
    if (prefSpice === null || prefSavory === null) return;

    // Find best matching product based on flavor profiles
    let bestMatch = products[0];
    let lowestDiff = 999;

    products.forEach((p) => {
      const diff =
        Math.abs(p.flavorProfile.spiciness - prefSpice) +
        Math.abs(p.flavorProfile.richness - prefSavory);
      if (diff < lowestDiff) {
        lowestDiff = diff;
        bestMatch = p;
      }
    });

    setMatchedProduct(bestMatch);
  };

  const handleReset = () => {
    setPrefSpice(null);
    setPrefSavory(null);
    setMatchedProduct(null);
  };

  return (
    <section className="py-20 relative bg-[#faf7f2] border-y border-amber-900/10">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl glass-panel border border-amber-600/30 relative overflow-hidden shadow-xl bg-white/80">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#3d1a0e]/5 rounded-full blur-[100px] pointer-events-none" />

          <div className="text-center max-w-2xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#3d1a0e]/10 border border-[#3d1a0e]/20 text-[#3d1a0e] text-xs font-bold uppercase tracking-widest mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#3d1a0e]" />
              <span>Interactive Tasting Quiz</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Find Your Ideal Gourmet Snack Match
            </h2>
            <p className="text-sm text-stone-600 mt-2 font-medium">
              Select your preferred spice tolerance and richness profile to reveal your perfect artisanal snack match.
            </p>
          </div>

          {!matchedProduct ? (
            <div className="space-y-8 max-w-2xl mx-auto">
              {/* Question 1: Spice Level */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-stone-800">
                  1. Desired Spice Tolerance Level:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {[
                    { label: 'Mild / Zero Spice', val: 0 },
                    { label: 'Subtle Warmth', val: 2 },
                    { label: 'Spicy Fiery Heat', val: 4 },
                    { label: 'Extreme Spice', val: 5 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setPrefSpice(opt.val)}
                      className={`p-3 rounded-xl text-xs font-semibold border transition-all duration-300 text-center ${
                        prefSpice === opt.val
                          ? 'bg-[#3d1a0e] text-white border-[#3d1a0e] font-extrabold shadow-md shadow-[#3d1a0e]/25'
                          : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Richness & Indulgence */}
              <div className="space-y-3">
                <label className="block text-sm font-bold text-stone-800">
                  2. Flavor Richness &amp; Depth:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Light & Crisp', val: 2 },
                    { label: 'Savory & Umami', val: 4 },
                    { label: 'Deep Indulgent Luxury', val: 5 },
                  ].map((opt) => (
                    <button
                      key={opt.val}
                      onClick={() => setPrefSavory(opt.val)}
                      className={`p-3 rounded-xl text-xs font-semibold border transition-all duration-300 text-center ${
                        prefSavory === opt.val
                          ? 'bg-[#5c2c16] text-white border-[#5c2c16] font-extrabold shadow-md shadow-[#5c2c16]/25'
                          : 'bg-stone-100 border-stone-200 text-stone-700 hover:bg-stone-200'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Action */}
              <div className="text-center pt-4">
                <button
                  disabled={prefSpice === null || prefSavory === null}
                  onClick={handleRecommend}
                  className="px-8 py-3.5 rounded-full bg-[#3d1a0e] text-white font-extrabold text-sm hover:bg-[#2d130a] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#3d1a0e]/25"
                >
                  Discover My Snack Match
                </button>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-2xl bg-[#3d1a0e]/5 border border-[#3d1a0e]/20 max-w-xl mx-auto text-center space-y-4 animate-fadeIn">
              <div className="w-12 h-12 rounded-full bg-[#3d1a0e]/15 text-[#3d1a0e] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <span className="text-xs font-extrabold text-[#3d1a0e] uppercase tracking-widest">
                YOUR PERFECT MATCH
              </span>
              <h3 className="font-serif text-2xl font-bold text-stone-900">
                {matchedProduct.name} - {matchedProduct.flavor}
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-md mx-auto font-medium">
                {matchedProduct.fullDescription}
              </p>

              <div className="flex items-center justify-center gap-4 pt-4">
                <button
                  onClick={() => onAddToCart(matchedProduct)}
                  className="px-6 py-2.5 rounded-full bg-[#3d1a0e] text-white font-extrabold text-xs hover:bg-[#2d130a] transition-colors shadow-md shadow-[#3d1a0e]/20"
                >
                  Add Match to Cart • ₹{matchedProduct.price}
                </button>
                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-full glass-panel text-stone-700 hover:text-stone-900 border border-amber-900/10"
                  title="Retake Quiz"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
