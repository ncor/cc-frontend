"use client";

import { useContext, useState } from "react";
import { ModalProps } from "@/lib/client/types";
import { Proxy } from "@/lib/proxy/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import useProxies from "../../../hooks/data/proxy";
import { RevalidationContext } from "../../../contexts/revalidation";
import useSuspense from "@/app/hooks/suspense";
import { Icons } from "@/components/ui/icons";

export type ProxyDeleteModalProps = ModalProps & {
    data: Proxy;
};

export default function ProxyDeleteModal({
    children,
    data,
    onSubmit,
}: ProxyDeleteModalProps) {
    const { remove } = useProxies();
    const { revalidate } = useContext(RevalidationContext);
    const { isLoading, suspenseFor } = useSuspense();
    const [ open, setOpen ] = useState<boolean>(false);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие нельзя отменить. Это действие полностью
                        удалит этот прокси с нашего сервера.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Отмена
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={async () => {
                            await suspenseFor(() =>
                                remove({ where: { id: data.id } })
                            );
                            onSubmit && onSubmit();
                            revalidate();
                        }}
                    >
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Да, удалить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
