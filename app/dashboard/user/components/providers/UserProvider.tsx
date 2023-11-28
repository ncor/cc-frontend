'use client';

import { UserContext } from "@/app/dashboard/users/contexts/user";
import { User } from "@/lib/user/types";
import { ReactNode, useState } from "react";


export interface UserProviderProps {
    defaultUser: User,
    children: ReactNode
}

export default function UserProvider({
    defaultUser, children
}: UserProviderProps) {
    const [ user, setUser ] = useState<User>(defaultUser);

    return <UserContext.Provider value={{ user, setUser }}>
        { children }
    </UserContext.Provider>;
}
