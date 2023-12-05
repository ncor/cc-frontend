'use client';

import { z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PermissionsFormFields from "../../components/resource/permissions/PermissionsFormFields";
import { Account } from "@/lib/models/account/types";
import useUser from "../../users/hooks/user";
import TagSelectFormField from "../../tags/components/TagSelectFormField";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import useUpsertForm from "@/app/hooks/upsert-form";
import useAccounts from "../hooks/data/accounts";
import ProxySelectFormField from "../../proxy/components/ProxySelectFormField";


const accountSchema = z.object({
    proxy_id: z.number(),
    name: z.string().min(2),
    token: z.string(),
    cookies: z.string(),
    tags: z.array(z.string().min(2).max(50)),
    owner_id: z.string(),
    is_public: z.boolean(),
});

export type AccountSchemaType = z.infer<typeof accountSchema>;

export interface AccountFormProps {
    reference?: Account,
    onSubmit?: <T>(form: T) => void
}

export default function AccountForm({
    reference, onSubmit
}: AccountFormProps) {
    const user = useUser();
    const { create: createAccount, update: updateAccount } = useAccounts();
    
    const { form, submit, isLoading } = useUpsertForm({
        schema: accountSchema,
        defaults: {
            proxy_id: undefined,
            name: '',
            token: '',
            cookies: '',
            tags: [],
            is_public: false,
            owner_id: user.id
        },
        updateCallback: updateAccount,
        insertCallback: createAccount,
        updateReference: reference,
        onSubmit
    });

    return (
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit(submit) } className="space-y-8">
                <ProxySelectFormField
                    form={ form }
                    disabled={ isLoading }
                />
                <FormField
                    control={ form.control }
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                                <Input placeholder="Имя" { ...field } />
                            </FormControl>
                            <FormDescription>
                                Техническое название.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                    disabled={ isLoading }
                />
                <FormField
                    control={ form.control }
                    name="token"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Токен</FormLabel>
                            <FormControl>
                                <Input placeholder="Токен" { ...field } />
                            </FormControl>
                            <FormDescription>
                                Токен аутентификации Facebook.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                    disabled={ isLoading }
                />
                <FormField
                    control={ form.control }
                    name="cookies"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Cookies</FormLabel>
                            <FormControl>
                                <Input placeholder="Cookies" { ...field } />
                            </FormControl>
                            <FormDescription>
                                Переменные для верификации пользователя.
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
