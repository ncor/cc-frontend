'use client';

import useRevalidation from "./revalidation";
import useSuspense from "./suspense";


export interface UseRemovalParams<T> {
    removeCallback: (query: any) => Promise<any>,
    removeReference: T,
    onSubmit?: Function
}

export default function useRemoval<T extends { id: any }>(
    params: UseRemovalParams<T>
) {
    const suspense = useSuspense();
    const { revalidate } = useRevalidation();

    const handleRemove = async () => {
        await suspense.suspenseFor(() =>
            params.removeCallback({
                where: { id: params.removeReference.id }
            })
        );
        params.onSubmit && params.onSubmit();
        revalidate();
    }

    return { handleRemove, ...suspense };
}
