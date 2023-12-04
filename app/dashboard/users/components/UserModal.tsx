"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ModalProps } from "@/lib/client/types";
import UserForm, { UserFormProps } from "./UserForm";
import UserChip from "./UserChip";
import { User } from "@/lib/models/user/types";
import { VisibilityInterface } from "@/app/hooks/visibility";


export type UserModalProps = ModalProps & {
    visibility: VisibilityInterface,
    reference?: User
};

export default function UserModal({
    visibility, reference, onSubmit
}: UserModalProps) {
    return <Dialog
        open={ visibility.isVisible }
        onOpenChange={ open => visibility.toggle(open) }
    >
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    {
                        reference &&
                        <UserChip user={ reference } card/>
                    }
                    Пользователь
                </DialogTitle>
                <DialogDescription>
                    Данные того, кто пользуется панелью.
                </DialogDescription>
            </DialogHeader>
            <UserForm
                reference={ reference }
                onSubmit={ form => {
                    visibility.toggle(false);
                    onSubmit && onSubmit(form);
                } }
            />
        </DialogContent>
    </Dialog>;
}
