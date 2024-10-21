'use client';

import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function Login() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status, router]);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError('');
        const result = await signIn("credentials", {
            email,
            password,
            redirect: false
        });
        if (result?.error) {
            setError(result.error);
        } else {
            router.push("/");
        }
    };

    if (status === "loading") {
        return <div>Loading...</div>;
    }

    return (
        <Card className="w-full max-w-md">
            <CardHeader>
                <CardTitle>Login</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-1">
                        <Label htmlFor="email">Email:</Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="space-y-1">
                        <Label htmlFor="password">Password:</Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Log In
                    </Button>
                </form>
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">Don't have an account?</p>
                    <Link href="/signup" passHref>
                        <Button
                            variant="link"
                            className="mt-2"
                        >
                            Sign Up
                        </Button>
                    </Link>
                </div>
            </CardContent>
        </Card >
    );
}
