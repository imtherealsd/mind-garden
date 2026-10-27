/**
 * Mind Garden - Realtime Cloud Synchronization Service
 * Provides automated debounced synchronization, live connectivity status,
 * and multi-session persistence.
 */
import { saveGardenToCloud, loadGardenFromCloud } from './firebase';

const REALTIME_PREF_KEY = 'mg-realtime-sync-enabled';
const LAST_SYNC_KEY = 'mg-last-sync-timestamp';

class CloudSyncService {
  constructor() {
    this.status = 'idle'; // 'idle' | 'syncing' | 'synced' | 'offline' | 'error'
    this.lastSyncedAt = this.loadLastSyncedTimestamp();
    this.listeners = new Set();
    this.debounceTimer = null;
    this.pendingPayload = null;
    this.activeUserId = null;

    // Listen to network changes
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => this.handleNetworkReturn());
      window.addEventListener('offline', () => this.updateStatus('offline'));
    }
  }

  isRealtimeEnabled() {
    try {
      const val = localStorage.getItem(REALTIME_PREF_KEY);
      return val === null ? true : val === 'true';
    } catch {
      return true;
    }
  }

  setRealtimeEnabled(enabled) {
    try {
      localStorage.setItem(REALTIME_PREF_KEY, String(enabled));
      this.notify();
    } catch (e) {
      console.warn('Failed to save realtime preference', e);
    }
  }

  loadLastSyncedTimestamp() {
    try {
      return localStorage.getItem(LAST_SYNC_KEY) || null;
    } catch {
      return null;
    }
  }

  saveLastSyncedTimestamp(timestamp) {
    this.lastSyncedAt = timestamp;
    try {
      localStorage.setItem(LAST_SYNC_KEY, timestamp);
    } catch (e) {
      // ignore
    }
  }

  getFormattedLastSynced() {
    if (!this.lastSyncedAt) return 'Never';
    const diffMs = Date.now() - new Date(this.lastSyncedAt).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    if (diffSec < 10) return 'Just now';
    if (diffSec < 60) return `${diffSec}s ago`;
    const diffMin = Math.floor(diffSec / 60);
    if (diffMin < 60) return `${diffMin}m ago`;
    const diffHours = Math.floor(diffMin / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    return new Date(this.lastSyncedAt).toLocaleDateString();
  }

  subscribe(listener) {
    this.listeners.add(listener);
    listener({
      status: this.status,
      lastSyncedAt: this.lastSyncedAt,
      formattedTime: this.getFormattedLastSynced(),
      isRealtimeEnabled: this.isRealtimeEnabled()
    });
    return () => this.listeners.delete(listener);
  }

  notify() {
    const data = {
      status: this.status,
      lastSyncedAt: this.lastSyncedAt,
      formattedTime: this.getFormattedLastSynced(),
      isRealtimeEnabled: this.isRealtimeEnabled()
    };
    this.listeners.forEach((fn) => {
      try {
        fn(data);
      } catch (err) {
        console.warn('Sync listener error', err);
      }
    });
  }

  updateStatus(newStatus) {
    this.status = newStatus;
    this.notify();
  }

  /**
   * Triggers a debounced background sync when state changes.
   */
  queueAutoSync(userId, gardenPayload) {
    if (!userId || !this.isRealtimeEnabled()) return;
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      this.updateStatus('offline');
      return;
    }

    this.activeUserId = userId;
    this.pendingPayload = gardenPayload;

    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
    }

    this.debounceTimer = setTimeout(() => {
      this.executeSync(userId, gardenPayload);
    }, 1200);
  }

  /**
   * Immediately pushes sanctuary data to the cloud.
   */
  async forceSyncNow(userId, gardenPayload) {
    if (!userId) return false;
    if (this.debounceTimer) {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = null;
    }
    return this.executeSync(userId, gardenPayload);
  }

  async executeSync(userId, gardenPayload) {
    if (!userId) return false;
    this.updateStatus('syncing');

    try {
      const success = await saveGardenToCloud(userId, gardenPayload);
      if (success) {
        const nowIso = new Date().toISOString();
        this.saveLastSyncedTimestamp(nowIso);
        this.updateStatus('synced');
        
        // Revert to idle after 3s
        setTimeout(() => {
          if (this.status === 'synced') {
            this.updateStatus('idle');
          }
        }, 3000);
        return true;
      } else {
        this.updateStatus('error');
        return false;
      }
    } catch (e) {
      console.warn('[Realtime Sync Error]:', e);
      this.updateStatus('error');
      return false;
    }
  }

  handleNetworkReturn() {
    this.updateStatus('idle');
    if (this.activeUserId && this.pendingPayload && this.isRealtimeEnabled()) {
      this.queueAutoSync(this.activeUserId, this.pendingPayload);
    }
  }
}

export const cloudSyncService = new CloudSyncService();
