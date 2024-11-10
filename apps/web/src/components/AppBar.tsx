import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { useTheme } from "next-themes";
import { SunDimIcon, SunMoonIcon } from "lucide-react";

export default function AppBar() {
    const { theme, setTheme } = useTheme();
    return (
        <div className="bg-gray-100 dark:bg-gray-800 shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-4">
                    <h1 className="text-2xl font-bold text-gray-900 dark:text-white">ParentPal</h1>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" className="text-gray-900 dark:text-white">
                            Profile
                        </Button>
                        <Button
                            variant="outline"
                            onClick={() => signOut()}
                            className="text-red-400 hover:text-red-300 hover:bg-red-900"
                        >
                            Logout
                        </Button>
                        <Button
                            onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
                            variant="outline"
                            className="text-gray-900 dark:text-white"
                        >
                            <SunDimIcon className="h-[1rem] w-[1rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                            <SunMoonIcon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
