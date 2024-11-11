import prisma from "@parent-pal/database";
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
    console.log("SENDING REMINDERS")
    const now = new Date();

    const remindersCheck = await prisma.reminder.findMany({
        where: {
            sent: false,
            dateTime: {
                lte: now
            }
        },
    });

    console.log("REMINDERS CHECK", remindersCheck)

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
