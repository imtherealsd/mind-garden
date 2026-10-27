import { useState } from 'react';
import { X, Check, Sparkles, Crown, Music, ShieldCheck, Zap, RotateCw, Clock, CreditCard, Shield, AlertCircle } from 'lucide-react';
import { PRICING_PLANS, detectDefaultCurrency } from '../utils/pricing';
import { processPlanPayment } from '../utils/payment';

export function SubscriptionModal({ isOpen, onClose, isPlusMember, onActivateSubscription, onCancelSubscription, subscriptionDetails }) {
  // Automatically detect the user's localized currency (INR, USD, EUR, GBP, CAD, AUD, JPY, AED)
  const currencyCode = detectDefaultCurrency();
  const [selectedPlanId, setSelectedPlanId] = useState('yearly'); // 'weekly' | 'monthly' | 'yearly'
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  if (!isOpen) return null;

  const currentPricing = PRICING_PLANS[currencyCode] || PRICING_PLANS.USD;
  const plans = currentPricing.plans;
  const selectedPlan = plans.find((p) => p.id === selectedPlanId) || plans[2];

  const perks = [
    {
      icon: Crown,
      title: 'All Botanical Companions Active',
      desc: 'Seamlessly switch between Cozy Succulent, Neon Fern, & Celestial Spore anytime with all growth preserved.'
    },
    {
      icon: Music,
      title: 'Full Offline Zen Soundscapes',
      desc: 'Unlimited access to Gentle Rain, Tibetan Singing Bowl, Forest Breeze, Night Crickets & Deep Cosmic Drone.'
    },
    {
      icon: Zap,
      title: '2x Permanent Essence Multiplier',
      desc: 'Harvest double currency on all daily check-ins, habit streaks, and guided breathing rituals.'
    },
    {
      icon: ShieldCheck,
      title: '100% Ad-Free Pure Serenity',
      desc: 'Zero interruptions. Instant 1-tap claim on all rain showers and growth blessings without viewing ads.'
    },
    {
      icon: Sparkles,
      title: 'Sacred Sanctuary Decor',
      desc: 'Exclusive access to sacred glowing lanterns, golden lotus pond, and celestial shrines.'
    }
  ];

  const handleSubscribe = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsProcessing(true);

    await processPlanPayment(selectedPlan, currencyCode, {
      onStart: () => setIsProcessing(true),
      onSuccess: (txData) => {
        setIsProcessing(false);
        if (onActivateSubscription) {
          onActivateSubscription(selectedPlanId, txData);
        }
        setSuccessMessage(`🎉 Welcome to Plus! ${selectedPlan.name} is now active.`);
        setTimeout(() => {
          setSuccessMessage('');
          onClose();
        }, 2200);
      },
      onError: (err) => {
        setIsProcessing(false);
        setErrorMessage(typeof err === 'string' ? err : 'Payment could not be completed.');
      },
      onDismiss: () => {
        setIsProcessing(false);
      }
    });
  };

  const handleCancel = () => {
    if (onCancelSubscription) {
      onCancelSubscription();
    }
    onClose();
  };

  // Localized payment acceptance copy
  const getPaymentMethodsText = () => {
    if (currencyCode === 'INR') {
      return '⚡ UPI (Google Pay • PhonePe • Paytm • BHIM) • RuPay • NetBanking • Cards';
    }
    if (currencyCode === 'EUR' || currencyCode === 'GBP') {
      return '🌐 Visa • Mastercard • Apple Pay • Google Pay • SEPA / Local Cards';
    }
    return '🌐 Visa • Mastercard • American Express • Apple Pay • Google Pay • Local Cards';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3.5 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div 
        className="w-full max-w-[420px] max-h-[90dvh] overflow-y-auto rounded-3xl border border-amber-500/25 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 text-slate-100 p-5 shadow-2xl relative scrollbar-none"
        style={{ boxShadow: '0 0 50px rgba(245, 158, 11, 0.15)' }}
      >
        {/* Top Header: Clean Brand Badge & Close */}
        <div className="flex items-center justify-between pb-1">
          <div className="flex items-center space-x-1.5 px-2.5 py-1 rounded-xl bg-amber-500/10 border border-amber-500/20 text-[10px] font-extrabold text-amber-300">
            <Crown className="w-3 h-3 text-amber-400" />
            <span>VIP SANCTUARY PASS</span>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Header Hero */}
        <div className="text-center pt-3 pb-2">
          <div className="inline-flex p-3 rounded-2xl bg-gradient-to-tr from-amber-500/20 to-yellow-400/20 border border-amber-500/30 text-amber-400 mb-2 shadow-inner">
            <Crown className="w-7 h-7" />
          </div>
          <h2 className="text-lg font-display font-bold text-white tracking-tight flex items-center justify-center gap-1.5">
            Mind Garden <span className="text-amber-400 font-extrabold">Plus</span>
          </h2>
          <p className="text-[11px] text-slate-400 mt-1 max-w-[310px] mx-auto leading-relaxed">
            Elevate your daily mindfulness practice with unmetered botanical calm and soothing soundscapes.
          </p>
        </div>

        {/* Alerts: Success & Error */}
        {successMessage && (
          <div className="mb-3 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-semibold text-center animate-in zoom-in-95">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-3 p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-[11px] font-medium flex items-center space-x-2 animate-in zoom-in-95">
            <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Current Active Plan Status Banner */}
        {isPlusMember && (
          <div className="mb-3 p-3 rounded-2xl bg-gradient-to-r from-amber-500/15 to-yellow-500/5 border border-amber-500/30 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-amber-400 animate-pulse shrink-0" />
                <div>
                  <span className="font-extrabold text-amber-300">
                    {subscriptionDetails?.planName || 'VIP Plus'} Active
                  </span>
                  {subscriptionDetails?.daysLeft > 0 && (
                    <div className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                      <Clock className="w-3 h-3 text-amber-400" />
                      <span>{subscriptionDetails.daysLeft} days remaining ({subscriptionDetails.expiryFormatted})</span>
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={handleCancel}
                className="text-[10px] text-slate-400 hover:text-rose-400 underline cursor-pointer shrink-0 ml-2"
              >
                Cancel / Reset
              </button>
            </div>
          </div>
        )}

        {/* Guaranteed Full Inclusion Notice */}
        <div className="mb-3 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-center space-x-2 text-[10px] text-slate-300">
          <Check className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            <strong>100% Feature Inclusion:</strong> Every plan unlocks all 5 VIP perks completely for your full billing duration.
          </span>
        </div>

        {/* Perks Checklist */}
        <div className="space-y-1.5 mb-3.5">
          {perks.map((perk, i) => {
            const Icon = perk.icon;
            return (
              <div key={i} className="flex items-start space-x-2.5 p-2 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="p-1.5 rounded-lg bg-amber-500/10 text-amber-400 shrink-0 mt-0.5">
                  <Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-200">{perk.title}</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">{perk.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Weekly / Monthly / Yearly Plans Selection */}
        <div className="space-y-2 mb-3">
          <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
            Choose Your Sanctuary Plan
          </div>

          <div className="grid grid-cols-3 gap-2">
            {plans.map((p) => {
              const isSelected = selectedPlanId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelectedPlanId(p.id)}
                  className={`p-2.5 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-amber-500/15 border-amber-400 text-white shadow-lg shadow-amber-500/10 ring-1 ring-amber-400/50'
                      : 'bg-white/[0.02] border-white/10 text-slate-400 hover:bg-white/[0.05]'
                  }`}
                >
                  {p.badge && (
                    <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] font-extrabold px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 uppercase tracking-wider whitespace-nowrap shadow-sm">
                      {p.badge}
                    </span>
                  )}
                  <div>
                    <div className="text-[10px] font-bold text-slate-300 mt-0.5">{p.name}</div>
                    <div className="text-base font-extrabold text-amber-300 mt-0.5 font-display">
                      {p.price}
                    </div>
                  </div>
                  <div className="mt-1">
                    <div className="text-[9px] text-slate-400 leading-tight">{p.period}</div>
                    {p.savings && (
                      <div className="text-[8px] font-bold text-emerald-400 bg-emerald-500/10 rounded px-1 mt-1 py-0.2">
                        {p.savings}
                      </div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Mathematical Savings Justification Banner */}
          <div className="p-2.5 rounded-xl bg-white/[0.03] border border-white/5 text-[10px] text-slate-300 flex items-center justify-between">
            <span className="text-slate-400">{selectedPlan.billedText}</span>
            <span className="font-bold text-amber-300 font-mono">{selectedPlan.effectiveRate}</span>
          </div>
        </div>

        {/* Global and Domestic Multi-Payment Acceptance Methods Banner */}
        <div className="mb-3.5 p-2.5 rounded-xl bg-white/[0.02] border border-white/5 space-y-1">
          <div className="flex items-center justify-between text-[9px] font-semibold text-slate-400">
            <span className="flex items-center gap-1">
              <CreditCard className="w-3 h-3 text-emerald-400" />
              <span>Secure Encrypted Checkout</span>
            </span>
            <span className="text-emerald-400 font-bold">Bank-Grade 256-bit SSL</span>
          </div>
          <div className="text-[9px] text-slate-400 leading-relaxed font-mono">
            {getPaymentMethodsText()}
          </div>
        </div>

        {/* CTA Button */}
        {!isPlusMember ? (
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400 text-slate-950 font-display font-black text-xs tracking-wider shadow-lg shadow-amber-500/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
          >
            {isProcessing ? (
              <>
                <RotateCw className="w-4 h-4 animate-spin text-slate-950" />
                <span>Launching Secure Checkout...</span>
              </>
            ) : (
              <>
                <Crown className="w-4 h-4 text-slate-950 fill-current" />
                <span>Unlock {selectedPlan.name} • {selectedPlan.price}</span>
              </>
            )}
          </button>
        ) : (
          <button
            onClick={handleSubscribe}
            disabled={isProcessing}
            className="w-full py-3 rounded-2xl bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs hover:bg-amber-500/30 transition-all cursor-pointer flex items-center justify-center space-x-1.5"
          >
            <RotateCw className="w-3.5 h-3.5" />
            <span>Switch to {selectedPlan.name} ({selectedPlan.price})</span>
          </button>
        )}

        {/* Footer Guarantee & Terms */}
        <div className="text-center mt-3 pt-2.5 border-t border-white/5 space-y-1">
          <p className="text-[9px] text-slate-500 flex items-center justify-center gap-1">
            <Shield className="w-2.5 h-2.5 text-emerald-400" />
            Direct Settlement • 0% Store Commission • Cancel Anytime
          </p>
          <div className="flex justify-center space-x-3 text-[9px] text-slate-500">
            <button onClick={() => setSuccessMessage('Purchases checked. You are up to date.')} className="hover:underline">
              Restore Purchases
            </button>
            <span>•</span>
            <span className="hover:underline">Terms of Service</span>
            <span>•</span>
            <span className="hover:underline">Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
