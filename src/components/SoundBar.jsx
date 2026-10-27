import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Volume2, 
  VolumeX, 
  Sparkles, 
  Mic, 
  Music, 
  Heart, 
  Feather, 
  Bell, 
  Sun, 
  Waves, 
  X, 
  Crown 
} from 'lucide-react';
import { soundEngine } from '../utils/soundEngine';

export function SoundBar({ 
  activeSoundTrack, 
  setActiveSoundTrack, 
  soundVolume, 
  setSoundVolume,
  isPlusMember = false,
  onOpenSubscriptionModal
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    soundEngine.setVolume(soundVolume);
    soundEngine.play(activeSoundTrack);
  }, [activeSoundTrack, soundVolume]);

  const soundOptions = [
    { 
      id: 'none', 
      label: 'Mute', 
      category: 'all',
      icon: VolumeX, 
      desc: 'Restful silence', 
      tag: 'Quiet',
      vip: false 
    },
    { 
      id: 'choir', 
      label: 'Angelic Cathedral Choir', 
      category: 'choir',
      icon: Mic, 
      desc: 'Heavenly vocal formants & sacred breathing choir', 
      tag: 'Choir',
      vip: false 
    },
    { 
      id: 'aura', 
      label: 'Crystal Aura Shimmer', 
      category: 'auratic',
      icon: Sparkles, 
      desc: 'Ethereal floating dreamscape & celestial pads', 
      tag: 'Auratic',
      vip: false 
    },
    { 
      id: 'kalimba', 
      label: 'Sanctuary Kalimba & Harp', 
      category: 'instrumental',
      icon: Music, 
      desc: 'Gentle acoustic wooden plucks & calming melodies', 
      tag: 'Instrumental',
      vip: false 
    },
    { 
      id: 'soundbath', 
      label: '528Hz Solfeggio Bath', 
      category: 'relaxation',
      icon: Heart, 
      desc: 'Deep heart-center healing & tension release', 
      tag: 'Relaxation',
      vip: false 
    },
    { 
      id: 'rhodes', 
      label: 'Warm Celestial Rhodes', 
      category: 'instrumental',
      icon: Feather, 
      desc: 'Lush electric piano jazz chords & velvet resonance', 
      tag: 'Instrumental',
      vip: true 
    },
    { 
      id: 'monks', 
      label: 'Sacred Temple Drone', 
      category: 'auratic',
      icon: Bell, 
      desc: 'Deep Tibetan vocal Om resonance & grounding warmth', 
      tag: 'Auratic',
      vip: true 
    },
    { 
      id: 'chimes', 
      label: 'Bamboo Wind Chimes', 
      category: 'instrumental',
      icon: Sun, 
      desc: 'Pentatonic crystal-pure healing bells', 
      tag: 'Instrumental',
      vip: true 
    },
    { 
      id: 'ocean', 
      label: 'Ocean Tide & Breath', 
      category: 'relaxation',
      icon: Waves, 
      desc: '12s restorative breathing waves & deep peace', 
      tag: 'Relaxation',
      vip: true 
    }
  ];

  const categories = [
    { id: 'all', label: 'All' },
    { id: 'choir', label: 'Choir' },
    { id: 'auratic', label: 'Auratic' },
    { id: 'instrumental', label: 'Instrumental' },
    { id: 'relaxation', label: 'Relaxation' }
  ];

  const filteredOptions = selectedCategory === 'all'
    ? soundOptions
    : soundOptions.filter(o => o.category === selectedCategory || o.id === 'none');

  const currentOption = soundOptions.find((o) => o.id === activeSoundTrack) || soundOptions[0];

  const handleSelectTrack = (opt) => {
    if (opt.vip && !isPlusMember) {
      if (onOpenSubscriptionModal) {
        onOpenSubscriptionModal();
      }
      return;
    }

    setActiveSoundTrack(opt.id);
    if (opt.id === 'none') {
      soundEngine.stop();
    }
  };

  const drawerContent = isOpen && (
    <div className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/80 backdrop-blur-sm animate-in fade-in duration-200 p-0 sm:p-4">
      {/* Backdrop Click Dismiss */}
      <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

      {/* Drawer Container */}
      <div 
        className="w-full max-w-[440px] max-h-[85dvh] flex flex-col bg-slate-950 border-t sm:border border-white/10 rounded-t-3xl sm:rounded-3xl p-5 shadow-2xl relative z-10 animate-in slide-in-from-bottom duration-300 pb-8 sm:pb-5"
        style={{ touchAction: 'pan-y' }}
      >
        {/* Top Pull Handle */}
        <div className="w-10 h-1 bg-white/20 rounded-full mx-auto mb-3 shrink-0" />

        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-3 shrink-0">
          <div>
            <h3 className="text-sm font-display font-bold text-white flex items-center gap-1.5">
              <Volume2 className="w-4 h-4 text-emerald-400" />
              Harmonic Zen Soundscapes
            </h3>
            <p className="text-[11px] text-slate-400 mt-0.5">
              Choir • Auratic • Instrumental • Relaxation
            </p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1.5 pb-2.5 overflow-x-auto scrollbar-none shrink-0">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-emerald-500 text-slate-950 shadow-sm'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Scrollable Content Container */}
        <div className="overflow-y-auto flex-1 space-y-3 pr-1 scrollbar-none">
          {/* Sound Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {filteredOptions.map((opt) => {
              const Icon = opt.icon;
              const isSelected = activeSoundTrack === opt.id;
              const isLocked = opt.vip && !isPlusMember;

              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelectTrack(opt)}
                  className={`p-3 rounded-2xl border text-left flex items-start space-x-3 transition-all cursor-pointer relative ${
                    isSelected
                      ? 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-semibold shadow-inner ring-1 ring-emerald-400/40'
                      : isLocked
                      ? 'bg-white/[0.02] border-white/5 text-slate-400 hover:bg-white/[0.05]'
                      : 'bg-white/[0.03] border-white/5 text-slate-300 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl mt-0.5 shrink-0 ${
                    isSelected 
                      ? 'bg-emerald-500/20 text-emerald-300 shadow-sm shadow-emerald-500/30' 
                      : isLocked 
                      ? 'bg-amber-500/10 text-amber-400' 
                      : 'bg-white/5 text-emerald-400'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-xs font-bold leading-tight truncate flex items-center justify-between">
                      <span className="truncate">{opt.label}</span>
                      {isLocked ? (
                        <span className="text-[9px] font-extrabold text-amber-400 bg-amber-500/20 px-1.5 py-0.5 rounded shrink-0 flex items-center gap-0.5 ml-1">
                          <Crown className="w-2.5 h-2.5" /> VIP
                        </span>
                      ) : (
                        <span className="text-[9px] font-medium text-emerald-400/80 bg-emerald-500/10 px-1.5 py-0.5 rounded shrink-0 ml-1">
                          {opt.tag}
                        </span>
                      )}
                    </div>
                    <div className="text-[10.5px] text-slate-400 mt-1 leading-snug">{opt.desc}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* VIP Soundscape Promo Banner for Free Users */}
          {!isPlusMember && onOpenSubscriptionModal && (
            <div 
              onClick={() => {
                setIsOpen(false);
                onOpenSubscriptionModal();
              }}
              className="p-3.5 rounded-2xl border border-amber-500/25 bg-amber-500/10 flex items-center justify-between cursor-pointer hover:border-amber-500/40 transition-all shadow-sm"
            >
              <div className="flex items-center space-x-2.5">
                <Crown className="w-4 h-4 text-amber-400 shrink-0" />
                <div>
                  <div className="text-xs text-amber-200 font-bold">
                    Unlock Celestial Rhodes & Sacred Drones
                  </div>
                  <div className="text-[10px] text-amber-400/80">
                    Masterpiece acoustic instruments & Tibetan vocal sound baths
                  </div>
                </div>
              </div>
              <span className="text-xs text-amber-300 font-bold underline shrink-0 ml-2">
                Mind Garden VIP →
              </span>
            </div>
          )}

          {/* Master Volume & Live Sound Wave Control */}
          {activeSoundTrack !== 'none' && (
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <span className="text-xs font-bold text-slate-200">Volume</span>
                  <div className="flex items-center space-x-0.5 ml-1">
                    <span className="w-1 h-2.5 bg-emerald-400 rounded-full animate-pulse" />
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-75" />
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse delay-150" />
                  </div>
                </div>
                <span className="text-xs font-mono text-emerald-400 font-bold">{Math.round(soundVolume * 100)}%</span>
              </div>
              <div className="flex items-center space-x-3">
                <VolumeX className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={soundVolume}
                  onChange={(e) => setSoundVolume(parseFloat(e.target.value))}
                  className="w-full accent-emerald-400 h-2 rounded-lg cursor-pointer bg-white/10"
                />
                <Volume2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              </div>
            </div>
          )}
        </div>

        {/* Pinned Bottom Done Button */}
        <div className="pt-3 border-t border-white/5 mt-2 shrink-0">
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-2.5 rounded-xl bg-white/10 text-white font-bold text-xs hover:bg-white/15 active:scale-98 transition-all cursor-pointer"
          >
            Close & Immerse
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Sleek Mini Sound Pill in Toolbar */}
      <button
        onClick={() => setIsOpen(true)}
        className={`px-2.5 py-1 rounded-xl text-[11px] font-semibold flex items-center space-x-1.5 transition-all active:scale-95 cursor-pointer border ${
          activeSoundTrack !== 'none'
            ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300 shadow-sm shadow-emerald-500/10'
            : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
        }`}
        title="Harmonic Zen Soundscapes"
      >
        {activeSoundTrack !== 'none' ? (
          <Volume2 className="w-3.5 h-3.5 text-emerald-400 animate-pulse shrink-0" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-slate-500 shrink-0" />
        )}
        <span className="truncate max-w-[85px] font-medium">{currentOption.label}</span>
      </button>

      {/* Portal to document.body to ensure it is never constrained by header backdrop-filters or overflow */}
      {isOpen && typeof document !== 'undefined' && createPortal(drawerContent, document.body)}
    </>
  );
}
