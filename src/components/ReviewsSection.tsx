import React from 'react';
import { REVIEWS } from '../data/products';
import { Star, CheckCircle, Quote } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-[#faf7f2] via-[#f5ede0] to-[#faf7f2] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold text-[#3d1a0e] uppercase tracking-widest block mb-2">
            CONNOISSEUR TESTIMONIALS
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900">
            Loved By Chefs &amp; Food Enthusiasts
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.id}
              className="p-8 rounded-3xl glass-card border border-stone-200 hover:border-[#3d1a0e] transition-all duration-300 relative flex flex-col justify-between bg-white/90 shadow-md"
            >
              <Quote className="w-10 h-10 text-[#3d1a0e]/15 absolute top-6 right-6" />

              <div>
                <div className="flex items-center gap-1 text-amber-500 mb-4">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-500" />
                  ))}
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">{rev.title}</h3>
                <p className="text-xs text-stone-700 leading-relaxed italic mb-6 font-medium">
                  "{rev.comment}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-stone-200">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-[#3d1a0e]/40 shadow-sm"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-stone-900">{rev.author}</span>
                    {rev.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-[#3d1a0e]" title="Verified Buyer" />
                    )}
                  </div>
                  <span className="text-[10px] text-stone-500 font-semibold">{rev.productName}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
