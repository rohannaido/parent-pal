"use client";

import { User, Reminder } from "@prisma/client";

export default function ReminderList({ reminders }: { reminders: Reminder[] }) {
    return (
        <div className="w-full max-w-md mx-auto mt-8 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
            <h2 className="text-2xl font-semibold mb-4">Reminders</h2>
            {reminders.length > 0 ? (
                <ul className="space-y-3">
                    {reminders.map((reminder: Reminder) => (
                        <li key={reminder.id} className="bg-gray-100 dark:bg-gray-800 shadow-md rounded-lg p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <h3 className="text-lg font-medium">{reminder.title}</h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">{reminder.content}</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-600 dark:text-gray-300">
                                        {(new Date(reminder.dateTime)).toDateString()} {(new Date(reminder.dateTime)).toLocaleTimeString()}
                                    </p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 dark:text-gray-400 text-center">No reminders set for this parent.</p>
            )}
        </div>
    );
}
