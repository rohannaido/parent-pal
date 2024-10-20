import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AppBar() {
    return (
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
    );
}
