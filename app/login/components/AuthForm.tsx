'use client';

import LoadingSpinner from '@/app/components/LoadingSpinner';
import cook, { burnt } from '@/app/hooks/cook';
import useSuspense from '@/app/hooks/suspense';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { zodResolver } from '@hookform/resolvers/zod';
import { signIn } from 'next-auth/react';
import Image from 'next/image';
import { useParams, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';


const loginSchema = z.object({
    name: z.string(),
    password: z.string()
});

export type LoginSchema = z.infer<typeof loginSchema>;

export default function LoginForm() {
    const searchParams = useSearchParams();
    const { isLoading, suspenseFor } = useSuspense();

    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            name: '',
            password: ''
        }
    });

    const submit = async (form: LoginSchema) => {
        await suspenseFor(async () =>
            signIn('credentials', {
                ...form,
                callbackUrl: window.location.origin + '/dashboard'
            })
        );
    }

    return <Card className="w-full max-w-sm border-0">
        <CardHeader className="text-center">
            <div className="relative h-8">
                <Image src="logo.svg" alt="" fill/>
            </div>
        </CardHeader>
        <CardContent>
            <Form { ...form }>
                <form onSubmit={ form.handleSubmit(submit) } className="space-y-4">
                    <FormField
                        control={ form.control }
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input placeholder="Имя" { ...field } required/>
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        disabled={ isLoading }
                    />
                    <FormField
                        control={ form.control }
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Пароль" { ...field }
                                        required
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                        disabled={ isLoading }
                    />
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={ isLoading }
                    >
                        <LoadingSpinner isLoading={ isLoading }/>
                        Войти
                    </Button>
                </form>
            </Form>
        </CardContent>
        {
            searchParams.get('error') &&
            <CardFooter className="justify-center">
                <Badge
                    variant="outline"
                    className="text-red-500 border-red-500"
                >
                    Не удалось войти
                </Badge>
            </CardFooter>
        }
    </Card>;
}
