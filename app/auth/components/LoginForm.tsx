import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icons } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";
import ActionFormSlide from "./ActionFormSlide";
import { useRouter } from "next/navigation";
import submitHandler from "../effects/submit";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";


export default function LoginForm() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const [ isLoading, setIsLoading ] = useState<boolean>(false);
    const [ isInvalid, setIsInvalid ] = useState<boolean>(false);
    const [ email, setEmail ] = useState<string>('');
    const [ password, setPassword ] =useState<string>('');

    async function onSubmit(event: React.SyntheticEvent) {
        submitHandler({
            event, router, email, password,
            setIsInvalid, setIsLoading,
            actionCallback: () => supabase.auth.signInWithPassword({
                email, password
            })
        });
    }

    return (
        <ActionFormSlide key="login">
            <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">Вход</h1>
                <p className="inline px-8 text-center text-sm text-muted-foreground">
                    Необходимы почта и пароль
                </p>
            </div>
            { isInvalid && <p className="inline px-8 text-center text-sm text-red-400">
                Неправильный логин или пароль
            </p> }
            <form onSubmit={onSubmit}>
                <div className="grid gap-6">
                    { !isLoading && <div className="grid gap-1">
                        <Label className="sr-only" htmlFor="email">
                            Почта
                        </Label>
                        <Input
                            id="email"
                            placeholder="Почта"
                            type="text"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            value={ email }
                            onChange={ (event: any) => setEmail(event.target.value) }
                            required
                        />
                        <Label className="sr-only">
                            Пароль
                        </Label>
                        <Input
                            id="password"
                            placeholder="Пароль"
                            type="password"
                            autoCapitalize="none"
                            autoCorrect="off"
                            disabled={ isLoading }
                            value={ password }
                            onChange={ (event: any) => setPassword(event.target.value) }
                            required
                        />
                    </div> }
                    <Button disabled={isLoading}>
                        { isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        ) }
                        { isLoading ? 'Один момент' : 'Войти' }
                    </Button>
                </div>
            </form>
        </ActionFormSlide>
    )
}
