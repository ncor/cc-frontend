'use client';

import { useState } from "react";


export default function useSuspense(initialyLoading=false) {
    const [ isLoading, setIsLoading ] = useState<boolean>(initialyLoading);

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
