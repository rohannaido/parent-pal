import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { User } from "@prisma/client";

export default function ParentCards({ selectedParent, setSelectedParent }: { selectedParent: User | null, setSelectedParent: (parent: User | null) => void }) {
    const [parents, setParents] = useState<User[]>([]);
    const [newParent, setNewParent] = useState<string>("");
    const [newParentEmail, setNewParentEmail] = useState<string>("");
    const [showAddParentForm, setShowAddParentForm] = useState(false);

    useEffect(() => {
        fetchParents();
    }, []);

    const addParent = async () => {
        if (newParent) {
            try {
                const response = await fetch('/api/parents', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name: newParent, email: newParentEmail }),
                });

                if (response.ok) {
                    setShowAddParentForm(false);
                    fetchParents();
                    setNewParent("");
                } else {
                    console.error('Failed to add parent to database');
                }
            } catch (error) {
                console.error('Error adding parent:', error);
            }
        }
    };

    const fetchParents = async () => {
        const response = await fetch('/api/parents');
        const data = await response.json();
        setParents(data.parents);
    };

    return <div className="flex items-center justify-center gap-2 max-w-3xl mx-auto mb-4">
        <div className="flex flex-wrap gap-2">
            {parents.map((parent) => (
                <Button
                    key={parent.id}
                    onClick={() => setSelectedParent(parent)}
                    variant="outline"
                    className={`flex-grow max-w-[100px] min-w-[100px] h-24 bg-white dark:bg-gray-800 ${selectedParent?.id === parent.id ? "border-2 border-blue-500" : ""}`}
                >
                    <div className="flex items-center justify-center h-full text-xl">
                        {parent.name}
                    </div>
                </Button>
            ))}
        </div>

        <div className={`${parents?.length ? "" : "w-full"}`}>
            {!showAddParentForm ? (
                <Button
                    onClick={() => setShowAddParentForm(true)}
                    className={`w-full text-4xl ${parents?.length ? "" : "h-28"} bg-white dark:bg-gray-800`}
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
                        <Input
                            value={newParentEmail}
                            onChange={(e) => setNewParentEmail(e.target.value)}
                            placeholder="Enter parent email"
                            className="flex-grow"
                        />
                        <Button onClick={addParent}>Add</Button>
                    </div>
                </div>
            )}
        </div>
    </div>;
}