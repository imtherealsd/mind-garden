import { Sparkles, Compass } from 'lucide-react';

export function Onboarding({ onSelectSeed }) {
  const seeds = [
    {
      id: 'succulent',
      name: 'Cozy Succulent',
      description: 'Nurture a living sanctuary in a warm sunset mountain valley. Slow, peaceful grounding. Unlock butterflies, stream paths, and cozy gazebos.',
      element: 'Nature & Calm',
      color: 'text-emerald-400',
      bgColor: 'from-emerald-500/10 to-teal-500/5',
      borderColor: 'border-emerald-500/30 hover:border-emerald-400',
      glowColor: 'shadow-emerald-500/10',
      tagline: 'Role: The Caretaker',
      icon: (className) => (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="succGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#A7F3D0" />
            </linearGradient>
          </defs>
          {/* Pot */}
          <path d="M35 75 L65 75 L60 90 L40 90 Z" fill="#374151" />
          <rect x="32" y="70" width="36" height="5" rx="2" fill="#4B5563" />
          {/* Succulent Leaves */}
          <path d="M50 35 C42 45 42 60 50 70 C58 60 58 45 50 35 Z" fill="url(#succGrad)" />
          <path d="M38 43 C32 50 34 62 44 68 C48 58 46 48 38 43 Z" fill="url(#succGrad)" opacity="0.9" />
          <path d="M62 43 C68 50 66 62 56 68 C52 58 54 48 62 43 Z" fill="url(#succGrad)" opacity="0.9" />
          <path d="M30 55 C25 61 29 70 38 72 C42 63 38 56 30 55 Z" fill="url(#succGrad)" opacity="0.8" />
          <path d="M70 55 C75 61 71 70 62 72 C58 63 62 56 70 55 Z" fill="url(#succGrad)" opacity="0.8" />
          {/* Sprout center */}
          <path d="M50 45 C46 51 46 60 50 65 C54 60 54 51 50 45 Z" fill="#A7F3D0" />
        </svg>
      )
    },
    {
      id: 'fern',
      name: 'Neon Fern',
      description: 'Discover a mysterious cyber ecosystem in a glowing neon forest. Active focus check-ins unlock Lumen harmony bonuses. Unlock plasma lamps, neon paths, and cyber arches.',
      element: 'Biolum Energy',
      color: 'text-cyan-400',
      bgColor: 'from-cyan-500/10 to-blue-500/5',
      borderColor: 'border-cyan-500/30 hover:border-cyan-400',
      glowColor: 'shadow-cyan-500/10',
      tagline: 'Role: The Explorer',
      icon: (className) => (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="fernGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="60%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#67E8F9" />
            </linearGradient>
          </defs>
          {/* Pot */}
          <path d="M35 75 L65 75 L60 90 L40 90 Z" fill="#1F2937" />
          <rect x="32" y="70" width="36" height="5" rx="2" fill="#374151" />
          {/* Fern Fronds (curving leaves) */}
          <path d="M50 70 Q45 50 40 30 Q46 45 50 70 Z" fill="url(#fernGrad)" />
          <path d="M50 65 Q58 50 63 32 Q57 47 50 65 Z" fill="url(#fernGrad)" />
          <path d="M50 58 Q34 44 26 32 Q37 42 50 58 Z" fill="url(#fernGrad)" opacity="0.9" />
          <path d="M50 52 Q68 40 76 28 Q65 38 50 52 Z" fill="url(#fernGrad)" opacity="0.9" />
          <path d="M50 45 Q35 32 28 20 Q39 28 50 45 Z" fill="url(#fernGrad)" opacity="0.8" />
          <path d="M50 38 Q65 26 72 14 Q61 22 50 38 Z" fill="url(#fernGrad)" opacity="0.8" />
        </svg>
      )
    },
    {
      id: 'spore',
      name: 'Cosmic Spore',
      description: 'Cultivate celestial mycelium across floating islands and nebulas. Heavy mental storms are transmuted into stardust and accelerated growth. Unlock comets, nebula jars, and portals.',
      element: 'Cosmic Void',
      color: 'text-purple-400',
      bgColor: 'from-purple-500/10 to-indigo-500/5',
      borderColor: 'border-purple-500/30 hover:border-purple-400',
      glowColor: 'shadow-purple-500/10',
      tagline: 'Role: The Astral Gardener',
      icon: (className) => (
        <svg viewBox="0 0 100 100" className={className}>
          <defs>
            <linearGradient id="sporeGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7E22CE" />
              <stop offset="60%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#E9D5FF" />
            </linearGradient>
          </defs>
          {/* Pot */}
          <path d="M35 75 L65 75 L60 90 L40 90 Z" fill="#111827" />
          <rect x="32" y="70" width="36" height="5" rx="2" fill="#1F2937" />
          {/* Mushroom / Spore Cap */}
          <path d="M30 65 Q50 68 70 65 L66 70 H34 Z" fill="#4B5563" />
          <path d="M44 70 L46 72 V75 H54 V72 L56 70 Z" fill="#6B7280" />
          {/* Cap */}
          <path d="M26 62 C26 35 74 35 74 62 C60 66 40 66 26 62 Z" fill="url(#sporeGrad)" />
          {/* Spores / Spots */}
          <circle cx="38" cy="46" r="3" fill="#E9D5FF" />
          <circle cx="60" cy="48" r="4" fill="#E9D5FF" />
          <circle cx="48" cy="38" r="2.5" fill="#E9D5FF" />
          <circle cx="50" cy="54" r="3.5" fill="#E9D5FF" />
          {/* Floating stardust circles */}
          <circle cx="20" cy="30" r="1.5" fill="#E9D5FF" className="animate-pulse" />
          <circle cx="80" cy="40" r="2" fill="#E9D5FF" className="animate-pulse" />
        </svg>
      )
    }
  ];

  return (
    <div className="flex flex-col flex-1 px-5 pt-8 pb-10 justify-between">
      <div>
        <div className="text-center mb-6">
          <div className="inline-flex p-3 rounded-full bg-emerald-500/10 text-emerald-400 mb-3 animate-float">
            <Compass className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-white mb-2">
            Mind Garden
          </h1>
          <p className="text-sm text-slate-400 max-w-xs mx-auto">
            Choose a mystical seed to cultivate. Your daily calm and breathing exercises will help it bloom.
          </p>
        </div>

        <div className="space-y-4">
          {seeds.map((seed) => (
            <button
              key={seed.id}
              onClick={() => onSelectSeed(seed.id)}
              className={`w-full text-left flex items-center p-4 rounded-2xl glass-panel border ${seed.borderColor} transition-all duration-300 hover:scale-[1.01] hover:shadow-lg ${seed.glowColor} group active:scale-95 touch-manipulation`}
            >
              <div className="w-20 h-20 flex-shrink-0 bg-slate-900/50 rounded-xl p-1 mr-4 border border-white/5 group-hover:border-white/10 transition-colors">
                {seed.icon("w-full h-full object-contain")}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-display font-semibold text-lg text-slate-100 group-hover:text-white transition-colors">
                    {seed.name}
                  </h3>
                  <span className={`text-[10px] font-medium tracking-wider uppercase ${seed.color} bg-white/5 px-2 py-0.5 rounded-full`}>
                    {seed.element}
                  </span>
                </div>
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {seed.description}
                </p>
                <div className="mt-2 flex items-center text-[11px] text-slate-400">
                  <Sparkles className={`w-3.5 h-3.5 mr-1 ${seed.color}`} />
                  <span className="font-medium">{seed.tagline}</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="text-center mt-6">
        <p className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">
          Select a seed to begin your journey
        </p>
      </div>
    </div>
  );
}
