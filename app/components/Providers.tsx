'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { RevalidationContext } from '../contexts/revalidation';
import { Session } from "next-auth";


export type ProvidersProps = {
    session: Session | null,
    children: ReactNode
};

export default function Providers({
    session, children
}: ProvidersProps) {
    const [ revalidated, revalidate ] = useState<number>(Math.random());

    return <SessionProvider session={ session }>
        <RevalidationContext.Provider value={{
            revalidated, revalidate: () => { revalidate(Math.random()) }
        }}>
            { children }
        </RevalidationContext.Provider>
    </SessionProvider>;
}
