# 🌱 Mind Garden

> **Interactive Gamified Sanctuary for Mindfulness, Stress Management, and Calm.**

Mind Garden turns daily self-care into a soothing, rewarding experience. By completing daily stress check-ins and guided breathing exercises, users nourish living virtual plants that evolve across 5 procedural visual stages.

---

## 🚀 Key Features

- **Living Procedural Plant Companions:**
  - **Cozy Succulent** (*The Caretaker* — Gentle nature care)
  - **Neon Fern** (*The Explorer* — Focus & flow state resonance)
  - **Celestial Spore** (*The Astral Gardener* — Transmutes stress storms into starlight)
- **Daily Mind State & Stress Check-In:**
  - 1–10 slider logging emotional state with tailored poetic reflections and daily watering mechanics.
- **Guided 60-Second Breathing Mini-Games:**
  - Box Breath (4-4-4), Flow Breath (3-2-3), and Cosmic Void (5-5-5) with real-time animated visual pacing.
- **Procedural Ambient Soundscapes (100% Offline):**
  - Synthesized directly through Web Audio API with zero audio file bloat: *Gentle Rain*, *Tibetan Singing Bowl (216Hz)*, *Forest Breeze*, *Night Crickets*, and *Deep Cosmic Drone*.
- **Sanctuary Customization Shop:**
  - Unlockable decor using earned currency: Pebble Path, Terracotta Lamp, Fireflies, and Torii Shrine Gate.
- **Daily Habit Streaks & Notifications:**
  - Consecutive watering streaks with fire multipliers and local 8:00 PM evening reminder alerts.
- **Mind Garden Plus (VIP Membership):**
  - Multi-plant switching, full soundscapes access, 2x permanent essence harvest, and ad-free experience.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, Tailwind CSS v4, Lucide React
- **Build Tool:** Vite 8
- **Mobile Container:** Capacitor 8 (Android)
- **Audio:** Web Audio API Procedural Synthesis
- **Monetization:**
  - In-App Subscriptions (Razorpay standard checkout integration)
  - Rewarded Video Ads (`@capacitor-community/admob`)
- **PWA Ready:** Service worker caching + web manifest

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```

### 3. Build Web Bundle
```bash
npm run build
```

### 4. Build & Sync to Android
```bash
npm run build:android
# Open in Android Studio
npx cap open android
```

---

## 📄 Store Metadata & Legal Compliance

- **App Store Optimization (ASO):** See [ASO_Metadata.md](file:///d:/APP/UA/Mind%20Garden/ASO_Metadata.md)
- **Indus Store Metadata:** See [INDUS_STORE_METADATA.md](file:///d:/APP/UA/Mind%20Garden/INDUS_STORE_METADATA.md)
- **Privacy Policy:** Embedded at `/privacy-policy` and online at `https://mind-garden-gilt.vercel.app/privacy-policy`
