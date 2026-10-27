import { useState } from 'react';
import { HeartHandshake, Droplet, Zap, Infinity as InfinityIcon, Sparkles } from 'lucide-react';

export function StressCheckIn({ onSubmit, plantType }) {
  const [stress, setStress] = useState(5);

  // Determine plant specific labels and styles
  const getRoleBranding = () => {
    if (plantType === 'succulent') {
      return {
        title: 'Daily Sanctuary Check-In',
        subtitle: 'The Caretaker • Mindful presence nurtures living growth.',
        buttonLabel: 'Nourish Sanctuary Soil',
        buttonClass: 'from-emerald-500 to-teal-500 shadow-emerald-500/25 text-slate-950',
        icon: <Droplet className="w-4 h-4 fill-current" />,
        transmuteMsg: null,
        sliderLeft: 'Restless',
        sliderRight: 'Deep Peace',
        levelLabel: 'Peacefulness'
      };
    }
    if (plantType === 'fern') {
      return {
        title: 'Energy & Focus Alignment',
        subtitle: 'The Explorer • Align frequency to 7+ for a Lumen bonus.',
        buttonLabel: 'Sync Frequency & Pulse Light',
        buttonClass: 'from-cyan-500 to-blue-500 shadow-cyan-500/25 text-slate-950',
        icon: <Zap className="w-4 h-4 fill-current" />,
        transmuteMsg: stress >= 7 ? '⚡ Flow resonance active: Active focus yields +5 Lumen bonus! ⚡' : 'Align frequency to 7 or above to trigger a Harmony Bonus.',
        sliderLeft: 'Sluggish',
        sliderRight: 'Flow State',
        levelLabel: 'Focus'
      };
    }
    if (plantType === 'spore') {
      return {
        title: 'Cosmic Weather Check-In',
        subtitle: 'The Astral Gardener • Storms (≤ 4) are transmuted to stardust.',
        buttonLabel: 'Transmute Mind to Stardust',
        buttonClass: 'from-purple-500 to-pink-500 shadow-purple-500/25 text-slate-100',
        icon: <InfinityIcon className="w-4 h-4" />,
        transmuteMsg: stress <= 4 ? '🌌 Void Alchemistry active: Tension transmuted into +15% Growth! 🌌' : 'Mind weather is calm. Storms (≤ 4) trigger Void Transmutation.',
        sliderLeft: 'Cosmic Storm',
        sliderRight: 'Stellar Harmony',
        levelLabel: 'Clarity'
      };
    }
    return {
      title: 'Mind State Check-In',
      subtitle: 'Tune in to your inner frequency and log today.',
      buttonLabel: 'Nourish Plant',
      buttonClass: 'from-emerald-500 to-teal-500 shadow-emerald-500/20 text-slate-900',
      icon: <HeartHandshake className="w-4 h-4" />,
      transmuteMsg: null,
      sliderLeft: 'Low',
      sliderRight: 'High',
      levelLabel: 'Mind State'
    };
  };

  const branding = getRoleBranding();

  // Handcrafted poetic emotional spectrum
  const getSpectrumDetails = (val) => {
    if (val <= 2) {
      return {
        label: 'Turbulent & Restless',
        sub: 'Mental weather is stormy or agitated',
        glowGradient: 'from-rose-500/25 via-pink-500/10 to-transparent',
        orbColor: 'from-rose-500 to-pink-600',
        ringColor: 'border-rose-400/30',
        textColor: 'text-rose-300',
        quote: 'Feelings are waves passing over the surface; beneath is stillness.'
      };
    }
    if (val <= 4) {
      return {
        label: 'Mild Tension',
        sub: 'A quiet undercurrent of clutter or fatigue',
        glowGradient: 'from-amber-500/20 via-orange-500/10 to-transparent',
        orbColor: 'from-amber-500 to-orange-600',
        ringColor: 'border-amber-400/30',
        textColor: 'text-amber-300',
        quote: 'Slow down. The rush is mostly in your head.'
      };
    }
    if (val <= 6) {
      return {
        label: 'Moderately Balanced',
        sub: 'Steady, receptive, and quietly present',
        glowGradient: 'from-teal-500/20 via-emerald-500/10 to-transparent',
        orbColor: 'from-teal-500 to-emerald-600',
        ringColor: 'border-teal-400/30',
        textColor: 'text-teal-300',
        quote: 'Peace is not the absence of thought, but spaciousness around it.'
      };
    }
    if (val <= 8) {
      return {
        label: 'Deep Serenity',
        sub: 'Open clarity and aligned flow',
        glowGradient: 'from-cyan-500/25 via-teal-500/15 to-transparent',
        orbColor: 'from-cyan-400 to-teal-500',
        ringColor: 'border-cyan-400/40',
        textColor: 'text-cyan-300',
        quote: 'Within you, there is a sanctuary to which you can return anytime.'
      };
    }
    return {
      label: 'Radiant Grounding',
      sub: 'Complete calm and deep inner harmony',
      glowGradient: 'from-emerald-400/30 via-teal-400/20 to-transparent',
      orbColor: 'from-emerald-400 to-teal-400',
      ringColor: 'border-emerald-300/50',
      textColor: 'text-emerald-300',
      quote: 'You are anchored. Quiet the mind, and the garden blooms.'
    };
  };

  const details = getSpectrumDetails(stress);
  const isBonusActive = (plantType === 'fern' && stress >= 7) || (plantType === 'spore' && stress <= 4);

  return (
    <div className="flex flex-col space-y-4">
      {/* Title */}
      <div className="text-center px-2">
        <h2 className="text-sm font-display font-bold text-white tracking-tight">
          {branding.title}
        </h2>
        <p className="text-[11px] text-slate-400 mt-0.5 leading-snug">
          {branding.subtitle}
        </p>
      </div>

      {/* Bespoke Zen Resonance Orb (Replaces cheap yellow emoji with luxury design) */}
      <div className="p-4 rounded-3xl border border-white/10 glass-panel relative overflow-hidden flex flex-col items-center text-center">
        {/* Soft Background Radial Light */}
        <div 
          className={`absolute inset-0 bg-gradient-radial ${details.glowGradient} opacity-70 transition-all duration-700 pointer-events-none`} 
        />

        {/* Breathing Resonance Sphere */}
        <div className="relative my-2 flex items-center justify-center">
          {/* Outer Ripple Ring */}
          <div className={`w-28 h-28 rounded-full border ${details.ringColor} animate-ping opacity-25 absolute pointer-events-none`} />
          
          {/* Middle Aura Ring */}
          <div className={`w-24 h-24 rounded-full border ${details.ringColor} border-dashed animate-spin-slow absolute opacity-50`} />

          {/* Central Radiant Sphere */}
          <div className={`w-20 h-20 rounded-full bg-gradient-to-tr ${details.orbColor} shadow-xl flex flex-col items-center justify-center text-slate-950 font-display font-extrabold transition-all duration-500 scale-100 hover:scale-105 relative z-10`}>
            <span className="text-2xl leading-none">{stress}</span>
            <span className="text-[9px] uppercase font-bold tracking-widest opacity-80 mt-0.5">/ 10</span>
          </div>
        </div>

        {/* State Label & Guidance */}
        <div className="relative z-10 mt-1">
          <div className={`font-display font-bold text-sm tracking-tight ${details.textColor} transition-colors duration-300`}>
            {details.label}
          </div>
          <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
            {details.sub}
          </p>
          <p className="text-[11px] text-slate-300 max-w-[270px] mx-auto mt-2 italic leading-relaxed opacity-90">
            "{details.quote}"
          </p>
        </div>
      </div>

      {/* Role Bonus Indicator */}
      {branding.transmuteMsg && (
        <div className={`text-center py-1.5 px-3 rounded-xl text-[10px] font-semibold tracking-wide border ${
          isBonusActive
            ? 'bg-amber-500/15 text-amber-300 border-amber-500/30 animate-pulse'
            : 'bg-slate-900/40 text-slate-500 border-white/5'
        }`}>
          {branding.transmuteMsg}
        </div>
      )}

      {/* Tactile Range Slider */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 space-y-3">
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold tracking-wide">
          <span>{branding.sliderLeft} (1)</span>
          <span>{branding.sliderRight} (10)</span>
        </div>
        
        <input
          id="stress-slider"
          type="range"
          min="1"
          max="10"
          value={stress}
          onChange={(e) => setStress(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg cursor-pointer"
        />

        <div className="flex justify-between px-1 text-[10px] text-slate-500 font-bold">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <span
              key={num}
              className={`transition-all ${stress === num ? 'text-white scale-125 font-black' : ''}`}
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* Nourish Soil Action Button */}
      <button
        onClick={() => onSubmit(stress)}
        className={`w-full py-3.5 bg-gradient-to-r ${branding.buttonClass} font-display font-black text-xs tracking-wider rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center space-x-2 hover:brightness-110 cursor-pointer`}
      >
        {branding.icon}
        <span>{branding.buttonLabel}</span>
      </button>
    </div>
  );
}
