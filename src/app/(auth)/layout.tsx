export const metadata = {
    title: "Auth",
    description: "Auth pages",
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return <main className="flex min-h-screen flex-col items-center justify-center">{children}</main>;
}
