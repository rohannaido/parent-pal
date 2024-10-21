import prisma from "@/db/index";
import { sendNotification } from "@/services/notificationService";

export async function sendReminders() {
    const now = new Date();
    const reminders = await prisma.reminder.findMany({
        where: {
            sent: false,
            // date: now.toISOString().split('T')[0],
            // time: {
            //     lte: now.toTimeString().split(' ')[0]
            // }
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
