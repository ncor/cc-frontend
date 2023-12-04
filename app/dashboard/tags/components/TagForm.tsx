'use client';

import { z } from "zod";
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
import useTags from "../hooks/data/tag";
import PermissionsFormFields from "../../components/resource/permissions/PermissionsFormFields";
import useUser from "../../users/hooks/user";
import { Tag } from "@/lib/models/tag/types";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { useToast } from "@/components/ui/use-toast";
import useUpsertForm from "@/app/hooks/upsert-form";


export const tagSchema = z.object({
    name: z.string().min(2).max(50),
    owner_id: z.string(),
    is_public: z.boolean(),
});

export type TagSchemaType = z.infer<typeof tagSchema>;

export interface TagFormProps {
    reference?: Tag,
    onSubmit?: <T>(form: T) => void;
}

export default function TagForm({
    reference, onSubmit
}: TagFormProps) {
    const user = useUser();
    const { update: updateTag, create: createTag } = useTags();

    const { form, submit, isLoading } = useUpsertForm({
        schema: tagSchema,
        defaults: {
            name: '',
            is_public: false,
            owner_id: user.id
        },
        updateCallback: updateTag,
        insertCallback: createTag,
        updateReference: reference,
        onSubmit
    });

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
