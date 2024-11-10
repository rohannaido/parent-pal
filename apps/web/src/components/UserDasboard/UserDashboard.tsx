"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Clock } from "lucide-react";
import AppBar from "../AppBar";
import ParentCards from "./ParentCards";
import ReminderList from "./ReminderList";
import { Reminder, User } from "@prisma/client";

export default function UserDashboard() {
    const [reminder, setReminder] = useState("");
    const [selectedParent, setSelectedParent] = useState<User | null>(null);
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [time, setTime] = useState<string>("");

    const fetchReminders = async () => {
        const response = await fetch(`/api/reminders?userId=${selectedParent?.id}`);
        const data = await response.json();
        setReminders(data.reminders);
    };
    useEffect(() => {
        fetchReminders();
    }, [selectedParent]);
    const setReminderForParent = async () => {
        if (selectedParent && reminder && date && time) {
            const reminderDateTime = new Date(date);
            const [hours, minutes] = time.split(':');
            reminderDateTime.setHours(parseInt(hours), parseInt(minutes));
            const dateNew = reminderDateTime.toISOString();
            try {
                const response = await fetch("/api/reminders", {
                    method: "POST",
                    body: JSON.stringify({
                        userId: selectedParent.id,
                        title: reminder,
                        content: reminder,
                        dateTime: dateNew,
                    }),
                });
                setReminder("");
                setDate(undefined);
                setTime("");
                fetchReminders();
            } catch (error) {
                console.error(error);
            }
        }
    };

    return (
        <>
            <AppBar />
            <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white p-4">
                <ParentCards selectedParent={selectedParent} setSelectedParent={setSelectedParent} />
                <div className="flex justify-center">
                    <div className="bg-gray-100 dark:bg-gray-800 p-8 rounded-lg w-full max-w-md space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Add Reminder</h2>
                            <Input
                                value={reminder}
                                onChange={(e) => setReminder(e.target.value)}
                                placeholder="Enter reminder"
                                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                            />
                            <div className="flex space-x-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="w-[240px] justify-start text-left font-normal bg-white dark:bg-gray-700 text-gray-900 dark:text-white border-gray-200 dark:border-gray-600"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                            className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                                        />
                                    </PopoverContent>
                                </Popover>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4 text-gray-900 dark:text-white" />
                                    <Input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-[120px] bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                    />
                                </div>
                            </div>
                            <Button
                                onClick={setReminderForParent}
                                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                            >
                                Set Reminder
                            </Button>
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
