import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Shield, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductPackageVisual } from './ProductPackageVisual';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, qty: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
}) => {
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div onClick={onClose} className="absolute inset-0 bg-black/80 backdrop-blur-md animate-fadeIn" />

      <div className="relative w-full max-w-3xl bg-[#faf7f2] border border-amber-900/10 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full glass-panel text-stone-500 hover:text-stone-900 hover:bg-stone-200"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Left: Product Visual Packaging Box */}
          <div className="md:col-span-5 h-80 rounded-2xl bg-gradient-to-br from-amber-100/60 to-stone-100 border border-stone-200 flex items-center justify-center p-4 shadow-inner">
            <ProductPackageVisual product={product} size="lg" />
          </div>

          {/* Right: Product Meta & Add Controls */}
          <div className="md:col-span-7 space-y-4">
            <span className="text-xs font-bold text-[#3d1a0e] uppercase tracking-wider block">
              {product.brand} • {product.badge || 'Gourmet Selection'}
            </span>

            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              {product.flavor}
            </h2>

            <div className="flex items-center gap-3">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-500" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-900">{product.rating.toFixed(1)}</span>
              <span className="text-xs text-stone-500 font-medium">({product.reviewCount} reviews)</span>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed font-medium">{product.fullDescription}</p>

            {/* Ingredients */}
            <div className="p-3 rounded-xl glass-card border border-stone-200 bg-white/80 space-y-1">
              <span className="text-[11px] font-extrabold text-[#3d1a0e] uppercase block">
                Natural Ingredients
              </span>
              <p className="text-[11px] text-stone-600 leading-snug font-medium">
                {product.ingredients.join(' • ')}
              </p>
            </div>

            {/* Price & Quantity Selector */}
            <div className="flex items-center gap-6 pt-2">
              <span className="text-3xl font-serif font-extrabold text-[#3d1a0e]">
                ₹{product.price * quantity}
              </span>

              <div className="flex items-center gap-3 glass-panel rounded-full px-3 py-1.5 border border-stone-300 bg-stone-100">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="text-stone-700 hover:text-stone-900 font-extrabold px-2"
                >
                  -
                </button>
                <span className="text-sm font-extrabold text-stone-900">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="text-stone-700 hover:text-stone-900 font-extrabold px-2"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => {
                  onAddToCart(product, quantity);
                  onClose();
                }}
                className="flex-1 py-3.5 rounded-full bg-[#3d1a0e] text-white font-extrabold text-xs hover:bg-[#2d130a] transition-colors flex items-center justify-center gap-2 shadow-md shadow-[#3d1a0e]/25"
              >
                <ShoppingBag className="w-4 h-4 text-amber-200" />
                <span>Add to Cart • ₹{product.price * quantity}</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-3.5 rounded-full glass-panel border border-stone-300 bg-white transition-all ${
                  isWishlisted ? 'text-red-500 bg-red-50' : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-red-500' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
