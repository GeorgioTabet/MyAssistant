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

/** Quick-pick reminder times offered in the item actions sheet. */
export function reminderPresets(): ReminderPreset[] {
  const now = new Date();

  const inOneHour = new Date(now.getTime() + 60 * 60 * 1000);

  // 6pm today, or 6pm tomorrow if it's already evening.
  const thisEvening = new Date(now);
  thisEvening.setHours(18, 0, 0, 0);
  if (thisEvening.getTime() <= now.getTime()) {
    thisEvening.setDate(thisEvening.getDate() + 1);
  }

  const tomorrowMorning = new Date(now);
  tomorrowMorning.setDate(tomorrowMorning.getDate() + 1);
  tomorrowMorning.setHours(9, 0, 0, 0);

  const inThreeDays = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);

  return [
    { label: 'In 1 hour', date: inOneHour },
    { label: 'This evening', date: thisEvening },
    { label: 'Tomorrow 9am', date: tomorrowMorning },
    { label: 'In 3 days', date: inThreeDays },
  ];
}
