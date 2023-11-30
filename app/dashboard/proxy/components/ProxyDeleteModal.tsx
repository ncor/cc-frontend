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
import LoadingSpinner from "@/app/components/LoadingSpinner";


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
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={async () => {
                            await suspenseFor(() =>
                                remove({ where: { id: data.id } })
                            );
                            onSubmit && onSubmit();
                            revalidate();
                        }}
                    >
                        <LoadingSpinner isLoading={ isLoading }/>
                        Да, удалить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
