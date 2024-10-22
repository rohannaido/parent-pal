import prisma from "@/db/index";
import { sendNotification } from "@/services/notificationService";

export async function sendReminders() {
    const now = new Date();
    console.log(now.toISOString().split('T')[0]);
    console.log(now.toTimeString().split(' ')[0]);
    // const todayDate = now.toISOString().split('T')[0];
    const reminders = await prisma.reminder.findMany({
        where: {
            sent: false,
            dateTime: {
                lte: now
            }
        }
    });

    console.log(reminders);

    for (const reminder of reminders) {
        await sendNotification(reminder);
        // await prisma.reminder.update({
        //     where: { id: reminder.id },
        //     data: { sent: true }
        // });
    }
}
