"use client";

import { ModalProps } from "@/lib/client/types";
import { User } from "@/lib/user/types";
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
import useUsers from "../hooks/data/user";
import LoadingSpinner from "@/app/components/LoadingSpinner";
import { VisibilityInterface } from "@/app/hooks/visibility";
import useRemoval from '@/app/hooks/removal';


export type UserDeleteModalProps = ModalProps & {
    visibility: VisibilityInterface,
    reference: User
};

export default function UserDeleteModal({
    visibility, reference, onSubmit
}: UserDeleteModalProps) {
    const { remove } = useUsers();
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
                        удалит этого пользователя с нашего сервера.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={isLoading}>
                        Отмена
                    </AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
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
