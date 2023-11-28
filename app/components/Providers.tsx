'use client';

import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";
import { Session } from "next-auth";
import RevalidationProvider from "./providers/RevalidationProvider";
import ThemeProvider from "./providers/theme/ThemeProvider";


export type ProvidersProps = {
    session: Session | null,
    defaultTheme: string,
    children: ReactNode
};

export default function Providers({
    session, defaultTheme, children
}: ProvidersProps) {
    return <SessionProvider session={ session }>
        <RevalidationProvider>
            <ThemeProvider defaultTheme={ defaultTheme }>
                { children }
            </ThemeProvider>
        </RevalidationProvider>
    </SessionProvider>;
}
