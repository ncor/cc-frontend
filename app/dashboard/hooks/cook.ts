'use client';

import { EndpointResponse } from "@/lib/endpoint";


export default function cook<T>(
    toast: any, response: EndpointResponse<T>
) {
    if (response.error) {
        toast?.toast({
            title: 'Что-то пошло не так',
            description: response.error.message,
            variant: 'destructive'
        });
    }

    return response;
}
