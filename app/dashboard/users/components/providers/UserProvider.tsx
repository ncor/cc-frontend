'use client';

import { User } from "@/lib/user/types";
import { ReactNode, useState } from "react";
import { UserContext } from "../../contexts/user";


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
