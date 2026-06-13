import { useState, useEffect, useRef } from 'react';
import { Play, RotateCcw, Sparkles, Wind, CircleDot, Droplet, Zap, Infinity as InfinityIcon } from 'lucide-react';

export function BreathingMiniGame({ onComplete, plantType }) {
  const [gameState, setGameState] = useState('idle'); // 'idle' | 'breathing' | 'completed'
  const [timeLeft, setTimeLeft] = useState(60);
  const [cycleSeconds, setCycleSeconds] = useState(0);
  
  const timerRef = useRef(null);

  // Get configuration based on plantType
  const getGameConfig = () => {
    if (plantType === 'succulent') {
      return {
        title: 'Deep Grounding Box Breath',
        description: 'Anchor your energy. Follow the stable box pattern: 4s Inhale, 4s Hold, 4s Exhale.',
        currencyName: 'Dewdrop Essence',
        currencySymbol: '💧',
        cycleLength: 12,
        buttonClass: 'from-emerald-500 to-teal-500 shadow-emerald-500/20 text-slate-900',
        cardBg: 'border-emerald-500/20 bg-emerald-500/5',
        icon: <Droplet className="w-10 h-10 text-emerald-400" />
      };
    }
    if (plantType === 'fern') {
      return {
        title: 'Bioluminescent Flow Breath',
        description: 'Sync your heartbeat. Follow the energizing flow pattern: 3s Inhale, 2s Hold, 3s Exhale.',
        currencyName: 'Lumen Essence',
        currencySymbol: '⚡',
        cycleLength: 8,
        buttonClass: 'from-cyan-500 to-blue-500 shadow-cyan-500/20 text-slate-950',
        cardBg: 'border-cyan-500/20 bg-cyan-500/5',
        icon: <Zap className="w-10 h-10 text-cyan-400" />
      };
    }
    if (plantType === 'spore') {
      return {
        title: 'Celestial Void Expansion',
        description: 'Dissolve stress into space. Follow the cosmic transmutative pattern: 5s Inhale, 5s Hold, 5s Exhale.',
        currencyName: 'Starlight Essence',
        currencySymbol: '⭐',
        cycleLength: 15,
        buttonClass: 'from-purple-500 to-pink-500 shadow-purple-500/20 text-slate-100',
        cardBg: 'border-purple-500/20 bg-purple-500/5',
        icon: <InfinityIcon className="w-10 h-10 text-purple-400" />
      };
    }
    return {
      title: 'Breathe Space',
      description: 'Calm your nervous system with a 60-second guided breathing pattern.',
      currencyName: 'Essence',
      currencySymbol: '★',
      cycleLength: 12,
      buttonClass: 'from-cyan-500 to-blue-500 shadow-cyan-500/20 text-slate-900',
      cardBg: 'border-white/5 bg-slate-900/40',
      icon: <Wind className="w-10 h-10 text-cyan-400" />
    };
  };

  const config = getGameConfig();

  // Determine breathing phase details based on cycleSeconds and plantType
  const getPhaseInfo = (sec) => {
    if (plantType === 'succulent') {
      if (sec < 4) {
        return {
          text: 'Inhale stability...',
          class: 'scale-[1.6] bg-emerald-500/20 border-emerald-400 shadow-emerald-500/30',
          textColor: 'text-emerald-400',
          icon: '🌱',
          phaseName: 'Inhale'
        };
      }
      if (sec < 8) {
        return {
          text: 'Hold in stillness...',
          class: 'scale-[1.6] bg-amber-500/20 border-amber-400 shadow-amber-500/30',
          textColor: 'text-amber-400',
          icon: '🧘',
          phaseName: 'Hold'
        };
      }
      return {
        text: 'Release tension...',
        class: 'scale-[1.0] bg-teal-500/20 border-teal-400 shadow-teal-500/30',
        textColor: 'text-teal-400',
        icon: '🍃',
        phaseName: 'Exhale'
      };
    }
    if (plantType === 'fern') {
      if (sec < 3) {
        return {
          text: 'Draw in energy...',
          class: 'scale-[1.6] bg-cyan-500/20 border-cyan-400 shadow-cyan-500/30',
          textColor: 'text-cyan-400',
          icon: '⚡',
          phaseName: 'Inhale'
        };
      }
      if (sec < 5) {
        return {
          text: 'Let the charge settle...',
          class: 'scale-[1.6] bg-blue-500/20 border-blue-400 shadow-blue-500/30',
          textColor: 'text-blue-400',
          icon: '🌀',
          phaseName: 'Hold'
        };
      }
      return {
        text: 'Pulse outward...',
        class: 'scale-[1.0] bg-indigo-500/20 border-indigo-400 shadow-indigo-500/30',
        textColor: 'text-indigo-400',
        icon: '🌊',
        phaseName: 'Exhale'
      };
    }
    if (plantType === 'spore') {
      if (sec < 5) {
        return {
          text: 'Absorb cosmic stardust...',
          class: 'scale-[1.7] bg-purple-500/20 border-purple-400 shadow-purple-500/30',
          textColor: 'text-purple-400',
          icon: '🌌',
          phaseName: 'Inhale'
        };
      }
      if (sec < 10) {
        return {
          text: 'Transmute in deep void...',
          class: 'scale-[1.7] bg-pink-500/20 border-pink-400 shadow-pink-500/30',
          textColor: 'text-pink-400',
          icon: '☄️',
          phaseName: 'Hold'
        };
      }
      return {
        text: 'Release starlight spores...',
        class: 'scale-[1.0] bg-indigo-500/20 border-indigo-400 shadow-indigo-500/30',
        textColor: 'text-indigo-400',
        icon: '🔮',
        phaseName: 'Exhale'
      };
    }

    // Default template fallbacks
    if (sec < 4) {
      return {
        text: 'Inhale Deeply',
        class: 'scale-[1.7] bg-cyan-500/20 border-cyan-400 shadow-cyan-500/30',
        textColor: 'text-cyan-400',
        icon: '💨',
        phaseName: 'Inhale'
      };
    }
    if (sec < 8) {
      return {
        text: 'Hold... Let it settle',
        class: 'scale-[1.7] bg-purple-500/20 border-purple-400 shadow-purple-500/30',
        textColor: 'text-purple-400',
        icon: '🧘',
        phaseName: 'Hold'
      };
    }
    return {
      text: 'Exhale Slowly',
      class: 'scale-[1.0] bg-emerald-500/20 border-emerald-400 shadow-emerald-500/30',
      textColor: 'text-emerald-400',
      icon: '🌬️',
      phaseName: 'Exhale'
    };
  };

  const phase = getPhaseInfo(cycleSeconds);

  // Start breathing game
  const startGame = () => {
    setGameState('breathing');
    setTimeLeft(60);
    setCycleSeconds(0);
  };

  // Stop / Reset game
  const resetGame = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setGameState('idle');
    setTimeLeft(60);
    setCycleSeconds(0);
  };

  useEffect(() => {
    if (gameState === 'breathing') {
      timerRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setGameState('completed');
            return 0;
          }
          return prev - 1;
        });

        setCycleSeconds((prev) => (prev + 1) % config.cycleLength);
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, config.cycleLength]);

  const handleClaim = () => {
    onComplete(15); // Award 15 Essence
    setGameState('idle');
    setTimeLeft(60);
    setCycleSeconds(0);
  };

  // Calculate inner progress dot indices based on active phase
  const getProgressDots = () => {
    let dotCount = 4;
    let phaseSec = 0;
    
    if (plantType === 'succulent') {
      dotCount = 4;
      phaseSec = cycleSeconds % 4;
    } else if (plantType === 'fern') {
      if (phase.phaseName === 'Inhale') {
        dotCount = 3;
        phaseSec = cycleSeconds % 3;
      } else if (phase.phaseName === 'Hold') {
        dotCount = 2;
        phaseSec = (cycleSeconds - 3) % 2;
      } else {
        dotCount = 3;
        phaseSec = (cycleSeconds - 5) % 3;
      }
    } else if (plantType === 'spore') {
      dotCount = 5;
      phaseSec = cycleSeconds % 5;
    }

    return Array.from({ length: dotCount }).map((_, i) => ({
      key: i,
      active: i <= phaseSec
    }));
  };

  return (
    <div className="flex flex-col space-y-6 flex-1 justify-center py-4">
      {gameState === 'idle' && (
        <div className="text-center space-y-6">
          <div className="inline-flex p-4 rounded-full bg-white/5 border border-white/5 animate-float">
            {config.icon}
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white tracking-tight">
              {config.title}
            </h2>
            <p className="text-xs text-slate-400 max-w-[280px] mx-auto mt-2 leading-relaxed">
              {config.description}
            </p>
          </div>

          <div className={`p-4 rounded-2xl border ${config.cardBg} max-w-xs mx-auto text-left space-y-2.5`}>
            <div className="flex items-center text-xs text-slate-300">
              <span className="w-5 text-center mr-2">⏱️</span>
              <span>Duration: <strong>60 seconds</strong></span>
            </div>
            <div className="flex items-center text-xs text-slate-300">
              <span className="w-5 text-center mr-2">{config.currencySymbol}</span>
              <span>Reward: <strong>+15 {config.currencyName}</strong></span>
            </div>
          </div>

          <button
            onClick={startGame}
            className={`w-full max-w-xs h-14 bg-gradient-to-r ${config.buttonClass} font-display font-bold text-sm rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center space-x-2 mx-auto touch-manipulation`}
          >
            <Play className="w-4.5 h-4.5 fill-current" />
            <span>Start Guided Session</span>
          </button>
        </div>
      )}

      {gameState === 'breathing' && (
        <div className="flex flex-col items-center justify-between flex-1 py-4 space-y-8">
          {/* Header timer */}
          <div className="text-center">
            <div className="text-4xl font-display font-bold text-white tracking-widest">
              0:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
            </div>
            <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wider">
              Remaining time
            </p>
          </div>

          {/* Breathing bubble visual */}
          <div className="relative w-72 h-72 flex items-center justify-center">
            {/* outer ripple circles */}
            <div className={`absolute w-48 h-48 rounded-full border-2 border-dashed transition-all duration-1000 ${phase.class} opacity-30 animate-spin-slow`} />
            
            {/* main bubble */}
            <div
              className={`w-40 h-40 rounded-full border-4 flex flex-col items-center justify-center transition-all duration-[1000ms] ease-in-out ${phase.class} relative`}
            >
              <span className="text-4xl mb-1 leading-none select-none">{phase.icon}</span>
              <span className={`text-[10px] font-bold uppercase tracking-widest ${phase.textColor}`}>
                {phase.phaseName}
              </span>

              {/* Progress dots inside */}
              <div className="absolute bottom-6 flex space-x-1">
                {getProgressDots().map((dot) => (
                  <div
                    key={dot.key}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      dot.active ? 'bg-white scale-125' : 'bg-white/20'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Action guidance and reset button */}
          <div className="text-center space-y-5 w-full">
            <h3 className={`text-base font-display font-semibold transition-all duration-500 ${phase.textColor}`}>
              {phase.text}
            </h3>

            <button
              onClick={resetGame}
              className="w-11 h-11 bg-white/5 border border-white/10 text-slate-400 hover:text-white rounded-full flex items-center justify-center mx-auto active:scale-90 transition-all touch-manipulation"
              title="Reset session"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {gameState === 'completed' && (
        <div className="text-center space-y-6 py-6">
          <div className="inline-flex p-4 rounded-full bg-emerald-500/10 text-emerald-400 animate-bounce">
            <CircleDot className="w-10 h-10" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white tracking-tight">
              Session Complete!
            </h2>
            <p className="text-xs text-slate-400 max-w-[280px] mx-auto mt-2 leading-relaxed">
              Wonderful. You completed your 60-second breathing cycle. You are more aligned, and your plant flourishes.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-emerald-500/20 max-w-xs mx-auto text-center space-y-1">
            <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Essence Reward Claimable</div>
            <div className="flex items-center justify-center space-x-1 text-garden-gold">
              <Sparkles className="w-5 h-5 fill-current animate-pulse" />
              <span className="text-2xl font-display font-black">+15 {config.currencySymbol}</span>
            </div>
          </div>

          <button
            onClick={handleClaim}
            className={`w-full max-w-xs h-14 bg-gradient-to-r ${config.buttonClass} font-display font-bold text-sm rounded-2xl shadow-lg active:scale-[0.98] transition-all flex items-center justify-center space-x-2 mx-auto touch-manipulation`}
          >
            <span>Claim & Return to Garden</span>
          </button>
        </div>
      )}
    </div>
  );
}

