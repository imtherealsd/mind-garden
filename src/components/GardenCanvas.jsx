import { Sprout, Award } from 'lucide-react';

export function GardenCanvas({ plantType, growth, decorations = [], ambientSurprise = null }) {
  // Determine growth stage
  const getStage = (pct) => {
    if (pct < 20) return { name: 'Seed', color: 'text-slate-400', level: 1 };
    if (pct < 40) return { name: 'Sprout', color: 'text-emerald-400', level: 2 };
    if (pct < 70) return { name: 'Sapling', color: 'text-cyan-400', level: 3 };
    if (pct < 90) return { name: 'Mature', color: 'text-indigo-400', level: 4 };
    return { name: 'Blooming', color: 'text-amber-400', level: 5 };
  };

  const stage = getStage(growth);

  // Check decoration unlocks
  const hasPath = decorations.includes('path');
  const hasLantern = decorations.includes('lantern');
  const hasFireflies = decorations.includes('fireflies');
  const hasGate = decorations.includes('gate');

  // Render procedural plant based on type and growth percentage
  const renderPlant = () => {
    const scale = 0.5 + (growth / 100) * 0.6; // Scale from 0.5 to 1.1

    switch (plantType) {
      case 'succulent':
        return (
          <g transform={`translate(200, 240) scale(${scale})`}>
            <defs>
              <linearGradient id="succGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="60%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#A7F3D0" />
              </linearGradient>
            </defs>
            {growth < 20 && (
              // Seed
              <circle cx="0" cy="0" r="10" fill="#10B981" className="animate-pulse" />
            )}
            {growth >= 20 && growth < 40 && (
              // Sprout
              <g>
                <path d="M0 0 C-10 -15 -15 -30 0 -40 C5 -25 5 -10 0 0 Z" fill="url(#succGradient)" />
                <path d="M0 0 C10 -12 15 -25 5 -35 C-2 -22 -2 -8 0 0 Z" fill="url(#succGradient)" opacity="0.8" />
              </g>
            )}
            {growth >= 40 && growth < 70 && (
              // Sapling
              <g>
                <path d="M0 0 C-15 -20 -20 -40 0 -55 C8 -35 8 -15 0 0 Z" fill="url(#succGradient)" />
                <path d="M-10 -5 C-30 -15 -35 -30 -20 -42 C-8 -30 0 -15 -10 -5 Z" fill="url(#succGradient)" opacity="0.9" />
                <path d="M10 -5 C30 -15 35 -30 20 -42 C8 -30 0 -15 10 -5 Z" fill="url(#succGradient)" opacity="0.9" />
                <path d="M0 -10 C-5 -20 -5 -35 0 -45 C5 -35 5 -20 0 -10 Z" fill="#A7F3D0" />
              </g>
            )}
            {growth >= 70 && growth < 90 && (
              // Mature
              <g>
                {/* Back layers */}
                <path d="M-20 -5 C-45 -15 -55 -40 -35 -55 C-15 -40 -5 -20 -20 -5 Z" fill="url(#succGradient)" opacity="0.8" />
                <path d="M20 -5 C45 -15 55 -40 35 -55 C15 -40 5 -20 20 -5 Z" fill="url(#succGradient)" opacity="0.8" />
                {/* Mid layers */}
                <path d="M-15 -8 C-35 -25 -40 -55 -15 -68 C-2 -50 0 -25 -15 -8 Z" fill="url(#succGradient)" />
                <path d="M15 -8 C35 -25 40 -55 15 -68 C2 -50 0 -25 15 -8 Z" fill="url(#succGradient)" />
                <path d="M0 5 C-25 -15 -30 -45 0 -60 C15 -40 15 -15 0 5 Z" fill="url(#succGradient)" />
                {/* Inner rosette */}
                <path d="M0 -15 C-10 -30 -10 -50 0 -60 C10 -50 10 -30 0 -15 Z" fill="#A7F3D0" />
                <path d="M-8 -12 C-18 -22 -15 -40 -5 -48 C2 -38 0 -22 -8 -12 Z" fill="#34D399" />
                <path d="M8 -12 C18 -22 15 -40 5 -48 C-2 -38 0 -22 8 -12 Z" fill="#34D399" />
              </g>
            )}
            {growth >= 90 && (
              // Blooming Succulent
              <g>
                {/* Standard Rosette */}
                <g opacity="0.95">
                  <path d="M-20 -5 C-45 -15 -55 -40 -35 -55 C-15 -40 -5 -20 -20 -5 Z" fill="url(#succGradient)" />
                  <path d="M20 -5 C45 -15 55 -40 35 -55 C15 -40 5 -20 20 -5 Z" fill="url(#succGradient)" />
                  <path d="M-15 -8 C-35 -25 -40 -55 -15 -68 C-2 -50 0 -25 -15 -8 Z" fill="url(#succGradient)" />
                  <path d="M15 -8 C35 -25 40 -55 15 -68 C2 -50 0 -25 15 -8 Z" fill="url(#succGradient)" />
                  <path d="M0 5 C-25 -15 -30 -45 0 -60 C15 -40 15 -15 0 5 Z" fill="url(#succGradient)" />
                  <path d="M0 -15 C-10 -30 -10 -50 0 -60 C10 -50 10 -30 0 -15 Z" fill="#A7F3D0" />
                </g>
                {/* Blooming Stalk */}
                <path d="M0 -45 Q15 -90 5 -125" stroke="#10B981" strokeWidth="4" fill="none" />
                <path d="M0 -45 Q-15 -75 -25 -100" stroke="#10B981" strokeWidth="3" fill="none" opacity="0.8" />
                {/* Flowers */}
                <g transform="translate(5, -128)" className="animate-pulse">
                  <circle cx="0" cy="0" r="8" fill="#F472B6" />
                  <circle cx="0" cy="0" r="3" fill="#FBBF24" />
                  {/* Petals */}
                  <circle cx="-6" cy="-6" r="3.5" fill="#F472B6" />
                  <circle cx="6" cy="-6" r="3.5" fill="#F472B6" />
                  <circle cx="-6" cy="6" r="3.5" fill="#F472B6" />
                  <circle cx="6" cy="6" r="3.5" fill="#F472B6" />
                </g>
                <g transform="translate(-25, -100)" className="animate-pulse" style={{ animationDelay: '0.5s' }}>
                  <circle cx="0" cy="0" r="6" fill="#F472B6" />
                  <circle cx="0" cy="0" r="2" fill="#FBBF24" />
                  <circle cx="-4" cy="-4" r="2.5" fill="#F472B6" />
                  <circle cx="4" cy="-4" r="2.5" fill="#F472B6" />
                  <circle cx="-4" cy="4" r="2.5" fill="#F472B6" />
                  <circle cx="4" cy="4" r="2.5" fill="#F472B6" />
                </g>
              </g>
            )}
          </g>
        );

      case 'fern':
        return (
          <g transform={`translate(200, 240) scale(${scale})`}>
            <defs>
              <linearGradient id="fernGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0891B2" />
                <stop offset="50%" stopColor="#06B6D4" />
                <stop offset="100%" stopColor="#67E8F9" />
              </linearGradient>
            </defs>
            {growth < 20 && (
              // Seed
              <circle cx="0" cy="0" r="10" fill="#06B6D4" className="animate-pulse" />
            )}
            {growth >= 20 && growth < 40 && (
              // Sprout
              <g>
                <path d="M0 0 Q-10 -25 -5 -45 Q-2 -20 0 0 Z" fill="url(#fernGradient)" />
                {/* Mini frond leaflets */}
                <circle cx="-6" cy="-30" r="3" fill="#67E8F9" />
                <circle cx="-8" cy="-20" r="3" fill="#67E8F9" />
                <circle cx="-5" cy="-10" r="2.5" fill="#67E8F9" />
              </g>
            )}
            {growth >= 40 && growth < 70 && (
              // Sapling
              <g>
                {/* Main stem */}
                <path d="M0 0 Q-15 -40 -10 -70 Q-5 -30 0 0 Z" fill="url(#fernGradient)" />
                {/* Leaflets */}
                <path d="M-5 -20 Q-25 -25 -22 -32 Q-10 -25 -3 -20" fill="url(#fernGradient)" />
                <path d="M-7 -35 Q-28 -42 -23 -48 Q-12 -38 -5 -33" fill="url(#fernGradient)" />
                <path d="M-8 -50 Q-25 -60 -18 -66 Q-10 -53 -6 -48" fill="url(#fernGradient)" />

                <path d="M0 -15 Q20 -22 18 -28 Q8 -20 0 -15" fill="url(#fernGradient)" opacity="0.8" />
                <path d="M-2 -30 Q22 -38 19 -44 Q10 -34 -2 -28" fill="url(#fernGradient)" opacity="0.8" />
                <path d="M-4 -45 Q20 -55 15 -60 Q8 -48 -4 -43" fill="url(#fernGradient)" opacity="0.8" />
              </g>
            )}
            {growth >= 70 && growth < 90 && (
              // Mature
              <g>
                {/* Dense fronds */}
                <g transform="rotate(-15)">
                  <path d="M0 0 Q-20 -50 -15 -85 Q-5 -40 0 0 Z" fill="url(#fernGradient)" />
                  <path d="M-6 -25 Q-30 -30 -25 -38 Q-10 -28 -3 -22" fill="url(#fernGradient)" />
                  <path d="M-8 -45 Q-32 -52 -26 -60 Q-12 -45 -5 -40" fill="url(#fernGradient)" />
                  <path d="M-9 -65 Q-28 -78 -20 -84 Q-10 -65 -6 -58" fill="url(#fernGradient)" />
                </g>
                <g transform="rotate(15)">
                  <path d="M0 0 Q20 -50 15 -85 Q5 -40 0 0 Z" fill="url(#fernGradient)" />
                  <path d="M6 -25 Q30 -30 25 -38 Q10 -28 3 -22" fill="url(#fernGradient)" />
                  <path d="M8 -45 Q32 -52 26 -60 Q12 -45 5 -40" fill="url(#fernGradient)" />
                  <path d="M9 -65 Q28 -78 20 -84 Q10 -65 6 -58" fill="url(#fernGradient)" />
                </g>
                <g transform="rotate(0)">
                  <path d="M0 0 Q0 -60 5 -95 Q2 -40 0 0 Z" fill="#67E8F9" opacity="0.9" />
                </g>
              </g>
            )}
            {growth >= 90 && (
              // Blooming Fern
              <g>
                {/* Base Fern Leaves */}
                <g opacity="0.85">
                  <path d="M0 0 Q-25 -45 -20 -80 Z" fill="url(#fernGradient)" />
                  <path d="M0 0 Q25 -45 20 -80 Z" fill="url(#fernGradient)" />
                  <path d="M0 0 Q0 -55 5 -90 Z" fill="url(#fernGradient)" />
                </g>
                {/* Glowing bioluminescent bloom in center */}
                <g transform="translate(0, -60)" className="animate-float-slow">
                  <circle cx="0" cy="0" r="18" fill="url(#fernGradient)" className="animate-pulse-slow" opacity="0.3" />
                  {/* Lotus bloom */}
                  <path d="M0 10 C-15 -5 -20 -25 0 -35 C20 -25 15 -5 0 10 Z" fill="#22D3EE" />
                  <path d="M-5 5 C-20 0 -22 -15 -10 -25 C2 -15 0 0 -5 5 Z" fill="#06B6D4" opacity="0.9" />
                  <path d="M5 5 C20 0 22 -15 10 -25 C-2 -15 0 0 5 5 Z" fill="#06B6D4" opacity="0.9" />
                  <circle cx="0" cy="-12" r="4" fill="#FFFFFF" />
                  {/* Sparks */}
                  <circle cx="-15" cy="-25" r="2" fill="#E0F7FA" className="animate-twinkle-fast" />
                  <circle cx="15" cy="-20" r="1.5" fill="#E0F7FA" className="animate-twinkle-slow" />
                  <circle cx="0" cy="-42" r="2.5" fill="#E0F7FA" className="animate-twinkle-fast" />
                </g>
              </g>
            )}
          </g>
        );

      case 'spore':
        return (
          <g transform={`translate(200, 240) scale(${scale})`}>
            <defs>
              <linearGradient id="sporeGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#7E22CE" />
                <stop offset="60%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#E9D5FF" />
              </linearGradient>
            </defs>
            {growth < 20 && (
              // Seed
              <g className="animate-pulse">
                <circle cx="0" cy="0" r="10" fill="#A855F7" />
                <circle cx="-3" cy="-3" r="2" fill="#E9D5FF" />
              </g>
            )}
            {growth >= 20 && growth < 40 && (
              // Sprout
              <g>
                <path d="M-6 0 C-6 -15 -8 -30 0 -32 C8 -30 6 -15 6 0 Z" fill="#6B7280" />
                <path d="M-12 -28 C-12 -40 12 -40 12 -28 C10 -25 -10 -25 -12 -28 Z" fill="url(#sporeGradient)" />
              </g>
            )}
            {growth >= 40 && growth < 70 && (
              // Sapling
              <g>
                {/* Stem */}
                <path d="M-8 0 C-8 -25 -12 -50 0 -52 C12 -50 8 -25 8 0 Z" fill="#9CA3AF" />
                {/* Cap */}
                <path d="M-25 -48 C-25 -72 25 -72 25 -48 C15 -42 -15 -42 -25 -48 Z" fill="url(#sporeGradient)" />
                {/* Spots */}
                <circle cx="-10" cy="-56" r="3.5" fill="#F3E8FF" />
                <circle cx="8" cy="-54" r="2.5" fill="#F3E8FF" />
                <circle cx="0" cy="-62" r="2" fill="#F3E8FF" />
              </g>
            )}
            {growth >= 70 && growth < 90 && (
              // Mature
              <g>
                {/* Double Mushrooms */}
                {/* Small one */}
                <g transform="translate(-18, 5) scale(0.65) rotate(-10)">
                  <path d="M-10 0 C-10 -30 -12 -60 0 -62 C12 -60 10 -30 10 0 Z" fill="#4B5563" />
                  <path d="M-30 -58 C-30 -90 30 -90 30 -58 Z" fill="url(#sporeGradient)" />
                  <circle cx="-10" cy="-70" r="4.5" fill="#F3E8FF" />
                  <circle cx="10" cy="-68" r="3.5" fill="#F3E8FF" />
                </g>
                {/* Large one */}
                <g>
                  <path d="M-12 0 C-12 -35 -15 -70 0 -72 C15 -70 12 -35 12 0 Z" fill="#E5E7EB" />
                  <path d="M-38 -65 C-38 -105 38 -105 38 -65 C25 -58 -25 -58 -38 -65 Z" fill="url(#sporeGradient)" />
                  <circle cx="-15" cy="-80" r="5" fill="#F3E8FF" />
                  <circle cx="15" cy="-78" r="4" fill="#F3E8FF" />
                  <circle cx="0" cy="-90" r="4.5" fill="#F3E8FF" />
                  <circle cx="-5" cy="-70" r="3" fill="#F3E8FF" />
                </g>
              </g>
            )}
            {growth >= 90 && (
              // Blooming cosmic spore
              <g>
                {/* Small spore */}
                <g transform="translate(-22, 5) scale(0.6) rotate(-12)">
                  <path d="M-10 0 C-10 -30 -12 -60 0 -62 C10 -60 10 -30 10 0 Z" fill="#374151" />
                  <path d="M-30 -58 C-30 -90 30 -90 30 -58 Z" fill="url(#sporeGradient)" />
                </g>
                {/* Large spore */}
                <g>
                  <path d="M-14 0 C-14 -35 -18 -80 0 -82 C18 -80 14 -35 14 0 Z" fill="#F3F4F6" />
                  <path d="M-45 -75 C-45 -125 45 -125 45 -75 C30 -66 -30 -66 -45 -75 Z" fill="url(#sporeGradient)" />
                  {/* Glowing Spore Dots */}
                  <circle cx="-18" cy="-95" r="5" fill="#F3E8FF" className="animate-pulse" />
                  <circle cx="18" cy="-92" r="4" fill="#F3E8FF" className="animate-pulse" />
                  <circle cx="0" cy="-110" r="6" fill="#FFFFFF" className="animate-pulse" />
                  <circle cx="-6" cy="-82" r="3.5" fill="#F3E8FF" />
                  <circle cx="8" cy="-80" r="3.5" fill="#F3E8FF" />
                </g>
                {/* Emitting floating spores (stardust circles moving up) */}
                <g className="animate-pulse-slow">
                  <circle cx="-35" cy="-130" r="3.5" fill="#D8B4FE" className="animate-twinkle-fast" />
                  <circle cx="35" cy="-140" r="2.5" fill="#E9D5FF" className="animate-twinkle-slow" />
                  <circle cx="0" cy="-155" r="4" fill="#FFFFFF" className="animate-twinkle-fast" />
                  <circle cx="-15" cy="-160" r="1.5" fill="#C084FC" className="animate-twinkle-slow" />
                  <circle cx="20" cy="-170" r="3" fill="#E9D5FF" className="animate-twinkle-fast" />
                </g>
              </g>
            )}
          </g>
        );

      default:
        return null;
    }
  };

  return (
    <div className={`relative w-full aspect-[4/3] rounded-3xl glass-panel theme-panel overflow-hidden flex flex-col items-center justify-center p-4 transition-all duration-700`}>
      {/* Background Star/Environment field */}
      <div className="absolute inset-0 z-0">
        <svg className="w-full h-full opacity-80" viewBox="0 0 400 300">
          {/* Succulent: Warm sunset valley, layers of green hills and clouds */}
          {plantType === 'succulent' && (
            <g>
              <defs>
                <linearGradient id="sunsetSky" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7C2D12" />
                  <stop offset="45%" stopColor="#D97706" />
                  <stop offset="80%" stopColor="#FEF08A" />
                  <stop offset="100%" stopColor="#ECFDF5" />
                </linearGradient>
                <linearGradient id="beamGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.45" />
                  <stop offset="100%" stopColor="#FEF08A" stopOpacity="0" />
                </linearGradient>
              </defs>
              <rect width="400" height="300" fill="url(#sunsetSky)" />
              {/* Sunbeams */}
              <g className="animate-warm-beams" opacity="0.3">
                <polygon points="30,-10 120,-10 200,310 80,310" fill="url(#beamGrad)" />
                <polygon points="180,-10 290,-10 350,310 200,310" fill="url(#beamGrad)" opacity="0.65" />
              </g>
              {/* Drifting Clouds */}
              <g opacity="0.4" className="animate-float-slow">
                <ellipse cx="60" cy="65" rx="30" ry="10" fill="#ffffff" />
                <ellipse cx="90" cy="70" rx="40" ry="12" fill="#ffffff" />
                <ellipse cx="320" cy="85" rx="35" ry="11" fill="#ffffff" />
              </g>
              {/* Sunset Mountain Silhouettes */}
              <path d="M-10 210 Q60 150 150 200 T 290 190 T 410 215 L410 300 L-10 300 Z" fill="#064E3B" opacity="0.35" />
              <path d="M-10 235 Q80 180 180 230 T 340 200 T 410 240 L410 300 L-10 300 Z" fill="#064E3B" opacity="0.6" />
              {/* Pollen Particles */}
              <circle cx="50" cy="110" r="1.5" fill="#FBBF24" className="animate-twinkle-slow" />
              <circle cx="130" cy="80" r="2" fill="#FBBF24" className="animate-twinkle-fast" style={{ animationDelay: '0.4s' }} />
              <circle cx="280" cy="120" r="1.5" fill="#FBBF24" className="animate-twinkle-slow" style={{ animationDelay: '1.2s' }} />
              <circle cx="330" cy="140" r="2" fill="#FBBF24" className="animate-twinkle-fast" style={{ animationDelay: '0.8s' }} />
            </g>
          )}

          {/* Fern: Pulsing cyber-zen grid lines & code sprites */}
          {plantType === 'fern' && (
            <g>
              <g className="animate-grid-pulse" stroke="#22D3EE" strokeWidth="0.5" opacity="0.2">
                <line x1="0" y1="40" x2="400" y2="40" />
                <line x1="0" y1="90" x2="400" y2="90" />
                <line x1="0" y1="140" x2="400" y2="140" />
                <line x1="0" y1="190" x2="400" y2="190" />
                <line x1="80" y1="0" x2="80" y2="300" strokeDasharray="2,4" />
                <line x1="160" y1="0" x2="160" y2="300" strokeDasharray="2,4" />
                <line x1="240" y1="0" x2="240" y2="300" strokeDasharray="2,4" />
                <line x1="320" y1="0" x2="320" y2="300" strokeDasharray="2,4" />
              </g>
              {/* Glow Sprites */}
              <circle cx="45" cy="50" r="1.5" fill="#06B6D4" className="animate-twinkle-slow" />
              <circle cx="120" cy="80" r="2" fill="#22D3EE" className="animate-twinkle-fast" style={{ animationDelay: '0.3s' }} />
              <circle cx="280" cy="40" r="1.5" fill="#06B6D4" className="animate-twinkle-slow" style={{ animationDelay: '0.7s' }} />
              <circle cx="340" cy="110" r="2" fill="#22D3EE" className="animate-twinkle-fast" style={{ animationDelay: '1.1s' }} />
            </g>
          )}

          {/* Spore: Twinkling cosmic star field, rotating planets & nebulae */}
          {plantType === 'spore' && (
            <g>
              <circle cx="45" cy="50" r="1" fill="#fff" className="animate-twinkle-slow" />
              <circle cx="120" cy="80" r="1.5" fill="#fff" className="animate-twinkle-fast" style={{ animationDelay: '0.3s' }} />
              <circle cx="280" cy="40" r="1" fill="#fff" className="animate-twinkle-slow" style={{ animationDelay: '0.7s' }} />
              <circle cx="340" cy="110" r="1.5" fill="#fff" className="animate-twinkle-fast" style={{ animationDelay: '1.1s' }} />
              <circle cx="80" cy="180" r="1" fill="#fff" className="animate-twinkle-slow" style={{ animationDelay: '1.5s' }} />
              <circle cx="320" cy="220" r="1" fill="#fff" className="animate-twinkle-fast" style={{ animationDelay: '0.5s' }} />
              {/* Rotating gas planet */}
              <g transform="translate(320, 60)" opacity="0.6">
                <circle cx="0" cy="0" r="14" fill="#6B21A8" />
                <ellipse cx="0" cy="0" rx="22" ry="5" fill="none" stroke="#D8B4FE" strokeWidth="2.5" transform="rotate(-15)" />
              </g>
              {/* Drifting Nebula Backing */}
              <ellipse cx="180" cy="100" rx="120" ry="60" fill="#7E22CE" opacity="0.15" filter="blur(20px)" />
            </g>
          )}
        </svg>
      </div>

      {/* Main interactive SVG stage */}
      <svg className="w-full h-full max-w-[340px] z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]" viewBox="0 0 400 300">
        {/* DECORATION: Gate upgrade */}
        {hasGate && (
          <g>
            {/* Succulent: Wooden Gazebo */}
            {plantType === 'succulent' && (
              <g transform="translate(200, 150)" className="opacity-95">
                {/* Back Pillars */}
                <rect x="-42" y="-10" width="4" height="100" fill="#78350F" />
                <rect x="38" y="-10" width="4" height="100" fill="#78350F" />
                {/* Roof */}
                <polygon points="-65,15 0,-25 65,15 50,20 0,-15 -50,20" fill="#B45309" />
                <polygon points="-50,0 0,-30 50,0" fill="#92400E" />
                {/* Front Pillars */}
                <rect x="-48" y="0" width="6" height="90" fill="#92400E" />
                <rect x="42" y="0" width="6" height="90" fill="#92400E" />
                <rect x="-52" y="85" width="14" height="6" fill="#78350F" />
                <rect x="38" y="85" width="14" height="6" fill="#78350F" />
              </g>
            )}

            {/* Fern: Cyber Hologram Gate */}
            {plantType === 'fern' && (
              <g transform="translate(200, 160)" className="opacity-90">
                <defs>
                  <linearGradient id="laserGrad" x1="0" y1="100%" x2="0" y2="0%">
                    <stop offset="0%" stopColor="#0891B2" stopOpacity="0.2" />
                    <stop offset="100%" stopColor="#22D3EE" stopOpacity="0.8" />
                  </linearGradient>
                </defs>
                {/* Holographic pillars */}
                <line x1="-55" y1="100" x2="-55" y2="10" stroke="#0891B2" strokeWidth="4" />
                <line x1="55" y1="100" x2="55" y2="10" stroke="#0891B2" strokeWidth="4" />
                {/* Base pads */}
                <rect x="-62" y="95" width="14" height="6" rx="2" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" />
                <rect x="48" y="95" width="14" height="6" rx="2" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" />
                {/* Laser Gateway beam */}
                <path d="M-55 10 A55 55 0 0 1 55 10" stroke="#22D3EE" strokeWidth="3" fill="none" className="animate-pulse" />
                <path d="M-55 10 A55 55 0 0 1 55 10" stroke="#22D3EE" strokeWidth="8" fill="none" opacity="0.2" className="animate-pulse-slow" />
                <path d="M-51 90 H51 L55 94 H-55 Z" fill="url(#laserGrad)" opacity="0.4" />
              </g>
            )}

            {/* Spore: Swirling Wormhole Portal */}
            {plantType === 'spore' && (
              <g transform="translate(200, 160)" className="opacity-80">
                <defs>
                  <radialGradient id="portalGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#C084FC" stopOpacity="0.8" />
                    <stop offset="60%" stopColor="#7E22CE" stopOpacity="0.4" />
                    <stop offset="90%" stopColor="#1E1B4B" stopOpacity="0.1" />
                    <stop offset="100%" stopColor="#1E1B4B" stopOpacity="0" />
                  </radialGradient>
                </defs>
                {/* Outer stone ring */}
                <ellipse cx="0" cy="30" rx="65" ry="65" fill="none" stroke="#4C1D95" strokeWidth="6" />
                <ellipse cx="0" cy="30" rx="65" ry="65" fill="none" stroke="#A855F7" strokeWidth="1.5" className="animate-pulse" />
                {/* Glowing portal center */}
                <ellipse cx="0" cy="30" rx="60" ry="60" fill="url(#portalGrad)" className="animate-spin-slow" />
                {/* Spore floaters */}
                <circle cx="-35" cy="15" r="2.5" fill="#E9D5FF" className="animate-twinkle-fast" />
                <circle cx="30" cy="-5" r="1.5" fill="#E9D5FF" className="animate-twinkle-slow" style={{ animationDelay: '0.5s' }} />
                <circle cx="20" cy="50" r="2" fill="#E9D5FF" className="animate-twinkle-fast" style={{ animationDelay: '1s' }} />
              </g>
            )}
          </g>
        )}

        {/* Floating Platform */}
        <g transform="translate(200, 240)">
          {/* Cozy Succulent: Mossy/Grassy Earth Mound */}
          {plantType === 'succulent' && (
            <g>
              <path d="M-80 0 C-70 30 -30 40 0 40 C30 40 70 30 80 0 C60 -8 -60 -8 -80 0 Z" fill="#451A03" />
              <path d="M-60 10 C-50 25 -20 30 0 30 C20 30 50 25 60 10 C45 6 -45 6 -60 10 Z" fill="#270F03" />
              <ellipse cx="0" cy="0" rx="85" ry="16" fill="#065F46" />
              <ellipse cx="0" cy="-2" rx="78" ry="12" fill="#047857" />
              <ellipse cx="0" cy="-4" rx="70" ry="8" fill="#10B981" />
              <ellipse cx="-35" cy="-4" rx="10" ry="2" fill="#34D399" opacity="0.6" />
              <ellipse cx="40" cy="-5" rx="8" ry="1.5" fill="#34D399" opacity="0.6" />
            </g>
          )}

          {/* Neon Fern: Cybernetic Glass Panel Platform */}
          {plantType === 'fern' && (
            <g>
              {/* Metallic dirt bottom support */}
              <path d="M-80 0 C-70 25 -30 35 0 35 C30 35 70 25 80 0 C60 -5 -60 -5 -80 0 Z" fill="#1E293B" stroke="#334155" strokeWidth="1" />
              <path d="M-60 10 C-50 20 -20 25 0 25 C20 25 50 20 60 10 C45 5 -45 5 -60 10 Z" fill="#0F172A" />
              {/* Glowing base ellipses */}
              <ellipse cx="0" cy="0" rx="85" ry="16" fill="#0F172A" stroke="#0891B2" strokeWidth="2" />
              <ellipse cx="0" cy="-2" rx="76" ry="11" fill="#1E293B" />
              <ellipse cx="0" cy="-4" rx="66" ry="7" fill="#0F172A" stroke="#06B6D4" strokeWidth="1" />
              {/* Circuit pulse lines */}
              <path d="M-55 -4 H55" stroke="#22D3EE" strokeWidth="1.5" opacity="0.7" className="animate-pulse" />
              <circle cx="-30" cy="-4" r="2.5" fill="#22D3EE" />
              <circle cx="30" cy="-4" r="2.5" fill="#22D3EE" />
            </g>
          )}

          {/* Cosmic Spore: Asteroid Rock Platform */}
          {plantType === 'spore' && (
            <g>
              {/* Deep space core support */}
              <path d="M-85 0 C-75 35 -35 45 0 45 C35 45 75 35 85 0 C65 -8 -65 -8 -85 0 Z" fill="#1E1B4B" />
              <path d="M-65 12 C-55 25 -20 32 0 32 C20 32 55 25 65 12 C45 6 -45 6 -65 12 Z" fill="#0F0E36" />
              {/* Glowing crystal layers */}
              <ellipse cx="0" cy="0" rx="85" ry="16" fill="#2E1065" />
              <ellipse cx="0" cy="-2" rx="78" ry="12" fill="#4C1D95" />
              <ellipse cx="0" cy="-4" rx="68" ry="7" fill="#7E22CE" />
              {/* Glowing geodes */}
              <circle cx="-45" cy="-3" r="3.5" fill="#C084FC" className="animate-pulse" />
              <circle cx="40" cy="-4" r="2.5" fill="#C084FC" className="animate-pulse" style={{ animationDelay: '0.7s' }} />
            </g>
          )}
        </g>

        {/* DECORATION: Themed Path */}
        {hasPath && (
          <g transform="translate(200, 240)">
            {/* Succulent: Pebble River Stones */}
            {plantType === 'succulent' && (
              <g>
                <ellipse cx="-35" cy="8" rx="8" ry="4" fill="#57534E" stroke="#44403C" strokeWidth="1" />
                <ellipse cx="-15" cy="12" rx="10" ry="5" fill="#78716C" stroke="#57534E" strokeWidth="1" />
                <ellipse cx="15" cy="13" rx="9" ry="4.5" fill="#57534E" stroke="#44403C" strokeWidth="1" />
                <ellipse cx="38" cy="9" rx="8" ry="3.5" fill="#78716C" stroke="#57534E" strokeWidth="1" />
                <ellipse cx="0" cy="15" rx="12" ry="6" fill="#44403C" stroke="#292524" strokeWidth="1" />
              </g>
            )}

            {/* Fern: Glowing Tech Grid Path */}
            {plantType === 'fern' && (
              <g opacity="0.9">
                <ellipse cx="-35" cy="8" rx="6" ry="3" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" />
                <ellipse cx="-15" cy="11" rx="8" ry="4" fill="#0F172A" stroke="#22D3EE" strokeWidth="1.5" className="animate-pulse" />
                <ellipse cx="15" cy="12" rx="7" ry="3.5" fill="#1E293B" stroke="#06B6D4" strokeWidth="1" />
                <ellipse cx="38" cy="9" rx="6" ry="3" fill="#0F172A" stroke="#22D3EE" strokeWidth="1" />
                <ellipse cx="0" cy="14" rx="9" ry="4.5" fill="#0F172A" stroke="#0891B2" strokeWidth="1.5" />
              </g>
            )}

            {/* Spore: Obsidian Shards Path */}
            {plantType === 'spore' && (
              <g>
                <polygon points="-40,5 -30,8 -35,11 -42,7" fill="#3B0764" stroke="#581C87" strokeWidth="0.5" />
                <polygon points="-20,8 -5,11 -12,14 -22,10" fill="#581C87" stroke="#7E22CE" strokeWidth="0.5" />
                <polygon points="5,10 20,8 15,13 8,12" fill="#3B0764" stroke="#581C87" strokeWidth="0.5" />
                <polygon points="30,6 42,9 35,11 31,8" fill="#581C87" stroke="#7E22CE" strokeWidth="0.5" />
                <polygon points="-10,13 10,14 2,18 -8,16" fill="#1E1B4B" stroke="#4C1D95" strokeWidth="1" />
              </g>
            )}
          </g>
        )}

        {/* The plant rendering remains procedural and beautiful */}
        {renderPlant()}

        {/* DECORATION: Themed Lantern */}
        {hasLantern && (
          <g>
            {/* Succulent: Terracotta Lamp */}
            {plantType === 'succulent' && (
              <g transform="translate(285, 205)" className="animate-float">
                <path d="M0 45 L0 5 A6 6 0 0 0 -6 -1" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <line x1="-6" y1="-1" x2="-6" y2="4" stroke="#451A03" strokeWidth="1.2" />
                {/* Clay Cap */}
                <path d="M-10 4 L-2 4 L-6 0 Z" fill="#92400E" stroke="#78350F" strokeWidth="0.8" />
                {/* Glass/Flame holder */}
                <rect x="-9" y="4" width="6" height="7" rx="1" fill="rgba(251, 191, 36, 0.2)" stroke="#78350F" strokeWidth="0.8" />
                <circle cx="-6" cy="7.5" r="2.5" fill="#F59E0B" className="animate-pulse" />
                <circle cx="-6" cy="7.5" r="12" fill="#FBBF24" opacity="0.2" className="animate-pulse-slow" />
              </g>
            )}

            {/* Fern: Floating Plasma Bulb */}
            {plantType === 'fern' && (
              <g transform="translate(285, 190)" className="animate-float-slow">
                {/* Tiny laser beam holding it */}
                <line x1="-3" y1="-10" x2="-3" y2="10" stroke="#22D3EE" strokeWidth="1" opacity="0.3" strokeDasharray="1,2" />
                {/* Plasma bulb body */}
                <circle cx="-3" cy="10" r="10" fill="none" stroke="#0891B2" strokeWidth="1" />
                <circle cx="-3" cy="10" r="9" fill="rgba(6, 182, 212, 0.15)" />
                {/* Core energy particle */}
                <circle cx="-3" cy="10" r="3.5" fill="#22D3EE" className="animate-pulse" />
                <circle cx="-3" cy="10" r="15" fill="#06B6D4" opacity="0.25" className="animate-pulse-slow" />
                {/* Orbit ring */}
                <ellipse cx="-3" cy="10" rx="14" ry="4" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.6" transform="rotate(20, -3, 10)" />
              </g>
            )}

            {/* Spore: Swirling Nebula Jar */}
            {plantType === 'spore' && (
              <g transform="translate(285, 205)" className="animate-float">
                {/* Hanger */}
                <path d="M0 45 L0 5 A6 6 0 0 0 -6 -1" stroke="#312E81" strokeWidth="2.5" fill="none" />
                <line x1="-6" y1="-1" x2="-6" y2="4" stroke="#1E1B4B" strokeWidth="1.2" />
                {/* Jar lid */}
                <rect x="-10" y="4" width="8" height="2.5" rx="1" fill="#4C1D95" />
                {/* Jar glass body */}
                <path d="M-9 6.5 H-3 V13.5 C-3 15 -9 15 -9 13.5 Z" fill="rgba(168, 85, 247, 0.15)" stroke="#4C1D95" strokeWidth="1" />
                {/* Swirling nebulae contents */}
                <circle cx="-6" cy="10" r="2.5" fill="#F472B6" className="animate-pulse" />
                <circle cx="-6" cy="10" r="11" fill="#A855F7" opacity="0.25" className="animate-pulse-slow" />
              </g>
            )}
          </g>
        )}

        {/* DECORATION: Themed Fireflies */}
        {hasFireflies && (
          <g>
            {/* Succulent: Golden Fireflies */}
            {plantType === 'succulent' && (
              <g>
                <circle cx="120" cy="180" r="2.5" fill="#FBBF24" className="animate-twinkle-fast" />
                <circle cx="120" cy="180" r="8" fill="#FBBF24" opacity="0.18" className="animate-pulse" />
                <circle cx="270" cy="140" r="4" fill="#FBBF24" className="animate-twinkle-slow" style={{ animationDelay: '0.8s' }} />
                <circle cx="270" cy="140" r="12" fill="#FBBF24" opacity="0.12" className="animate-pulse-slow" />
                <circle cx="160" cy="110" r="2" fill="#FBBF24" className="animate-twinkle-fast" style={{ animationDelay: '1.5s' }} />
                <circle cx="230" cy="170" r="3" fill="#FBBF24" className="animate-twinkle-slow" style={{ animationDelay: '0.4s' }} />
              </g>
            )}

            {/* Fern: Cyber light sprites */}
            {plantType === 'fern' && (
              <g>
                <circle cx="115" cy="170" r="3" fill="#22D3EE" className="animate-twinkle-fast" />
                <circle cx="115" cy="170" r="10" fill="#06B6D4" opacity="0.2" className="animate-pulse" />
                <circle cx="260" cy="150" r="4.5" fill="#22D3EE" className="animate-twinkle-slow" style={{ animationDelay: '0.9s' }} />
                <circle cx="260" cy="150" r="15" fill="#06B6D4" opacity="0.15" className="animate-pulse-slow" />
                <circle cx="170" cy="120" r="2.5" fill="#22D3EE" className="animate-twinkle-fast" style={{ animationDelay: '1.4s' }} />
                <circle cx="220" cy="180" r="3.5" fill="#22D3EE" className="animate-twinkle-slow" style={{ animationDelay: '0.3s' }} />
              </g>
            )}

            {/* Spore: Soft Space Nebulae Clouds */}
            {plantType === 'spore' && (
              <g>
                {/* Nebula 1 */}
                <g transform="translate(130, 160)" className="animate-float" opacity="0.5">
                  <ellipse cx="0" cy="0" rx="22" ry="12" fill="#A855F7" opacity="0.2" filter="blur(2px)" />
                  <ellipse cx="-4" cy="2" rx="14" ry="7" fill="#F472B6" opacity="0.15" filter="blur(1.5px)" />
                  <circle cx="2" cy="-2" r="1.5" fill="#FFFFFF" className="animate-twinkle-fast" />
                </g>
                {/* Nebula 2 */}
                <g transform="translate(260, 130)" className="animate-float-slow" style={{ animationDelay: '2s' }} opacity="0.5">
                  <ellipse cx="0" cy="0" rx="30" ry="15" fill="#7E22CE" opacity="0.15" filter="blur(2px)" />
                  <ellipse cx="6" cy="-3" rx="18" ry="9" fill="#EC4899" opacity="0.15" filter="blur(2px)" />
                  <circle cx="-3" cy="2" r="1.5" fill="#FFFFFF" className="animate-twinkle-slow" />
                </g>
                {/* Spark particles */}
                <circle cx="160" cy="100" r="2" fill="#E9D5FF" className="animate-twinkle-fast" style={{ animationDelay: '1.2s' }} />
                <circle cx="210" cy="190" r="2.5" fill="#E9D5FF" className="animate-twinkle-slow" style={{ animationDelay: '0.6s' }} />
              </g>
            )}
          </g>
        )}

        {/* Daily Surprises Rendering */}
        {/* Succulent Daily Surprises */}
        {plantType === 'succulent' && ambientSurprise === 'butterfly' && (
          <g transform="translate(100, 80)" className="animate-float">
            <ellipse cx="-4" cy="0" rx="5" ry="3" fill="#F97316" />
            <ellipse cx="4" cy="0" rx="5" ry="3" fill="#F97316" />
            <ellipse cx="0" cy="0" rx="1.2" ry="4" fill="#1E293B" />
          </g>
        )}
        {plantType === 'succulent' && ambientSurprise === 'flower' && (
          <g transform="translate(130, 230)" className="animate-pulse">
            <circle cx="0" cy="0" r="5" fill="#EC4899" />
            <circle cx="-4" cy="-4" r="3" fill="#F472B6" />
            <circle cx="4" cy="-4" r="3" fill="#F472B6" />
            <circle cx="-4" cy="4" r="3" fill="#F472B6" />
            <circle cx="4" cy="4" r="3" fill="#F472B6" />
            <circle cx="0" cy="0" r="1.5" fill="#FBBF24" />
          </g>
        )}
        {plantType === 'succulent' && ambientSurprise === 'squirrel' && (
          <g transform="translate(110, 225)" className="animate-float-slow">
            <path d="M -10 15 Q -20 0 -12 -10 Q -5 -5 -8 10 Z" fill="#78350F" />
            <ellipse cx="0" cy="10" rx="6" ry="10" fill="#92400E" />
            <circle cx="2" cy="0" r="5" fill="#92400E" />
            <circle cx="4" cy="-1" r="1" fill="#fff" />
            <polygon points="0,-3 3,-7 4,-3" fill="#78350F" />
          </g>
        )}

        {/* Fern Daily Surprises */}
        {plantType === 'fern' && ambientSurprise === 'pulse' && (
          <g transform="translate(200, 240)" className="animate-pulse">
            <ellipse cx="0" cy="0" rx="95" ry="20" fill="none" stroke="#22D3EE" strokeWidth="2.5" opacity="0.8" />
            <ellipse cx="0" cy="0" rx="110" ry="25" fill="none" stroke="#22D3EE" strokeWidth="1" opacity="0.4" />
          </g>
        )}
        {plantType === 'fern' && ambientSurprise === 'shard' && (
          <g transform="translate(290, 215)" className="animate-float">
            <polygon points="0,-12 6,0 0,12 -6,0" fill="#22D3EE" />
            <polygon points="0,-12 3,0 0,12 -3,0" fill="#E0F7FA" opacity="0.7" />
            <circle cx="0" cy="0" r="10" fill="#22D3EE" opacity="0.3" className="animate-pulse" />
          </g>
        )}
        {plantType === 'fern' && ambientSurprise === 'glow' && (
          <g className="animate-pulse-slow">
            <circle cx="150" cy="80" r="6" fill="#06B6D4" opacity="0.25" />
            <circle cx="250" cy="60" r="8" fill="#06B6D4" opacity="0.2" />
            <circle cx="180" cy="120" r="5" fill="#22D3EE" opacity="0.25" />
          </g>
        )}

        {/* Spore Daily Surprises */}
        {plantType === 'spore' && ambientSurprise === 'comet' && (
          <g>
            <defs>
              <linearGradient id="cometGrad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
                <stop offset="40%" stopColor="#F59E0B" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#F59E0B" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M 20 20 L 120 120" stroke="url(#cometGrad)" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="120" cy="120" r="2.5" fill="#FFFFFF" />
            <circle cx="120" cy="120" r="8" fill="#FFFFFF" opacity="0.3" className="animate-pulse" />
          </g>
        )}
        {plantType === 'spore' && ambientSurprise === 'sprite' && (
          <g transform="translate(100, 70)" className="animate-float">
            <polygon points="0,-7 2,-2 7,-2 3,1 5,6 0,3 -5,6 -3,1 -7,-2 -2,-2" fill="#E9D5FF" />
            <circle cx="0" cy="0" r="12" fill="#C084FC" opacity="0.25" className="animate-pulse" />
          </g>
        )}
        {plantType === 'spore' && ambientSurprise === 'constellation' && (
          <g stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.8" fill="none">
            <polyline points="280,40 320,30 350,60 330,90" />
            <circle cx="280" cy="40" r="2.5" fill="#fff" className="animate-pulse" />
            <circle cx="320" cy="30" r="3" fill="#fff" className="animate-pulse" />
            <circle cx="350" cy="60" r="2" fill="#fff" className="animate-pulse" />
            <circle cx="330" cy="90" r="3" fill="#fff" className="animate-pulse" />
          </g>
        )}

        {/* Fallback surprise insect moth */}
        {ambientSurprise === 'moth' && (
          <g transform="translate(110, 130)" className="animate-float">
            <ellipse cx="-4" cy="0" rx="5" ry="3.5" fill="#22D3EE" opacity="0.8" className="animate-pulse" />
            <ellipse cx="4" cy="0" rx="5" ry="3.5" fill="#22D3EE" opacity="0.8" className="animate-pulse" />
            <ellipse cx="0" cy="0" rx="1.5" ry="4" fill="#F8FAFC" />
            <line x1="0" y1="-4" x2="-2" y2="-8" stroke="#F8FAFC" strokeWidth="0.8" />
            <line x1="0" y1="-4" x2="2" y2="-8" stroke="#F8FAFC" strokeWidth="0.8" />
            <circle cx="0" cy="0" r="12" fill="#22D3EE" opacity="0.12" className="animate-pulse-slow" />
          </g>
        )}
      </svg>

      {/* Floating Info Stats bar */}
      <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-center bg-slate-900/80 backdrop-blur-md px-4 py-2.5 rounded-2xl border border-white/5 shadow-md theme-panel">
        <div className="flex items-center space-x-2">
          <div className={`p-1.5 rounded-lg bg-white/5 ${stage.color} theme-accent-text`}>
            <Sprout className="w-4 h-4" />
          </div>
          <div>
            <div className="text-[10px] text-slate-400 font-medium leading-none">Growth Level</div>
            <div className="text-sm font-display font-semibold text-slate-100">{stage.name}</div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="text-right">
            <span className="text-sm font-bold theme-accent-text font-display">{growth}%</span>
          </div>
          {/* Growth bar container */}
          <div className="w-16 h-2 bg-slate-800 rounded-full overflow-hidden border border-white/5">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 theme-accent-bg transition-all duration-700 rounded-full"
              style={{ width: `${growth}%`, backgroundImage: plantType === 'fern' ? 'linear-gradient(to right, #0891B2, #22D3EE)' : plantType === 'spore' ? 'linear-gradient(to right, #7E22CE, #C084FC)' : undefined }}
            />
          </div>
        </div>
      </div>

      {/* Empty Garden Help State */}
      {growth === 0 && (
        <div className="absolute bottom-4 left-4 right-4 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-white/5 flex items-center space-x-2.5 theme-panel">
          <Award className="w-5 h-5 theme-accent-text flex-shrink-0 animate-bounce" />
          <p className="text-xs text-slate-300 leading-tight">
            Log your stress level below to trigger initial growth! (+10% Growth)
          </p>
        </div>
      )}
    </div>
  );
}
