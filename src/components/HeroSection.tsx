import React, { useEffect, useState } from 'react';
import { ShoppingBag, Star, ChevronLeft, ChevronRight, Flame, Sparkles, Award, ArrowRight } from 'lucide-react';
import { Product, CartItem } from '../types';
import { ProductPackageVisual } from './ProductPackageVisual';

interface HeroSectionProps {
  products: Product[];
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
  cartItems?: CartItem[];
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  products,
  activeIndex,
  setActiveIndex,
  onAddToCart,
  onQuickView,
  cartItems = [],
}) => {
  const currentProduct = products[activeIndex] || products[0];
  const [isHovered, setIsHovered] = useState(false);
  const [animatingText, setAnimatingText] = useState(false);
  const [progress, setProgress] = useState(0);

  // Trigger text animation when active index changes
  useEffect(() => {
    setAnimatingText(true);
    setProgress(0);
    const timer = setTimeout(() => setAnimatingText(false), 700);
    return () => clearTimeout(timer);
  }, [activeIndex]);

  // 5-second automatic rotation timer with smooth progress bar
  useEffect(() => {
    if (isHovered) return;

    const intervalTime = 50; // update progress every 50ms
    const totalDuration = 5000; // 5 seconds
    const step = (intervalTime / totalDuration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev + step >= 100) {
          return 100;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [isHovered]);

  // Handle advancing active index when progress reaches 100%
  useEffect(() => {
    if (progress >= 100) {
      setActiveIndex((activeIndex + 1) % products.length);
      setProgress(0);
    }
  }, [progress, activeIndex, products.length, setActiveIndex]);

  const handlePrev = () => {
    setActiveIndex(activeIndex === 0 ? products.length - 1 : activeIndex - 1);
  };

  const handleNext = () => {
    setActiveIndex((activeIndex + 1) % products.length);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden transition-colors duration-1000"
      style={{
        background:
          activeIndex === 0
            ? 'radial-gradient(circle at 75% 35%, #fffdfa 0%, #f7f1e5 50%, #eee4d3 100%)'
            : 'radial-gradient(circle at 75% 35%, #fffef8 0%, #f5ece0 50%, #ece0ce 100%)',
      }}
    >
      {/* Background Ambient Spotlight Effects */}
      <div
        className={`absolute top-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-1000 ${
          activeIndex === 0 ? 'bg-[#3d1a0e]/15' : 'bg-[#5c2c16]/15'
        }`}
      />
      <div className="absolute top-10 left-10 w-72 h-72 rounded-full bg-[#3d1a0e]/10 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* LEFT COLUMN: Dynamic Product Content */}
        <div className="lg:col-span-6 flex flex-col justify-center space-y-6 pt-4 lg:pt-0">
          {/* Badge & Subtitle */}
          <div
            className={`transition-all duration-700 ease-out transform ${
              animatingText
                ? 'opacity-0 translate-y-4 blur-sm'
                : 'opacity-100 translate-y-0 blur-none'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-panel border border-[#3d1a0e]/20 text-xs font-bold tracking-wider text-[#3d1a0e] uppercase shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#3d1a0e] animate-pulse" />
              <span>{currentProduct.badge || 'HERO CAROUSEL'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#3d1a0e]" />
              <span className="text-stone-600 font-semibold lowercase">{currentProduct.weight}</span>
            </div>
          </div>

          {/* Main Title & Flavor */}
          <div
            className={`space-y-2 transition-all duration-700 delay-75 ease-out transform ${
              animatingText
                ? 'opacity-0 translate-y-6 blur-md'
                : 'opacity-100 translate-y-0 blur-none'
            }`}
          >
            <h2 className="text-lg sm:text-xl font-bold tracking-widest text-[#3d1a0e] uppercase">
              {currentProduct.name}
            </h2>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-extrabold tracking-tight text-stone-900 leading-[1.1]">
              {currentProduct.flavor.split('&').map((part, i) => (
                <React.Fragment key={i}>
                  {i > 0 && <span className="text-[#3d1a0e] font-serif"> &amp; </span>}
                  <span>{part.trim()}</span>
                </React.Fragment>
              ))}
            </h1>
          </div>

          {/* Short Description */}
          <div
            className={`transition-all duration-700 delay-150 ease-out transform ${
              animatingText
                ? 'opacity-0 translate-y-6 blur-sm'
                : 'opacity-100 translate-y-0 blur-none'
            }`}
          >
            <p className="text-lg sm:text-xl font-semibold text-stone-800 leading-relaxed max-w-xl">
              {currentProduct.shortDescription}
            </p>
            <p className="text-sm text-stone-600 mt-2 max-w-lg leading-relaxed font-medium">
              {currentProduct.fullDescription}
            </p>
          </div>

          {/* Rating & Price */}
          <div
            className={`flex items-center gap-6 py-2 transition-all duration-700 delay-200 ease-out transform ${
              animatingText
                ? 'opacity-0 translate-y-6 blur-sm'
                : 'opacity-100 translate-y-0 blur-none'
            }`}
          >
            {/* Rating Stars */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg glass-card border border-[#3d1a0e]/15 shadow-sm">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 fill-amber-500 text-amber-500 ${
                      i === 4 && currentProduct.rating < 5 ? 'opacity-70' : ''
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-extrabold text-stone-900">{currentProduct.rating.toFixed(1)}</span>
              <span className="text-xs text-stone-500 font-medium">({currentProduct.reviewCount})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-3xl sm:text-4xl font-serif font-extrabold text-[#3d1a0e]">
                ₹{currentProduct.price}
              </span>
              {currentProduct.originalPrice && (
                <span className="text-lg text-stone-400 line-through font-semibold">
                  ₹{currentProduct.originalPrice}
                </span>
              )}
            </div>
          </div>

          {/* Flavor Meter Profiles */}
          <div
            className={`grid grid-cols-4 gap-2 pt-2 transition-all duration-700 delay-300 ease-out transform ${
              animatingText
                ? 'opacity-0 translate-y-6 blur-sm'
                : 'opacity-100 translate-y-0 blur-none'
            }`}
          >
            {[
              { name: 'Spiciness', val: currentProduct.flavorProfile.spiciness },
              { name: 'Crunchiness', val: currentProduct.flavorProfile.crunchiness },
              { name: 'Savory', val: currentProduct.flavorProfile.savory },
              { name: 'Richness', val: currentProduct.flavorProfile.richness },
            ].map((metric) => (
              <div key={metric.name} className="p-2 rounded-lg glass-card text-center border border-[#3d1a0e]/10 shadow-sm">
                <span className="block text-[10px] text-stone-600 uppercase font-bold">
                  {metric.name}
                </span>
                <div className="flex justify-center gap-0.5 mt-1">
                  {[...Array(5)].map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 w-full rounded-full ${
                        idx < metric.val
                          ? 'bg-gradient-to-r from-[#3d1a0e] to-[#5c2c16]'
                          : 'bg-stone-300'
                      }`}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          {(() => {
            const heroQty = cartItems.find((i) => i.product.id === currentProduct.id)?.quantity || 0;
            return (
              <div
                className={`flex flex-wrap items-center gap-4 pt-4 transition-all duration-700 delay-300 ease-out transform ${
                  animatingText
                    ? 'opacity-0 translate-y-6 blur-sm'
                    : 'opacity-100 translate-y-0 blur-none'
                }`}
              >
                <button
                  onClick={() => onAddToCart(currentProduct)}
                  className="flex-1 sm:flex-none px-8 py-4 rounded-full bg-[#3d1a0e] hover:bg-[#2d130a] text-white font-extrabold text-base tracking-wide hover:shadow-xl hover:shadow-[#3d1a0e]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 group shadow-md"
                >
                  <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform text-amber-200" />
                  <span>
                    {heroQty > 0
                      ? `Add More (+1) • ${heroQty} in Cart`
                      : `Shop Now • ₹${currentProduct.price}`}
                  </span>
                </button>

                <button
                  onClick={() => onQuickView(currentProduct)}
                  className="px-6 py-4 rounded-full glass-panel border border-[#3d1a0e]/20 text-stone-900 font-bold text-base hover:bg-white hover:border-[#3d1a0e] transition-all duration-300 flex items-center gap-2 group shadow-sm"
                >
                  <span>Quick Details</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[#3d1a0e]" />
                </button>
              </div>
            );
          })()}
        </div>

        {/* RIGHT COLUMN: 2D/3D Product Package Showcase */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="lg:col-span-6 flex flex-col items-center justify-center relative py-6"
        >
          {/* Main Displayed Package */}
          <div className="relative z-10 my-4 cursor-pointer" onClick={() => onQuickView(currentProduct)}>
            <ProductPackageVisual
              product={currentProduct}
              size="hero"
              isHovered={isHovered}
              className="transition-all duration-700 ease-out"
            />
          </div>

          {/* 4 Package Thumbnail Selector Strip */}
          <div className="w-full max-w-lg mt-6 px-2 grid grid-cols-4 gap-2.5 z-20">
            {products.map((p, idx) => {
              const isActive = activeIndex === idx;
              return (
                <button
                  key={p.id}
                  onClick={() => setActiveIndex(idx)}
                  className={`p-2 rounded-2xl border transition-all duration-300 flex flex-col items-center text-center group ${
                    isActive
                      ? 'bg-white border-[#3d1a0e] shadow-lg shadow-[#3d1a0e]/20 scale-105'
                      : 'bg-white/60 border-stone-200 hover:bg-white hover:border-[#3d1a0e]/40'
                  }`}
                >
                  <div className="h-14 w-full flex items-center justify-center overflow-hidden my-1">
                    <ProductPackageVisual product={p} size="sm" className="scale-75" />
                  </div>
                  <span
                    className={`text-[10px] font-extrabold line-clamp-1 mt-1 ${
                      isActive ? 'text-[#3d1a0e]' : 'text-stone-700 group-hover:text-stone-900'
                    }`}
                  >
                    {p.brand}
                  </span>
                  <span className="text-[9px] text-stone-500 font-medium line-clamp-1">
                    {p.flavor.split('&')[0]}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Carousel Navigation Controls & Progress */}
          <div className="w-full max-w-md mt-6 px-4 flex items-center justify-between z-20">
            {/* Prev Button */}
            <button
              onClick={handlePrev}
              aria-label="Previous package"
              className="p-3 rounded-full glass-panel border border-[#3d1a0e]/20 text-stone-800 hover:text-[#3d1a0e] hover:border-[#3d1a0e]/50 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Pagination Indicators & Timer Bar */}
            <div className="flex flex-col items-center gap-2 flex-1 mx-6">
              <div className="flex items-center gap-3">
                {products.map((p, idx) => (
                  <button
                    key={p.id}
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2.5 rounded-full transition-all duration-500 ${
                      activeIndex === idx
                        ? 'w-10 bg-[#3d1a0e] shadow-md shadow-[#3d1a0e]/40'
                        : 'w-2.5 bg-stone-300 hover:bg-stone-400'
                    }`}
                    title={p.flavor}
                  />
                ))}
              </div>

              {/* Progress Bar for 5s Timer */}
              <div className="w-full bg-stone-300/70 h-1 rounded-full overflow-hidden relative">
                <div
                  className="bg-[#3d1a0e] h-full transition-all duration-75"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-[11px] text-stone-600 font-semibold tracking-wider">
                {isHovered ? 'Paused on hover' : `Package ${activeIndex + 1} of ${products.length} (Rotating every 5s)`}
              </span>
            </div>

            {/* Next Button */}
            <button
              onClick={handleNext}
              aria-label="Next package"
              className="p-3 rounded-full glass-panel border border-[#3d1a0e]/20 text-stone-800 hover:text-[#3d1a0e] hover:border-[#3d1a0e]/50 hover:scale-110 active:scale-95 transition-all duration-300 shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
