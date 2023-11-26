import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import useSuspense from "@/app/hooks/suspense";
import { useContext } from "react";
import { RevalidationContext } from "../../../contexts/revalidation";
import useTags from "../../../hooks/data/tag";
import PermissionsFormFields from "../resource/permissions/PermissionsFormFields";
import useUser from "@/app/hooks/user";

export const createTagSchema = z.object({
    name: z.string().min(2).max(50),
    owner_id: z.string(),
    is_public: z.boolean(),
});

export type CreateTagSchemaType = typeof createTagSchema;

export interface CreateTagFormProps {
    onSubmit?: <T extends ZodType<any, any, any>>(form: z.infer<T>) => void;
}

export default function CreateTagForm({ onSubmit }: CreateTagFormProps) {
    const user = useUser();
    const { create } = useTags();
    const { revalidate } = useContext(RevalidationContext);
    const { isLoading, suspenseFor } = useSuspense();

    const form = useForm<z.infer<CreateTagSchemaType>>({
        resolver: zodResolver(createTagSchema),
        defaultValues: {
            name: "",
            owner_id: user.id,
            is_public: false,
        },
    });

    const submit = async (form: z.infer<CreateTagSchemaType>) => {
        const response = await suspenseFor(() => create({ data: form }));

        if (!response.error) {
            onSubmit && onSubmit<CreateTagSchemaType>(form);
            revalidate();
        }
    };

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Имя тега</FormLabel>
                            <FormControl>
                                <Input placeholder="Имя тега" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    disabled={isLoading}
                />
                {user.is_admin && (
                    <PermissionsFormFields form={form} disabled={isLoading} />
                )}
                <Button type="submit" className="w-full" disabled={isLoading}>
                    {isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Создать тег
                </Button>
            </form>
        </Form>
    );
}
