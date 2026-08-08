import React from 'react';
import { Star, ShoppingBag, Heart, Eye, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { ProductPackageVisual } from './ProductPackageVisual';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  cartQuantity?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  isWishlisted,
  cartQuantity = 0,
}) => {
  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className="group relative rounded-2xl glass-card p-5 border border-[#3d1a0e]/15 hover:border-[#3d1a0e] hover:shadow-2xl hover:shadow-[#3d1a0e]/15 transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden bg-white/90">
      {/* Background Subtle Gradient Glow on Hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#3d1a0e]/5 via-transparent to-[#3d1a0e]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        {/* Top Badges & Wishlist Button */}
        <div className="flex items-center justify-between mb-4 z-10 relative">
          <div className="flex items-center gap-1.5">
            {product.badge && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-[#3d1a0e]/10 text-[#3d1a0e] border border-[#3d1a0e]/20 uppercase">
                {product.badge}
              </span>
            )}
            {discountPercent > 0 && (
              <span className="px-2.5 py-1 rounded-full text-[10px] font-extrabold tracking-wider bg-[#5c2c16]/10 text-[#5c2c16] border border-[#5c2c16]/20">
                {discountPercent}% OFF
              </span>
            )}
          </div>

          <button
            onClick={() => onToggleWishlist(product)}
            aria-label="Add to wishlist"
            className={`p-2 rounded-full glass-panel transition-all duration-300 ${
              isWishlisted
                ? 'text-red-500 bg-red-500/10 border-red-500/30 scale-110'
                : 'text-stone-400 hover:text-stone-900 hover:scale-105'
            }`}
          >
            <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-red-500 text-red-500' : ''}`} />
          </button>
        </div>

        {/* Product Visual Container - Framed inside the card */}
        <div
          onClick={() => onQuickView(product)}
          className="relative h-64 sm:h-72 w-full bg-[#faf6f0] rounded-2xl border border-stone-200/80 flex items-center justify-center p-3 cursor-pointer overflow-hidden group/img mb-4 shadow-sm"
        >
          {cartQuantity > 0 && (
            <span className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full text-[10px] font-extrabold bg-[#3d1a0e] text-white shadow-md uppercase tracking-wider animate-fadeIn">
              {cartQuantity} in Cart
            </span>
          )}

          <ProductPackageVisual
            product={product}
            size="md"
            className="transition-transform duration-500 group-hover/img:scale-105"
          />

          {/* Quick View Hover Overlay Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="absolute bottom-3 px-4 py-2 rounded-full glass-panel text-xs font-bold text-stone-900 opacity-0 group-hover/img:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/img:translate-y-0 flex items-center gap-1.5 hover:bg-[#3d1a0e] hover:text-white shadow-md z-20"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>

        {/* Product Details */}
        <div className="space-y-1.5">
          <span className="text-xs font-bold text-[#3d1a0e] tracking-wider uppercase">
            {product.brand}
          </span>
          <h3
            onClick={() => onQuickView(product)}
            className="font-serif text-lg font-bold text-stone-900 hover:text-[#3d1a0e] transition-colors cursor-pointer line-clamp-1"
          >
            {product.flavor}
          </h3>
          <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed font-medium">
            {product.shortDescription}
          </p>
        </div>
      </div>

      {/* Footer: Rating, Price, Add to Cart */}
      <div className="mt-5 pt-4 border-t border-stone-200 space-y-3">
        <div className="flex items-center justify-between">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
            <span className="font-extrabold text-stone-900">{product.rating.toFixed(1)}</span>
            <span className="text-stone-500 font-medium">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-serif font-extrabold text-[#3d1a0e]">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-stone-400 line-through font-semibold">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={() => onAddToCart(product)}
          className={`w-full py-2.5 rounded-xl border text-xs font-extrabold tracking-wide transition-all duration-300 flex items-center justify-center gap-2 group/btn ${
            cartQuantity > 0
              ? 'bg-amber-900/10 border-[#3d1a0e] text-[#3d1a0e] hover:bg-[#3d1a0e] hover:text-white'
              : 'bg-[#3d1a0e] hover:bg-[#2d130a] border-[#3d1a0e] text-white hover:shadow-lg hover:shadow-[#3d1a0e]/25'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-amber-200 group-hover/btn:text-white transition-colors" />
          <span>
            {cartQuantity > 0 ? `Add More (+1) • ${cartQuantity} in Cart` : 'Add to Cart'}
          </span>
        </button>
      </div>
    </div>
  );
};
