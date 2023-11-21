'use client';

import { useState } from "react";


export default function useSuspense() {
    const [ isLoading, setIsLoading ] = useState<boolean>(false);

    const suspenseFor = async <R>(
        callback: (...args: any) => R
    ): Promise<Awaited<R>> => {
        setIsLoading(true);
        const response = await callback();
        setIsLoading(false);
        return response;
    }

    return { isLoading, setIsLoading, suspenseFor };
}
