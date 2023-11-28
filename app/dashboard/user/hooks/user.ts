'use client';

import { useContext } from "react";
import { UserContext } from "../contexts/user";
import { useSession } from "next-auth/react";


export default function useUser() {
    const session = useSession();
    const { user } = useContext(UserContext);

    return session?.data?.user?.id ? session.data.user : user;
}
