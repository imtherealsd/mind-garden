export function AmbientBackground({ seedType }) {
  if (!seedType) return null;

  return (
    <div className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden transition-all duration-700">
      <svg className="w-full h-full opacity-60" viewBox="0 0 450 800" preserveAspectRatio="xMidYMid slice">
        {/* Cozy Succulent (Caretaker): Sunset hills background, warm sunbeams, drifting golden pollen */}
        {seedType === 'succulent' && (
          <g>
            <defs>
              <linearGradient id="bgSunsetSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7C2D12" stopOpacity="0.1" />
                <stop offset="30%" stopColor="#D97706" stopOpacity="0.08" />
                <stop offset="60%" stopColor="#FEF08A" stopOpacity="0.04" />
                <stop offset="100%" stopColor="#070B0E" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="bgBeamGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FBBF24" stopOpacity="0.15" />
                <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
              </linearGradient>
            </defs>
            {/* Sky fill */}
            <rect width="450" height="800" fill="url(#bgSunsetSky)" />

            {/* Sunbeams */}
            <g className="animate-warm-beams" opacity="0.4">
              <polygon points="50,-20 180,-20 280,820 100,820" fill="url(#bgBeamGrad)" />
              <polygon points="250,-20 380,-20 480,820 300,820" fill="url(#bgBeamGrad)" opacity="0.7" />
            </g>

            {/* Hill silhouettes at the bottom */}
            <path d="M-20 680 Q100 620 220 670 T 470 650 L470 820 L-20 820 Z" fill="#064E3B" opacity="0.06" />
            <path d="M-20 720 Q120 670 260 710 T 470 700 L470 820 L-20 820 Z" fill="#064E3B" opacity="0.1" />

            {/* Floating golden pollen particles */}
            <circle cx="60" cy="180" r="1.5" fill="#FBBF24" className="animate-twinkle-slow" />
            <circle cx="150" cy="380" r="2" fill="#FBBF24" className="animate-twinkle-fast" style={{ animationDelay: '0.5s' }} />
            <circle cx="380" cy="220" r="1.5" fill="#FBBF24" className="animate-twinkle-slow" style={{ animationDelay: '1.2s' }} />
            <circle cx="310" cy="540" r="2.5" fill="#FBBF24" className="animate-twinkle-fast" style={{ animationDelay: '0.8s' }} />
            <circle cx="90" cy="610" r="1.2" fill="#FBBF24" className="animate-twinkle-slow" style={{ animationDelay: '2.1s' }} />
            <circle cx="270" cy="150" r="1.8" fill="#FBBF24" className="animate-twinkle-slow" style={{ animationDelay: '1.7s' }} />
          </g>
        )}

        {/* Neon Fern (Explorer): Cyan cyber grids, digital nodes, pulsing glow */}
        {seedType === 'fern' && (
          <g>
            <defs>
              <linearGradient id="bgCyberSky" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0891B2" stopOpacity="0.08" />
                <stop offset="50%" stopColor="#0F172A" stopOpacity="0" />
              </linearGradient>
            </defs>
            <rect width="450" height="800" fill="url(#bgCyberSky)" />

            {/* Glowing Tech Grid */}
            <g className="animate-grid-pulse" stroke="#06B6D4" strokeWidth="0.4" opacity="0.15">
              <line x1="0" y1="100" x2="450" y2="100" />
              <line x1="0" y1="220" x2="450" y2="220" />
              <line x1="0" y1="340" x2="450" y2="340" />
              <line x1="0" y1="460" x2="450" y2="460" />
              <line x1="0" y1="580" x2="450" y2="580" />
              <line x1="0" y1="700" x2="450" y2="700" />
              
              <line x1="90" y1="0" x2="90" y2="800" strokeDasharray="3,6" />
              <line x1="180" y1="0" x2="180" y2="800" strokeDasharray="3,6" />
              <line x1="270" y1="0" x2="270" y2="800" strokeDasharray="3,6" />
              <line x1="360" y1="0" x2="360" y2="800" strokeDasharray="3,6" />
            </g>

            {/* Digital tech nodes */}
            <g opacity="0.3">
              <circle cx="90" cy="220" r="3" fill="#22D3EE" className="animate-pulse-slow" />
              <circle cx="360" cy="460" r="2.5" fill="#22D3EE" className="animate-pulse-slow" style={{ animationDelay: '1s' }} />
              <circle cx="180" cy="580" r="3" fill="#22D3EE" className="animate-pulse-slow" style={{ animationDelay: '1.8s' }} />
              <circle cx="270" cy="100" r="2" fill="#22D3EE" className="animate-pulse-slow" style={{ animationDelay: '0.5s' }} />
            </g>

            {/* Floating light pulses */}
            <circle cx="120" cy="300" r="1.5" fill="#06B6D4" className="animate-twinkle-fast" />
            <circle cx="320" cy="150" r="2" fill="#22D3EE" className="animate-twinkle-slow" style={{ animationDelay: '0.4s' }} />
            <circle cx="70" cy="500" r="1.2" fill="#06B6D4" className="animate-twinkle-fast" style={{ animationDelay: '1.1s' }} />
            <circle cx="390" cy="650" r="2.2" fill="#22D3EE" className="animate-twinkle-slow" style={{ animationDelay: '0.8s' }} />
          </g>
        )}

        {/* Cosmic Spore (Astral Gardener): Nebula clouds, rotating orbits, star fields */}
        {seedType === 'spore' && (
          <g>
            <defs>
              <radialGradient id="bgCosmicNebula" cx="50%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#7E22CE" stopOpacity="0.22" />
                <stop offset="60%" stopColor="#EC4899" stopOpacity="0.06" />
                <stop offset="100%" stopColor="#090512" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* Drifting Nebula */}
            <rect width="450" height="800" fill="url(#bgCosmicNebula)" className="animate-nebula-drift" />

            {/* Constellation lines */}
            <g stroke="rgba(255, 255, 255, 0.05)" strokeWidth="0.8" fill="none">
              <polyline points="70,120 120,90 160,150 140,210" />
              <polyline points="380,240 340,300 370,360 410,330" />
              <polyline points="80,550 110,610 60,670" />
            </g>

            {/* Twinkling star field */}
            <circle cx="70" cy="120" r="1.5" fill="#fff" className="animate-twinkle-slow" />
            <circle cx="120" cy="90" r="2" fill="#fff" className="animate-twinkle-fast" style={{ animationDelay: '0.3s' }} />
            <circle cx="160" cy="150" r="1.2" fill="#fff" className="animate-twinkle-slow" style={{ animationDelay: '0.7s' }} />
            <circle cx="140" cy="210" r="2.5" fill="#fff" className="animate-twinkle-fast" style={{ animationDelay: '1.2s' }} />
            
            <circle cx="380" cy="240" r="2" fill="#fff" className="animate-twinkle-slow" style={{ animationDelay: '1s' }} />
            <circle cx="340" cy="300" r="1.5" fill="#fff" className="animate-twinkle-fast" />
            <circle cx="370" cy="360" r="2.2" fill="#fff" className="animate-twinkle-slow" style={{ animationDelay: '0.5s' }} />
            
            <circle cx="220" cy="480" r="1" fill="#fff" className="animate-twinkle-slow" style={{ animationDelay: '1.5s' }} />
            <circle cx="320" cy="580" r="1.5" fill="#fff" className="animate-twinkle-fast" style={{ animationDelay: '2s' }} />
            <circle cx="100" cy="390" r="1.2" fill="#fff" className="animate-twinkle-slow" style={{ animationDelay: '0.4s' }} />
          </g>
        )}
      </svg>
    </div>
  );
}
