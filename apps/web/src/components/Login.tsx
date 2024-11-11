'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

export default function Login() {
    const { data: session, status } = useSession();
    const router = useRouter();
    const { toast } = useToast();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            setError('');
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false
            });
            if (result?.error) {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: "Invalid email or password",
                });
            } else {
                router.push("/");
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.message || "Something went wrong",
            });
        }
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <Card className="w-full max-w-md bg-card bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-200 dark:border-gray-600"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">Password:</Label>
                        <div className="relative">
                            <Input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-200 dark:border-gray-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 -translate-y-1/2"
                            >
                                {showPassword ? (
                                    <EyeOff className="h-4 w-4" />
                                ) : (
                                    <Eye className="h-4 w-4" />
                                )}
                            </button>
                        </div>
                    </div>
                    <Button type="submit" className="w-full">
                        Log In
                    </Button>
                </form>
                <div className="mt-4 text-center text-sm text-muted-foreground">
                    <p>Don't have an account?</p>
                    <Link href="/signup" passHref>
                        <Button
                            variant="link"
                            className="mt-2 text-primary"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card>
    );
}
