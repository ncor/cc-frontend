'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import ProxySelect from "./ProxySelect";
import { Proxy } from "@/lib/models/proxy/types";


export interface ProxySelectFormFieldProps {
    form: any,
    disabled: boolean,
    defaultValue?: Proxy
}

export default function ProxySelectFormField({
    form, disabled, defaultValue
}: ProxySelectFormFieldProps) {
    return <>
        <FormField
            control={ form.control }
            name="proxy_id"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Прокси</FormLabel>
                    <FormControl>
                        <ProxySelect
                            defaultValue={ defaultValue }
                            onProxyChange={ (proxy?: Proxy) => {
                                console.log(proxy);
                                form?.setValue('proxy_id', proxy?.id)
                            } }
                            disabled={ disabled }
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            disabled={ disabled }
        />
    </>
}
