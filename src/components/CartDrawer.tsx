import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { CartItem } from '../types';
import { getProductImageUrl } from '../utils/imageUtils';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  onOpenCheckout?: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onOpenCheckout,
}) => {
  const [promoCode, setPromoCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const freeShippingThreshold = 499;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);
  const shippingFee = subtotal >= freeShippingThreshold || subtotal === 0 ? 0 : 49;
  const discountAmount = Math.round((subtotal * appliedDiscount) / 100);
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingFee);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'FOODII15' || code === 'AMBER15' || code === 'GOURMET15') {
      setAppliedDiscount(15);
      setPromoMessage('15% VIP discount applied!');
    } else {
      setPromoMessage('Invalid promo code. Try FOODII15');
    }
  };

  const handleCompleteOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderComplete(true);
    setTimeout(() => {
      onClearCart();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fadeIn"
      />

      {/* Slide-over Drawer */}
      <div className="relative w-full max-w-md bg-[#faf7f2] border-l border-amber-900/10 h-full flex flex-col justify-between z-10 shadow-2xl animate-slideLeft p-6 overflow-y-auto">
        <div>
          {/* Drawer Header */}
          <div className="flex items-center justify-between pb-4 border-b border-stone-200">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#3d1a0e]" />
              <h2 className="font-serif text-xl font-bold text-stone-900">Your Tasting Cart</h2>
              <span className="px-2 py-0.5 rounded-full bg-[#3d1a0e]/10 text-[#3d1a0e] text-xs font-bold">
                {cartItems.reduce((sum, i) => sum + i.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full glass-panel text-stone-500 hover:text-stone-900 hover:bg-stone-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress */}
          <div className="my-4 p-3 rounded-xl glass-card border border-stone-200 bg-white/80 shadow-sm space-y-1.5">
            <div className="flex justify-between text-xs text-stone-700 font-semibold">
              <span>
                {subtotal >= freeShippingThreshold
                  ? '🎉 You unlocked FREE Express Delivery!'
                  : `Add ₹${freeShippingThreshold - subtotal} more for FREE Express Shipping`}
              </span>
            </div>
            <div className="w-full bg-stone-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#3d1a0e] h-full transition-all duration-300"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          {cartItems.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-16 h-16 rounded-full bg-[#3d1a0e]/10 flex items-center justify-center mx-auto text-stone-400">
                <ShoppingBag className="w-8 h-8 text-[#3d1a0e]" />
              </div>
              <p className="text-stone-700 text-sm font-semibold">Your cart is currently empty.</p>
              <p className="text-xs text-stone-500 font-medium">Explore our 3D carousel above to add items!</p>
            </div>
          ) : (
            <div className="space-y-4 my-4 max-h-[40vh] overflow-y-auto pr-1">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className="p-3.5 rounded-xl glass-card border border-stone-200 bg-white shadow-sm flex items-center gap-3 justify-between"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#faf6f0] border border-stone-200 flex items-center justify-center p-1.5 flex-shrink-0 shadow-sm overflow-hidden">
                    <img
                      src={getProductImageUrl(item.product)}
                      alt={item.product.flavor}
                      className="w-full h-full object-contain filter drop-shadow-sm"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-sm font-bold text-stone-900 line-clamp-1">
                      {item.product.flavor}
                    </h4>
                    <span className="text-[11px] text-[#3d1a0e] font-extrabold">
                      ₹{item.product.price}
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 glass-panel border border-stone-200 bg-stone-100 rounded-lg p-1">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="p-1 text-stone-600 hover:text-stone-900"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-extrabold text-stone-900 px-1">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="p-1 text-stone-600 hover:text-stone-900"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-1.5 text-stone-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cart Summary & Promo Code */}
        {cartItems.length > 0 && !isCheckingOut && (
          <div className="pt-4 border-t border-stone-200 space-y-4">
            {/* Promo Code Input */}
            <form onSubmit={handleApplyPromo} className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code (FOODII15)"
                className="flex-1 px-3.5 py-2 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e] font-semibold"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-[#3d1a0e] hover:bg-[#2d130a] text-xs font-extrabold text-white transition-colors"
              >
                Apply
              </button>
            </form>
            {promoMessage && (
              <p
                className={`text-[11px] font-bold ${
                  appliedDiscount > 0 ? 'text-[#3d1a0e]' : 'text-[#3d1a0e]'
                }`}
              >
                {promoMessage}
              </p>
            )}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-stone-700 font-medium">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-stone-900">₹{subtotal}</span>
              </div>
              {appliedDiscount > 0 && (
                <div className="flex justify-between text-[#3d1a0e] font-bold">
                  <span>Discount ({appliedDiscount}%)</span>
                  <span>-₹{discountAmount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Express Shipping</span>
                <span className="font-semibold text-stone-900">{shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between font-serif text-lg font-bold text-stone-900 pt-2 border-t border-stone-200">
                <span>Total</span>
                <span className="text-[#3d1a0e]">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={() => {
                if (onOpenCheckout) {
                  onClose();
                  onOpenCheckout();
                } else {
                  setIsCheckingOut(true);
                }
              }}
              className="w-full py-3.5 rounded-full bg-[#3d1a0e] text-white font-extrabold text-sm hover:bg-[#2d130a] transition-colors flex items-center justify-center gap-2 shadow-lg shadow-[#3d1a0e]/25"
            >
              <span>Proceed to Payment Page</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Checkout Flow Form */}
        {isCheckingOut && !orderComplete && (
          <form onSubmit={handleCompleteOrder} className="space-y-4 pt-4 border-t border-stone-200">
            <h3 className="font-serif text-lg font-bold text-stone-900">Shipping Details</h3>

            <input
              type="text"
              required
              placeholder="Full Name"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e] font-semibold"
            />
            <input
              type="email"
              required
              placeholder="Email Address"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e] font-semibold"
            />
            <input
              type="text"
              required
              placeholder="Delivery Address"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-stone-300 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e] font-semibold"
            />

            <div className="p-3 rounded-xl bg-[#3d1a0e]/10 border border-[#3d1a0e]/20 text-xs text-stone-700 font-semibold flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#3d1a0e]" />
              <span>Payment on Delivery / Express Cards Accepted</span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsCheckingOut(false)}
                className="flex-1 py-3 rounded-xl glass-panel text-stone-700 border border-stone-300 text-xs font-bold hover:bg-stone-200"
              >
                Back to Cart
              </button>
              <button
                type="submit"
                className="flex-1 py-3 rounded-xl bg-[#3d1a0e] text-white text-xs font-extrabold hover:bg-[#2d130a] shadow-md shadow-[#3d1a0e]/20"
              >
                Place Order • ₹{grandTotal}
              </button>
            </div>
          </form>
        )}

        {/* Order Completed Confirmation State */}
        {orderComplete && (
          <div className="py-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#3d1a0e]/15 text-[#3d1a0e] flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-stone-900">Order Confirmed!</h3>
            <p className="text-xs text-stone-600 max-w-xs mx-auto font-medium">
              Thank you for ordering from FOODII! Your package is being nitrogen-sealed and prepared for express dispatch.
            </p>
            <button
              onClick={() => {
                setOrderComplete(false);
                setIsCheckingOut(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-full bg-[#3d1a0e] text-white font-extrabold text-xs shadow-md"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
