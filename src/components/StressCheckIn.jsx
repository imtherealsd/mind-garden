import { useState } from 'react';
import { HeartHandshake, Droplet, Zap, Infinity as InfinityIcon } from 'lucide-react';

export function StressCheckIn({ onSubmit, plantType }) {
  const [stress, setStress] = useState(5);

  // Determine plant specific labels and styles
  const getRoleBranding = () => {
    if (plantType === 'succulent') {
      return {
        title: 'How peaceful do you feel today?',
        subtitle: 'The Caretaker: Nourish a living sanctuary. Steady logs support stable growth.',
        buttonLabel: 'Nourish Sanctuary Soil',
        buttonClass: 'from-emerald-500 to-teal-500 shadow-emerald-500/20 text-slate-900',
        icon: <Droplet className="w-5 h-5 fill-current" />,
        transmuteMsg: null,
        sliderLeft: 'Restless (1)',
        sliderRight: 'Centered (10)',
        levelLabel: 'Peacefulness Level'
      };
    }
    if (plantType === 'fern') {
      return {
        title: 'How focused and energized are you today?',
        subtitle: 'The Explorer: Discover cybernetic flora. Active alignment (7+) triggers a Lumen bonus!',
        buttonLabel: 'Sync Energy & Pulse Light',
        buttonClass: 'from-cyan-500 to-blue-500 shadow-cyan-500/20 text-slate-950',
        icon: <Zap className="w-5 h-5 fill-current" />,
        transmuteMsg: stress >= 7 ? '⚡ Flow resonance active: Active focus yields +5 Lumen bonus! ⚡' : 'Align your frequency to 7 or above to trigger a Harmony Bonus.',
        sliderLeft: 'Sluggish (1)',
        sliderRight: 'Laser Focused (10)',
        levelLabel: 'Focus & Energy'
      };
    }
    if (plantType === 'spore') {
      return {
        title: 'What is the cosmic weather in your mind today?',
        subtitle: 'The Astral Gardener: Cultivate cosmic mycelium. Black hole storms (<= 4) are transmuted!',
        buttonLabel: 'Transmute Mind to Stardust',
        buttonClass: 'from-purple-500 to-pink-500 shadow-purple-500/20 text-slate-100',
        icon: <InfinityIcon className="w-5 h-5" />,
        transmuteMsg: stress <= 4 ? '🌌 Void Alchemistry active: Black hole storm transmuted into +15% Growth and +5 Starlight! 🌌' : 'Mind weather is calm. A black hole storm (<= 4) will trigger Void Transmutation!',
        sliderLeft: 'Black Hole Storm (1)',
        sliderRight: 'Cosmic Harmony (10)',
        levelLabel: 'Weather Clarity'
      };
    }
    return {
      title: 'How is your mind today?',
      subtitle: "Tune in, drag the slider, and log today's levels.",
      buttonLabel: 'Log Mind State & Water Plant',
      buttonClass: 'from-emerald-500 to-teal-500 shadow-emerald-500/20 text-slate-900',
      icon: <HeartHandshake className="w-5 h-5" />,
      transmuteMsg: null,
      sliderLeft: 'Low (1)',
      sliderRight: 'High (10)',
      levelLabel: 'Mind State'
    };
  };

  const branding = getRoleBranding();

  // Define details for each stress tier based on the plant philosophy
  const getStressDetails = (val) => {
    if (plantType === 'succulent') {
      if (val <= 2) {
        return {
          emoji: '🌋',
          label: 'Restless & Agitated',
          description: 'Your mind is highly active, racing, or unsettled. Deep grounding needed.',
          color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
          sliderColor: 'accent-rose-500',
          accentGlow: 'shadow-rose-500/10',
          quote: 'Quiet minds catch the wind of inspiration.'
        };
      }
      if (val <= 4) {
        return {
          emoji: '😐',
          label: 'Mildly Unsettled',
          description: 'Feeling alright but with a minor undercurrent of mental clutter.',
          color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
          sliderColor: 'accent-orange-500',
          accentGlow: 'shadow-orange-500/10',
          quote: 'There is a crack in everything. That’s how the light gets in.'
        };
      }
      if (val <= 6) {
        return {
          emoji: '🙂',
          label: 'Moderately Calm',
          description: 'Steady and alert. Balanced, but some racing thoughts remain.',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          sliderColor: 'accent-amber-500',
          accentGlow: 'shadow-amber-500/10',
          quote: 'Slow down. Breathe. The rush is mostly in your head.'
        };
      }
      if (val <= 8) {
        return {
          emoji: '😌',
          label: 'Deeply Serene',
          description: 'Tension is gone. You feel peaceful, centered, and fully present.',
          color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
          sliderColor: 'accent-cyan-500',
          accentGlow: 'shadow-cyan-500/10',
          quote: 'Within you, there is a stillness and a sanctuary to which you can retreat.'
        };
      }
      return {
        emoji: '🧘',
        label: 'Completely Grounded',
        description: 'Complete mental sanctuary. Your mind is beautifully quiet.',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        sliderColor: 'accent-emerald-500',
        accentGlow: 'shadow-emerald-500/20',
        quote: 'Feelings are just visitors, let them come and go.'
      };
    }

    if (plantType === 'fern') {
      if (val <= 2) {
        return {
          emoji: '💤',
          label: 'Sluggish & Drained',
          description: 'Low battery. System is sluggish, foggy, or highly distracted.',
          color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
          sliderColor: 'accent-rose-500',
          accentGlow: 'shadow-rose-500/10',
          quote: 'Rest is not idleness, and to lie sometimes on the grass is a giant leap.'
        };
      }
      if (val <= 4) {
        return {
          emoji: '😐',
          label: 'Scrambled / Distracted',
          description: 'Mind is scattered. You are going through the motions but have low alignment.',
          color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
          sliderColor: 'accent-orange-500',
          accentGlow: 'shadow-orange-500/10',
          quote: 'Focus on the signal, discard the noise.'
        };
      }
      if (val <= 6) {
        return {
          emoji: '⚡',
          label: 'Active & Mindful',
          description: 'Good baseline energy. You are ready to explore and engage your surroundings.',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          sliderColor: 'accent-amber-500',
          accentGlow: 'shadow-amber-500/10',
          quote: 'Energy flows where attention goes.'
        };
      }
      if (val <= 8) {
        return {
          emoji: '🚀',
          label: 'Flow State / High Focus',
          description: 'High frequency alignment. Resonant, clear-headed, and focused.',
          color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
          sliderColor: 'accent-cyan-500',
          accentGlow: 'shadow-cyan-500/10',
          quote: 'Flow is the state of being fully absorbed in the moment.'
        };
      }
      return {
        emoji: '🧠',
        label: 'Peak Cognitive Clarity',
        description: 'Absolute focus. Mind is laser-aligned and pulsing with vitality.',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        sliderColor: 'accent-emerald-500',
        accentGlow: 'shadow-emerald-500/20',
        quote: 'To be in flow is to be at one with your action.'
      };
    }

    if (plantType === 'spore') {
      if (val <= 2) {
        return {
          emoji: '🌀',
          label: 'Black Hole Storm',
          description: 'Gravity is heavy. Overwhelmed by a solar tempest. Perfect for transmutation!',
          color: 'text-rose-400 bg-rose-500/10 border-rose-500/20',
          sliderColor: 'accent-rose-500',
          accentGlow: 'shadow-rose-500/10',
          quote: 'Stars cannot shine without darkness.'
        };
      }
      if (val <= 4) {
        return {
          emoji: '☁️',
          label: 'Nebula Fog',
          description: 'Cluttered, cloudy skies. Thoughts are drifting like loose asteroid dust.',
          color: 'text-orange-400 bg-orange-500/10 border-orange-500/20',
          sliderColor: 'accent-orange-500',
          accentGlow: 'shadow-orange-500/10',
          quote: 'No pressure, no diamonds.'
        };
      }
      if (val <= 6) {
        return {
          emoji: '🌠',
          label: 'Solar Wind',
          description: 'Vibrant but busy skies. Space particles are active and rushing.',
          color: 'text-amber-400 bg-amber-500/10 border-amber-500/20',
          sliderColor: 'accent-amber-500',
          accentGlow: 'shadow-amber-500/10',
          quote: 'The cosmos is within us. We are made of starstuff.'
        };
      }
      if (val <= 8) {
        return {
          emoji: '✨',
          label: 'Twinkling Aurora',
          description: 'Quiet cosmic dance. Light, peaceful, and open to expansion.',
          color: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20',
          sliderColor: 'accent-cyan-500',
          accentGlow: 'shadow-cyan-500/10',
          quote: 'You are the universe expressing itself as a human for a little while.'
        };
      }
      return {
        emoji: '🌌',
        label: 'Cosmic Harmony',
        description: 'Clear skies and perfect orbit. Unified with the stellar void.',
        color: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20',
        sliderColor: 'accent-emerald-500',
        accentGlow: 'shadow-emerald-500/20',
        quote: 'Quiet the mind, and the soul will speak.'
      };
    }

    // Default Fallback
    return {
      emoji: '😐',
      label: 'Balanced',
      description: 'Standard day. Calm and steady.',
      color: 'text-slate-200 bg-slate-500/10 border-slate-500/20',
      sliderColor: 'accent-emerald-500',
      accentGlow: 'shadow-white/5',
      quote: 'Balance is not something you find, it is something you create.'
    };
  };

  const details = getStressDetails(stress);

  // Determine alert text background styling dynamically based on state
  const isBonusActive = (plantType === 'fern' && stress >= 7) || (plantType === 'spore' && stress <= 4);

  return (
    <div className="flex flex-col space-y-5">
      <div className="text-center px-2">
        <h2 className="text-base font-display font-bold text-slate-100 tracking-tight">
          {branding.title}
        </h2>
        <p className="text-[11px] text-slate-400 mt-1 leading-snug">
          {branding.subtitle}
        </p>
      </div>

      {/* Visual Feedback Box */}
      <div className={`p-5 rounded-2xl border glass-panel transition-all duration-500 ${details.color} ${details.accentGlow} flex flex-col items-center text-center`}>
        <span className="text-5xl mb-3 animate-float-slow select-none leading-none">
          {details.emoji}
        </span>
        <div className="font-display font-bold text-sm tracking-tight">{details.label}</div>
        <div className="text-[10px] uppercase font-bold tracking-wider opacity-60 mb-2">
          {branding.levelLabel}: {stress} / 10
        </div>
        <p className="text-xs text-slate-300 max-w-xs leading-relaxed transition-opacity italic">
          "{details.quote}"
        </p>
      </div>

      {/* Mechanic Alert Text */}
      {branding.transmuteMsg && (
        <div className={`text-center py-1.5 px-3 rounded-xl text-[10px] font-semibold tracking-wide border ${
          isBonusActive
            ? 'bg-amber-500/10 text-amber-300 border-amber-500/20 animate-pulse'
            : 'bg-slate-900/40 text-slate-500 border-white/5'
        }`}>
          {branding.transmuteMsg}
        </div>
      )}

      {/* Tactile Range Slider */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 space-y-4">
        <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold tracking-wide">
          <span>{branding.sliderLeft}</span>
          <span>{branding.sliderRight}</span>
        </div>
        
        <input
          id="stress-slider"
          type="range"
          min="1"
          max="10"
          value={stress}
          onChange={(e) => setStress(parseInt(e.target.value))}
          className={`w-full h-2.5 rounded-lg bg-slate-800 outline-none cursor-pointer appearance-none ${details.sliderColor} touch-pan-x`}
        />

        <div className="flex justify-between px-1 text-[10px] text-slate-500 font-bold">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <span
              key={num}
              className={`transition-all ${stress === num ? 'text-slate-200 scale-125 font-bold' : ''}`}
            >
              {num}
            </span>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        onClick={() => onSubmit(stress)}
        className={`w-full h-14 bg-gradient-to-r ${branding.buttonClass} font-display font-bold text-sm rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center space-x-2 hover:brightness-110 touch-manipulation`}
      >
        {branding.icon}
        <span>{branding.buttonLabel}</span>
      </button>
    </div>
  );
}

