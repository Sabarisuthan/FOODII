import React, { useState } from 'react';
import { ProductCard } from './ProductCard';
import { Product, CartItem } from '../types';
import { Sparkles } from 'lucide-react';

interface OrganicCollectionProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistIds: string[];
  cartItems?: CartItem[];
}

export const OrganicCollection: React.FC<OrganicCollectionProps> = ({
  products,
  onAddToCart,
  onQuickView,
  onToggleWishlist,
  wishlistIds,
  cartItems = [],
}) => {
  const [selectedTab, setSelectedTab] = useState<'all' | 'chips' | 'spreads' | 'cookies'>('all');

  const filteredProducts = products.filter((p) => {
    if (selectedTab === 'all') return true;
    return p.category === selectedTab;
  });

  return (
    <section id="products" className="py-24 relative bg-[#faf7f2]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold tracking-widest text-[#3d1a0e] uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#3d1a0e]" />
            <span>Pure Organic &amp; Artisanal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-stone-900 tracking-tight">
            Our Complete Gourmet Collection
          </h2>
          <p className="text-sm text-stone-600 mt-2 font-medium">
            Explore our handcrafted luxury snacks, from kettle-cooked crisps to dark cocoa nut spreads.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center gap-2 mb-12 overflow-x-auto pb-2">
          {[
            { id: 'all', label: 'All Products' },
            { id: 'chips', label: 'Artisan Chips' },
            { id: 'spreads', label: 'Gourmet Spreads' },
            { id: 'cookies', label: 'Handcrafted Cookies' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setSelectedTab(tab.id as any)}
              className={`px-5 py-2 rounded-full text-xs font-bold tracking-wide transition-all duration-300 ${
                selectedTab === tab.id
                  ? 'bg-[#3d1a0e] text-white shadow-lg shadow-[#3d1a0e]/25'
                  : 'glass-panel text-stone-700 hover:text-stone-900 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => {
            const qty = cartItems.find((i) => i.product.id === product.id)?.quantity || 0;
            return (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onQuickView={onQuickView}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistIds.includes(product.id)}
                cartQuantity={qty}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
