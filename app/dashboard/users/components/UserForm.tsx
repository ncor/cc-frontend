import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import { useToast } from "@/components/ui/use-toast";
import useSuspense from "@/app/hooks/suspense";
import { User } from "@/lib/user/types";
import { useContext } from "react";
import { RevalidationContext } from "@/app/contexts/revalidation";
import { Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import useUser from "../hooks/user";
import useUsers from "@/app/hooks/data/user";
import { excludeEmptyRecords } from "@/lib/helpers";


const userSchema = z.object({
    name: z.string().min(2).max(50),
    password: z.string().min(8).max(64),
    is_admin: z.boolean()
});

export type UserSchemaType = typeof userSchema;

export interface UserFormProps {
    update?: User,
    onSubmit?: <T extends ZodType<any, any, any>>(form: z.infer<T>) => void
}

export default function UserForm({
    update, onSubmit
}: UserFormProps) {
    const toast = useToast();
    const user = useUser();
    const { create: createUser, update: updateUser } = useUsers();
    const { isLoading, suspenseFor } = useSuspense();
    const { revalidate } = useContext(RevalidationContext);

    const form = useForm<z.infer<UserSchemaType>>({
        resolver: zodResolver(userSchema),
        defaultValues: Object.assign(
            {
                name: '',
                password: '',
                is_admin: false
            },
            update || {},
            { password: '' }
        )
    });

    const submit = async (form: z.infer<UserSchemaType>) => {
        const response = await suspenseFor(async () => {
            return update
                ? updateUser({
                    where: { id: update.id },
                    data: excludeEmptyRecords(form)
                })
                : createUser({ data: form });
        });

        if (!response.error) {
            onSubmit && onSubmit<UserSchemaType>(form);
            toast.toast({
                title: 'Успешно',
                description: 'Пользователь сохранен.'
            });
            revalidate();
        }
    }

    return (
        <Form { ...form }>
            <form onSubmit={ form.handleSubmit(submit) } className="space-y-8">
                <FormField
                    control={ form.control }
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                                <Input
                                    autoComplete="new-password"
                                    placeholder="Имя" { ...field }                            
                                />
                            </FormControl>
                            <FormDescription>
                                Советуем использовать только латинские буквы и нижние подчеркивания.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                    disabled={ isLoading }
                />
                {
                    (user.id == update?.id || !update?.is_admin) &&
                    <FormField
                        control={ form.control }
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Пароль</FormLabel>
                                <FormControl>
                                    <Input
                                        autoComplete="new-password"
                                        type="password"
                                        placeholder="Пароль"
                                        { ...field }
                                    />
                                </FormControl>
                                <FormDescription>
                                    От 8 до 64 символов.
                                </FormDescription>
                                <FormMessage/>
                            </FormItem>
                        )}
                        disabled={ isLoading }
                    />
                }
                {
                    user.id != update?.id && !update?.is_admin &&
                    <FormField
                        control={ form.control }
                        name="is_admin"
                        render={({ field }) => (
                            <FormItem
                                className="flex flex-row items-center justify-between rounded-lg bg-red-500/10 text-red-500 stroke-red-500 p-6"
                            >
                                <div>
                                    <FormLabel className="text-base flex items-center mb-2">
                                        <Shield className="w-5 h-5 mr-2"/>
                                        Сделать администратором
                                    </FormLabel>
                                    <FormDescription className="pr-6 text-red-500">
                                        Администраторы являются частью команды, будьте аккуратны с этим действием.
                                    </FormDescription>
                                </div>
                                <FormControl>
                                    <Switch
                                        className="data-[state=unchecked]:bg-red-500/25 data-[state=checked]:bg-red-500"
                                        checked={ field.value }
                                        onCheckedChange={ field.onChange }
                                    />
                                </FormControl>
                            </FormItem>
                        )}
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
