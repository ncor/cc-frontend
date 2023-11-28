"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ModalProps } from "@/lib/client/types";
import UserForm, { UserFormProps } from "./UserForm";
import UserChip from "./UserChip";


export type UserModalProps = ModalProps & UserFormProps;

export default function UserModal({
    children, update, onSubmit
}: UserModalProps) {
    const [ open, setOpen ] = useState<boolean>(false);

    return (
        <Dialog open={ open } onOpenChange={ setOpen }>
            <DialogTrigger>
                { children }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {
                            update &&
                            <UserChip user={ update } card/>
                        }
                        Пользователь
                    </DialogTitle>
                    <DialogDescription>
                        Данные того, кто пользуется панелью.
                    </DialogDescription>
                </DialogHeader>
                <UserForm
                    update={ update }
                    onSubmit={ form => {
                        setOpen(false);
                        onSubmit && onSubmit(form);
                    } }
                />
            </DialogContent>
        </Dialog>
    );
}
