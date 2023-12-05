'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ProxySelect from "./ProxySelect";
import useProxies from "../hooks/data/proxy";
import { useEffect, useState } from "react";
import { Proxy } from "@/lib/models/proxy/types";
import useSuspense from "@/app/hooks/suspense";


export interface ProxySelectFormFieldProps {
    form: any,
    disabled: boolean
}

export default function ProxySelectFormField({
    form, disabled
}: ProxySelectFormFieldProps) {
    const { find } = useProxies();
    const [
        selectedReference,
        setSelectedReference
    ] = useState<Proxy | undefined>();

    const { suspenseFor, isLoading } = useSuspense();

    const getSelectedReference = async (id: number) => {
        const { data: proxy } = await suspenseFor(() => find({ where: { id } }));
        setSelectedReference(proxy?.[0]);
    }

    useEffect(() => {
        getSelectedReference(form?.getValues('proxy_id') as number);
    }, []);

    return <>
        <FormField
            control={ form.control }
            name="proxy_id"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Прокси</FormLabel>
                    <FormControl>
                        <ProxySelect
                            selected={ selectedReference }
                            onProxyChange={ (id: number) =>
                                form?.setValue('proxy_id', id)
                            }
                            disabled={ disabled || isLoading }
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            disabled={ disabled }
        />
    </>
}
