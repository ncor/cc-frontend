'use client';

import { User } from "@/lib/models/user/types";
import { ReactNode, useState } from "react";
import { UserContext } from "../../contexts/user";
import { signOut } from "next-auth/react";


export interface UserProviderProps {
    children: ReactNode,
    defaultUser: User | null
}

export default function UserProvider({
    defaultUser, children
}: UserProviderProps) {
    const [ user, setUser ] = useState<User | null>(defaultUser);
    
    if (!user) return signOut();

    return <UserContext.Provider value={{ user, setUser }}>
        { children }
    </UserContext.Provider>;
}
