"use client";

import { ModalProps } from "@/lib/client/types";
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
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { VisibilityInterface } from '@/app/hooks/visibility';
import useRemoval from "@/app/hooks/removal";
import useAccounts from "../hooks/data/accounts";
import { Account } from "@/lib/models/account/types";


export type AccountDeleteModalProps = ModalProps & {
    visibility: VisibilityInterface,
    reference: Account
};

export default function AccountDeleteModal({
    visibility, reference, onSubmit
}: AccountDeleteModalProps) {
    const { remove } = useAccounts();
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
                        удалит этот аккаунт с нашего сервера.
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
