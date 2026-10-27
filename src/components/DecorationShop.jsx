import { useState } from 'react';
import { Sparkles, Lock, Flame, Footprints, DoorOpen, Gift, Crown, Video, Check } from 'lucide-react';
import { adService } from '../utils/adService';

export function DecorationShop({
  essence,
  unlockedDecorations = [],
  activeDecorations = [],
  onUnlock,
  onToggle,
  plantType,
  isPlusMember,
  onClaimBlessing,
  onOpenSubscriptionModal
}) {
  const [isAdLoading, setIsAdLoading] = useState(false);
  const [adSuccessMsg, setAdSuccessMsg] = useState('');

  // Get currency info
  const getCurrencyInfo = () => {
    if (plantType === 'succulent') {
      return {
        name: 'Dewdrops',
        symbol: '💧',
        textClass: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20'
      };
    }
    if (plantType === 'fern') {
      return {
        name: 'Lumens',
        symbol: '⚡',
        textClass: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/20'
      };
    }
    if (plantType === 'spore') {
      return {
        name: 'Starlight',
        symbol: '⭐',
        textClass: 'text-purple-400 bg-purple-500/10 border-purple-500/20'
      };
    }
    return {
      name: 'Essence',
      symbol: '★',
      textClass: 'text-garden-gold bg-garden-gold/10 border-garden-gold/20'
    };
  };

  const currency = getCurrencyInfo();

  // Handle Zen Blessing Rewarded Ad
  const handleWatchAdBlessing = async () => {
    setIsAdLoading(true);
    setAdSuccessMsg('');

    try {
      const res = await adService.showRewardedAd({
        isPlus: isPlusMember,
        onReward: () => {
          const awarded = onClaimBlessing ? onClaimBlessing(15) : 15;
          setAdSuccessMsg(`✨ Received +${awarded} ${currency.name}!`);
        }
      });
      if (res.success && !adSuccessMsg) {
        const awarded = onClaimBlessing ? onClaimBlessing(15) : 15;
        setAdSuccessMsg(`✨ Received +${awarded} ${currency.name}!`);
      }
    } catch (e) {
      console.warn('Ad blessing error:', e);
    } finally {
      setIsAdLoading(false);
      setTimeout(() => setAdSuccessMsg(''), 3000);
    }
  };

  // Create plant-specific shop items
  const getShopItems = () => {
    if (plantType === 'succulent') {
      return [
        {
          id: 'path',
          name: 'Pebble Path',
          cost: 10,
          description: 'A winding pathway made of river pebbles that guides steps through your garden.',
          icon: Footprints,
          color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5',
          glow: 'shadow-emerald-500/10'
        },
        {
          id: 'lantern',
          name: 'Terracotta Lamp',
          cost: 20,
          description: 'A rustic clay lamp that glows with a warm, steady protective candlelight.',
          icon: Flame,
          color: 'text-amber-500 border-amber-500/20 bg-amber-500/5',
          glow: 'shadow-amber-500/10'
        },
        {
          id: 'fireflies',
          name: 'Warm Fireflies',
          cost: 30,
          description: 'Glowing golden fireflies hovering around your succulent, dancing in the air.',
          icon: Sparkles,
          color: 'text-yellow-400 border-yellow-500/20 bg-yellow-500/5',
          glow: 'shadow-yellow-500/10'
        },
        {
          id: 'gate',
          name: 'Wooden Gazebo',
          cost: 50,
          description: 'A cozy wooden gazebo built for peaceful reflection and mental rest.',
          icon: DoorOpen,
          color: 'text-teal-400 border-teal-500/20 bg-teal-500/5',
          glow: 'shadow-teal-500/10',
          vipOnly: true
        }
      ];
    }
    if (plantType === 'fern') {
      return [
        {
          id: 'path',
          name: 'Neon Stones',
          cost: 10,
          description: 'A path of electric glowing crystals that pulsing at Zen resonance.',
          icon: Footprints,
          color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
          glow: 'shadow-cyan-500/10'
        },
        {
          id: 'lantern',
          name: 'Pulse Lantern',
          cost: 20,
          description: 'A floating plasma sphere emitting pulsing cyan bioluminescent energy.',
          icon: Flame,
          color: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5',
          glow: 'shadow-cyan-500/10'
        },
        {
          id: 'fireflies',
          name: 'Biolum Sprites',
          cost: 30,
          description: 'Cybernetic light sprites dancing in sync with your breathing frequency.',
          icon: Sparkles,
          color: 'text-teal-400 border-teal-500/20 bg-teal-500/5',
          glow: 'shadow-teal-500/10'
        },
        {
          id: 'gate',
          name: 'Cyber Archway',
          cost: 50,
          description: 'A sleek holographic energy arch that feeds on digital zen waves.',
          icon: DoorOpen,
          color: 'text-blue-400 border-blue-500/20 bg-blue-500/5',
          glow: 'shadow-blue-500/10',
          vipOnly: true
        }
      ];
    }
    if (plantType === 'spore') {
      return [
        {
          id: 'path',
          name: 'Obsidian Shards',
          cost: 10,
          description: 'Swirling black shards of obsidian stone that capture passing cosmic stardust.',
          icon: Footprints,
          color: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
          glow: 'shadow-purple-500/10'
        },
        {
          id: 'lantern',
          name: 'Nebula Candle',
          cost: 20,
          description: 'A jar of rotating interstellar galaxy dust glowing in UV spectrums.',
          icon: Flame,
          color: 'text-pink-400 border-pink-500/20 bg-pink-500/5',
          glow: 'shadow-pink-500/10'
        },
        {
          id: 'fireflies',
          name: 'Swirling Nebula',
          cost: 30,
          description: 'Drifting space dust clouds that hover like magical auroras around your spore.',
          icon: Sparkles,
          color: 'text-fuchsia-400 border-fuchsia-500/20 bg-fuchsia-500/5',
          glow: 'shadow-fuchsia-500/10'
        },
        {
          id: 'gate',
          name: 'Wormhole Portal',
          cost: 50,
          description: 'An ancient stargate bridging your mind to deep cosmic dimensions.',
          icon: DoorOpen,
          color: 'text-purple-400 border-purple-500/20 bg-purple-500/5',
          glow: 'shadow-purple-500/10',
          vipOnly: true
        }
      ];
    }
    return [];
  };

  const shopItems = getShopItems();

  return (
    <div className="flex flex-col space-y-5">
      {/* Header with Essence Balance */}
      <div className="flex justify-between items-center bg-slate-900/60 px-5 py-4 rounded-2xl border border-white/5">
        <div>
          <h2 className="text-lg font-display font-semibold text-slate-100 flex items-center gap-1.5">
            Garden Sanctuary Shop
          </h2>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Customize your habitat with tranquil elements.
          </p>
        </div>

        <div className={`flex items-center space-x-1 px-3 py-1.5 rounded-xl border ${currency.textClass}`}>
          <Sparkles className="w-3.5 h-3.5 fill-current animate-pulse" />
          <span className="font-display font-bold text-xs">{essence} {currency.symbol}</span>
        </div>
      </div>

      {/* Zen Blessing / Rewarded Ad Card */}
      <div className="p-4 rounded-2xl border border-amber-500/25 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
            {isPlusMember ? <Crown className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <h3 className="text-xs font-bold text-white">
                {isPlusMember ? 'VIP Instant Blessing' : 'Zen Sponsor Blessing'}
              </h3>
              <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-mono">
                +{isPlusMember ? '30' : '15'} {currency.symbol}
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-0.5">
              {isPlusMember 
                ? 'VIP perk: Instant reward claim with zero ads.' 
                : 'Watch a peaceful sponsor video to receive instant essence.'}
            </p>
          </div>
        </div>

        <button
          onClick={handleWatchAdBlessing}
          disabled={isAdLoading}
          className="ml-3 px-3.5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 text-slate-950 font-display font-bold text-xs shrink-0 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer flex items-center space-x-1.5"
        >
          {isAdLoading ? (
            <span className="animate-spin text-xs">🌀</span>
          ) : isPlusMember ? (
            <>
              <Sparkles className="w-3.5 h-3.5" />
              <span>Claim</span>
            </>
          ) : (
            <>
              <Video className="w-3.5 h-3.5" />
              <span>Watch</span>
            </>
          )}
        </button>
      </div>

      {adSuccessMsg && (
        <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold animate-in fade-in">
          {adSuccessMsg}
        </div>
      )}

      {/* Mind Garden Plus Promotion Banner if not subscribed */}
      {!isPlusMember && onOpenSubscriptionModal && (
        <button
          onClick={onOpenSubscriptionModal}
          className="p-3.5 rounded-2xl border border-amber-400/30 bg-gradient-to-r from-amber-500/15 to-yellow-500/5 text-left flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all group"
        >
          <div className="flex items-center space-x-2.5">
            <Crown className="w-4 h-4 text-amber-400 group-hover:scale-110 transition-transform" />
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1">
                Unlock Mind Garden <span className="text-amber-400">Plus</span>
              </div>
              <p className="text-[10px] text-slate-400">
                All 3 plant species, ambient sounds & 2x essence boost
              </p>
            </div>
          </div>
          <span className="text-[10px] font-bold text-amber-300 bg-amber-500/20 px-2 py-1 rounded-lg">
            View Plans →
          </span>
        </button>
      )}

      {/* Items list */}
      <div className="space-y-3.5">
        {shopItems.map((item) => {
          const isUnlocked = unlockedDecorations.includes(item.id);
          const isActive = activeDecorations.includes(item.id);
          const canAfford = essence >= item.cost;
          const ItemIcon = item.icon;

          return (
            <div
              key={item.id}
              className={`p-3.5 rounded-2xl border glass-panel transition-all flex items-center justify-between ${
                isActive ? 'border-emerald-500/30 bg-emerald-500/[0.02]' : 'border-white/5'
              }`}
            >
              {/* Left Details */}
              <div className="flex items-start space-x-3 flex-1 min-w-0 pr-3">
                <div className={`p-2.5 rounded-xl border flex-shrink-0 ${item.color} ${item.glow}`}>
                  <ItemIcon className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center space-x-2">
                    <h3 className="font-display font-semibold text-xs text-slate-100 truncate">
                      {item.name}
                    </h3>
                    {!isUnlocked && (
                      item.vipOnly && !isPlusMember ? (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center space-x-1 bg-amber-500/15 border border-amber-500/30 text-amber-300">
                          <Crown className="w-2.5 h-2.5 text-amber-400" />
                          <span>VIP</span>
                        </span>
                      ) : (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md flex items-center space-x-0.5 ${currency.textClass}`}>
                          <span>{currency.symbol}</span>
                          <span>{item.cost}</span>
                        </span>
                      )
                    )}
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Right Action buttons */}
              <div className="flex-shrink-0">
                {isUnlocked ? (
                  <button
                    onClick={() => onToggle(item.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-display tracking-wide transition-all select-none touch-manipulation cursor-pointer ${
                      isActive
                        ? 'bg-emerald-500 text-slate-950 font-bold border border-emerald-400 shadow-md shadow-emerald-500/10'
                        : 'bg-slate-800 text-slate-400 hover:text-white border border-white/5'
                    }`}
                  >
                    {isActive ? 'Active' : 'Show'}
                  </button>
                ) : item.vipOnly && !isPlusMember ? (
                  <button
                    onClick={onOpenSubscriptionModal}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold font-display tracking-wide flex items-center space-x-1 bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/30 hover:border-amber-400 active:scale-95 transition-all select-none touch-manipulation cursor-pointer shadow-sm"
                    title="Unlock with Mind Garden Plus"
                  >
                    <Crown className="w-3 h-3 text-amber-400" />
                    <span>VIP Only</span>
                  </button>
                ) : (
                  <button
                    onClick={() => onUnlock(item.id, item.cost, item.vipOnly)}
                    disabled={!canAfford}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold font-display tracking-wide flex items-center space-x-1 transition-all select-none touch-manipulation cursor-pointer ${
                      canAfford
                        ? 'bg-garden-gold text-slate-950 font-bold border border-amber-400 shadow-md shadow-amber-500/10 active:scale-95'
                        : 'bg-slate-900 text-slate-600 border border-white/5 cursor-not-allowed'
                    }`}
                  >
                    <Lock className="w-3 h-3" />
                    <span>Unlock</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
