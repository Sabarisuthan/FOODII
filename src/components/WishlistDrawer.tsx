import React from 'react';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { Product } from '../types';
import { getProductImageUrl } from '../utils/imageUtils';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn" />

      <div className="relative w-full max-w-md bg-[#faf7f2] border-l border-amber-900/10 h-full flex flex-col justify-between z-10 shadow-2xl p-6 overflow-y-auto">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-red-500 fill-red-500" />
              <h2 className="font-serif text-xl font-bold text-stone-900">Your Saved Favorites</h2>
              <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-600 text-xs font-bold">
                {wishlistProducts.length}
              </span>
            </div>
            <button onClick={onClose} className="p-2 rounded-full glass-panel text-stone-500 hover:text-stone-900 hover:bg-stone-200">
              <X className="w-5 h-5" />
            </button>
          </div>

          {wishlistProducts.length === 0 ? (
            <div className="py-20 text-center space-y-3">
              <Heart className="w-12 h-12 text-stone-400 mx-auto" />
              <p className="text-stone-600 font-medium text-sm">No items in your wishlist yet.</p>
            </div>
          ) : (
            <div className="space-y-4 my-6">
              {wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3.5 rounded-xl glass-card border border-stone-200 bg-white shadow-sm flex items-center gap-3 justify-between"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#faf6f0] border border-stone-200 flex items-center justify-center p-1.5 flex-shrink-0 shadow-sm overflow-hidden">
                    <img
                      src={getProductImageUrl(product)}
                      alt={product.flavor}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#3d1a0e] uppercase font-bold">{product.brand}</span>
                    <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">{product.flavor}</h4>
                    <span className="text-xs text-[#3d1a0e] font-extrabold">₹{product.price}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onAddToCart(product)}
                      className="p-2 px-3 rounded-lg bg-[#3d1a0e] text-white text-xs font-extrabold flex items-center gap-1 hover:bg-[#2d130a] shadow-sm"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                    <button
                      onClick={() => onRemoveWishlist(product)}
                      className="p-2 rounded-lg glass-panel text-stone-400 hover:text-red-500 border border-stone-200 bg-stone-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
