import { useState, useEffect } from 'react';
import { Timer, CheckCircle, CloudRain, Sparkles, Video, Crown } from 'lucide-react';
import { adService } from '../utils/adService';

export function CountdownTimer({ loggedValue, onWaterBoost, isPlusMember, growth = 0 }) {
  const [secondsLeft, setSecondsLeft] = useState(() => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
  });
  const [isBoosting, setIsBoosting] = useState(false);
  const [boostSuccess, setBoostSuccess] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      const diff = Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
      setSecondsLeft(diff);
      
      if (diff <= 0) {
        clearInterval(interval);
        window.location.reload();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSummonRain = async () => {
    setIsBoosting(true);
    setBoostSuccess('');

    try {
      const res = await adService.showRewardedAd({
        isPlus: isPlusMember,
        onReward: () => {
          if (onWaterBoost) onWaterBoost(5);
          setBoostSuccess('🌧️ Gentle rain nourished your garden (+5% Growth)!');
        }
      });
      if (res.success && !boostSuccess) {
        if (onWaterBoost) onWaterBoost(5);
        setBoostSuccess('🌧️ Gentle rain nourished your garden (+5% Growth)!');
      }
    } catch (e) {
      console.warn('Rain boost error:', e);
    } finally {
      setIsBoosting(false);
      setTimeout(() => setBoostSuccess(''), 3500);
    }
  };

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
    <div className="flex flex-col space-y-4">
      {/* Hydrated Success Card */}
      <div className="p-4 rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.03] glass-panel flex flex-col items-center text-center">
        <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-2.5 animate-pulse">
          <CheckCircle className="w-5 h-5" />
        </div>
        <h3 className="font-display font-semibold text-sm text-slate-100">
          Garden watered for today!
        </h3>
        <p className="text-[11px] text-slate-400 mt-1 max-w-xs leading-relaxed">
          You logged a level of <strong className="text-emerald-400">{loggedValue}/10</strong> ({details.emoji} {details.text}) and nourished your plant.
        </p>
      </div>

      {/* Optional Mid-Day Growth Rain Boost (Rewarded Ad or VIP Instant) */}
      {growth < 100 && (
        <div className="p-3.5 rounded-2xl border border-cyan-500/20 bg-cyan-500/[0.04] flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/15 text-cyan-400 shrink-0">
              <CloudRain className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-white">Summon Rain Shower</span>
                <span className="text-[9px] font-bold text-cyan-300 bg-cyan-500/20 px-1.5 py-0.2 rounded font-mono">
                  +5% Growth
                </span>
              </div>
              <p className="text-[10px] text-slate-400 mt-0.5">
                {isPlusMember ? '👑 VIP Perk: Instant rain shower.' : 'Watch a calm sponsor video to accelerate plant growth.'}
              </p>
            </div>
          </div>

          <button
            onClick={handleSummonRain}
            disabled={isBoosting}
            className="ml-2 px-3 py-1.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 font-display font-bold text-xs shrink-0 shadow-md shadow-cyan-500/20 active:scale-95 transition-all cursor-pointer flex items-center space-x-1"
          >
            {isBoosting ? (
              <span className="animate-spin text-xs">🌀</span>
            ) : isPlusMember ? (
              <>
                <Crown className="w-3 h-3 text-slate-950" />
                <span>Rain</span>
              </>
            ) : (
              <>
                <Video className="w-3 h-3 text-slate-950" />
                <span>Rain</span>
              </>
            )}
          </button>
        </div>
      )}

      {boostSuccess && (
        <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs text-center font-bold animate-in fade-in">
          {boostSuccess}
        </div>
      )}

      {/* Countdown Panel */}
      <div className="bg-slate-900/60 p-4 rounded-2xl border border-white/5 flex flex-col items-center text-center space-y-2">
        <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
          <Timer className="w-3.5 h-3.5 text-garden-gold" />
          <span>New check-in resets in</span>
        </div>
        
        <div className="text-3xl font-display font-bold text-garden-gold tracking-widest tabular-nums animate-pulse-slow">
          {formatTime(secondsLeft)}
        </div>

        <div className="text-[10px] text-slate-500 max-w-[240px] leading-relaxed">
          Steady daily watering builds lasting mindfulness habits and helps your garden flourish.
        </div>
      </div>
    </div>
  );
}
