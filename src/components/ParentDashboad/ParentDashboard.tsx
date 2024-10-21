"use client";

import { useState, useEffect } from "react";
import AppBar from "../AppBar";
import ReminderList from "../UserDasboard/ReminderList";
import { Reminder } from "@prisma/client";
import { useSession } from "next-auth/react";
import { getMessaging, onMessage } from "firebase/messaging";
import firebaseApp from "@/utils/firebase/firebase";
import useFcmToken from "@/utils/hooks/useFcmToken";

export default function ParentDashboard() {

    const { fcmToken, notificationPermissionStatus } = useFcmToken();
    // Use the token as needed
    fcmToken && console.log('FCM token:', fcmToken);


    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
            const messaging = getMessaging(firebaseApp);
            const unsubscribe = onMessage(messaging, (payload) => {
                console.log('Foreground push notification received:', payload);
            });
            return () => {
                unsubscribe(); // Unsubscribe from the onMessage event
            };
        }
    }, []);

    const [reminders, setReminders] = useState<Reminder[]>([]);
    const session = useSession();

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