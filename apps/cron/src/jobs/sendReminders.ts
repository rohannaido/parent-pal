import prisma from "@parent-pal/database";
import { Reminder } from "@parent-pal/database";
import { sendNotification } from "../services/notificationService";

export type ReminderWithUser = Reminder & {
    user: {
        id: string;
        email: string;
        notificationToken: string;
    };
};

export async function sendReminders() {
    await sendRemindersScheduledOnce();
    await sendRemindersScheduledRecurring();
}

export async function sendRemindersScheduledOnce() {
    console.log("SENDING REMINDERS")
    const now = new Date();

    const reminders = await prisma.reminder.findMany({
        where: {
            sent: false,
            dateTime: {
                lte: now
            },
            frequency: "once"
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

export async function sendRemindersScheduledRecurring() {
    const now = new Date();
    const reminders = await prisma.reminder.findMany({
        where: {
            frequency: {
                in: ["daily", "weekly", "monthly"]
            }
        },
        include: {
            user: {
                select: {
                    id: true,
                    email: true,
                    notificationToken: true
                }
            },
            reminderLogs: true
        }
    });

    for (const reminder of reminders) {
        if (reminder.dateTime.getTime() < now.getTime()) {
            continue;
        }

        let shouldSend = false;

        if (reminder.frequency === "daily") {
            if (reminder.reminderLogs.length === 0) {
                shouldSend = true;
            } else {
                const lastLog = reminder.reminderLogs[reminder.reminderLogs.length - 1];
                if (lastLog.sentAt.getDate() !== now.getDate()) {
                    shouldSend = true;
                }
            }
        } else if (reminder.frequency === "weekly") {
            if (reminder.dateTime.getDay() === now.getDay()) {
                if (reminder.reminderLogs.length === 0) {
                    shouldSend = true;
                } else {
                    const lastLog = reminder.reminderLogs[reminder.reminderLogs.length - 1];
                    if (lastLog.sentAt.getDate() !== now.getDate()) {
                        shouldSend = true;
                    }
                }
            }
        } else if (reminder.frequency === "monthly") {
            if (reminder.dateTime.getDate() === now.getDate()) {
                if (reminder.reminderLogs.length === 0) {
                    shouldSend = true;
                } else {
                    const lastLog = reminder.reminderLogs[reminder.reminderLogs.length - 1];
                    if (lastLog.sentAt.getDate() !== now.getDate()) {
                        shouldSend = true;
                    }
                }
            }
        }

        if (shouldSend) {
            await sendNotification(reminder as ReminderWithUser);
            await prisma.reminderLog.create({
                data: {
                    reminderId: reminder.id,
                    sentAt: now
                }
            });
        }
    }
}