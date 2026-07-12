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
import { Sprout, Wind, Sparkles, History, RotateCcw, Calendar, Sliders, ArrowLeft } from 'lucide-react';

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
    handleSelectSeed,
    handleSubmitStress,
    handleBreathingReward,
    handleUnlockDecoration,
    handleToggleDecoration,
    handleResetApp,
    getPlantName,
    getCurrencySymbol,
    getRoleTitle
  } = gardenState;

  // UI States
  const [activeTab, setActiveTab] = useState('garden'); // 'garden' | 'breathe' | 'shop' | 'history'
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showTester, setShowTester] = useState(false);
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

  return (
    <div className={`min-h-screen theme-${seedType || 'default'} theme-container flex justify-center items-stretch sm:p-4 font-sans transition-colors duration-700`}>
      {/* Mobile container constraint */}
      <div 
        className="w-full max-w-[450px] flex flex-col justify-between overflow-hidden relative border-x border-white/5 sm:rounded-3xl sm:shadow-2xl sm:shadow-black/80 transition-all duration-700 theme-panel"
        style={{ background: 'var(--color-garden-bg)' }}
      >
        {/* Ambient Animated Role Visuals */}
        <AmbientBackground seedType={seedType} />
        
        {/* Sparkly Top Header Bar */}
        <header className="px-5 py-4 border-b border-white/5 flex items-center justify-between bg-slate-950/80 backdrop-blur-md sticky top-0 z-30">
          <div className="flex items-center space-x-2.5">
            {currentPath === '/privacy-policy' ? (
              <button 
                onClick={() => navigateTo('/')}
                className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-slate-300 transition-all active:scale-95 flex items-center justify-center cursor-pointer mr-1"
                title="Back to Garden"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            ) : (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 theme-accent-bg flex items-center justify-center text-slate-950 font-display font-black text-sm shadow-md transition-all">
                {seedType ? getCurrencySymbol(seedType) : 'M'}
              </div>
            )}
            <div>
              <h1 
                onClick={handleTitleClick}
                className="font-display font-bold text-sm tracking-tight text-white leading-tight cursor-pointer select-none active:opacity-75"
                title="Tap 5 times for Developer Settings"
              >
                {currentPath === '/privacy-policy' ? 'Privacy Policy' : 'Mind Garden'}
              </h1>
              {currentPath !== '/privacy-policy' && seedType && (
                <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                  {getRoleTitle(seedType)} Journey • {getPlantName(seedType)}
                </p>
              )}
              {currentPath === '/privacy-policy' && (
                <p className="text-[10px] text-slate-400 font-medium leading-none mt-0.5">
                  Legal Documentation
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {currentPath !== '/privacy-policy' && seedType && (
              <div className="flex items-center space-x-1.5 bg-white/5 px-2 py-1 rounded-lg border border-white/10 text-[11px] font-bold theme-accent-text transition-all mr-1">
                <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
                <span>{essence}</span>
              </div>
            )}
            
            {/* Tester Sandbox Toggle (Hidden behind the 5-tap gesture) */}
            {currentPath !== '/privacy-policy' && import.meta.env.DEV && debugEnabled && (
              <button
                onClick={() => setShowTester(!showTester)}
                className={`p-1.5 rounded-lg border transition-all active:scale-95 touch-manipulation relative ${
                  showTester 
                    ? 'bg-rose-500/20 border-rose-500/50 text-rose-400' 
                    : 'bg-white/5 border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
                title="Toggle Tester Console"
              >
                <Sliders className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                </span>
              </button>
            )}
            
            {currentPath !== '/privacy-policy' && seedType && (
              <button
                onClick={() => setShowResetConfirm(true)}
                className="p-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors active:scale-95 touch-manipulation"
                title="Restart seed onboarding"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </header>

        {/* Content Container (Scrollable Area) */}
        <main className="flex-1 overflow-y-auto px-5 py-6 flex flex-col">
          {currentPath === '/privacy-policy' ? (
            <PrivacyPolicy />
          ) : !seedType ? (
            <Onboarding onSelectSeed={handleSelectSeed} navigateTo={navigateTo} />
          ) : (
            <div className="flex-1 flex flex-col justify-between space-y-6">
              
              {/* Tab: Garden View */}
              {activeTab === 'garden' && (
                <div className="space-y-6 flex-1 flex flex-col justify-between">
                  <GardenCanvas
                    plantType={seedType}
                    growth={growth}
                    decorations={activeDecorations}
                    ambientSurprise={dailySurprise}
                  />

                  {dailySurprise && (
                    <div className="text-center text-[11px] text-slate-400 font-medium italic animate-pulse-slow bg-white/[0.02] border border-white/5 py-1.5 px-3 rounded-xl max-w-[280px] mx-auto">
                      {dailySurprise === 'comet' && "✨ A passing comet crossed your sky tonight."}
                      {dailySurprise === 'moth' && "🦋 A glowing lunar moth was drawn to your plant's calm energy."}
                      {dailySurprise === 'aurora' && "🌌 A quiet aurora dances in the distant cosmic sky."}
                    </div>
                  )}

                  {isCheckedInToday ? (
                    <CountdownTimer loggedValue={lastCheckInValue} />
                  ) : (
                    <StressCheckIn onSubmit={handleSubmitStress} plantType={seedType} />
                  )}
                </div>
              )}

              {/* Tab: Breathing Mini-Game */}
              {activeTab === 'breathe' && (
                <BreathingMiniGame onComplete={handleBreathingReward} plantType={seedType} />
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
                />
              )}

              {/* Tab: History Log */}
              {activeTab === 'history' && (
                <div className="space-y-5 flex-1">
                  <div className="text-center">
                    <h2 className="text-xl font-display font-semibold text-slate-100">
                      Mind Log & Growth History
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">
                      Review your historical logs, stress trends, and plant growth records.
                    </p>
                  </div>

                  {stressHistory.length === 0 ? (
                    <div className="p-8 rounded-2xl border border-white/5 bg-slate-900/30 flex flex-col items-center justify-center text-center space-y-3">
                      <Calendar className="w-8 h-8 text-slate-600" />
                      <p className="text-xs text-slate-500 max-w-[200px]">
                        No logs recorded yet. Complete your first check-in to start tracking!
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-3 max-h-[360px] overflow-y-auto pr-1">
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
                            className="p-3.5 rounded-xl border border-white/5 bg-slate-900/50 flex flex-col space-y-2 text-xs"
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
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {/* Privacy Policy Link in History Tab */}
                  <div className="pt-4 text-center border-t border-white/5 flex flex-col items-center space-y-1">
                    <button
                      onClick={() => navigateTo('/privacy-policy')}
                      className="text-[10px] text-slate-500 hover:text-slate-300 underline transition-colors cursor-pointer"
                    >
                      Privacy Policy
                    </button>
                    <p className="text-[9px] text-slate-600">Mind Garden © 2026</p>
                  </div>
                </div>
              )}

            </div>
          )}
        </main>

        {/* Floating Reset Modal Confirmation */}
        {showResetConfirm && (
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-6">
            <div className="w-full max-w-xs p-6 rounded-2xl bg-slate-900 border border-white/10 space-y-4 shadow-xl">
              <h3 className="font-display font-semibold text-base text-white text-center">
                Restart Mind Garden?
              </h3>
              <p className="text-xs text-slate-400 text-center leading-relaxed">
                This will delete your current plant, decorations, essence, and logs. This action cannot be undone.
              </p>
              <div className="flex space-x-3 pt-2">
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="flex-1 py-2.5 rounded-xl border border-white/10 text-xs font-semibold text-slate-400 hover:text-white transition-colors touch-manipulation"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    handleResetApp();
                    setShowResetConfirm(false);
                  }}
                  className="flex-1 py-2.5 bg-rose-500 hover:bg-rose-600 text-slate-950 font-bold rounded-xl text-xs transition-colors touch-manipulation"
                >
                  Confirm Reset
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Premium Bottom Tab Navigation Bar */}
        {currentPath !== '/privacy-policy' && seedType && (
          <nav className="border-t border-white/5 bg-slate-950/85 backdrop-blur-md px-4 py-2 flex justify-between items-center z-30 safe-pb">
            {/* Garden Tab */}
            <button
              onClick={() => setActiveTab('garden')}
              className={`flex flex-col items-center space-y-1 py-2 px-3.5 rounded-2xl transition-all relative flex-1 touch-manipulation ${
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
              className={`flex flex-col items-center space-y-1 py-2 px-3.5 rounded-2xl transition-all relative flex-1 touch-manipulation ${
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
              className={`flex flex-col items-center space-y-1 py-2 px-3.5 rounded-2xl transition-all relative flex-1 touch-manipulation ${
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
              className={`flex flex-col items-center space-y-1 py-2 px-3.5 rounded-2xl transition-all relative flex-1 touch-manipulation ${
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

