import prisma from "@/db/index";
import { sendNotification } from "@/services/notificationService";
import { Reminder } from "@prisma/client";

export type ReminderWithUser = Reminder & {
    user: {
        id: string;
        email: string;
        notificationToken: string;
    };
};

export async function sendReminders() {
    const now = new Date();
    const reminders = await prisma.reminder.findMany({
        where: {
            sent: false,
            dateTime: {
                lte: now
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    notificationToken: true
                }
            }
        }
    });

    for (const reminder of reminders) {
        await sendNotification(reminder as ReminderWithUser);
        await prisma.reminder.update({
            where: { id: reminder.id },
            data: { sent: true }
        });
    }
}
