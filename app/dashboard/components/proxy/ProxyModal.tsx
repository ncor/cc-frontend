"use client";

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ModalProps } from "@/lib/client/types";
import ProxyForm, { ProxyFormProps } from "./ProxyForm";
import { User } from "@/lib/user/types";
import { Proxy } from "@/lib/proxy/types";
import UserChip from "../user/UserChip";


export type ProxyModalProps = ModalProps & {
    update?: Proxy & { user: User }
};

export default function ProxyModal({
    children, update, onSubmit
}: ProxyModalProps) {
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
                            <div className="px-3 py-2 bg-zinc-900 rounded-md">
                                <UserChip user={ update.user }/>
                            </div>
                        }
                        Прокси
                    </DialogTitle>
                    <DialogDescription>
                        Прокси используются для анонимизации запросов и обхода лимита частоты запросов.
                    </DialogDescription>
                </DialogHeader>
                <ProxyForm
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
