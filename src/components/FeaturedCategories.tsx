import React from 'react';
import { CATEGORIES } from '../data/products';
import { ArrowUpRight, Sparkles } from 'lucide-react';

interface FeaturedCategoriesProps {
  onSelectCategory: (catId: string) => void;
}

export const FeaturedCategories: React.FC<FeaturedCategoriesProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-20 relative bg-[#f7f2ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3d1a0e] uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#3d1a0e]" />
              <span>Gourmet Selections</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
              Explore Our Featured Categories
            </h2>
          </div>
          <p className="text-sm text-stone-600 max-w-md mt-4 md:mt-0 font-medium">
            Handcrafted in small batches using single-origin natural ingredients, small batch oil-roasting, and authentic spices.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {CATEGORIES.map((category) => {
            const getCategoryImage = (id: string) => {
              if (id === 'chips') return '/images/cheese-jalapeno.jpeg';
              if (id === 'spreads') return '/images/chocolate-peanut-butter.jpeg';
              if (id === 'cookies') return '/images/double-chocolate-cookies.jpeg';
              return '/images/truffle-pepper.jpeg';
            };

            const catImage = getCategoryImage(category.id);

            return (
              <div
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                className="group relative h-[420px] rounded-2xl p-6 border border-stone-200 hover:border-[#3d1a0e] transition-all duration-500 hover:-translate-y-2 cursor-pointer flex flex-col justify-between overflow-hidden bg-white shadow-sm hover:shadow-2xl hover:shadow-[#3d1a0e]/10"
              >
                {/* Top Row: Count Badge & Arrow */}
                <div className="relative z-10 flex items-center justify-between">
                  <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#3d1a0e]/10 text-[#3d1a0e] border border-[#3d1a0e]/20 uppercase tracking-wider">
                    {category.count} Items
                  </span>
                  <div className="w-10 h-10 rounded-full bg-[#f7f2ea] flex items-center justify-center text-[#3d1a0e] group-hover:bg-[#3d1a0e] group-hover:text-white transition-all duration-300 shadow-sm">
                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>

                {/* Center Category Real Product Image */}
                <div className="relative z-10 my-3 h-52 sm:h-56 flex items-center justify-center p-2">
                  <img
                    src={catImage}
                    alt={category.name}
                    className="h-full w-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.2)] transition-transform duration-500 group-hover:scale-110"
                  />
                </div>

                {/* Bottom Details - Clean and aligned */}
                <div className="relative z-10 space-y-1.5 pt-2 border-t border-stone-100">
                  <h3 className="font-serif text-xl font-bold text-stone-900 group-hover:text-[#3d1a0e] transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-medium">
                    {category.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
