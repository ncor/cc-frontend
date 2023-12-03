"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import useTags from "@/app/dashboard/tags/hooks/data/tag";
import useRemoval from "@/app/hooks/removal";
import useRevalidation from "@/app/hooks/revalidation";
import useSuspense from "@/app/hooks/suspense";
import { VisibilityInterface } from "@/app/hooks/visibility";
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
import { ModalProps } from "@/lib/client/types";
import { Tag } from "@/lib/tag/types";


export type TagDeleteModalProps = ModalProps & {
    visibility: VisibilityInterface,
    reference: Tag
};

export default function TagDeleteModal({
    visibility, reference, onSubmit
}: TagDeleteModalProps) {
    const { remove } = useTags();
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
                        Это действие нельзя отменить. Это действие удалит
                        тег из вашего быстрого списка. Если тег публичный, он
                        станет недоступен для выбора и остальным пользователям.
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
