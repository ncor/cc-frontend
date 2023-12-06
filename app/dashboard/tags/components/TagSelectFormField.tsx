'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TagSelect from "./TagSelect";
import { Tag } from "@/lib/models/tag/types";


export interface PermissionsFormFieldsProps {
    form: any,
    disabled: boolean,
    defaultValues?: Tag[]
}

export default function TagSelectFormField({
    form, disabled, defaultValues
}: PermissionsFormFieldsProps) {
    return <>
        <FormField
            control={ form.control }
            name="tags"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Теги</FormLabel>
                    <FormControl>
                        <TagSelect
                            defaultValues={ defaultValues }
                            onValuesChange={ (tags: Tag[]) =>
                                form?.setValue('tags', {
                                    set: [],
                                    connect: tags.map(({ id }) => ({ id }))
                                })
                            }
                            disabled={ disabled }
                            className="w-full"
                        />
                    </FormControl>
                    <FormMessage/>
                </FormItem>
            )}
            disabled={ disabled }
        />
    </>
}
