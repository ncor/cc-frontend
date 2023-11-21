'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignupForm";


export type AuthAction = 'login' | 'signup';


export const authActions: Array<AuthAction> = [ 'login', 'signup' ];


export default function AuthModal() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [ action, setAction ] = useState<AuthAction>('login');

    const pushActionQuery = (action: AuthAction) =>
        router.push(`/auth?action=${action}`);

    useEffect(() => {
        const action: AuthAction =
            searchParams.get('action') as AuthAction || 'login';
        setAction(action);
        pushActionQuery(action);
    }, []);

    const toggleAction = () => {
        const toggledAction = authActions[+(action == 'login')];
        setAction(toggledAction);
        pushActionQuery(toggledAction);
    }

    return <div className=
        "grid gap-6 w-full max-w-[350px] p-6 bg-zinc-950 rounded-2xl clip"
    >
        {
            action == 'login' ?
                <LoginForm/>
            :
                <SignUpForm/>
        }
        <p
            onClick={ () => toggleAction() }
            className="inline px-8 text-center text-sm text-muted-foreground cursor-pointer"
        >
            { action == 'login' ? 'Регистрация' : 'Уже есть аккаунт' }
        </p>
    </div>
}
