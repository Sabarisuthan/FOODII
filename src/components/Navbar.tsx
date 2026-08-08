import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, User, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenAccount: () => void;
  activeSection: string;
  setActiveSection: (sec: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenAccount,
  activeSection,
  setActiveSection,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', id: 'hero' },
    { name: 'Products', id: 'products' },
    { name: 'Categories', id: 'categories' },
    { name: 'Offers', id: 'offers' },
    { name: 'About', id: 'why-us' },
    { name: 'Contact', id: 'footer' },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-xl border-b border-amber-900/10 shadow-lg py-3.5'
          : 'bg-gradient-to-b from-white/90 via-white/50 to-transparent backdrop-blur-md py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* LOGO */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2.5 group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#3d1a0e] to-[#5c2c16] flex items-center justify-center shadow-lg shadow-[#3d1a0e]/25 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div className="text-left">
            <span className="block font-serif text-xl font-extrabold tracking-tight text-stone-900 group-hover:text-[#3d1a0e] transition-colors">
              FOODII
            </span>
            <span className="block text-[10px] tracking-widest text-[#5c2c16] uppercase font-bold">
              Artisan &amp; Gourmet Foods
            </span>
          </div>
        </button>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:flex items-center gap-1.5 px-4 py-1.5 rounded-full glass-panel border border-[#3d1a0e]/10 shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'bg-[#3d1a0e] text-white font-extrabold shadow-md shadow-[#3d1a0e]/25'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {link.name}
              </button>
            );
          })}
        </nav>

        {/* RIGHT ACTION BUTTONS */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            aria-label="Search products"
            className="p-2.5 rounded-full glass-card text-stone-700 hover:text-[#3d1a0e] hover:bg-stone-100 transition-all duration-300 relative group"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            aria-label="View wishlist"
            className="p-2.5 rounded-full glass-card text-stone-700 hover:text-[#3d1a0e] hover:bg-stone-100 transition-all duration-300 relative group"
          >
            <Heart className="w-4 h-4" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#3d1a0e] text-white text-[10px] font-bold flex items-center justify-center animate-pulse">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button */}
          <button
            onClick={onOpenCart}
            aria-label="View cart"
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-[#3d1a0e] border border-[#5c2c16]/40 text-white hover:bg-[#2d130a] hover:shadow-lg hover:shadow-[#3d1a0e]/25 transition-all duration-300 group"
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-amber-200 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-amber-400 text-stone-950 text-[10px] font-extrabold flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="text-xs font-bold tracking-wider hidden sm:inline text-white">
              Cart
            </span>
          </button>

          {/* Login / User Account */}
          <button
            onClick={onOpenAccount}
            aria-label="User account"
            className="p-2.5 rounded-full glass-card text-stone-700 hover:text-[#3d1a0e] hover:bg-stone-100 transition-all duration-300 hidden sm:flex"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full glass-card text-stone-700 md:hidden"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU DROPDOWN */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-stone-200 px-6 py-5 mt-2 shadow-xl animate-fadeIn">
          <nav className="flex flex-col gap-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`text-left py-2 text-sm font-semibold transition-colors ${
                  activeSection === link.id ? 'text-[#3d1a0e] font-bold' : 'text-stone-700'
                }`}
              >
                {link.name}
              </button>
            ))}
            <hr className="border-stone-200 my-2" />
            <button
              onClick={() => {
                onOpenAccount();
                setMobileMenuOpen(false);
              }}
              className="flex items-center gap-2 text-sm text-[#3d1a0e] font-bold py-2"
            >
              <User className="w-4 h-4" /> Account Login
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
