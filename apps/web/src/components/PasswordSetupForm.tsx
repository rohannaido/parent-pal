'use client';

import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function PasswordSetupForm() {
    const searchParams = useSearchParams();
    const token = searchParams.get('token');
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            password: '',
            confirmPassword: ''
        }
    });

    const handleSubmit = async (data: z.infer<typeof formSchema>) => {
        const { password, confirmPassword } = data;

        if (password !== confirmPassword) {
            return alert('Passwords do not match');
        }

        const res = await fetch('/api/auth/set-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, password }),
        });

        if (res.ok) {
            toast({
                variant: 'default',
                title: 'Success',
                description: 'Password set successfully',
            });

            window.location.href = '/login';
        }

        console.error(res);
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Failed to set password',
        });
    };

    return (
        <Card className="w-full max-w-md bg-card bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Set Password</CardTitle>
                <CardDescription>Set your password</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-200 dark:border-gray-600"
                                            placeholder="Enter your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-200 dark:border-gray-600"
                                            type="password"
                                            placeholder="Confirm your password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">Set Password</Button>
                        <div className="mt-4 text-center text-sm text-muted-foreground">
                            <p>Already have an account?</p>
                            <Link href="/login" passHref>
                                <Button variant="link" className="mt-2 text-primary">Log In</Button>
                            </Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    );
}