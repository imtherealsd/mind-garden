import { LocalNotifications } from '@capacitor/local-notifications';

export const notificationService = {
  // Request permission
  async requestPermission() {
    try {
      const status = await LocalNotifications.requestPermissions();
      return status.display === 'granted';
    } catch (e) {
      console.warn('LocalNotifications permission request failed:', e);
      return false;
    }
  },

  // Check permission
  async checkPermission() {
    try {
      const status = await LocalNotifications.checkPermissions();
      return status.display === 'granted';
    } catch (e) {
      return false;
    }
  },

  // Schedule daily evening reminder (e.g. 8:00 PM)
  async scheduleDailyReminder(enabled = true) {
    try {
      // Cancel existing ones first
      await LocalNotifications.cancel({ notifications: [{ id: 101 }] });

      if (!enabled) {
        return false;
      }

      const hasPerm = await this.requestPermission();
      if (!hasPerm) return false;

      // Calculate next 8:00 PM
      const now = new Date();
      const scheduledTime = new Date();
      scheduledTime.setHours(20, 0, 0, 0); // 8:00 PM
      if (scheduledTime <= now) {
        scheduledTime.setDate(scheduledTime.getDate() + 1);
      }

      await LocalNotifications.schedule({
        notifications: [
          {
            id: 101,
            title: '🌱 Mind Garden Sanctuary',
            body: 'Your plant is resting in the quiet evening breeze. Take a 60-second breath and log today\'s peace.',
            schedule: {
              at: scheduledTime,
              repeats: true,
              every: 'day'
            },
            smallIcon: 'ic_launcher',
            sound: undefined
          }
        ]
      });

      return true;
    } catch (e) {
      console.warn('Failed to schedule daily reminder:', e);
      return false;
    }
  }
};
