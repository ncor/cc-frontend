'use client';

import { User } from "@/lib/models/user/types";
import { ReactNode, useState } from "react";
import { UserContext } from "../../contexts/user";
import { signOut } from "next-auth/react";


export interface UserProviderProps {
    children: ReactNode,
    defaultUser?: User
}

export default function UserProvider({
    defaultUser, children
}: UserProviderProps) {
    const [ user, setUser ] = useState<User | undefined>(defaultUser);
    
    if (!user) return signOut();

    return <UserContext.Provider value={{ user, setUser }}>
        { children }
    </UserContext.Provider>;
}
