"use client";

import { useState, useEffect } from "react";
import AppBar from "../AppBar";
import ReminderList from "../UserDasboard/ReminderList";
import { Reminder } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/utils/firebase/firebase";
import useFcmToken from "@/utils/hooks/useFcmToken";
import { useToast } from "@/hooks/use-toast";

export default function ParentDashboard() {
    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    const { toast } = useToast();
    const [reminders, setReminders] = useState<Reminder[]>([]);
    const session = useSession();


    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload) => {
                toast({
                    title: `New Reminder ${payload.notification?.title}`,
                    description: payload.notification?.body,
                });
            });
            return () => {
                unsubscribe();
            };
        }
    }, []);

    useEffect(() => {
        if (!fcmToken) return;
        if (!session) return;
        const saveFcmToken = async () => {
            const response = await fetch(`/api/users/${(session as any)?.data?.user?.id}/firebase-token`, {
                method: "POST",
                body: JSON.stringify({ notificationToken: fcmToken }),
            });
            const data = await response.json();
            console.log(data);
        };
        saveFcmToken();
    }, [fcmToken, session]);

    useEffect(() => {
        fetchReminders();
    }, [session]);

    const fetchReminders = async () => {
        const response = await fetch(`/api/reminders?userId=${(session as any)?.data?.user?.id}`);
        const data = await response.json();
        setReminders(data.reminders);
    };

    return (
        <>
            <AppBar />
            <div className="min-h-screen">
                <ReminderList reminders={reminders} />
            </div>
        </>
    )
}