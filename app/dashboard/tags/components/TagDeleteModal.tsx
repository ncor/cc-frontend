"use client";

import LoadingSpinner from "@/app/components/LoadingSpinner";
import useTags from "@/app/hooks/data/tag";
import useRevalidation from "@/app/hooks/revalidation";
import useSuspense from "@/app/hooks/suspense";
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
import { useState } from "react";


export type TagDeleteModalProps = ModalProps & {
    data: Tag;
};

export default function TagDeleteModal({
    children,
    data,
    onSubmit,
}: TagDeleteModalProps) {
    const { remove } = useTags();
    const { revalidate } = useRevalidation();
    const { isLoading, suspenseFor } = useSuspense();
    const [ open, setOpen ] = useState<boolean>(false);

    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger>{children}</AlertDialogTrigger>
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
