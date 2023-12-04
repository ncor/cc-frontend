'use client';

import { ServerActionResponse } from "@/lib/common/middlewares/server-action/types";
import useSuspense from "./suspense";
import { useToast } from "@/components/ui/use-toast";
import useRevalidation from "./revalidation";
import { ZodObject } from "zod";
import { DefaultValues, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { excludeEmptyRecords } from "@/lib/helpers";


export interface UseUpsertFormOptions<T, F> {
    schema: ZodObject<any, any, any>,
    defaults: DefaultValues<F>,
    updateCallback: (query: any) => Promise<ServerActionResponse<any>>,
    insertCallback: (query: any) => Promise<ServerActionResponse<any>>,
    onSubmit?: <F>(form: F) => void,
    updateReference?: T,
    mask?: Partial<T>
}

export default function useUpsertForm<
    T extends { id: any },
    F extends FieldValues
>(
    options: UseUpsertFormOptions<T, F>
) {
    const toast = useToast();
    const suspense = useSuspense();
    const { revalidate } = useRevalidation();

    const form = useForm<F>({
        resolver: zodResolver(options.schema),
        defaultValues: Object.assign(
            options.defaults, 
            options.updateReference || {},
            options.mask || {}
        ),
    });

    const submit = async (form: F) => {
        const response = await suspense.suspenseFor(async () => {
            return options.updateReference
                ? options.updateCallback({
                    where: { id: options.updateReference.id },
                    data: excludeEmptyRecords(form)
                })
                : options.insertCallback({ data: form })
        });

        if (!response.error) {
            options.onSubmit && options.onSubmit(form);
            toast.toast({
                title: 'Успешно',
                description: 'Данные сохранены.'
            });
            revalidate();
        }
    }

    return { form, submit, ...suspense }
}
