/**
 * Local notification reminders for items. Everything stays on-device — these
 * are scheduled local notifications, not push notifications, so no server is
 * involved.
 *
 * The item's own id is used as the notification identifier, so rescheduling or
 * cancelling a reminder needs nothing more than the item id.
 */

import * as Notifications from 'expo-notifications';

// Show reminders even when the app is in the foreground.
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/** Ask for notification permission if not already granted. Returns whether granted. */
export async function ensureNotificationPermission(): Promise<boolean> {
  const current = await Notifications.getPermissionsAsync();
  if (current.granted) return true;
  if (!current.canAskAgain) return false;
  const requested = await Notifications.requestPermissionsAsync();
  return requested.granted;
}

/** Schedule (or replace) the reminder notification for an item. */
export async function scheduleReminder(
  itemId: string,
  text: string,
  dueAt: string
): Promise<void> {
  await Notifications.scheduleNotificationAsync({
    identifier: itemId,
    content: { title: 'Reminder', body: text },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DATE,
      date: new Date(dueAt),
    },
  });
}

/** Cancel an item's reminder notification. No-op if none is scheduled. */
export async function cancelReminder(itemId: string): Promise<void> {
  await Notifications.cancelScheduledNotificationAsync(itemId);
}

export type ReminderPreset = { label: string; date: Date };

/** The next time today/tomorrow that the clock reads the given hour. */
function nextAtHour(hour: number): Date {
  const now = new Date();
  const at = new Date(now);
  at.setHours(hour, 0, 0, 0);
  if (at.getTime() <= now.getTime()) at.setDate(at.getDate() + 1);
  return at;
}

/** Quick-pick reminder times offered in the item actions sheet. */
export function reminderPresets(): ReminderPreset[] {
  const now = Date.now();
  return [
    { label: '15 min', date: new Date(now + 15 * 60 * 1000) },
    { label: '1 hour', date: new Date(now + 60 * 60 * 1000) },
    { label: 'Evening 8pm', date: nextAtHour(20) },
    { label: 'Morning 8am', date: nextAtHour(8) },
  ];
}
