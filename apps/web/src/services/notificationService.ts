import { sendPushNotification } from './sendPushNotification';
import { ReminderWithUser } from '../jobs/sendReminders';

export async function sendNotification(reminder: ReminderWithUser) {
    console.log(`Sending reminder: ${reminder.title}`);
    await sendPushNotification(reminder);

}
