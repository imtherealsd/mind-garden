import { useLocalStorage } from './useLocalStorage';

export function useGardenState() {
  // Core state synced to localStorage
  const [seedType, setSeedType] = useLocalStorage('mg-seed-type', null);
  const [growth, setGrowth] = useLocalStorage('mg-growth-pct', 0);
  const [essence, setEssence] = useLocalStorage('mg-essence-count', 0);
  const [unlockedDecorations, setUnlockedDecorations] = useLocalStorage('mg-unlocked-decorations', []);
  const [activeDecorations, setActiveDecorations] = useLocalStorage('mg-active-decorations', []);
  
  // Daily check-in logic
  const [lastCheckInDate, setLastCheckInDate] = useLocalStorage('mg-last-checkin-date', null);
  const [lastCheckInValue, setLastCheckInValue] = useLocalStorage('mg-last-checkin-value', 5);
  const [stressHistory, setStressHistory] = useLocalStorage('mg-stress-history', []);
  const [dailySurprise, setDailySurprise] = useLocalStorage('mg-daily-surprise', null);

  // Get today's local date string YYYY-MM-DD
  const getTodayString = () => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  const isCheckedInToday = lastCheckInDate === getTodayString();

  // Handling Onboarding Selection
  const handleSelectSeed = (type) => {
    setSeedType(type);
    setGrowth(0);
    setEssence(0);
    setUnlockedDecorations([]);
    setActiveDecorations([]);
    setLastCheckInDate(null);
    setStressHistory([]);
    setDailySurprise(null);
  };

  // Handling Stress Log Submit
  const handleSubmitStress = (stressValue) => {
    setLastCheckInDate(getTodayString());
    setLastCheckInValue(stressValue);

    let growthAdded = 10;
    let essenceAdded = 0;
    let eventName = 'Daily Nourish';

    if (seedType === 'fern' && stressValue >= 7) {
      // Prism Weaver Zen Harmony Bonus (High Focus / Energy)
      essenceAdded = 5;
      eventName = 'Zen Harmony';
    } else if (seedType === 'spore' && stressValue <= 4) {
      // Cosmic Spore Void Transmutation (Heavy Black Hole Storm)
      growthAdded = 15;
      essenceAdded = 5;
      eventName = 'Void Transmuted';
    }

    // Update growth and essence
    const nextGrowth = Math.min(100, growth + growthAdded);
    setGrowth(nextGrowth);
    if (essenceAdded > 0) {
      setEssence((prev) => prev + essenceAdded);
    }

    // Roll for a random daily surprise (45% chance)
    if (Math.random() < 0.45) {
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
      plantType: seedType
    };
    setStressHistory([newHistoryItem, ...stressHistory]);
  };

  // Handling Breathing session reward
  const handleBreathingReward = (amount) => {
    setEssence((prev) => prev + amount);
  };

  // Upgrade Shop Unlocks
  const handleUnlockDecoration = (id, cost) => {
    if (essence >= cost) {
      setEssence((prev) => prev - cost);
      setUnlockedDecorations([...unlockedDecorations, id]);
      setActiveDecorations([...activeDecorations, id]);
    }
  };

  const handleToggleDecoration = (id) => {
    if (activeDecorations.includes(id)) {
      setActiveDecorations(activeDecorations.filter((d) => d !== id));
    } else {
      setActiveDecorations([...activeDecorations, id]);
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
    lastCheckInDate,
    lastCheckInValue,
    stressHistory,
    dailySurprise,
    isCheckedInToday,
    handleSelectSeed,
    handleSubmitStress,
    handleBreathingReward,
    handleUnlockDecoration,
    handleToggleDecoration,
    handleResetApp,
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
    setDailySurprise
  };
}
