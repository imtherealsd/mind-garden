import { useLocalStorage } from './useLocalStorage';

export function useGardenState() {
  // Core state synced to localStorage
  const [seedType, setSeedType] = useLocalStorage('mg-seed-type', null);
  const [growth, setGrowth] = useLocalStorage('mg-growth-pct', 0);
  const [essence, setEssence] = useLocalStorage('mg-essence-count', 0);
  const [unlockedDecorations, setUnlockedDecorations] = useLocalStorage('mg-unlocked-decorations', []);
  const [activeDecorations, setActiveDecorations] = useLocalStorage('mg-active-decorations', []);
  
  // Multi-plant preservation data (keeps progress safe across plant switches)
  const [allPlants, setAllPlants] = useLocalStorage('mg-all-plants-data', {
    succulent: { growth: 0, activeDecorations: [] },
    fern: { growth: 0, activeDecorations: [] },
    spore: { growth: 0, activeDecorations: [] }
  });

  // Daily check-in logic
  const [lastCheckInDate, setLastCheckInDate] = useLocalStorage('mg-last-checkin-date', null);
  const [lastCheckInValue, setLastCheckInValue] = useLocalStorage('mg-last-checkin-value', 5);
  const [stressHistory, setStressHistory] = useLocalStorage('mg-stress-history', []);
  const [dailySurprise, setDailySurprise] = useLocalStorage('mg-daily-surprise', null);

  // Retention & Streak System
  const [streak, setStreak] = useLocalStorage('mg-water-streak', 1);

  // Time-Bound Subscription State (Weekly / Monthly / Yearly)
  const [subscription, setSubscription] = useLocalStorage('mg-subscription-data', {
    isActive: false,
    plan: null, // 'weekly' | 'monthly' | 'yearly'
    startDate: null,
    expiryDate: null
  });

  // Manual tester override for dev/sandbox console
  const [isPlusOverride, setIsPlusOverride] = useLocalStorage('mg-is-plus-member', false);

  // Computed: whether subscription is currently valid
  const isSubscriptionActive = Boolean(
    subscription?.isActive &&
    subscription?.expiryDate &&
    new Date(subscription.expiryDate).getTime() > Date.now()
  );

  // Final VIP state: either active subscription or tester override
  const isPlusMember = isSubscriptionActive || isPlusOverride;

  // Soundscape Settings
  const [activeSoundTrack, setActiveSoundTrack] = useLocalStorage('mg-sound-track', 'none');
  const [soundVolume, setSoundVolume] = useLocalStorage('mg-sound-volume', 0.5);

  // Notifications
  const [dailyRemindersEnabled, setDailyRemindersEnabled] = useLocalStorage('mg-reminders-enabled', true);

  // Get today's local date string YYYY-MM-DD
  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  // Get yesterday's date string YYYY-MM-DD
  const getYesterdayString = () => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const isCheckedInToday = lastCheckInDate === getTodayString();

  // Handling Onboarding Selection
  const handleSelectSeed = (type) => {
    setSeedType(type);
    
    // Restore preserved plant data if existing
    const existing = allPlants[type];
    if (existing && existing.growth > 0) {
      setGrowth(existing.growth);
      setActiveDecorations(existing.activeDecorations || []);
    } else {
      setGrowth(0);
      setActiveDecorations([]);
      setAllPlants({
        ...allPlants,
        [type]: { growth: 0, activeDecorations: [] }
      });
    }
  };

  // Seamless Plant Switching (VIP / Multi-plant)
  const handleSwitchPlant = (newType) => {
    if (!newType || newType === seedType) return;
    
    // Save current plant state first
    if (seedType) {
      setAllPlants((prev) => ({
        ...prev,
        [seedType]: { growth, activeDecorations }
      }));
    }

    // Switch to new plant
    setSeedType(newType);
    const target = allPlants[newType] || { growth: 0, activeDecorations: [] };
    setGrowth(target.growth || 0);
    setActiveDecorations(target.activeDecorations || []);
  };

  // Subscription Lifecycle Handlers
  const activateSubscription = (planId, paymentMetadata = {}) => {
    const now = new Date();
    let durationDays = 7;
    if (planId === 'weekly') durationDays = 7;
    else if (planId === 'monthly') durationDays = 30;
    else if (planId === 'yearly') durationDays = 365;

    const expiry = new Date(now.getTime() + durationDays * 24 * 60 * 60 * 1000);

    const newSubData = {
      isActive: true,
      plan: planId,
      startDate: now.toISOString(),
      expiryDate: expiry.toISOString(),
      transactionId: paymentMetadata.transactionId || `TXN_${Date.now().toString(36).toUpperCase()}`,
      gateway: paymentMetadata.gateway || 'Razorpay Direct',
      amount: paymentMetadata.amount || null,
      currency: paymentMetadata.currency || 'INR'
    };

    setSubscription(newSubData);
    setIsPlusOverride(true);
    return newSubData;
  };

  const cancelSubscription = () => {
    setSubscription({
      isActive: false,
      plan: null,
      startDate: null,
      expiryDate: null,
      transactionId: null,
      gateway: null,
      amount: null,
      currency: null
    });
    setIsPlusOverride(false);
  };

  // Formatted subscription details for UI
  const getSubscriptionDetails = () => {
    if (!isPlusMember) {
      return {
        isActive: false,
        planName: 'Free Sanctuary',
        daysLeft: 0,
        expiryFormatted: null,
        transactionId: null
      };
    }

    if (!subscription?.expiryDate) {
      return {
        isActive: true,
        planName: 'VIP Supporter',
        daysLeft: 365,
        expiryFormatted: 'Active',
        transactionId: subscription?.transactionId || 'DEV_OVERRIDE'
      };
    }

    const expiryTime = new Date(subscription.expiryDate).getTime();
    const daysLeft = Math.max(0, Math.ceil((expiryTime - Date.now()) / (1000 * 60 * 60 * 24)));
    const expiryFormatted = new Date(subscription.expiryDate).toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });

    let planName = 'Weekly Pass';
    if (subscription.plan === 'monthly') planName = 'Monthly Sanctuary';
    if (subscription.plan === 'yearly') planName = 'Yearly Oasis';

    return {
      isActive: true,
      plan: subscription.plan,
      planName,
      daysLeft,
      expiryFormatted,
      transactionId: subscription.transactionId,
      gateway: subscription.gateway,
      currency: subscription.currency,
      amount: subscription.amount
    };
  };

  // Handling Stress Log Submit
  const handleSubmitStress = (stressValue) => {
    const todayStr = getTodayString();
    const yesterdayStr = getYesterdayString();

    // Streak Calculation
    let nextStreak = streak;
    if (lastCheckInDate === yesterdayStr) {
      nextStreak = streak + 1;
    } else if (lastCheckInDate === todayStr) {
      nextStreak = streak;
    } else {
      nextStreak = 1;
    }
    setStreak(nextStreak);

    setLastCheckInDate(todayStr);
    setLastCheckInValue(stressValue);

    let growthAdded = 10;
    let essenceAdded = 2; // Baseline essence
    let eventName = 'Daily Nourish';

    // Role-specific mechanics
    if (seedType === 'fern' && stressValue >= 7) {
      essenceAdded += 5;
      eventName = 'Zen Harmony';
    } else if (seedType === 'spore' && stressValue <= 4) {
      growthAdded += 5;
      essenceAdded += 5;
      eventName = 'Void Transmuted';
    }

    // Streak Bonus
    if (nextStreak >= 7) {
      essenceAdded += 5;
    } else if (nextStreak >= 3) {
      essenceAdded += 2;
    }

    // Plus Member (VIP 2x Essence Harvest)
    if (isPlusMember) {
      essenceAdded *= 2;
      growthAdded = Math.round(growthAdded * 1.2);
    }

    // Update growth and essence
    const nextGrowth = Math.min(100, growth + growthAdded);
    setGrowth(nextGrowth);
    setEssence((prev) => prev + essenceAdded);

    // Save in allPlants record
    if (seedType) {
      setAllPlants((prev) => ({
        ...prev,
        [seedType]: { growth: nextGrowth, activeDecorations }
      }));
    }

    // Roll for a random daily surprise (50% chance)
    if (Math.random() < 0.50) {
      let surprises = [];
      if (seedType === 'succulent') surprises = ['butterfly', 'flower', 'squirrel'];
      else if (seedType === 'fern') surprises = ['pulse', 'shard', 'glow'];
      else if (seedType === 'spore') surprises = ['comet', 'sprite', 'constellation'];
      
      const chosen = surprises[Math.floor(Math.random() * surprises.length)];
      setDailySurprise(chosen);
    } else {
      setDailySurprise(null);
    }

    // Add to logs history
    const newHistoryItem = {
      date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }),
      stress: stressValue,
      growthAdded,
      essenceAdded,
      eventName,
      plantType: seedType,
      streak: nextStreak
    };
    setStressHistory([newHistoryItem, ...stressHistory]);
  };

  // Handling Breathing session reward (VIP automatically doubles!)
  const handleBreathingReward = (amount) => {
    const finalReward = isPlusMember ? amount * 2 : amount;
    setEssence((prev) => prev + finalReward);
    return finalReward;
  };

  // Zen Blessing / Rewarded Ad or Bonus Claim
  const handleClaimZenBlessing = (baseAmount = 15) => {
    const finalAmount = isPlusMember ? baseAmount * 2 : baseAmount;
    setEssence((prev) => prev + finalAmount);
    return finalAmount;
  };

  // Rain Cloud Growth Burst (Rewarded Ad / VIP boost)
  const handleWaterBoost = (boostPct = 5) => {
    const nextGrowth = Math.min(100, growth + boostPct);
    setGrowth(nextGrowth);
    if (seedType) {
      setAllPlants((prev) => ({
        ...prev,
        [seedType]: { growth: nextGrowth, activeDecorations }
      }));
    }
    return nextGrowth;
  };

  // Upgrade Shop Unlocks
  const handleUnlockDecoration = (id, cost, requiresVip = false) => {
    if (requiresVip && !isPlusMember) return;
    if (essence >= cost) {
      setEssence((prev) => prev - cost);
      const nextUnlocked = [...unlockedDecorations, id];
      const nextActive = [...activeDecorations, id];
      setUnlockedDecorations(nextUnlocked);
      setActiveDecorations(nextActive);

      if (seedType) {
        setAllPlants((prev) => ({
          ...prev,
          [seedType]: { growth, activeDecorations: nextActive }
        }));
      }
    }
  };

  const handleToggleDecoration = (id) => {
    let nextActive;
    if (activeDecorations.includes(id)) {
      nextActive = activeDecorations.filter((d) => d !== id);
    } else {
      nextActive = [...activeDecorations, id];
    }
    setActiveDecorations(nextActive);

    if (seedType) {
      setAllPlants((prev) => ({
        ...prev,
        [seedType]: { growth, activeDecorations: nextActive }
      }));
    }
  };

  // Full Reset to Onboarding
  const handleResetApp = () => {
    setSeedType(null);
    setGrowth(0);
    setEssence(0);
    setUnlockedDecorations([]);
    setActiveDecorations([]);
    setLastCheckInDate(null);
    setStressHistory([]);
    setDailySurprise(null);
    setStreak(1);
    setAllPlants({
      succulent: { growth: 0, activeDecorations: [] },
      fern: { growth: 0, activeDecorations: [] },
      spore: { growth: 0, activeDecorations: [] }
    });
  };

  // Restore State from Cloud Firestore
  const handleRestoreFromCloud = (cloudData) => {
    if (!cloudData) return;
    if (cloudData.seedType) setSeedType(cloudData.seedType);
    if (typeof cloudData.growth === 'number') setGrowth(cloudData.growth);
    if (typeof cloudData.essence === 'number') setEssence(cloudData.essence);
    if (Array.isArray(cloudData.unlockedDecorations)) setUnlockedDecorations(cloudData.unlockedDecorations);
    if (Array.isArray(cloudData.activeDecorations)) setActiveDecorations(cloudData.activeDecorations);
    if (cloudData.allPlants) setAllPlants(cloudData.allPlants);
    if (cloudData.streak) setStreak(cloudData.streak);
    if (Array.isArray(cloudData.stressHistory)) setStressHistory(cloudData.stressHistory);
    if (cloudData.subscription?.isActive) {
      setSubscription(cloudData.subscription);
      setIsPlusOverride(true);
    }
  };

  const getPlantName = (type) => {
    if (type === 'succulent') return 'Cozy Succulent';
    if (type === 'fern') return 'Neon Fern';
    if (type === 'spore') return 'Cosmic Spore';
    return '';
  };

  const getCurrencyName = (type) => {
    if (type === 'succulent') return 'Dewdrop';
    if (type === 'fern') return 'Lumen';
    if (type === 'spore') return 'Starlight';
    return 'Essence';
  };

  const getCurrencySymbol = (type) => {
    if (type === 'succulent') return '💧';
    if (type === 'fern') return '⚡';
    if (type === 'spore') return '⭐';
    return '★';
  };

  const getRoleTitle = (type) => {
    if (type === 'succulent') return 'Caretaker';
    if (type === 'fern') return 'Explorer';
    if (type === 'spore') return 'Astral Gardener';
    return '';
  };

  return {
    seedType,
    growth,
    essence,
    unlockedDecorations,
    activeDecorations,
    allPlants,
    lastCheckInDate,
    lastCheckInValue,
    stressHistory,
    dailySurprise,
    isCheckedInToday,
    streak,
    subscription,
    isPlusMember,
    activateSubscription,
    cancelSubscription,
    getSubscriptionDetails,
    activeSoundTrack,
    soundVolume,
    dailyRemindersEnabled,
    setIsPlusMember: setIsPlusOverride,
    setActiveSoundTrack,
    setSoundVolume,
    setDailyRemindersEnabled,
    handleSelectSeed,
    handleSwitchPlant,
    handleSubmitStress,
    handleBreathingReward,
    handleClaimZenBlessing,
    handleWaterBoost,
    handleUnlockDecoration,
    handleToggleDecoration,
    handleResetApp,
    handleRestoreFromCloud,
    getPlantName,
    getCurrencyName,
    getCurrencySymbol,
    getRoleTitle,
    // Raw state setters for dev/tester console
    setSeedType,
    setGrowth,
    setEssence,
    setUnlockedDecorations,
    setActiveDecorations,
    setLastCheckInDate,
    setStressHistory,
    setDailySurprise,
    setStreak
  };
}
