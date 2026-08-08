import React, { useState } from 'react';
import { Search, X, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { getProductImageUrl } from '../utils/imageUtils';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onQuickView,
}) => {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const results = products.filter(
    (p) =>
      p.flavor.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase()) ||
      p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fadeIn" />

      <div className="relative w-full max-w-2xl bg-[#faf7f2] border border-amber-900/10 rounded-3xl p-6 z-10 shadow-2xl space-y-6">
        {/* Search Header Input */}
        <div className="flex items-center gap-3 pb-4 border-b border-stone-200">
          <Search className="w-6 h-6 text-[#3d1a0e]" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gourmet chips, flavors, ingredients (e.g. Jalapeño, Truffle, Dark Cocoa)..."
            className="flex-1 bg-transparent text-lg text-stone-900 placeholder-stone-400 focus:outline-none font-medium"
          />
          <button onClick={onClose} className="p-2 rounded-full glass-panel text-stone-500 hover:text-stone-900 hover:bg-stone-200">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-[60vh] overflow-y-auto space-y-3">
          {results.length === 0 ? (
            <p className="text-stone-500 text-sm font-semibold text-center py-8">No gourmet items matching "{query}".</p>
          ) : (
            results.map((product) => (
              <div
                key={product.id}
                className="p-3.5 rounded-2xl glass-card border border-stone-200 flex items-center justify-between hover:border-[#3d1a0e] transition-colors bg-white shadow-sm"
              >
                <div
                  onClick={() => {
                    onQuickView(product);
                    onClose();
                  }}
                  className="flex-1 cursor-pointer flex items-center gap-3"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#faf6f0] border border-stone-200 flex items-center justify-center p-1.5 flex-shrink-0 shadow-sm overflow-hidden">
                    <img
                      src={getProductImageUrl(product)}
                      alt={product.flavor}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#3d1a0e] font-extrabold uppercase tracking-wider block">
                      {product.brand}
                    </span>
                    <h4 className="font-serif text-base font-bold text-stone-900">{product.flavor}</h4>
                    <span className="text-xs text-[#3d1a0e] font-extrabold">₹{product.price}</span>
                  </div>
                </div>

                <button
                  onClick={() => onAddToCart(product)}
                  className="px-4 py-2 rounded-full bg-[#3d1a0e] text-white text-xs font-extrabold flex items-center gap-1.5 hover:bg-[#2d130a] shadow-sm"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
