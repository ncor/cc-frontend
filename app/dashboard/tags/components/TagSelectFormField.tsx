'use client';

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import TagSelector from "./TagSelector";


export interface PermissionsFormFieldsProps {
    form: any,
    disabled: boolean
}

export default function TagSelectFormField({
    form, disabled
}: PermissionsFormFieldsProps) {
    return <>
        <FormField
            control={ form.control }
            name="tags"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Теги</FormLabel>
                    <FormControl>
                        <TagSelector
                            selected={ form?.getValues('tags') }
                            onTagsChange={ (items: string[]) =>
                                form?.setValue('tags', items)
                            }
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
