import { AdMob } from '@capacitor-community/admob';
import { Capacitor } from '@capacitor/core';

// Google Official Test Ad Unit ID
export const TEST_REWARDED_AD_ID_ANDROID = 'ca-app-pub-3940256099942544/5224354917';
const AD_ID_STORAGE_KEY = 'mg-admob-rewarded-id';

export const getRewardedAdId = () => {
  try {
    const saved = localStorage.getItem(AD_ID_STORAGE_KEY);
    if (saved && saved.trim()) return saved.trim();
  } catch (e) {
    // fallback
  }
  return import.meta.env.VITE_ADMOB_REWARDED_AD_ID || TEST_REWARDED_AD_ID_ANDROID;
};

export const setRewardedAdId = (id) => {
  try {
    if (id && id.trim()) {
      localStorage.setItem(AD_ID_STORAGE_KEY, id.trim());
    } else {
      localStorage.removeItem(AD_ID_STORAGE_KEY);
    }
  } catch (e) {
    console.error('Failed to save AdMob unit ID', e);
  }
};

class AdService {
  constructor() {
    this.isInitialized = false;
    this.isNative = Capacitor.isNativePlatform();
  }

  async initialize() {
    if (!this.isNative || this.isInitialized) return;

    const adId = getRewardedAdId();
    const isTest = adId.includes('3940256099942544') || adId.includes('test');

    try {
      await AdMob.initialize({
        initializeForTesting: isTest,
      });
      this.isInitialized = true;
    } catch (e) {
      console.warn('AdMob initialization notice:', e);
    }
  }

  /**
   * Show a rewarded ad (Zen Blessing).
   * Returns a promise that resolves to true if rewarded, false if cancelled/failed.
   * If user is a Plus member, bypass immediately!
   */
  async showRewardedAd({ isPlus = false, onReward } = {}) {
    // Plus members get instant reward with zero ads!
    if (isPlus) {
      if (onReward) onReward({ type: 'vip', amount: 1 });
      return { success: true, isVip: true };
    }

    if (!this.isNative) {
      // Browser / preview simulation: show quick peaceful transition
      return new Promise((resolve) => {
        setTimeout(() => {
          if (onReward) onReward({ type: 'simulated', amount: 1 });
          resolve({ success: true, simulated: true });
        }, 800);
      });
    }

    try {
      await this.initialize();

      const adId = getRewardedAdId();
      const isTest = adId.includes('3940256099942544') || adId.includes('test');

      // Prepare Rewarded Video
      await AdMob.prepareRewardVideoAd({
        adId: adId,
        isTesting: isTest,
      });

      return new Promise(async (resolve) => {
        let earned = false;

        const rewardListener = await AdMob.addListener('onRewardedVideoAdReward', (reward) => {
          earned = true;
          if (onReward) onReward(reward);
        });

        const dismissListener = await AdMob.addListener('onRewardedVideoAdDismissed', () => {
          rewardListener.remove();
          dismissListener.remove();
          resolve({ success: earned });
        });

        const failedListener = await AdMob.addListener('onRewardedVideoAdFailedToShow', () => {
          failedListener.remove();
          // Fallback to granting reward so user doesn't feel punished if network failed
          if (onReward) onReward({ type: 'fallback', amount: 1 });
          resolve({ success: true, fallback: true });
        });

        await AdMob.showRewardVideoAd();
      });
    } catch (e) {
      console.warn('AdMob show rewarded ad error, providing peaceful fallback:', e);
      // If ad fails to load, gracefully reward the user anyway
      if (onReward) onReward({ type: 'fallback', amount: 1 });
      return { success: true, fallback: true };
    }
  }
}

export const adService = new AdService();
