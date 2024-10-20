"use client";

import { User, Reminder } from "@prisma/client";

export default function ReminderList({ reminders }: { reminders: Reminder[] }) {

    return (
        <div className="w-full max-w-md mx-auto mt-8">
            <h2 className="text-2xl font-semibold mb-4">Reminders</h2>
            {reminders.length > 0 ? (
                <ul className="space-y-3">
                    {reminders.map((reminder: Reminder) => (
                        <li key={reminder.id} className="bg-white shadow-md rounded-lg p-4">
                            <h3 className="text-lg font-medium text-gray-800">{reminder.title}</h3>
                            <p className="text-sm text-gray-600 mt-1">{reminder.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-gray-500 text-center">No reminders set for this parent.</p>
            )}
        </div>
    );
}
