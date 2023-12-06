"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ModalProps } from "@/lib/client/types";
import AccountForm from "./AccountForm";
import { Account } from "@/lib/models/account/types";
import UserChip from "../../users/components/UserChip";
import { VisibilityInterface } from "@/app/hooks/visibility";


export type AccountModalProps = ModalProps & {
    visibility: VisibilityInterface,
    reference?: Account<{ user: true, proxy: true, tags: true }>
};

export default function AccountModal({
    visibility, reference, onSubmit
}: AccountModalProps) {
    return (
        <Dialog
            open={ visibility.isVisible }
            onOpenChange={ open => visibility.toggle(open) }
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        {
                            reference &&
                            <UserChip user={ reference.user } card/>
                        }
                        Аккаунт
                    </DialogTitle>
                    <DialogDescription>
                        Точки входа в рекламную систему Facebook.
                    </DialogDescription>
                </DialogHeader>
                <AccountForm
                    reference={ reference }
                    onSubmit={ form => {
                        visibility.toggle(false);
                        onSubmit && onSubmit(form);
                    } }
                />
            </DialogContent>
        </Dialog>
    );
}
