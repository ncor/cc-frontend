"use client";

import { ModalProps } from "@/lib/client/types";
import { Proxy } from "@/lib/models/proxy/types";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useProxies from "../hooks/data/proxy";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { VisibilityInterface } from '@/app/hooks/visibility';
import useRemoval from "@/app/hooks/removal";


export type ProxyDeleteModalProps = ModalProps & {
    visibility: VisibilityInterface,
    reference: Proxy
};

export default function ProxyDeleteModal({
    visibility, reference, onSubmit
}: ProxyDeleteModalProps) {
    const { remove } = useProxies();
    const { handleRemove, isLoading } = useRemoval({
        removeCallback: remove,
        removeReference: reference,
        onSubmit
    });

    return (
        <AlertDialog
            open={ visibility.isVisible }
            onOpenChange={ open => visibility.toggle(open) }
        >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Это действие нельзя отменить. Это действие полностью
                        удалит этот прокси с нашего сервера.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={ isLoading }>
                        Отмена
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={ isLoading }
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        onClick={ () => handleRemove() }
                    >
                        <LoadingSpinner isLoading={ isLoading }/>
                        Да, удалить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
