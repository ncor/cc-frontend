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
            <DialogTrigger className="w-full">
                { children }
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {
                            update &&
                            <div className="px-3 py-2 bg-zinc-900 rounded-md">
                                <UserChip user={ update }/>
                            </div>
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
