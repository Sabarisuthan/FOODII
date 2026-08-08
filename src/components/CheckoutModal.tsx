import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Truck,
  CheckCircle2,
  Lock,
  ArrowRight,
  ShoppingBag,
  FileText,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { CartItem } from '../types';
import { getProductImageUrl } from '../utils/imageUtils';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  onClearCart,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'confirmation'>('details');
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'netbanking' | 'cod'>('upi');

  // Shipping details state
  const [shippingInfo, setShippingInfo] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  // Card details state
  const [cardInfo, setCardInfo] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // UPI details state
  const [upiId, setUpiId] = useState('');

  // Processing indicator
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const shippingFee = subtotal > 499 || subtotal === 0 ? 0 : 40;
  const taxes = Math.round(subtotal * 0.05); // 5% GST
  const grandTotal = subtotal + shippingFee + taxes;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleGoToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!shippingInfo.fullName || !shippingInfo.address || !shippingInfo.phone) return;
    setStep('payment');
  };

  const handlePayAndPlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      const generatedId = 'AMB-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(generatedId);
      setStep('confirmation');
      onClearCart();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity animate-fadeIn"
      />

      {/* Main Container */}
      <div className="relative w-full max-w-4xl bg-[#faf7f2] border border-[#3d1a0e]/20 rounded-3xl z-10 shadow-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header Bar */}
        <div className="p-5 sm:p-6 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#3d1a0e] text-white flex items-center justify-center shadow-md">
              <ShieldCheck className="w-5 h-5 text-amber-200" />
            </div>
            <div>
              <span className="text-[10px] font-extrabold text-[#3d1a0e] uppercase tracking-widest block">
                FOODII ARTISANAL
              </span>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                {step === 'confirmation' ? 'Order Confirmed' : 'Secure Express Checkout'}
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full glass-panel text-stone-500 hover:text-stone-900 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Tracker (if not in confirmation) */}
        {step !== 'confirmation' && (
          <div className="bg-[#f4eee3] px-6 py-3 border-b border-stone-200 flex items-center justify-center gap-6 text-xs font-bold">
            <button
              onClick={() => setStep('details')}
              className={`flex items-center gap-2 ${
                step === 'details' ? 'text-[#3d1a0e]' : 'text-stone-500'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 'details'
                    ? 'bg-[#3d1a0e] text-white'
                    : 'bg-stone-300 text-stone-700'
                }`}
              >
                1
              </span>
              <span>Shipping Address</span>
            </button>
            <ChevronRight className="w-4 h-4 text-stone-400" />
            <div
              className={`flex items-center gap-2 ${
                step === 'payment' ? 'text-[#3d1a0e]' : 'text-stone-500'
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                  step === 'payment'
                    ? 'bg-[#3d1a0e] text-white'
                    : 'bg-stone-300 text-stone-700'
                }`}
              >
                2
              </span>
              <span>Payment Options</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1">
          {step === 'confirmation' ? (
            /* Confirmation View */
            <div className="py-8 max-w-xl mx-auto text-center space-y-6">
              <div className="w-20 h-20 rounded-full bg-[#3d1a0e]/15 text-[#3d1a0e] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <div>
                <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-[#3d1a0e]/10 text-[#3d1a0e] border border-[#3d1a0e]/20 uppercase">
                  Order ID: {orderId}
                </span>
                <h3 className="font-serif text-3xl font-bold text-stone-900 mt-3">
                  Thank You for Your Order!
                </h3>
                <p className="text-xs text-stone-600 mt-2 font-medium leading-relaxed">
                  Your artisanal snacks are being nitrogen-sealed and prepared for express dispatch to{' '}
                  <strong className="text-stone-900">{shippingInfo.address || 'your address'}</strong>.
                </p>
              </div>

              {/* Order Summary Box */}
              <div className="p-5 rounded-2xl bg-white border border-stone-200 text-left space-y-3 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-stone-900 border-b border-stone-100 pb-2">
                  <span>Estimated Delivery</span>
                  <span className="text-[#3d1a0e] flex items-center gap-1">
                    <Truck className="w-4 h-4" /> 2-3 Business Days
                  </span>
                </div>
                <div className="flex justify-between text-xs font-medium text-stone-600">
                  <span>Payment Mode</span>
                  <span className="uppercase font-bold text-stone-800">{paymentMethod}</span>
                </div>
                <div className="flex justify-between text-xs font-medium text-stone-600">
                  <span>Amount Paid</span>
                  <span className="font-bold text-stone-900">₹{grandTotal}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 rounded-full bg-[#3d1a0e] text-white font-extrabold text-xs hover:bg-[#2d130a] shadow-md shadow-[#3d1a0e]/25 transition-all"
                >
                  Continue Browsing Store
                </button>
              </div>
            </div>
          ) : (
            /* Checkout Steps Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Form Steps */}
              <div className="lg:col-span-7 space-y-6">
                {step === 'details' && (
                  <form onSubmit={handleGoToPayment} className="space-y-4">
                    <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-[#3d1a0e]" />
                      <span>Shipping Information</span>
                    </h3>

                    <div className="space-y-3">
                      <div>
                        <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={shippingInfo.fullName}
                          onChange={handleInputChange}
                          placeholder="e.g. Eleanor Vance"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e]"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div>
                          <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                            Email Address *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={shippingInfo.email}
                            onChange={handleInputChange}
                            placeholder="eleanor@example.com"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                            Phone Number *
                          </label>
                          <input
                            type="tel"
                            name="phone"
                            required
                            value={shippingInfo.phone}
                            onChange={handleInputChange}
                            placeholder="+91 98765 43210"
                            className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                          Street Address &amp; House No. *
                        </label>
                        <input
                          type="text"
                          name="address"
                          required
                          value={shippingInfo.address}
                          onChange={handleInputChange}
                          placeholder="Apartment, Street, Landmark"
                          className="w-full px-4 py-2.5 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 placeholder-stone-400 focus:outline-none focus:border-[#3d1a0e]"
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        <div>
                          <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                            City
                          </label>
                          <input
                            type="text"
                            name="city"
                            value={shippingInfo.city}
                            onChange={handleInputChange}
                            placeholder="Mumbai"
                            className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#3d1a0e]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                            State
                          </label>
                          <input
                            type="text"
                            name="state"
                            value={shippingInfo.state}
                            onChange={handleInputChange}
                            placeholder="Maharashtra"
                            className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#3d1a0e]"
                          />
                        </div>
                        <div>
                          <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                            Pincode
                          </label>
                          <input
                            type="text"
                            name="pincode"
                            value={shippingInfo.pincode}
                            onChange={handleInputChange}
                            placeholder="400001"
                            className="w-full px-3 py-2 rounded-xl bg-white border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#3d1a0e]"
                          />
                        </div>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 rounded-full bg-[#3d1a0e] text-white font-extrabold text-xs hover:bg-[#2d130a] shadow-lg shadow-[#3d1a0e]/25 transition-all flex items-center justify-center gap-2 mt-4"
                    >
                      <span>Proceed to Payment Method</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </form>
                )}

                {step === 'payment' && (
                  <div className="space-y-6">
                    <div className="flex items-center justify-between">
                      <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                        <Lock className="w-5 h-5 text-[#3d1a0e]" />
                        <span>Select Payment Method</span>
                      </h3>
                      <button
                        onClick={() => setStep('details')}
                        className="text-xs text-[#3d1a0e] font-bold hover:underline"
                      >
                        Edit Shipping
                      </button>
                    </div>

                    {/* Method Selector Tabs */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      <button
                        type="button"
                        onClick={() => setPaymentMethod('upi')}
                        className={`p-3 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === 'upi'
                            ? 'bg-[#3d1a0e] text-white border-[#3d1a0e] shadow-md'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <QrCode className="w-5 h-5" />
                        <span>UPI / QR</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('card')}
                        className={`p-3 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === 'card'
                            ? 'bg-[#3d1a0e] text-white border-[#3d1a0e] shadow-md'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <CreditCard className="w-5 h-5" />
                        <span>Credit/Debit</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('netbanking')}
                        className={`p-3 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === 'netbanking'
                            ? 'bg-[#3d1a0e] text-white border-[#3d1a0e] shadow-md'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <Building2 className="w-5 h-5" />
                        <span>Net Banking</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentMethod('cod')}
                        className={`p-3 rounded-2xl border text-center font-bold text-xs flex flex-col items-center gap-1.5 transition-all ${
                          paymentMethod === 'cod'
                            ? 'bg-[#3d1a0e] text-white border-[#3d1a0e] shadow-md'
                            : 'bg-white border-stone-300 text-stone-700 hover:bg-stone-100'
                        }`}
                      >
                        <Truck className="w-5 h-5" />
                        <span>Cash on Delivery</span>
                      </button>
                    </div>

                    {/* Active Payment Method Inputs */}
                    <div className="p-5 rounded-2xl bg-white border border-stone-200 space-y-4">
                      {paymentMethod === 'upi' && (
                        <div className="space-y-3">
                          <label className="text-[11px] font-extrabold text-stone-700 uppercase block">
                            Enter UPI ID (Google Pay / PhonePe / Paytm)
                          </label>
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="username@okaxis or 9876543210@paytm"
                            className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#3d1a0e]"
                          />
                          <p className="text-[10px] text-stone-500 font-medium">
                            A payment request will be sent to your UPI app for instant authorization.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'card' && (
                        <div className="space-y-3">
                          <div>
                            <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                              Card Number
                            </label>
                            <input
                              type="text"
                              name="number"
                              maxLength={19}
                              value={cardInfo.number}
                              onChange={handleCardChange}
                              placeholder="4532 •••• •••• 8892"
                              className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#3d1a0e]"
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                                Expiry (MM/YY)
                              </label>
                              <input
                                type="text"
                                name="expiry"
                                maxLength={5}
                                value={cardInfo.expiry}
                                onChange={handleCardChange}
                                placeholder="08/28"
                                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#3d1a0e]"
                              />
                            </div>
                            <div>
                              <label className="text-[11px] font-extrabold text-stone-700 uppercase block mb-1">
                                CVV
                              </label>
                              <input
                                type="password"
                                name="cvv"
                                maxLength={4}
                                value={cardInfo.cvv}
                                onChange={handleCardChange}
                                placeholder="•••"
                                className="w-full px-3 py-2 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#3d1a0e]"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'netbanking' && (
                        <div className="space-y-3">
                          <label className="text-[11px] font-extrabold text-stone-700 uppercase block">
                            Select Bank
                          </label>
                          <select className="w-full px-4 py-2.5 rounded-xl bg-stone-50 border border-stone-300 text-xs font-semibold text-stone-900 focus:outline-none focus:border-[#3d1a0e]">
                            <option>HDFC Bank</option>
                            <option>ICICI Bank</option>
                            <option>State Bank of India</option>
                            <option>Axis Bank</option>
                            <option>Kotak Mahindra Bank</option>
                          </select>
                        </div>
                      )}

                      {paymentMethod === 'cod' && (
                        <div className="text-xs text-stone-700 font-medium leading-relaxed">
                          Pay cash or UPI upon delivery. Our logistics agent will collect payment at your doorstep.
                        </div>
                      )}
                    </div>

                    <button
                      onClick={handlePayAndPlaceOrder}
                      disabled={isProcessing}
                      className="w-full py-4 rounded-full bg-[#3d1a0e] text-white font-extrabold text-sm hover:bg-[#2d130a] shadow-xl shadow-[#3d1a0e]/25 transition-all flex items-center justify-center gap-2"
                    >
                      {isProcessing ? (
                        <span className="flex items-center gap-2">
                          <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Processing Secure Payment...
                        </span>
                      ) : (
                        <span>Pay &amp; Complete Order • ₹{grandTotal}</span>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Right Column: Order Summary Sidebar */}
              <div className="lg:col-span-5 bg-white p-5 rounded-2xl border border-stone-200 h-fit space-y-4 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-stone-900 pb-2 border-b border-stone-100 flex items-center gap-2">
                  <ShoppingBag className="w-4 h-4 text-[#3d1a0e]" />
                  <span>Order Items ({cartItems.reduce((acc, i) => acc + i.quantity, 0)})</span>
                </h3>

                <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                  {cartItems.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex items-center gap-3 text-xs border-b border-stone-100 pb-2"
                    >
                      <div className="w-12 h-12 rounded-xl bg-stone-100 p-1 flex items-center justify-center flex-shrink-0">
                        <img
                          src={getProductImageUrl(item.product)}
                          alt={item.product.flavor}
                          className="w-full h-full object-contain filter drop-shadow-sm"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="font-bold text-stone-900 truncate block">
                          {item.product.flavor}
                        </span>
                        <span className="text-stone-500 font-semibold">
                          Qty: {item.quantity} x ₹{item.product.price}
                        </span>
                      </div>
                      <span className="font-bold text-stone-900">
                        ₹{item.product.price * item.quantity}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Calculation Summary */}
                <div className="space-y-2 text-xs text-stone-600 font-medium pt-2 border-t border-stone-100">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-bold text-stone-900">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Express Shipping</span>
                    <span className="font-bold text-stone-900">
                      {shippingFee === 0 ? 'FREE' : `₹${shippingFee}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated GST (5%)</span>
                    <span className="font-bold text-stone-900">₹{taxes}</span>
                  </div>
                  <div className="flex justify-between text-base font-serif font-extrabold text-stone-900 pt-2 border-t border-stone-200">
                    <span>Grand Total</span>
                    <span className="text-[#3d1a0e]">₹{grandTotal}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
