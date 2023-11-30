'use client';

import { EndpointResponse } from "@/lib/endpoint/types";


export type CookPayload = {
    error: any
} | undefined;

export function burnt(
    toast: any, message: string
) {
    toast?.toast({
        title: 'Что-то пошло не так',
        description: message,
        variant: 'destructive'
    })
}

export default function cook<T>(
    toast: any, response: EndpointResponse<T>
) {
    if (response?.error)
        burnt(toast, response.error.message);

    return response;
}
