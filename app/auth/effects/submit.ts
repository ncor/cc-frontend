'use client';

import { acquireUser } from "@/lib/user/endpoints";
import { useRouter } from "next/router";


export interface SubmitHandlerParameters {
    event: React.SyntheticEvent,
    router: any,
    email: string,
    password: string,
    setIsInvalid: (flag: boolean) => void,
    setIsLoading: (flag: boolean) => void,
    actionCallback: () => Promise<any>
}

export default async function submitEffect({
    event, router, email, password,
    setIsInvalid, setIsLoading, actionCallback
}: SubmitHandlerParameters) {
    event.preventDefault();
    setIsInvalid(false);

    if (!email || !password)
        return setIsInvalid(true);

    setIsLoading(true);
    
    const {
        data: {
            user: user,
            session: session
        }
    } = await actionCallback();

    if (user == null) {
        setIsInvalid(true);
        setIsLoading(false);
    } else {
        await acquireUser(session);
        router.push('/dashboard');
    }
}
