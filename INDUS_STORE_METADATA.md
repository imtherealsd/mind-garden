# INDUS STORE METADATA — Mind Garden
**Package:** com.mindgarden.app  
**Version:** 1.2.0 (versionCode 6)  
**Date Prepared:** 2026-10-27  

---

## App Identification

| Field | Value |
|---|---|
| **App Name** | Mind Garden |
| **Package Name** | com.mindgarden.app |
| **Version Name** | 1.2.0 |
| **Version Code** | 6 |
| **Developer Name** | Mind Garden |
| **Support Email** | mindgarden.support@gmail.com |
| **Website** | https://mind-garden-gilt.vercel.app/ |
| **Privacy Policy URL** | https://mind-garden-gilt.vercel.app/privacy-policy |

---

## Store Classification

| Field | Value |
|---|---|
| **App Type** | App |
| **Primary Category** | Health and Fitness |
| **Secondary Category** | Lifestyle |
| **Age Rating** | 3+ |
| **Content Rating** | General Audience |
| **In-App Purchases** | Yes (Mind Garden Plus VIP) |
| **Ads** | Yes (Optional Rewarded Zen Blessings) |
| **Internet Required** | No (Full offline support) |

---

## App Store Listing

### App Name
```text
Mind Garden
```

### Short Description (≤80 characters)
```text
Grow a peaceful zen plant through daily stress check-ins & guided breathing.
```

### Long Description

```text
Welcome to Mind Garden — your personal interactive sanctuary for mindfulness, stress relief, and calm.

Nurture a living virtual plant that blooms and grows as you take mindful pauses throughout your day. Transform daily stress into tranquility through guided breathing, mindful check-ins, ambient soundscapes, and a customizable zen garden.

🌱 KEY FEATURES

🌿 GROW YOUR SANCTUARY PLANT
Choose and switch between your botanical companions:
• Cozy Succulent — Gentle, grounding nature care
• Neon Fern — Uplifting bioluminescent focus
• Celestial Spore — Cosmic calm and stress transmutation
Watch your plant flourish as you complete daily mindful rituals.

🎶 PROCEDURAL ZEN SOUNDSCAPES
• Immerse your senses in 5 procedurally generated audio atmospheres
• Gentle Rain, Tibetan Singing Bowl, Forest Breeze, Night Crickets, and Deep Cosmic Drone
• 100% offline synthesis with zero audio bloat

🔥 DAILY WATERING STREAK & RETENTION
• Build healthy emotional wellness habits with consecutive daily check-in streaks
• Earn streak bonus multipliers and celebrate your mindful consistency

🧘 DAILY STRESS & MOOD CHECK-IN
• Simple, intuitive 1–10 slider to log how you feel each day
• Receive personalized reflections based on your state of mind
• Water and nurture your plant with every daily check-in
• Track your emotional well-being history over time

🌬️ GUIDED 60-SECOND BREATHING SESSIONS
• Box Breathing (Inhale, Hold, Exhale) for deep grounding
• Bioluminescent Flow Breath for focus and calm
• Calming visual rhythm animations to anchor your breathing
• Earn Dewdrops and Essence for completing breathing sessions

🎋 ZEN DECORATION SHOP & REWARD BLESSINGS
• Unlock beautiful sanctuary decorations using your earned essence
• Stone lanterns, terracotta lamps, biolum sprites, and ancient gates
• Optional Zen Blessings: claim extra dewdrops and mid-day rain growth showers

👑 MIND GARDEN PLUS (VIP MEMBERSHIP)
• Multi-plant sanctuary: switch between all 3 botanical companions anytime
• Full ambient soundscapes suite unlocked
• 2x permanent essence harvest boost
• 100% ad-free serene experience
• Flexible pricing: Weekly Pass (₹249), Monthly Sanctuary (₹599 - Save 40%), Yearly Oasis (₹1,999 - Save 72% Best Value)

✨ DESIGNED FOR CALM
• Clean, minimalist dark theme designed to reduce visual fatigue
• Soothing ambient visuals and micro-animations
• 100% private — your check-in data stays securely on your device
• Works offline — find peace anytime, anywhere

Take a breath, plant your seed, and watch your mind bloom.

🌿 Nurture Your Mind. Flourish Every Day.
```

---

## Release Notes — Version 1.1.0

```text
🎉 Welcome to Mind Garden v1.1.0 — The Zen Soundscapes & Plus Update!

What's new:
• 🎶 Procedural Ambient Soundscapes: Gentle Rain, Singing Bowl, Forest Breeze, Night Crickets & Cosmic Drone (synthesized with 0 KB audio bloat!)
• 👑 Mind Garden Plus: Introducing our VIP sanctuary tier with multi-plant switching, 2x essence harvest, and ad-free serenity.
• 🌟 Zen Blessings: Voluntary rewarded sponsor boosts for instant bonus dewdrops and mid-day rain showers.
• 🔥 Daily Watering Streak: Track consecutive mindful days with glowing streak counters and essence multipliers.
• ⏰ Evening Habit Reminders: Quiet daily 8:00 PM alert to keep your mindful ritual alive.
• ⚡ Multi-Plant Preservation: Switch botanical companions without losing your previous plant's growth or decor.
• 🛠️ Performance & build optimizations for Android 15 & Indus Appstore.
```

---

## Payment Architecture & Store Policies

### Indus Appstore Policy on 3rd-Party Payment Gateways
- **0% Platform Commission:** Unlike Google Play Store which takes a 15% to 30% cut, Indus Appstore charges **zero commission** on in-app payments. Developers keep 100% of subscription revenue (minus standard gateway processing fees of ~1.5–2%).
- **Third-Party Gateways Fully Permitted:** Indus Appstore has **no proprietary billing mandate**. Developers are completely free to integrate Razorpay, Stripe, Cashfree, or UPI without restriction.
- **No Anti-Steering Restrictions:** You are legally permitted to offer external payment checkouts, subscription links, and multi-currency billing.

### Global & Domestic Acceptance Architecture in Mind Garden
1. **Domestic India (`₹ INR`):**
   - Instant UPI Intent (PhonePe, Google Pay, Paytm, BHIM).
   - RuPay Debit & Credit Cards, NetBanking.
2. **Global / International (`$ USD` & 100+ Currencies):**
   - International Credit & Debit Cards (Visa, Mastercard, American Express, Discover, Diners Club).
   - Apple Pay / Google Pay web checkout.
   - Global currency checkout supported in 100+ countries with automatic currency conversion.
3. **Gateway Implementation:**
   - Powered by standard Razorpay Checkout (`checkout.js`) with dynamic script injection and Sandbox/Demo fallback.
   - To activate international payments on Razorpay:
     - Open Razorpay Dashboard → **Settings** → **International Payments** → Enable.
     - Select RBI Purpose Code: `P0802` (Software / Digital Goods export).
   - In-app key configuration available directly in `SubscriptionModal.jsx` via the Settings gear or `mg-razorpay-key` in localStorage / `VITE_RAZORPAY_KEY_ID`.
