"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ModalProps } from "@/lib/client/types";
import ProxyForm from "./ProxyForm";
import { Proxy } from "@/lib/models/proxy/types";
import UserChip from "../../users/components/UserChip";
import { VisibilityInterface } from "@/app/hooks/visibility";
import ProxySelect from "./ProxySelect";


export type ProxyModalProps = ModalProps & {
    visibility: VisibilityInterface,
    reference?: Proxy<{ user: true, tags: true }>
};

export default function ProxyModal({
    visibility, reference, onSubmit
}: ProxyModalProps) {
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
                        Прокси
                    </DialogTitle>
                    <DialogDescription>
                        Прокси используются для анонимизации запросов и обхода лимита частоты запросов.
                    </DialogDescription>
                </DialogHeader>
                <ProxyForm
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
