import { useState } from 'react';
import { Sparkles, Compass, Droplet, Zap, Infinity as InfinityIcon, ArrowRight, ShieldCheck } from 'lucide-react';

export function Onboarding({ onSelectSeed, navigateTo }) {
  const [selectedPlantId, setSelectedPlantId] = useState('succulent');

  const plants = [
    {
      id: 'succulent',
      name: 'Cozy Succulent',
      element: 'Nature & Calm',
      role: 'The Caretaker',
      tagline: 'Cultivate steady mindfulness & emotional calm',
      description: 'A gentle mountain sanctuary companion. Like steady stones and quiet rainfall, it nurtures patience and grounded serenity.',
      themeColor: '#10B981',
      accentColor: 'text-emerald-400',
      badgeBg: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-300',
      pedestalGlow: 'from-emerald-500/25 via-teal-500/10 to-transparent',
      ringColor: 'border-emerald-400/40',
      icon: Droplet,
      symbol: '💧',
      svgArt: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="succPotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#374151" />
              <stop offset="100%" stopColor="#1F2937" />
            </linearGradient>
            <linearGradient id="succLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#A7F3D0" />
            </linearGradient>
            <filter id="glowSucc" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* 3D Pedestal Base Shadow */}
          <ellipse cx="100" cy="180" rx="65" ry="16" fill="rgba(0,0,0,0.5)" filter="blur(8px)" />
          
          {/* 3D Modern Geometric Terracotta Pot */}
          <polygon points="65,145 135,145 125,175 75,175" fill="url(#succPotGrad)" stroke="#4B5563" strokeWidth="1.5" />
          <polygon points="60,140 140,140 135,146 65,146" fill="#4B5563" />
          <line x1="75" y1="175" x2="125" y2="175" stroke="#111827" strokeWidth="2" />

          {/* Plant Rosette with 3D Depth Layers */}
          <g transform="translate(0, -10)" filter="url(#glowSucc)">
            {/* Outer Leaves */}
            <path d="M70 140 C55 120 50 95 75 75 C95 105 85 130 70 140 Z" fill="url(#succLeafGrad)" opacity="0.85" />
            <path d="M130 140 C145 120 150 95 125 75 C105 105 115 130 130 140 Z" fill="url(#succLeafGrad)" opacity="0.85" />
            {/* Mid Leaves */}
            <path d="M80 140 C65 110 75 80 100 65 C110 95 100 125 80 140 Z" fill="url(#succLeafGrad)" opacity="0.95" />
            <path d="M120 140 C135 110 125 80 100 65 C90 95 100 125 120 140 Z" fill="url(#succLeafGrad)" opacity="0.95" />
            {/* Core Heart Leaf */}
            <path d="M100 135 C88 110 90 75 100 55 C110 75 112 110 100 135 Z" fill="#A7F3D0" />
            <circle cx="100" cy="85" r="3" fill="#FBBF24" className="animate-ping" style={{ animationDuration: '3s' }} />
          </g>
        </svg>
      )
    },
    {
      id: 'fern',
      name: 'Neon Fern',
      element: 'Biolum Energy',
      role: 'The Explorer',
      tagline: 'Awaken active focus & vibrant flow states',
      description: 'A vibrant bioluminescent sanctuary companion. Synthesizes mental tension into radiant creative energy and razor-sharp flow.',
      themeColor: '#06B6D4',
      accentColor: 'text-cyan-400',
      badgeBg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
      pedestalGlow: 'from-cyan-500/25 via-blue-500/10 to-transparent',
      ringColor: 'border-cyan-400/40',
      icon: Zap,
      symbol: '⚡',
      svgArt: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="fernPotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1E293B" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="fernLeafGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0891B2" />
              <stop offset="50%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#67E8F9" />
            </linearGradient>
            <filter id="glowFern" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* 3D Pedestal Base Shadow */}
          <ellipse cx="100" cy="180" rx="65" ry="16" fill="rgba(0,0,0,0.5)" filter="blur(8px)" />

          {/* 3D Modern Cyber Pot */}
          <polygon points="65,145 135,145 125,175 75,175" fill="url(#fernPotGrad)" stroke="#38BDF8" strokeWidth="1.5" />
          <polygon points="60,140 140,140 135,146 65,146" fill="#0369A1" />
          <line x1="75" y1="175" x2="125" y2="175" stroke="#0C4A6E" strokeWidth="2" />

          {/* Bioluminescent Fronds with Glowing Pulse */}
          <g transform="translate(0, -10)" filter="url(#glowFern)">
            <path d="M100 140 Q85 90 70 45 Q90 85 100 140 Z" fill="url(#fernLeafGrad)" />
            <path d="M100 140 Q115 90 130 45 Q110 85 100 140 Z" fill="url(#fernLeafGrad)" />
            <path d="M100 140 Q65 105 45 75 Q75 105 100 140 Z" fill="url(#fernLeafGrad)" opacity="0.9" />
            <path d="M100 140 Q135 105 155 75 Q125 105 100 140 Z" fill="url(#fernLeafGrad)" opacity="0.9" />
            <path d="M100 135 Q100 70 100 35 Q104 70 100 135 Z" fill="#67E8F9" />
            {/* Glowing Spores */}
            <circle cx="70" cy="45" r="3" fill="#67E8F9" className="animate-pulse" />
            <circle cx="130" cy="45" r="3" fill="#67E8F9" className="animate-pulse" />
            <circle cx="100" cy="35" r="4" fill="#E0F2FE" className="animate-ping" style={{ animationDuration: '2.5s' }} />
          </g>
        </svg>
      )
    },
    {
      id: 'spore',
      name: 'Cosmic Spore',
      element: 'Cosmic Void',
      role: 'The Astral Gardener',
      tagline: 'Transmute heavy tension into starlight',
      description: 'An ethereal celestial sanctuary companion. Floats in quiet zero-gravity, turning chaotic stress storms into peaceful stardust.',
      themeColor: '#A855F7',
      accentColor: 'text-purple-400',
      badgeBg: 'bg-purple-500/15 border-purple-500/30 text-purple-300',
      pedestalGlow: 'from-purple-500/25 via-pink-500/10 to-transparent',
      ringColor: 'border-purple-400/40',
      icon: InfinityIcon,
      symbol: '⭐',
      svgArt: (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id="sporePotGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2E1065" />
              <stop offset="100%" stopColor="#0F172A" />
            </linearGradient>
            <linearGradient id="sporeCapGrad" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#7E22CE" />
              <stop offset="50%" stopColor="#A855F7" />
              <stop offset="100%" stopColor="#E9D5FF" />
            </linearGradient>
            <filter id="glowSpore" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* 3D Pedestal Base Shadow */}
          <ellipse cx="100" cy="180" rx="65" ry="16" fill="rgba(0,0,0,0.5)" filter="blur(8px)" />

          {/* 3D Astral Altar */}
          <polygon points="65,145 135,145 125,175 75,175" fill="url(#sporePotGrad)" stroke="#C084FC" strokeWidth="1.5" />
          <polygon points="60,140 140,140 135,146 65,146" fill="#6B21A8" />

          {/* Floating Spore Cap with Cosmic Starlight Particles */}
          <g transform="translate(0, -10)" filter="url(#glowSpore)">
            {/* Bioluminescent Stalk */}
            <path d="M92 140 Q90 100 94 85 L106 85 Q110 100 108 140 Z" fill="#6B21A8" />
            {/* Glowing Dome Cap */}
            <path d="M45 105 C45 45 155 45 155 105 C130 115 70 115 45 105 Z" fill="url(#sporeCapGrad)" />
            {/* Stardust Spheres */}
            <circle cx="75" cy="75" r="4.5" fill="#FAF5FF" />
            <circle cx="125" cy="78" r="5" fill="#FAF5FF" />
            <circle cx="100" cy="62" r="3.5" fill="#FAF5FF" />
            <circle cx="60" cy="92" r="3" fill="#E9D5FF" />
            <circle cx="140" cy="92" r="3" fill="#E9D5FF" />
            {/* Orbiting Stardust Particles */}
            <circle cx="35" cy="60" r="2" fill="#E9D5FF" className="animate-ping" style={{ animationDuration: '3s' }} />
            <circle cx="165" cy="70" r="2.5" fill="#E9D5FF" className="animate-pulse" />
          </g>
        </svg>
      )
    }
  ];

  const activePlant = plants.find((p) => p.id === selectedPlantId) || plants[0];

  return (
    <div className="flex flex-col flex-1 px-4 pt-3 pb-4 justify-between select-none">
      
      {/* Top Header */}
      <div className="text-center pt-1">
        <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-bold text-slate-300 mb-1.5 shadow-sm">
          <Compass className="w-3.5 h-3.5 text-emerald-400 animate-spin-slow" />
          <span>SANCTUARY COMPANION SELECT</span>
        </div>
        <h1 className="text-2xl font-display font-black tracking-tight text-white leading-tight">
          Awaken Your Garden
        </h1>
        <p className="text-xs text-slate-400 mt-1 max-w-[290px] mx-auto leading-relaxed">
          Select a living companion to anchor your mindful journey.
        </p>
      </div>

      {/* Center 3D Interactive Altar / Hero Showcase */}
      <div className="relative my-auto flex flex-col items-center justify-center py-2">
        {/* Dynamic Glowing Ambient Aura Ring */}
        <div 
          className={`absolute w-64 h-64 rounded-full bg-gradient-to-tr ${activePlant.pedestalGlow} blur-3xl transition-all duration-700 pointer-events-none -z-10`} 
        />
        <div 
          className={`absolute w-52 h-52 rounded-full border border-dashed ${activePlant.ringColor} animate-spin-slow opacity-40 pointer-events-none`} 
          style={{ animationDuration: '25s' }}
        />

        {/* 3D Floating Plant Stage */}
        <div className="w-48 h-48 relative flex items-center justify-center transition-transform duration-500 hover:scale-105 active:scale-95 cursor-pointer">
          <div className="w-full h-full animate-float">
            {activePlant.svgArt}
          </div>
        </div>

        {/* 3D Floating Pedestal Plinth Base */}
        <div className="w-40 h-3 rounded-full bg-slate-900 border border-white/15 shadow-2xl relative -mt-4 mb-3 flex items-center justify-center">
          <div className="w-24 h-1 rounded-full bg-white/20" />
        </div>

        {/* Active Plant Identity Card */}
        <div className="text-center max-w-[320px] px-2 animate-in fade-in zoom-in-95 duration-200">
          <div className="flex items-center justify-center space-x-2 mb-1">
            <h2 className="text-lg font-display font-extrabold text-white tracking-tight">
              {activePlant.name}
            </h2>
            <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded-full border ${activePlant.badgeBg}`}>
              {activePlant.element}
            </span>
          </div>

          <div className="text-[11px] font-semibold text-slate-300 flex items-center justify-center gap-1 mb-1.5">
            <Sparkles className={`w-3 h-3 ${activePlant.accentColor}`} />
            <span>{activePlant.tagline}</span>
          </div>

          <p className="text-[11px] text-slate-400 leading-relaxed">
            {activePlant.description}
          </p>
        </div>
      </div>

      {/* Bottom 3D Plant Selector Dock */}
      <div className="space-y-3.5 pt-2">
        <div className="grid grid-cols-3 gap-2">
          {plants.map((p) => {
            const isSelected = selectedPlantId === p.id;
            return (
              <button
                key={p.id}
                onClick={() => setSelectedPlantId(p.id)}
                className={`py-2 px-2 rounded-2xl border text-center transition-all cursor-pointer relative flex flex-col items-center justify-center space-y-1 ${
                  isSelected
                    ? 'bg-white/10 border-white/30 text-white shadow-lg ring-1 ring-white/40 scale-[1.03]'
                    : 'bg-slate-900/40 border-white/5 text-slate-400 hover:bg-white/5'
                }`}
              >
                <span className="text-lg leading-none">{p.symbol}</span>
                <span className="text-[10px] font-bold truncate max-w-full">{p.name.split(' ')[1] || p.name}</span>
                <span className="text-[8px] text-slate-500 font-mono leading-none">{p.role.split(' ')[1] || p.role}</span>
              </button>
            );
          })}
        </div>

        {/* Primary 3D CTA Button */}
        <button
          onClick={() => onSelectSeed(selectedPlantId)}
          className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-400 text-slate-950 font-display font-black text-xs tracking-wider shadow-lg shadow-emerald-500/25 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer flex items-center justify-center space-x-2"
        >
          <span>Plant Your {activePlant.name}</span>
          <ArrowRight className="w-4 h-4 text-slate-950" />
        </button>

        {/* Footer Guarantee */}
        <div className="flex items-center justify-center space-x-3 text-[10px] text-slate-500 pt-0.5">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3 h-3 text-emerald-400" />
            100% Private Offline Sanctuary
          </span>
          <span>•</span>
          <button
            onClick={() => navigateTo('/privacy-policy')}
            className="hover:text-slate-300 underline transition-colors cursor-pointer"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </div>
  );
}
