'use client';

import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PermissionsFormFields from "../../components/resource/permissions/PermissionsFormFields";
import { Proxy } from "@/lib/models/proxy/types";
import useProxies from "../hooks/data/proxy";
import useUser from "../../users/hooks/user";
import TagSelectFormField from "../../tags/components/TagSelectFormField";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import useUpsertForm from "@/app/hooks/upsert-form";


const proxySchema = z.object({
    url: z.string().min(2),
    tags: z.array(z.string().min(2).max(50)),
    owner_id: z.string(),
    is_public: z.boolean(),
});

export type ProxySchemaType = z.infer<typeof proxySchema>;

export interface ProxyFormProps {
    reference?: Proxy,
    onSubmit?: <T>(form: T) => void
}

export default function ProxyForm({
    reference, onSubmit
}: ProxyFormProps) {
    const user = useUser();
    const { create: createProxy, update: updateProxy } = useProxies();
    
    const { form, submit, isLoading } = useUpsertForm({
        schema: proxySchema,
        defaults: {
            url: '',
            tags: [],
            is_public: false,
            owner_id: user.id
        },
        updateCallback: updateProxy,
        insertCallback: createProxy,
        updateReference: reference,
        onSubmit
    });

    return (
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit(submit) } className="space-y-8">
                <FormField
                    control={ form.control }
                    name="url"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>URL</FormLabel>
                            <FormControl>
                                <Input placeholder="URL" { ...field } />
                            </FormControl>
                            <FormDescription>
                                Поддерживаются только прокси протоколов SOCKS и HTTPS.<br/>
                                Формат: proto://user:password@host:port
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                    disabled={ isLoading }
                />
                <TagSelectFormField
                    form={ form }
                    disabled={ isLoading }
                />
                {
                    user.is_admin &&
                    <PermissionsFormFields
                        form={ form }
                        disabled={ isLoading }
                    />
                }
                <Button type="submit" className="w-full" disabled={ isLoading }>
                    <LoadingSpinner isLoading={ isLoading }/>
                    Сохранить
                </Button>
            </form>
        </Form>
    );
}
