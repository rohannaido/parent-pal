import { getMessaging, Message } from 'firebase-admin/messaging';
import firebase from '../firebase';
import { ReminderWithUser } from '../jobs/sendReminders';

export async function sendPushNotification(reminder: ReminderWithUser) {

    const message: Message = {
        token: reminder.user.notificationToken,
        notification: {
            title: reminder.title,
            body: reminder.content
        }
    };

    const response = await getMessaging(firebase).send(message as Message);
}
