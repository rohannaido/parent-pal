'use client';

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import Link from 'next/link'
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
})

export default function SignUp() {
    const { toast } = useToast();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        // TODO: Add signup logic here
        console.log(values)
        try {
            const response = await fetch("/api/auth/signup", {
                method: "POST",
                body: JSON.stringify(values),
            })
            if (response.ok) {
                toast({
                    title: "Success",
                    description: "Account created successfully",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Error",
                    description: response.statusText || "Something went wrong",
                });
            }
        } catch (error: any) {
            toast({
                title: "Error",
                description: error?.message || "Something went wrong",
            });
        }
    }

    return (
        <Card className="w-full max-w-md bg-card bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl font-bold tracking-tight">Sign Up</CardTitle>
                <CardDescription>Create a new account</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-200 dark:border-gray-600"
                                            placeholder="Enter your email"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-gray-200 dark:border-gray-600"
                                            type="password"
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
                        <Button type="submit" className="w-full">Sign Up</Button>
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
    )
}
