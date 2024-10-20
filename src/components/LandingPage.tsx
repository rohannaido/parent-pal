import Link from 'next/link';

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 flex flex-col items-center justify-center text-center p-4">
            <h1 className="text-5xl font-bold text-indigo-600 mb-4">Welcome to ParentPal</h1>
            <p className="text-2xl mb-8 text-gray-700">Create reminders for your loved ones!</p>

            <div className="space-y-4">
                <Link href="/login?redirect=/" className="bg-green-500 text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-green-600 transition-colors inline-block">
                    Create a Reminder
                </Link>
                <br />
                <Link href="/login?redirect=/parent-dashboard" className="bg-purple-500 text-white px-8 py-3 rounded-lg text-xl font-semibold hover:bg-purple-600 transition-colors inline-block">
                    Parent Dashboard
                </Link>
            </div>

            <div className="mt-16 text-gray-700 max-w-2xl">
                <h2 className="text-3xl font-semibold mb-6">How ParentPal Works:</h2>
                <ul className="list-none text-left space-y-4">
                    <li className="flex items-center">
                        <span className="text-3xl mr-4">👥</span>
                        <span>Anyone can create reminders for their parents</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-3xl mr-4">🔔</span>
                        <span>Parents receive notifications for each new reminder</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-3xl mr-4">✅</span>
                        <span>Parents can mark reminders as done or not done</span>
                    </li>
                    <li className="flex items-center">
                        <span className="text-3xl mr-4">🎉</span>
                        <span>Improve communication and stay organized across generations!</span>
                    </li>
                </ul>
            </div>
        </div>
    );
}
