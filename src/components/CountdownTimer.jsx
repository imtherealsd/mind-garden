import { useState, useEffect } from 'react';
import { Timer, CheckCircle } from 'lucide-react';

export function CountdownTimer({ loggedValue }) {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
      setSecondsLeft(diff);
      
      if (diff <= 0) {
        // Force page reload or parent state reset if countdown hits zero
        clearInterval(interval);
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format seconds into HH:MM:SS
  const formatTime = (totalSec) => {
    const hours = Math.floor(totalSec / 3600);
    const minutes = Math.floor((totalSec % 3600) / 60);
    const seconds = totalSec % 60;

    const pad = (n) => (n < 10 ? `0${n}` : n);
    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  };

  const getLogDetails = (val) => {
    if (val <= 2) return { emoji: '😌', text: 'Calmness' };
    if (val <= 4) return { emoji: '🙂', text: 'Tension' };
    if (val <= 6) return { emoji: '😐', text: 'Moderate Stress' };
    if (val <= 8) return { emoji: '😫', text: 'High Stress' };
    return { emoji: '🌋', text: 'Overload' };
  };

  const details = getLogDetails(loggedValue);

  return (
    <div className="flex flex-col space-y-5">
      {/* Hydrated Success Card */}
      <div className="p-5 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] glass-panel flex flex-col items-center text-center">
        <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-3.5 animate-pulse">
          <CheckCircle className="w-6 h-6" />
        </div>
        <h3 className="font-display font-semibold text-base text-slate-100">
          Garden watered for today!
        </h3>
        <p className="text-xs text-slate-400 mt-1.5 max-w-xs leading-relaxed">
          You logged a stress level of <strong className="text-emerald-400">{loggedValue}/10</strong> ({details.emoji} {details.text}) and fed your plant. Come back tomorrow to record another day.
        </p>
      </div>

      {/* Countdown Panel */}
      <div className="bg-slate-900/60 p-5 rounded-2xl border border-white/5 flex flex-col items-center text-center space-y-3">
        <div className="flex items-center space-x-2 text-xs text-slate-400 font-medium">
          <Timer className="w-4 h-4 text-garden-gold" />
          <span>New check-in resets in</span>
        </div>
        
        <div className="text-4xl font-display font-bold text-garden-gold tracking-widest tabular-nums animate-pulse-slow">
          {formatTime(secondsLeft)}
        </div>

        <div className="text-[10px] text-slate-500 max-w-[240px] leading-relaxed">
          One daily water ensures your plant grows slowly and steadily, mirroring healthy stress recovery habits.
        </div>
      </div>
    </div>
  );
}
