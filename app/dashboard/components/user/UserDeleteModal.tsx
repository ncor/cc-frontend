"use client";

import { useContext, useState } from "react";
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
import useUsers from "../../../hooks/data/user";
import { RevalidationContext } from "../../../contexts/revalidation";
import useSuspense from "@/app/hooks/suspense";
import LoadingSpinner from "@/app/components/LoadingSpinner";


export type UserDeleteModalProps = ModalProps & {
    data: User;
};

export default function UserDeleteModal({
    children,
    data,
    onSubmit,
}: UserDeleteModalProps) {
    const { remove } = useUsers();
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
                        удалит этого пользователя с нашего сервера.
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
                        <LoadingSpinner isLoading={ isLoading }/>
                        Да, удалить
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
