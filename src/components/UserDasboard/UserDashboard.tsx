"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import { X } from "lucide-react";
import AppBar from "../AppBar";
import ParentCards from "./ParentCards";
import ReminderList from "./ReminderList";
import { Reminder, User } from "@prisma/client";

export default function UserDashboard() {
    const [reminder, setReminder] = useState("");
    const [selectedParent, setSelectedParent] = useState<User | null>(null);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const fetchReminders = async () => {
        const response = await fetch(`/api/reminders?userId=${selectedParent?.id}`);
        const data = await response.json();
        setReminders(data.reminders);
    };
    useEffect(() => {
        fetchReminders();
    }, [selectedParent]);
    const setReminderForParent = async () => {
        if (selectedParent && reminder) {
            const response = await fetch("/api/reminders", {
                method: "POST",
                body: JSON.stringify({ userId: selectedParent.id, title: reminder, content: reminder }),
            });
            console.log(response);
            setReminder("");
            fetchReminders();
        }
    };

    return (
        <>
            <AppBar />
            <div className="min-h-screen">
                <ParentCards selectedParent={selectedParent} setSelectedParent={setSelectedParent} />
                <div className="flex justify-center">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md space-y-6">

                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Set Reminder</h2>
                            <div className="flex flex-wrap gap-2">
                            </div>
                            <Input
                                value={reminder}
                                onChange={(e) => setReminder(e.target.value)}
                                placeholder="Enter reminder"
                            />
                            <Button onClick={setReminderForParent} className="w-full">Set Reminder</Button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <ReminderList reminders={reminders} />
                </div>
            </div>
        </>
    );
}
