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
        console.log(selectedParent, reminder, date, time);
        if (selectedParent && reminder && date && time) {
            const reminderDateTime = new Date(date);
            const [hours, minutes] = time.split(':');
            reminderDateTime.setHours(parseInt(hours, 10), parseInt(minutes, 10));

            try {
                const response = await fetch("/api/reminders", {
                    method: "POST",
                    body: JSON.stringify({
                        userId: selectedParent.id,
                        title: reminder,
                        content: reminder,
                        date: reminderDateTime.toISOString().split('T')[0],
                        time: reminderDateTime.toISOString().split('T')[1].split('.')[0].slice(0, 5),
                    }),
                });
                console.log(response);
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
            <div className="min-h-screen">
                <ParentCards selectedParent={selectedParent} setSelectedParent={setSelectedParent} />
                <div className="flex justify-center">
                    <div className="bg-white p-8 rounded-lg w-full max-w-md space-y-6">
                        <div className="space-y-4">
                            <h2 className="text-xl font-semibold">Add Reminder</h2>
                            <Input
                                value={reminder}
                                onChange={(e) => setReminder(e.target.value)}
                                placeholder="Enter reminder"
                            />
                            <div className="flex space-x-2">
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {date ? format(date, "PPP") : <span>Pick a date</span>}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar
                                            mode="single"
                                            selected={date}
                                            onSelect={setDate}
                                            initialFocus
                                        />
                                    </PopoverContent>
                                </Popover>
                                <div className="flex items-center space-x-2">
                                    <Clock className="h-4 w-4" />
                                    <Input
                                        type="time"
                                        value={time}
                                        onChange={(e) => setTime(e.target.value)}
                                        className="w-[120px]"
                                    />
                                </div>
                            </div>
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
