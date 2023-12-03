'use client';

import { EndpointResponse } from "@/lib/endpoint/types";
import useSuspense from "./suspense";
import { useToast } from "@/components/ui/use-toast";
import useRevalidation from "./revalidation";
import { ZodObject } from "zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { excludeEmptyRecords } from "@/lib/helpers";


export interface UseUpsertFormParams<T, F> {
    schema: ZodObject<any, any, any>,
    defaults: DefaultValues<F>,
    updateCallback: (query: any) => Promise<EndpointResponse<any>>,
    insertCallback: (query: any) => Promise<EndpointResponse<any>>,
    onSubmit?: <F>(form: F) => void,
    updateReference?: T,
    mask?: Partial<T>
}

export default function useUpsertForm<
    T extends { id: any },
    F extends FieldValues
>(
    params: UseUpsertFormParams<T, F>
) {
    const toast = useToast();
    const suspense = useSuspense();
    const { revalidate } = useRevalidation();

    const form = useForm<F>({
        resolver: zodResolver(params.schema),
        defaultValues: Object.assign(
            params.defaults, 
            params.updateReference || {},
            params.mask || {}
        ),
    });

    const submit = async (form: F) => {
        const response = await suspense.suspenseFor(async () => {
            return params.updateReference
                ? params.updateCallback({
                    where: {id: params.updateReference.id },
                    data: excludeEmptyRecords(form)
                })
                : params.insertCallback({ data: form })
        });

        if (!response.error) {
            params.onSubmit && params.onSubmit(form);
            toast.toast({
                title: 'Успешно',
                description: 'Данные сохранены.'
            });
            revalidate();
        }
    }

    return { form, submit, ...suspense }
}
