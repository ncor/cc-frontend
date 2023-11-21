import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType, z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import useSuspense from "@/app/hooks/suspense";
import { updateSessionUser } from '../../../../lib/user/endpoints';
import { useContext } from "react";
import { sessionContext } from "../../contexts/session";


export const pickNameSchema = z.object({
    name: z.string().min(2).max(50)
});

export type PickNameSchemaType = typeof pickNameSchema;

export interface PickNameFormProps {
    onSubmit?: <T extends ZodType<any, any, any>>(form: z.infer<T>) => void
}

export default function PickNameForm({ onSubmit }: PickNameFormProps) {
    const session = useContext(sessionContext);
    const { isLoading, suspenseFor } = useSuspense();

    const form = useForm<z.infer<PickNameSchemaType>>({
        resolver: zodResolver(pickNameSchema),
        defaultValues: {
            name: ''
        }
    });

    const submit = async (form: z.infer<PickNameSchemaType>) => {
        await suspenseFor(() => updateSessionUser(session, { 
            where: { id: session.user.id }, data: form
        }));
        onSubmit && onSubmit<PickNameSchemaType>(form);
    }

    return (
        <Form {...form}>
            <form onSubmit={ form.handleSubmit(submit) } className="space-y-8">
                <FormField
                    control={ form.control }
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Никнейм</FormLabel>
                            <FormControl>
                                <Input placeholder="Никнейм" { ...field } />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                    disabled={ isLoading }
                />
                <Button type="submit" className="w-full" disabled={ isLoading }>
                    { isLoading && (
                        <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                    ) }
                    Сохранить
                </Button>
            </form>
        </Form>
    );
}
