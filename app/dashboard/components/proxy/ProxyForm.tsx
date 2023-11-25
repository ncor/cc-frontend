import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import TagsFormFields from "../tag/TagSelectFormField";
import PermissionsFormFields from "../resource/permissions/PermissionsFormFields";
import { useToast } from "@/components/ui/use-toast";
import useSuspense from "@/app/hooks/suspense";
import { Proxy } from "@/lib/proxy/types";
import { useContext } from "react";
import useProxies from "../../../hooks/data/proxy";
import { isAdmin } from "@/lib/user/service";
import { useSession } from "next-auth/react";
import { RevalidationContext } from "@/app/contexts/revalidation";
import useUser from "@/app/hooks/user";


const proxySchema = z.object({
    url: z.string().min(2),
    tags: z.array(z.string().min(2).max(50)),
    owner_id: z.string(),
    is_public: z.boolean(),
});

export type ProxySchemaType = typeof proxySchema;

export interface ProxyFormProps {
    update?: Proxy,
    onSubmit?: <T extends ZodType<any, any, any>>(form: z.infer<T>) => void
}

export default function ProxyForm({
    update, onSubmit
}: ProxyFormProps) {
    const toast = useToast();
    const user = useUser();
    const { revalidate } = useContext(RevalidationContext);
    const { create: createProxy, update: updateProxy } = useProxies();
    const { isLoading, suspenseFor } = useSuspense();

    const form = useForm<z.infer<ProxySchemaType>>({
        resolver: zodResolver(proxySchema),
        defaultValues: Object.assign({
            url: '',
            tags: [],
            is_public: false,
            owner_id: user.id
        }, update || {})
    });

    const submit = async (form: z.infer<ProxySchemaType>) => {
        const response = await suspenseFor(async () => {
            return update
                ? updateProxy({ where: { id: update.id },  data: form })
                : createProxy({ data: form });
        });

        if (!response.error) {
            onSubmit && onSubmit<ProxySchemaType>(form);
            toast.toast({
                title: 'Успешно',
                description: 'Прокси сохранен.'
            });
        }

        revalidate();
    }

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
                                Формат: ?://user:password:host:port
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                    disabled={ isLoading }
                />
                <TagsFormFields
                    form={ form }
                    disabled={ isLoading }
                />
                {
                    isAdmin(user.roles) &&
                    <PermissionsFormFields
                        form={ form }
                        disabled={ isLoading }
                    />
                }
                <Button type="submit" className="w-full" disabled={ isLoading }>
                    {
                        isLoading && 
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                    }
                    Сохранить
                </Button>
            </form>
        </Form>
    );
}
