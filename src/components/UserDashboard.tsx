"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signOut } from "next-auth/react";
import { X } from "lucide-react";

export default function UserDashboard() {
    const [parents, setParents] = useState<string[]>([]);
    const [newParent, setNewParent] = useState("");
    const [selectedParent, setSelectedParent] = useState("");
    const [reminder, setReminder] = useState("");
    const [showAddParentForm, setShowAddParentForm] = useState(false);
    const addParent = () => {
        if (newParent) {
            setShowAddParentForm(false);
            setParents([...parents, newParent]);
            setNewParent("");
        }
    };

    const setReminderForParent = () => {
        if (selectedParent && reminder) {
            // Here you would typically save the reminder to a database
            console.log(`Reminder set for ${selectedParent}: ${reminder}`);
            setReminder("");
        }
    };

    return (
        <>
            <div className="bg-white shadow-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-4">
                        <h1 className="text-2xl font-bold text-gray-900">ParentPal</h1>
                        <div className="flex items-center space-x-4">
                            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
                                Profile
                            </Button>
                            <Button
                                variant="outline"
                                onClick={() => signOut()}
                                className="text-red-600 hover:text-red-800 hover:bg-red-100"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex items-center justify-center gap-2 max-w-3xl mx-auto mt-4">
                <div className="flex flex-wrap gap-2">
                    {parents.map((parent) => (
                        <Button
                            key={parent}
                            onClick={() => setSelectedParent(parent)}
                            variant="outline"
                            className={`flex-grow max-w-[300px] min-w-[300px] h-24 ${selectedParent === parent ? "border-2 border-blue-500" : ""}`}
                        >
                            <div className="flex items-center justify-center h-full text-xl">
                                {parent}
                            </div>
                        </Button>
                    ))}
                </div>

                <div className={`${parents?.length ? "" : "w-full"}`}>
                    {!showAddParentForm ? (
                        <Button
                            onClick={() => setShowAddParentForm(true)}
                            className={`w-full text-4xl ${parents?.length ? "" : "h-24"}`}
                            variant="outline"
                        >
                            + {parents?.length ? "" : <span className="text-2xl font-semibold">Parent</span>}
                        </Button>
                    ) : (
                        <div className={`border rounded-lg p-4`}>
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-semibold">Add Parent</h2>
                                <Button
                                    onClick={() => setShowAddParentForm(false)}
                                    variant="ghost"
                                    className="p-1"
                                >
                                    <X size={24} />
                                </Button>
                            </div>
                            <div className="flex space-x-2">
                                <Input
                                    value={newParent}
                                    onChange={(e) => setNewParent(e.target.value)}
                                    placeholder="Enter parent name"
                                    className="flex-grow"
                                />
                                <Button onClick={addParent}>Add</Button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <div className="min-h-screen flex justify-center">
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
        </>
    );
}
