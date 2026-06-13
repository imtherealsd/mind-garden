import { useState } from 'react';
import { Sliders, RefreshCw, Layers, ShieldAlert, Award, X } from 'lucide-react';

export function TesterConsole({ state, onClose }) {
  const {
    seedType,
    growth,
    essence,
    unlockedDecorations,
    activeDecorations,
    lastCheckInDate,
    stressHistory,
    setSeedType,
    setGrowth,
    setEssence,
    setUnlockedDecorations,
    setActiveDecorations,
    setLastCheckInDate,
    setStressHistory,
    getCurrencySymbol,
    getPlantName
  } = state;

  const [activeTab, setActiveTab] = useState('growth'); // 'growth' | 'essence' | 'system'

  // Presets for quick growth stages
  const growthPresets = [
    { label: 'Seed (0%)', value: 0 },
    { label: 'Sprout (30%)', value: 30 },
    { label: 'Sapling (55%)', value: 55 },
    { label: 'Mature (80%)', value: 80 },
    { label: 'Blooming (100%)', value: 100 }
  ];

  const handleSetGrowth = (val) => {
    setGrowth(val);
  };

  const handleAdjustEssence = (amount) => {
    setEssence((prev) => Math.max(0, prev + amount));
  };

  const handleResetCheckIn = () => {
    setLastCheckInDate(null);
  };

  const handleUnlockAllDecorations = () => {
    const allDecorations = ['path', 'lantern', 'fireflies', 'gate'];
    setUnlockedDecorations(allDecorations);
    setActiveDecorations(allDecorations);
  };

  const handleLockAllDecorations = () => {
    setUnlockedDecorations([]);
    setActiveDecorations([]);
  };

  const handleAddMockLogs = () => {
    const today = new Date();
    const mockLogs = [];
    const events = ['Zen Harmony', 'Daily Nourish', 'Void Transmuted', 'Midnight Calm'];
    const plants = ['succulent', 'fern', 'spore'];

    for (let i = 1; i <= 5; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateStr = date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
      
      mockLogs.push({
        date: dateStr,
        stress: Math.floor(Math.random() * 10) + 1,
        growthAdded: Math.floor(Math.random() * 10) + 5,
        essenceAdded: Math.floor(Math.random() * 10),
        eventName: events[Math.floor(Math.random() * events.length)],
        plantType: seedType || plants[Math.floor(Math.random() * plants.length)]
      });
    }

    setStressHistory([...mockLogs, ...stressHistory]);
  };

  const currentSymbol = seedType ? getCurrencySymbol(seedType) : '★';

  return (
    <div className="absolute inset-x-0 bottom-0 bg-slate-950/95 border-t border-rose-500/30 rounded-t-3xl shadow-2xl z-50 overflow-hidden flex flex-col max-h-[85%] transition-all duration-300">
      {/* Header */}
      <div className="px-5 py-4 border-b border-white/5 bg-slate-900/60 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Sliders className="w-5 h-5 text-rose-400" />
          <h2 className="font-display font-bold text-sm text-white tracking-wider uppercase">
            Tester Sandbox Console
          </h2>
        </div>
        <button
          onClick={onClose}
          className="p-1.5 rounded-lg bg-white/5 border border-white/5 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/5 bg-slate-900/30">
        <button
          onClick={() => setActiveTab('growth')}
          className={`flex-1 py-3 text-xs font-semibold font-display tracking-wider border-b-2 transition-all ${
            activeTab === 'growth' ? 'border-rose-500 text-rose-400 font-bold bg-white/[0.01]' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Seed & Growth
        </button>
        <button
          onClick={() => setActiveTab('essence')}
          className={`flex-1 py-3 text-xs font-semibold font-display tracking-wider border-b-2 transition-all ${
            activeTab === 'essence' ? 'border-rose-500 text-rose-400 font-bold bg-white/[0.01]' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          Essence & Shop
        </button>
        <button
          onClick={() => setActiveTab('system')}
          className={`flex-1 py-3 text-xs font-semibold font-display tracking-wider border-b-2 transition-all ${
            activeTab === 'system' ? 'border-rose-500 text-rose-400 font-bold bg-white/[0.01]' : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          System Tools
        </button>
      </div>

      {/* Content */}
      <div className="p-5 overflow-y-auto space-y-5 flex-1 select-text">

        {/* TAB: Seed & Growth */}
        {activeTab === 'growth' && (
          <div className="space-y-5">
            {/* Seed Type Selection */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Select Active Seed</span>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'succulent', label: '🌿 Succulent' },
                  { id: 'fern', label: '⚡ Fern' },
                  { id: 'spore', label: '⭐ Spore' }
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSeedType(s.id)}
                    className={`py-2 px-1 text-[11px] font-bold rounded-xl border transition-all ${
                      seedType === s.id
                        ? 'border-rose-500 text-rose-400 bg-rose-500/5 font-extrabold shadow-md'
                        : 'border-white/5 text-slate-400 bg-white/5 hover:border-white/10 hover:text-slate-200'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
              {seedType && (
                <p className="text-[10px] text-slate-500 italic">
                  Currently active: <strong>{getPlantName(seedType)}</strong>
                </p>
              )}
            </div>

            {/* Growth Slider */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Growth Progress</span>
                <span className="text-xs font-bold text-rose-400">{growth}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={growth}
                onChange={(e) => handleSetGrowth(parseInt(e.target.value))}
                className="w-full h-2 rounded-lg bg-slate-800 accent-rose-500 outline-none cursor-pointer appearance-none"
              />
            </div>

            {/* Stage Presets */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Stage Presets (Levels 1-5)</span>
              <div className="flex flex-wrap gap-1.5">
                {growthPresets.map((preset) => (
                  <button
                    key={preset.value}
                    onClick={() => handleSetGrowth(preset.value)}
                    className={`py-1.5 px-2.5 text-[10px] font-bold rounded-lg border transition-all ${
                      growth === preset.value
                        ? 'border-rose-500 text-rose-400 bg-rose-500/10'
                        : 'border-white/5 text-slate-400 bg-white/5 hover:border-white/10 hover:text-slate-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: Essence & Shop */}
        {activeTab === 'essence' && (
          <div className="space-y-5">
            {/* Essence adjustment */}
            <div className="space-y-2.5">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Essence Balance</span>
                <span className="text-xs font-bold text-rose-400">{essence} {currentSymbol}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { label: '-50', val: -50 },
                  { label: '-10', val: -10 },
                  { label: 'Reset to 0', val: -essence },
                  { label: '+10', val: 10 },
                  { label: '+50', val: 50 },
                  { label: '+100', val: 100 }
                ].map((btn, index) => (
                  <button
                    key={index}
                    onClick={() => handleAdjustEssence(btn.val)}
                    className="py-2 text-[10px] font-bold rounded-xl border border-white/5 text-slate-300 bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    {btn.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Shop shortcuts */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Decoration Actions</span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={handleUnlockAllDecorations}
                  className="py-2.5 px-3 text-[10px] font-bold rounded-xl border border-emerald-500/30 text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 transition-all flex items-center justify-center space-x-1"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Unlock All Items</span>
                </button>
                <button
                  onClick={handleLockAllDecorations}
                  className="py-2.5 px-3 text-[10px] font-bold rounded-xl border border-slate-600 text-slate-400 bg-slate-900 hover:bg-slate-800 transition-all flex items-center justify-center space-x-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Lock All Items</span>
                </button>
              </div>
              <p className="text-[9px] text-slate-500 italic mt-1 leading-relaxed">
                Currently unlocked: <strong>{unlockedDecorations.join(', ') || 'None'}</strong>. Active: <strong>{activeDecorations.join(', ') || 'None'}</strong>.
              </p>
            </div>
          </div>
        )}

        {/* TAB: System Tools */}
        {activeTab === 'system' && (
          <div className="space-y-5">
            {/* Daily Lock Bypass */}
            <div className="p-3.5 rounded-2xl border border-rose-500/20 bg-rose-500/5 space-y-3">
              <div className="flex items-start space-x-2.5">
                <ShieldAlert className="w-5 h-5 text-rose-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[11px] font-bold text-white uppercase tracking-wider">Daily Check-in Block</h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-relaxed">
                    Mind Garden locks the stress check-in to once per calendar day. Click below to clear today's lock.
                  </p>
                </div>
              </div>
              
              <div className="flex justify-between items-center pt-1 border-t border-white/5">
                <span className="text-[9px] text-slate-500 font-semibold">
                  Status: {lastCheckInDate ? `Watered today (${lastCheckInDate})` : 'Available to check-in'}
                </span>
                <button
                  onClick={handleResetCheckIn}
                  className="py-1.5 px-3 text-[10px] font-bold rounded-lg bg-rose-500 text-slate-950 hover:bg-rose-600 transition-colors flex items-center space-x-1"
                >
                  <RefreshCw className="w-3 h-3 animate-spin-slow" />
                  <span>Clear Daily Lock</span>
                </button>
              </div>
            </div>

            {/* Add Mock History Logs */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 font-bold tracking-wider uppercase">Data Generation</span>
              <button
                onClick={handleAddMockLogs}
                className="w-full py-2.5 text-[10px] font-bold rounded-xl border border-white/5 text-slate-200 bg-white/5 hover:bg-white/10 transition-colors flex items-center justify-center space-x-1.5"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Inject 5 Mock Stress Logs (History Tab)</span>
              </button>
              <p className="text-[9px] text-slate-500 italic text-center">
                Total history logs: <strong>{stressHistory.length}</strong>
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
