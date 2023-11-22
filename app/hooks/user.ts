'use client';

import { useSession } from "next-auth/react";


export default function useUser() {
    return useSession()!.data!.user;
}
