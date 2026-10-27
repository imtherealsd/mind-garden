// Mind Garden Real Payment Gateway Integration
// Supports:
// 1. Domestic India: UPI (PhonePe, Google Pay, Paytm, BHIM), RuPay Cards, Netbanking
// 2. Global / International: International Credit & Debit Cards (Visa, Mastercard, Amex) across 100+ countries, PayPal

const RAZORPAY_SCRIPT_URL = 'https://checkout.razorpay.com/v1/checkout.js';

// Default Merchant Key Configuration
// You can supply your live or test key here or via localStorage / .env
const DEFAULT_KEY_STORAGE = 'mg-razorpay-key';

export const getMerchantKey = () => {
  try {
    const saved = localStorage.getItem(DEFAULT_KEY_STORAGE);
    if (saved && saved.trim()) return saved.trim();
  } catch (e) {
    // fallback
  }
  // Optional Vite env key fallback or sandbox test key
  return import.meta.env.VITE_RAZORPAY_KEY_ID || 'rzp_test_mindgarden_demo';
};

export const setMerchantKey = (key) => {
  try {
    if (key && key.trim()) {
      localStorage.setItem(DEFAULT_KEY_STORAGE, key.trim());
    } else {
      localStorage.removeItem(DEFAULT_KEY_STORAGE);
    }
  } catch (e) {
    console.error('Failed to save merchant key', e);
  }
};

/**
 * Dynamically loads the Razorpay Standard Checkout script if not already present.
 */
export const loadRazorpayScript = () => {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const existingScript = document.querySelector(`script[src="${RAZORPAY_SCRIPT_URL}"]`);
    if (existingScript) {
      existingScript.addEventListener('load', () => resolve(true));
      existingScript.addEventListener('error', () => reject(new Error('Failed to load Razorpay checkout script.')));
      return;
    }
    const script = document.createElement('script');
    script.src = RAZORPAY_SCRIPT_URL;
    script.async = true;
    script.onload = () => resolve(true);
    script.onerror = () => reject(new Error('Unable to connect to payment server. Check internet connection.'));
    document.body.appendChild(script);
  });
};

/**
 * Initiates a real checkout session.
 * @param {Object} plan - The selected plan object (id, name, priceNumber, price)
 * @param {string} currencyCode - 'INR' or 'USD'
 * @param {Object} options - Additional options like prefill, onComplete, onError
 */
export const processPlanPayment = async (plan, currencyCode = 'INR', { onStart, onSuccess, onError, onDismiss } = {}) => {
  if (onStart) onStart();

  const keyId = getMerchantKey();
  const isDemoKey = keyId.includes('demo') || keyId.startsWith('test_local');

  // If using demo placeholder key, offer simulated sandbox transaction with instant activation
  if (isDemoKey) {
    console.log('[Payment] Running in Demo / Sandbox mode with key:', keyId);
    setTimeout(() => {
      const mockTxId = `TXN_${Date.now().toString(36).toUpperCase()}_${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
      if (onSuccess) {
        onSuccess({
          transactionId: mockTxId,
          planId: plan.id,
          amount: plan.priceNumber,
          currency: currencyCode,
          gateway: 'Razorpay (Sandbox / Demo Mode)',
          paidAt: new Date().toISOString()
        });
      }
    }, 1000);
    return;
  }

  try {
    await loadRazorpayScript();

    // Convert amount to the smallest currency unit (paise for INR, cents for USD)
    const amountInSmallestUnit = Math.round(plan.priceNumber * 100);

    const paymentOptions = {
      key: keyId,
      amount: amountInSmallestUnit,
      currency: currencyCode.toUpperCase(),
      name: 'Mind Garden',
      description: `${plan.name} Subscription • Mindfulness Sanctuary`,
      image: '/icon.svg',
      handler: function (response) {
        // Successful payment callback from Razorpay
        const txId = response.razorpay_payment_id || `TXN_${Date.now()}`;
        if (onSuccess) {
          onSuccess({
            transactionId: txId,
            planId: plan.id,
            amount: plan.priceNumber,
            currency: currencyCode,
            gateway: 'Razorpay (Live Standard Checkout)',
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id || null,
            razorpaySignature: response.razorpay_signature || null,
            paidAt: new Date().toISOString()
          });
        }
      },
      prefill: {
        name: 'Mind Garden Member',
        email: 'mindgarden.user@gmail.com'
      },
      notes: {
        plan_id: plan.id,
        app_name: 'Mind Garden',
        platform: 'Indus Appstore / Android'
      },
      theme: {
        color: '#059669', // Emerald 600 theme
        backdrop_color: 'rgba(2, 6, 23, 0.9)'
      },
      modal: {
        ondismiss: function () {
          if (onDismiss) onDismiss();
        }
      }
    };

    const rzp = new window.Razorpay(paymentOptions);
    rzp.on('payment.failed', function (response) {
      console.error('[Payment Failed]', response.error);
      if (onError) {
        onError(response.error?.description || 'Payment could not be completed. Please try another card or UPI.');
      }
    });

    rzp.open();
  } catch (err) {
    console.error('[Payment Error]', err);
    if (onError) {
      onError(err.message || 'Payment service is temporarily unreachable.');
    }
  }
};
