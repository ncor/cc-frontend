import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import CreateTagForm, { CreateTagFormProps } from "./CreateTagForm";
import { ModalProps } from "@/lib/client/types";


export type CreateTagModalProps = ModalProps & CreateTagFormProps;

export default function CreateTagModal({
    children, onSubmit
}: CreateTagModalProps) {
    const [ open, setOpen ] = useState<boolean>(false);

    return <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
            { children }
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Новый тег</DialogTitle>
                <DialogDescription>
                    Теги служат для маркировки аккаунтов и прокси, упрощая организацию и поиск.
                </DialogDescription>
            </DialogHeader>
            <CreateTagForm
                onSubmit={ form => {
                    setOpen(false);
                    onSubmit && onSubmit(form);
                } }
            />
        </DialogContent>
    </Dialog>
}