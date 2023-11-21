'use client';

import { Session } from "@supabase/supabase-js";
import { ReactNode, useEffect, useState } from "react";
import { User } from "@/lib/user/types";
import PickNameModal from "./components/user/PickNameModal";
import { useToast } from "@/components/ui/use-toast";
import { getSessionUser } from "@/lib/user/endpoints";
import handleResponse from "@/app/dashboard/hooks/cook";
import { userContext } from "./contexts/user";
import { sessionContext } from './contexts/session';
import { revalidationContext } from "./contexts/revalidation";
import Header from "./components/header/Header";


export type DashboardClientLayoutProps = {
    session: Session,
    sessionUser: User,
    children: ReactNode
};

export default function DashboardClientLayout({
    session, sessionUser, children
}: DashboardClientLayoutProps) {
    const toast = useToast();
    const [ user, setUser ] = useState<User>(sessionUser);
    const [ revalidated, revalidate ] = useState<number>(Math.random());

    return <revalidationContext.Provider value={{
        revalidated, revalidate: () => { revalidate(Math.random()) }
    }}>
        <sessionContext.Provider value={ session }>
            <userContext.Provider value={ user }>
                <div className="w-full h-screen flex flex-col">
                    { user && !user.name &&
                        <PickNameModal onSubmit={ form => setUser({
                            ...user, name: form.name
                        }) }/>
                    }
                    <Header/>
                    { children }
                </div>
            </userContext.Provider>
        </sessionContext.Provider>
    </revalidationContext.Provider>;
}
