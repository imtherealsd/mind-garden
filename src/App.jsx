import { useState, useEffect } from 'react';
import { useGardenState } from './hooks/useGardenState';
import { Onboarding } from './components/Onboarding';
import { GardenCanvas } from './components/GardenCanvas';
import { StressCheckIn } from './components/StressCheckIn';
import { CountdownTimer } from './components/CountdownTimer';
import { BreathingMiniGame } from './components/BreathingMiniGame';
import { DecorationShop } from './components/DecorationShop';
import { TesterConsole } from './components/TesterConsole';
import { AmbientBackground } from './components/AmbientBackground';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { SoundBar } from './components/SoundBar';
import { SubscriptionModal } from './components/SubscriptionModal';
import { ProfileModal } from './components/ProfileModal';
import { subscribeToAuthChanges, saveGardenToCloud } from './utils/firebase';
import { cloudSyncService } from './utils/cloudSyncService';
import { notificationService } from './utils/notificationService';
import { 
  Sprout, 
  Wind, 
  Sparkles, 
  History, 
  RotateCcw, 
  Calendar, 
  Sliders, 
  ArrowLeft, 
  Crown, 
  Flame, 
  Bell, 
  BellOff,
  ChevronDown,
  Cloud
} from 'lucide-react';

export default function App() {
  const gardenState = useGardenState();
  const {
    seedType,
    growth,
    essence,
    unlockedDecorations,
    activeDecorations,
    lastCheckInValue,
    stressHistory,
    dailySurprise,
    isCheckedInToday,
    streak,
    isPlusMember,
    activateSubscription,
    cancelSubscription,
    getSubscriptionDetails,
    activeSoundTrack,
    soundVolume,
    dailyRemindersEnabled,
    setIsPlusMember,
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
    getCurrencySymbol,
    getRoleTitle
  } = gardenState;

  const subDetails = getSubscriptionDetails ? getSubscriptionDetails() : { isPlusMember };

  // UI States
  const [activeTab, setActiveTab] = useState('garden'); // 'garden' | 'breathe' | 'shop' | 'history'
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTester, setShowTester] = useState(false);
  const [showSubscriptionModal, setShowSubscriptionModal] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [showPlantMenu, setShowPlantMenu] = useState(false);
  const [, setDebugClicks] = useState(0);
  const [debugEnabled, setDebugEnabled] = useState(() => {
    return localStorage.getItem('mg-debug-enabled') === 'true';
  });

  // Client-side routing state
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Initialize reminder notification on launch
  useEffect(() => {
    if (dailyRemindersEnabled) {
      notificationService.scheduleDailyReminder(true);
    }
  }, [dailyRemindersEnabled]);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsub = subscribeToAuthChanges((user) => {
      setCurrentUser(user);
    });
    return () => unsub();
  }, []);

  // Listen to realtime cloud sync service status
  const [syncState, setSyncState] = useState({ status: 'idle', formattedTime: 'Just now' });
  useEffect(() => {
    return cloudSyncService.subscribe((state) => {
      setSyncState(state);
    });
  }, []);

  // Automated Realtime Cloud Sync whenever sanctuary state changes
  useEffect(() => {
    if (currentUser?.uid && seedType) {
      cloudSyncService.queueAutoSync(currentUser.uid, {
        seedType,
        growth,
        essence,
        unlockedDecorations,
        activeDecorations,
        allPlants: gardenState.allPlants,
        streak,
        subscription: gardenState.subscription,
        stressHistory
      });
    }
  }, [currentUser?.uid, seedType, growth, essence, streak, activeDecorations, unlockedDecorations, stressHistory, gardenState.allPlants]);

  const navigateTo = (path) => {
    window.history.pushState({}, '', path);
    setCurrentPath(path);
  };

  const handleTitleClick = () => {
    setDebugClicks((prev) => {
      const next = prev + 1;
      if (next >= 5) {
        const nextState = !debugEnabled;
        setDebugEnabled(nextState);
        localStorage.setItem('mg-debug-enabled', String(nextState));
        return 0;
      }
      return next;
    });
  };

  const handleToggleReminder = async () => {
    const nextState = !dailyRemindersEnabled;
    setDailyRemindersEnabled(nextState);
    await notificationService.scheduleDailyReminder(nextState);
  };

  const plantList = [
    { id: 'succulent', name: 'Cozy Succulent', symbol: '💧', role: 'The Caretaker' },
    { id: 'fern', name: 'Neon Fern', symbol: '⚡', role: 'The Explorer' },
    { id: 'spore', name: 'Celestial Spore', symbol: '⭐', role: 'Astral Gardener' }
  ];

  return (
    <div className={`h-[100dvh] w-full theme-${seedType || 'default'} theme-container flex justify-center items-stretch font-sans overflow-hidden transition-colors duration-700`}>
      {/* Mobile container constraint */}
      <div 
        className="w-full max-w-[440px] h-full flex flex-col justify-between overflow-hidden relative border-x border-white/5 sm:shadow-2xl sm:shadow-black/90 transition-all duration-700 theme-panel"
        style={{ background: 'var(--color-garden-bg)' }}
      >
        {/* Ambient Animated Role Visuals */}
        <AmbientBackground seedType={seedType} />
        
        {/* Ultra-Clean Safe-Area Aware Header */}
        <header className="safe-top px-4 pb-2.5 bg-slate-950/85 backdrop-blur-xl border-b border-white/5 shrink-0 z-30 transition-all">
          {/* Top Row: Primary Navigation & Balances */}
          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center space-x-2.5">
              {currentPath === '/privacy-policy' ? (
                <button 
                  onClick={() => navigateTo('/')}
                  className="p-1.5 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 transition-all active:scale-95 flex items-center justify-center cursor-pointer mr-0.5"
                  title="Back to Garden"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
              ) : (
                <div 
                  onClick={() => seedType && setShowPlantMenu(!showPlantMenu)}
                  className="w-7 h-7 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 theme-accent-bg flex items-center justify-center text-slate-950 font-display font-black text-xs shadow-md transition-all cursor-pointer"
                  title="Active Plant"
                >
                  {seedType ? getCurrencySymbol(seedType) : '🌿'}
                </div>
              )}
              
              <div>
                <h1 
                  onClick={handleTitleClick}
                  className="font-display font-extrabold text-sm tracking-tight text-white leading-none cursor-pointer select-none active:opacity-75"
                  title="Mind Garden"
                >
                  {currentPath === '/privacy-policy' ? 'Privacy Policy' : 'Mind Garden'}
                </h1>
                <p className="text-[10px] text-slate-400 font-medium leading-none mt-1">
                  {currentPath === '/privacy-policy' ? 'Store & Privacy Terms' : 'Zen Sanctuary'}
                </p>
              </div>
            </div>

            {/* Right Quick Controls */}
            <div className="flex items-center space-x-1.5">
              {/* Caretaker Profile & Realtime Cloud Sync Button */}
              {currentPath !== '/privacy-policy' && (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className={`p-1.5 rounded-xl border transition-all active:scale-95 cursor-pointer flex items-center justify-center relative ${
                    currentUser
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 shadow-sm'
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                  }`}
                  title={currentUser ? `${currentUser.displayName || 'Caretaker'} • ${syncState.status === 'syncing' ? 'Syncing...' : 'Realtime Cloud Active'}` : "Connect Caretaker Profile"}
                >
                  {currentUser?.photoURL ? (
                    <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-4 h-4 rounded-full object-cover" />
                  ) : currentUser ? (
                    <span className="text-xs leading-none select-none">{currentUser.avatarEmoji || '🌱'}</span>
                  ) : (
                    <Cloud className="w-3.5 h-3.5" />
                  )}

                  {/* Realtime Live Pulse Indicator */}
                  {currentUser && (
                    <span 
                      className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-slate-950 ${
                        syncState.status === 'syncing' 
                          ? 'bg-amber-400 animate-spin' 
                          : 'bg-emerald-400 animate-pulse'
                      }`} 
                    />
                  )}
                </button>
              )}

              {/* Plus Member Crown Button */}
              {currentPath !== '/privacy-policy' && (
                isPlusMember ? (
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="px-2 py-1 rounded-xl bg-amber-500/15 border border-amber-400/30 text-amber-300 text-[10px] font-extrabold flex items-center space-x-1 cursor-pointer active:scale-95 shadow-sm"
                    title="Mind Garden Plus Member"
                  >
                    <Crown className="w-3 h-3 fill-current text-amber-400" />
                    <span>VIP</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setShowSubscriptionModal(true)}
                    className="px-2.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 text-[10px] font-extrabold flex items-center space-x-1 cursor-pointer active:scale-95 shadow-sm hover:brightness-110"
                    title="Upgrade to Mind Garden Plus"
                  >
                    <Crown className="w-3 h-3 fill-current text-slate-950" />
                    <span>Plus</span>
                  </button>
                )
              )}

              {/* Essence Balance */}
              {currentPath !== '/privacy-policy' && seedType && (
                <div className="flex items-center space-x-1 bg-white/5 px-2 py-1 rounded-xl border border-white/10 text-[11px] font-bold theme-accent-text">
                  <Sparkles className="w-3 h-3 fill-current animate-pulse" />
                  <span>{essence}</span>
                </div>
              )}

              {/* Dev Tester Console Button */}
              {currentPath !== '/privacy-policy' && import.meta.env.DEV && debugEnabled && (
                <button
                  onClick={() => setShowTester(!showTester)}
                  className={`p-1.5 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                    showTester 
                      ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                      : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                  }`}
                  title="Toggle Tester Console"
                >
                  <Sliders className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Secondary Row: Ambient Audio Strip & Plant Companion (Prevents header cramping!) */}
          {currentPath !== '/privacy-policy' && seedType && (
            <div className="flex items-center justify-between pt-2 mt-2 border-t border-white/5">
              {/* Plant Switcher Dropdown */}
              <button
                onClick={() => setShowPlantMenu(!showPlantMenu)}
                className="flex items-center space-x-1 px-2 py-1 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/[0.06] text-[11px] text-slate-200 font-medium transition-all cursor-pointer"
              >
                <span>{getPlantName(seedType)}</span>
                <ChevronDown className="w-3 h-3 text-slate-400" />
              </button>

              <div className="flex items-center space-x-1.5">
                {/* Ambient Soundscape Controller */}
                <SoundBar
                  activeSoundTrack={activeSoundTrack}
                  setActiveSoundTrack={setActiveSoundTrack}
                  soundVolume={soundVolume}
                  setSoundVolume={setSoundVolume}
                  isPlusMember={isPlusMember}
                  onOpenSubscriptionModal={() => setShowSubscriptionModal(true)}
                />

                {/* Streak Badge */}
                <div 
                  className="flex items-center space-x-1 bg-amber-500/10 border border-amber-500/20 px-2 py-1 rounded-xl text-[10px] font-bold text-amber-400 shadow-sm"
                  title={`${streak}-day watering habit streak!`}
                >
                  <Flame className="w-3 h-3 fill-current animate-bounce" />
                  <span>{streak}d</span>
                </div>

                {/* Reset App Icon */}
                <button
                  onClick={() => setShowResetConfirm(true)}
                  className="p-1.5 rounded-xl bg-white/[0.03] border border-white/5 hover:bg-white/10 text-slate-500 hover:text-slate-300 transition-colors active:scale-95 cursor-pointer"
                  title="Restart App"
                >
                  <RotateCcw className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}

          {/* Plant Switcher Menu Modal */}
          {showPlantMenu && seedType && (
            <>
              <div className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs" onClick={() => setShowPlantMenu(false)} />
              <div className="absolute left-4 right-4 top-28 p-2.5 rounded-2xl bg-slate-900/95 border border-white/10 shadow-2xl backdrop-blur-xl z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="flex items-center justify-between px-2.5 py-1 mb-1">
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider">
                    Switch Botanical Sanctuary
                  </span>
                  {!isPlusMember && (
                    <span className="text-[9px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-1.5 py-0.5 rounded flex items-center gap-1">
                      <Crown className="w-2.5 h-2.5" /> Plus Feature
                    </span>
                  )}
                </div>
                {plantList.map((p) => {
                  const isCurrent = seedType === p.id;
                  const isLocked = !isCurrent && !isPlusMember;

                  return (
                    <button
                      key={p.id}
                      onClick={() => {
                        if (isLocked) {
                          setShowPlantMenu(false);
                          setShowSubscriptionModal(true);
                          return;
                        }
                        handleSwitchPlant(p.id);
                        setShowPlantMenu(false);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left flex items-center justify-between text-xs transition-all cursor-pointer ${
                        isCurrent
                          ? 'bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30'
                          : isLocked
                          ? 'hover:bg-white/5 text-slate-400'
                          : 'hover:bg-white/5 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2.5 min-w-0">
                        <span className="text-base">{p.symbol}</span>
                        <div className="min-w-0">
                          <div className="text-xs font-semibold leading-tight flex items-center gap-1.5">
                            <span>{p.name}</span>
                            {isCurrent && <span className="text-[9px] text-emerald-400 font-normal">(Active)</span>}
                          </div>
                          <div className="text-[10px] text-slate-500 leading-tight mt-0.5">{p.role}</div>
                        </div>
                      </div>

                      {isLocked && (
                        <div className="flex items-center space-x-1 px-2 py-0.5 rounded-md bg-amber-500/15 border border-amber-500/25 text-amber-300 text-[10px] font-bold shrink-0">
                          <Crown className="w-3 h-3 text-amber-400" />
                          <span>VIP</span>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </>
          )}
        </header>

        {/* Content Container (Scrollable Area) */}
        <main className="flex-1 overflow-y-auto px-4 py-4 flex flex-col scrollbar-none">
          {currentPath === '/privacy-policy' ? (
            <PrivacyPolicy />
          ) : !seedType ? (
            <Onboarding onSelectSeed={handleSelectSeed} navigateTo={navigateTo} />
          ) : (
            <div className="flex-1 flex flex-col justify-between space-y-4">
              
              {/* Tab: Garden View */}
              {activeTab === 'garden' && (
                <div className="space-y-4 flex-1 flex flex-col justify-between">
                  <GardenCanvas
                    plantType={seedType}
                    growth={growth}
                    decorations={activeDecorations}
                    ambientSurprise={dailySurprise}
                  />

                  {dailySurprise && (
                    <div className="text-center text-[11px] text-slate-400 font-medium italic animate-pulse-slow bg-white/[0.02] border border-white/5 py-1 px-3 rounded-xl max-w-[280px] mx-auto">
                      {dailySurprise === 'comet' && "✨ A passing comet crossed your sky tonight."}
                      {dailySurprise === 'moth' && "🦋 A glowing lunar moth was drawn to your plant's calm energy."}
                      {dailySurprise === 'aurora' && "🌌 A quiet aurora dances in the distant cosmic sky."}
                      {dailySurprise === 'butterfly' && "🦋 A gentle monarch rests quietly on a sunlit leaf."}
                      {dailySurprise === 'flower' && "🌸 A miniature blossom opened in response to your tranquility."}
                      {dailySurprise === 'squirrel' && "🐿️ A curious forest squirrel visited your calm terrace."}
                    </div>
                  )}

                  {isCheckedInToday ? (
                    <CountdownTimer 
                      loggedValue={lastCheckInValue} 
                      onWaterBoost={handleWaterBoost}
                      isPlusMember={isPlusMember}
                      growth={growth}
                    />
                  ) : (
                    <StressCheckIn onSubmit={handleSubmitStress} plantType={seedType} />
                  )}
                </div>
              )}

              {/* Tab: Breathing Mini-Game */}
              {activeTab === 'breathe' && (
                <BreathingMiniGame 
                  onComplete={handleBreathingReward} 
                  plantType={seedType} 
                  isPlusMember={isPlusMember}
                />
              )}

              {/* Tab: Decoration Shop */}
              {activeTab === 'shop' && (
                <DecorationShop
                  essence={essence}
                  unlockedDecorations={unlockedDecorations}
                  activeDecorations={activeDecorations}
                  onUnlock={handleUnlockDecoration}
                  onToggle={handleToggleDecoration}
                  plantType={seedType}
                  isPlusMember={isPlusMember}
                  onClaimBlessing={handleClaimZenBlessing}
                  onOpenSubscriptionModal={() => setShowSubscriptionModal(true)}
                />
              )}

              {/* Tab: History Log */}
              {activeTab === 'history' && (
                <div className="space-y-4 flex-1">
                  <div className="text-center">
                    <h2 className="text-base font-display font-bold text-slate-100">
                      Mind Log & Sanctuary History
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Review emotional trends, streak milestones, and growth records.
                    </p>
                  </div>

                  {/* Daily Evening Notification Reminder Setting */}
                  <div className="p-3.5 rounded-2xl bg-slate-900/50 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center space-x-2.5">
                      <div className={`p-2 rounded-xl ${dailyRemindersEnabled ? 'bg-emerald-500/15 text-emerald-400' : 'bg-slate-800 text-slate-500'}`}>
                        {dailyRemindersEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Evening Habit Reminder</div>
                        <div className="text-[10px] text-slate-400">Daily gentle alert at 8:00 PM</div>
                      </div>
                    </div>
                    <button
                      onClick={handleToggleReminder}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                        dailyRemindersEnabled
                          ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400 border border-white/5'
                      }`}
                    >
                      {dailyRemindersEnabled ? 'Active' : 'Turn On'}
                    </button>
                  </div>

                  {/* Caretaker Profile & Realtime Cloud Sync Card */}
                  <div 
                    onClick={() => setShowAuthModal(true)}
                    className="p-3.5 rounded-2xl bg-gradient-to-r from-slate-900/80 via-slate-900/60 to-slate-900/40 border border-white/5 hover:border-emerald-500/30 transition-all flex items-center justify-between cursor-pointer group"
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-lg shrink-0">
                        {currentUser?.photoURL ? (
                          <img src={currentUser.photoURL} alt={currentUser.displayName} className="w-full h-full rounded-2xl object-cover" />
                        ) : (
                          <span>{currentUser?.avatarEmoji || '🌱'}</span>
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white flex items-center gap-1.5">
                          <span>{currentUser ? currentUser.displayName || 'Caretaker' : 'Connect Caretaker Profile'}</span>
                          {currentUser && (
                            <span className="text-[9px] font-bold text-emerald-300 bg-emerald-500/20 px-1.5 py-0.2 rounded font-mono flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              Realtime
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">
                          {currentUser 
                            ? `${currentUser.ageBracket ? `Age: ${currentUser.ageBracket} • ` : ''}${currentUser.mindfulnessGoal || 'Daily Peace'}`
                            : 'Set your name, age, mindfulness goal & sync across devices'}
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-lg group-hover:bg-emerald-500/20 transition-colors shrink-0">
                      {currentUser ? 'Profile →' : 'Sign In →'}
                    </span>
                  </div>

                  {/* Habit Streak Stat Box */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Watering Streak</div>
                      <div className="text-lg font-display font-extrabold text-amber-400 mt-0.5 flex items-center justify-center gap-1">
                        <Flame className="w-4 h-4 fill-current" />
                        <span>{streak} Days</span>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-slate-900/40 border border-white/5 text-center">
                      <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Total Check-Ins</div>
                      <div className="text-lg font-display font-extrabold text-emerald-400 mt-0.5">
                        {stressHistory.length}
                      </div>
                    </div>
                  </div>

                  {/* Plus Membership Status Card */}
                  {isPlusMember ? (
                    <div 
                      onClick={() => setShowSubscriptionModal(true)}
                      className="w-full p-3.5 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-yellow-500/5 flex items-center justify-between text-left cursor-pointer"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-white flex items-center gap-1.5">
                            <span>{subDetails.planName || 'VIP Plus'} Active</span>
                            <span className="text-[9px] font-bold text-amber-300 bg-amber-500/20 px-1.5 py-0.2 rounded font-mono">
                              VIP
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            {subDetails.daysLeft > 0 ? `${subDetails.daysLeft} days remaining (${subDetails.expiryFormatted})` : 'All 5 sanctuary features unlocked'}
                          </div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-1 rounded-lg">
                        Manage →
                      </span>
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowSubscriptionModal(true)}
                      className="w-full p-3.5 rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/15 to-yellow-500/5 flex items-center justify-between text-left cursor-pointer hover:border-amber-400 transition-all"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-white">Mind Garden Plus</div>
                          <div className="text-[10px] text-slate-400">Weekly, Monthly & Yearly sanctuary passes</div>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-1 rounded-lg">
                        View Plans →
                      </span>
                    </button>
                  )}

                  {stressHistory.length === 0 ? (
                    <div className="p-8 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col items-center justify-center text-center space-y-3">
                      <Calendar className="w-8 h-8 text-slate-600" />
                      <p className="text-xs text-slate-500 max-w-[200px]">
                        No logs recorded yet. Complete your first check-in to start tracking!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
                      {stressHistory.map((log, index) => {
                        const getLevelColor = (val) => {
                          if (val <= 2) return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
                          if (val <= 4) return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20';
                          if (val <= 6) return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
                          if (val <= 8) return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
                          return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
                        };

                        const symbol = getCurrencySymbol(log.plantType);

                        return (
                          <div
                            key={index}
                            className="p-3 rounded-xl border border-white/5 bg-slate-900/50 flex flex-col space-y-1.5 text-xs"
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-2">
                                <span className="text-base">{symbol}</span>
                                <div>
                                  <div className="font-semibold text-slate-200">{log.date}</div>
                                  <div className="text-[9px] text-slate-500 uppercase tracking-wide font-bold">
                                    {log.eventName || 'Watered'} • {getPlantName(log.plantType)}
                                  </div>
                                </div>
                              </div>
                              <span className={`px-2 py-0.5 font-bold rounded border ${getLevelColor(log.stress)}`}>
                                Stress: {log.stress}/10
                              </span>
                            </div>

                            <div className="flex items-center space-x-2 pt-1 border-t border-white/5">
                              <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                                +{log.growthAdded}% Growth
                              </span>
                              {log.essenceAdded > 0 && (
                                <span className="text-[10px] text-amber-400 font-bold bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10">
                                  +{log.essenceAdded} {symbol} Bonus
                                </span>
                              )}
                              {log.streak && (
                                <span className="text-[10px] text-slate-400 ml-auto font-mono">
                                  🔥 {log.streak}d streak
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Privacy Policy Link in History Tab */}
                  <div className="pt-2.5 text-center border-t border-white/5 flex flex-col items-center space-y-1">
                    <button
                      onClick={() => navigateTo('/privacy-policy')}
                      className="text-[10px] text-slate-500 hover:text-slate-300 underline transition-colors cursor-pointer"
                    >
                      Privacy Policy & Store Compliance
                    </button>
                    <p className="text-[9px] text-slate-600">Mind Garden © 2026 • 100% Offline Sanctuary</p>
                  </div>
                </div>
              )}

            </div>
          )}
        </main>

        {/* Floating Reset Modal Confirmation */}
        {showResetConfirm && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <div className="w-full max-w-xs p-5 rounded-3xl bg-slate-900 border border-white/10 space-y-3.5 shadow-2xl">
              <h3 className="font-display font-semibold text-sm text-white text-center">
                Restart Mind Garden?
              </h3>
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                This will reset your current plant growth, active decorations, and essence.
              </p>
              <div className="flex space-x-2.5 pt-1">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2 rounded-xl border border-white/10 text-xs font-semibold text-slate-400 hover:text-white transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleResetApp();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-2 bg-rose-500 hover:bg-rose-600 text-slate-950 font-bold rounded-xl text-xs transition-colors cursor-pointer"
                >
                  Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Mind Garden Plus Modal */}
        <SubscriptionModal
          isOpen={showSubscriptionModal}
          onClose={() => setShowSubscriptionModal(false)}
          isPlusMember={isPlusMember}
          onActivateSubscription={activateSubscription}
          onCancelSubscription={cancelSubscription}
          subscriptionDetails={subDetails}
        />

        {/* Caretaker Profile & Realtime Cloud Sync Modal */}
        <ProfileModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
          gardenState={gardenState}
          onRestoreFromCloud={handleRestoreFromCloud}
          isPlusMember={isPlusMember}
          onOpenSubscriptionModal={() => setShowSubscriptionModal(true)}
        />

        {/* Premium Bottom Tab Navigation Bar with safe-bottom */}
        {currentPath !== '/privacy-policy' && seedType && (
          <nav className="safe-bottom border-t border-white/5 bg-slate-950/90 backdrop-blur-xl px-3 pt-2 flex justify-between items-center z-30 shrink-0">
            {/* Garden Tab */}
            <button
              onClick={() => setActiveTab('garden')}
              className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-2xl transition-all relative flex-1 cursor-pointer ${
                activeTab === 'garden' ? 'theme-accent-text font-bold' : 'text-slate-500'
              }`}
            >
              <Sprout className={`w-4.5 h-4.5 transition-transform ${activeTab === 'garden' ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold tracking-wider font-display">Garden</span>
              {activeTab === 'garden' && (
                <div className="absolute bottom-0 w-8 h-[2px] theme-accent-bg rounded-full theme-accent-shadow" />
              )}
            </button>

            {/* Breathe Tab */}
            <button
              onClick={() => setActiveTab('breathe')}
              className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-2xl transition-all relative flex-1 cursor-pointer ${
                activeTab === 'breathe' ? 'theme-accent-text font-bold' : 'text-slate-500'
              }`}
            >
              <Wind className={`w-4.5 h-4.5 transition-transform ${activeTab === 'breathe' ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold tracking-wider font-display">Breathe</span>
              {activeTab === 'breathe' && (
                <div className="absolute bottom-0 w-8 h-[2px] theme-accent-bg rounded-full theme-accent-shadow" />
              )}
            </button>

            {/* Shop Tab */}
            <button
              onClick={() => setActiveTab('shop')}
              className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-2xl transition-all relative flex-1 cursor-pointer ${
                activeTab === 'shop' ? 'theme-accent-text font-bold' : 'text-slate-500'
              }`}
            >
              <Sparkles className={`w-4.5 h-4.5 transition-transform ${activeTab === 'shop' ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold tracking-wider font-display">Shop</span>
              {activeTab === 'shop' && (
                <div className="absolute bottom-0 w-8 h-[2px] theme-accent-bg rounded-full theme-accent-shadow" />
              )}
            </button>

            {/* History Tab */}
            <button
              onClick={() => setActiveTab('history')}
              className={`flex flex-col items-center space-y-1 py-1 px-3 rounded-2xl transition-all relative flex-1 cursor-pointer ${
                activeTab === 'history' ? 'theme-accent-text font-bold' : 'text-slate-500'
              }`}
            >
              <History className={`w-4.5 h-4.5 transition-transform ${activeTab === 'history' ? 'scale-110' : ''}`} />
              <span className="text-[9px] font-semibold tracking-wider font-display">History</span>
              {activeTab === 'history' && (
                <div className="absolute bottom-0 w-8 h-[2px] theme-accent-bg rounded-full theme-accent-shadow" />
              )}
            </button>
          </nav>
        )}

        {/* Tester Sandbox Console Drawer */}
        {import.meta.env.DEV && debugEnabled && showTester && (
          <TesterConsole state={gardenState} onClose={() => setShowTester(false)} />
        )}
      </div>
    </div>
  );
}
