import React, { useState } from 'react';
import { Sparkles, Flame, Shield, Award } from 'lucide-react';
import { Product } from '../types';
import { getProductImageUrl } from '../utils/imageUtils';

interface ProductPackageVisualProps {
  product: Product;
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
  isHovered?: boolean;
}

export const ProductPackageVisual: React.FC<ProductPackageVisualProps> = ({
  product,
  className = '',
  size = 'hero',
  isHovered = false,
}) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (size !== 'hero') return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const imageKey = product.image || product.id || '';
  const isJalapeno = imageKey.includes('cheese') || imageKey.includes('jalapeno');
  const isTruffle = imageKey.includes('truffle') || imageKey.includes('pepper');
  const isChocoPB = imageKey.includes('chocolate-peanut') || imageKey.includes('dark-choco') || imageKey.includes('spread');
  const isCookie = imageKey.includes('cookie') || imageKey.includes('double-chocolate') || imageKey.includes('biscuit');

  // Resolve real uploaded image file path
  const imageUrl = getProductImageUrl(product);

  // Scale dimensions based on size
  const getContainerDimensions = () => {
    switch (size) {
      case 'sm':
        return 'w-28 h-36';
      case 'md':
        return 'w-full h-64 sm:h-72';
      case 'lg':
        return 'w-full h-72 sm:h-80';
      case 'hero':
      default:
        return 'w-72 sm:w-80 h-[380px] sm:h-[420px]';
    }
  };

  // PACKAGE DISPLAY CONTAINER
  if (size !== 'hero') {
    return (
      <div className={`relative ${getContainerDimensions()} flex items-center justify-center select-none ${className}`}>
        <img
          src={imageUrl}
          alt={`${product.brand} - ${product.flavor}`}
          className="w-full h-full object-contain filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.22)] transition-transform duration-500 hover:scale-110"
          loading="eager"
        />
      </div>
    );
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative flex flex-col items-center justify-center transition-all duration-500 select-none ${className}`}
      style={{
        transform:
          size === 'hero'
            ? `perspective(1000px) rotateY(${mousePos.x * 18}deg) rotateX(${-mousePos.y * 18}deg) ${
                isHovered ? 'scale(1.04)' : 'scale(1)'
              }`
            : 'none',
        transformStyle: 'preserve-3d',
      }}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-all duration-700 opacity-60"
        style={{
          background: isJalapeno
            ? 'radial-gradient(circle, rgba(234, 88, 12, 0.45) 0%, rgba(245, 158, 11, 0.1) 70%)'
            : isTruffle
            ? 'radial-gradient(circle, rgba(217, 119, 6, 0.4) 0%, rgba(120, 53, 15, 0.15) 70%)'
            : isChocoPB
            ? 'radial-gradient(circle, rgba(180, 83, 9, 0.45) 0%, rgba(69, 26, 3, 0.2) 70%)'
            : 'radial-gradient(circle, rgba(194, 65, 12, 0.45) 0%, rgba(120, 53, 15, 0.2) 70%)',
        }}
      />

      {/* Floating Ingredient Accent Effects (Hero Size Only) */}
      {size === 'hero' && (
        <>
          {isJalapeno && (
            <>
              <div className="absolute -top-6 -left-8 z-20 animate-bounce transition-transform duration-1000 pointer-events-none">
                <div className="w-12 h-12 rounded-full border-4 border-emerald-600 bg-emerald-500/30 backdrop-blur-sm flex items-center justify-center shadow-lg shadow-emerald-900/30">
                  <div className="w-4 h-4 rounded-full bg-emerald-800" />
                </div>
              </div>
              <div className="absolute bottom-10 -right-8 z-20 animate-pulse pointer-events-none">
                <div className="w-10 h-10 rounded-full border-4 border-emerald-500 bg-emerald-400/20 backdrop-blur-sm flex items-center justify-center shadow-md">
                  <div className="w-3 h-3 rounded-full bg-emerald-700" />
                </div>
              </div>
              <div className="absolute top-1/2 -right-10 z-20 bg-amber-400 text-amber-950 font-extrabold text-[10px] px-3 py-1 rounded-full shadow-lg border border-amber-300 uppercase tracking-widest animate-pulse">
                Melted Cheddar
              </div>
            </>
          )}

          {isTruffle && (
            <>
              <div className="absolute -top-4 -right-6 z-20 bg-stone-900 border border-amber-500/50 text-amber-400 font-serif font-bold text-xs px-3 py-1.5 rounded-full shadow-xl flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Italian Black Truffle</span>
              </div>
              <div className="absolute bottom-12 -left-6 z-20 bg-amber-900/90 text-amber-200 text-[10px] font-bold px-2.5 py-1 rounded-full border border-amber-600/30 shadow-md">
                Tellicherry Pepper
              </div>
            </>
          )}

          {isChocoPB && (
            <>
              <div className="absolute -top-4 -left-6 z-20 bg-[#451a03] border border-amber-500/50 text-amber-200 font-bold text-xs px-3 py-1.5 rounded-full shadow-xl">
                70% Dark Cocoa
              </div>
              <div className="absolute bottom-8 -right-8 z-20 bg-amber-800 text-amber-100 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-500/40 shadow-md">
                Slow-Roasted Peanuts
              </div>
            </>
          )}

          {isCookie && (
            <>
              <div className="absolute -top-4 -right-6 z-20 bg-[#270e02] border border-amber-500/50 text-amber-300 font-serif font-bold text-xs px-3 py-1.5 rounded-full shadow-xl">
                Oven Baked
              </div>
              <div className="absolute bottom-10 -left-8 z-20 bg-amber-900/90 text-amber-100 text-[10px] font-bold px-3 py-1 rounded-full border border-amber-500/40 shadow-md">
                Melting Cocoa Chunks
              </div>
            </>
          )}
        </>
      )}

      {/* PACKAGE DISPLAY CONTAINER */}
      <div
        className={`relative ${getContainerDimensions()} rounded-3xl p-2 sm:p-3 flex flex-col items-center justify-center overflow-hidden shadow-2xl transition-all duration-500 border bg-white`}
        style={{
          borderColor: '#3d1a0e',
          boxShadow: '0 20px 40px -12px rgba(61, 26, 14, 0.35)',
        }}
      >
        {/* Real Product Image */}
        <div className="relative w-full h-full rounded-2xl overflow-hidden bg-white flex items-center justify-center p-1">
          <img
            src={imageUrl}
            alt={`${product.brand} - ${product.flavor}`}
            className="w-full h-full object-contain filter drop-shadow-md transition-transform duration-500 hover:scale-105"
            loading="eager"
          />

          {/* Floating Quality Stamp */}
          {size === 'hero' && (
            <div className="absolute bottom-2 right-2 bg-stone-900/90 backdrop-blur-md border border-amber-500/40 px-2.5 py-1 rounded-full text-[9px] font-black text-amber-300 uppercase tracking-widest shadow-lg flex items-center gap-1">
              <Award className="w-3 h-3 text-amber-400" />
              <span>Gourmet</span>
            </div>
          )}
        </div>
      </div>

      {/* Realistic Floor Reflection & Drop Shadow */}
      {size === 'hero' && (
        <div className="w-56 sm:w-64 h-6 bg-black/30 rounded-full blur-xl mt-4 transform scale-y-50 pointer-events-none" />
      )}
    </div>
  );
};
