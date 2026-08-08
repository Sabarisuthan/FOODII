import React, { useState } from 'react';
import { HERO_PRODUCTS, ALL_PRODUCTS } from './data/products';
import { Product, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { FeaturedCategories } from './components/FeaturedCategories';
import { TodaysDeals } from './components/TodaysDeals';
import { FlavorProfiler } from './components/FlavorProfiler';
import { OrganicCollection } from './components/OrganicCollection';
import { ReviewsSection } from './components/ReviewsSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { AccountModal } from './components/AccountModal';
import { CheckoutModal } from './components/CheckoutModal';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  const [heroIndex, setHeroIndex] = useState(0);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Modals
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Active Nav Section
  const [activeSection, setActiveSection] = useState('hero');

  // Toast notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Cart operations
  const handleAddToCart = (product: Product, quantity = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
    showToast(`Added ${quantity}x "${product.flavor}" to Cart!`);
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((p) => p.id === product.id);
      if (exists) {
        showToast(`Removed "${product.flavor}" from Wishlist`);
        return prev.filter((p) => p.id !== product.id);
      } else {
        showToast(`Saved "${product.flavor}" to Wishlist!`);
        return [...prev, product];
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] text-stone-900 selection:bg-[#3d1a0e]/20 selection:text-[#3d1a0e] relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-2xl glass-panel border border-[#3d1a0e]/40 text-stone-900 font-semibold text-xs shadow-2xl flex items-center gap-2.5 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-[#3d1a0e]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        wishlistCount={wishlist.length}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenAccount={() => setAccountOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />

      {/* Main Content */}
      <main>
        {/* 1. Full-screen 3D Hero Section */}
        <HeroSection
          products={HERO_PRODUCTS}
          activeIndex={heroIndex}
          setActiveIndex={setHeroIndex}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          cartItems={cartItems}
        />

        {/* 2. Featured Categories */}
        <FeaturedCategories
          onSelectCategory={(catId) => {
            const el = document.getElementById('products');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* 3. Today's Flash Deals */}
        <TodaysDeals
          products={ALL_PRODUCTS}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          cartItems={cartItems}
        />

        {/* 4. Interactive Flavor Profiler Quiz */}
        <FlavorProfiler
          products={ALL_PRODUCTS}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
        />

        {/* 5. Complete Organic & Gourmet Products Grid */}
        <OrganicCollection
          products={ALL_PRODUCTS}
          onAddToCart={handleAddToCart}
          onQuickView={(prod) => setQuickViewProduct(prod)}
          onToggleWishlist={handleToggleWishlist}
          wishlistIds={wishlist.map((p) => p.id)}
          cartItems={cartItems}
        />

        {/* 6. Customer Reviews */}
        <ReviewsSection />

        {/* 7. Why Choose Us */}
        <WhyChooseUs />

        {/* 8. Newsletter Signup */}
        <Newsletter />
      </main>

      {/* Footer */}
      <Footer />

      {/* Slide-over Drawers & Overlays */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={() => setCartItems([])}
        onOpenCheckout={() => setCheckoutOpen(true)}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlist}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        products={ALL_PRODUCTS}
        onAddToCart={handleAddToCart}
        onQuickView={(prod) => setQuickViewProduct(prod)}
      />

      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={quickViewProduct ? wishlist.some((p) => p.id === quickViewProduct.id) : false}
      />

      <AccountModal isOpen={accountOpen} onClose={() => setAccountOpen(false)} />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={() => setCartItems([])}
      />
    </div>
  );
}
