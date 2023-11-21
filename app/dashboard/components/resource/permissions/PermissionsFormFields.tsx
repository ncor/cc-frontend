import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Users2 } from "lucide-react";


export interface PermissionsFormFieldsProps {
    form: any,
    disabled: boolean
}

export default function IsPublicFormField({
    form, disabled
}: PermissionsFormFieldsProps) {
    return <>
        <FormField
            control={ form.control }
            name="is_public"
            render={({ field }) => (
                <FormItem
                    className="flex flex-row items-center justify-between rounded-lg border p-4"
                >
                    <div>
                        <FormLabel className="text-base flex items-center mb-2">
                            <Users2 className="w-5 h-5 mr-2"/>
                            Сделать публичным
                        </FormLabel>
                        <FormDescription className="pr-6">
                            Публичные ресурсы доступны другим пользователям
                            и следуют более открытой политики использования.
                        </FormDescription>
                    </div>
                    <FormControl>
                        <Switch
                            checked={ field.value }
                            onCheckedChange={ field.onChange }
                        />
                    </FormControl>
                </FormItem>
            )}
            disabled={ disabled }
        />
    </>
}
