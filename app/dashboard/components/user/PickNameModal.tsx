import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import { ModalProps } from "@/lib/client/types";
import PickNameForm, { PickNameFormProps } from "./PickNameForm";


export type PickNameModalProps = Omit<ModalProps & PickNameFormProps, 'children'>;

export default function PickNameModal({ onSubmit }: PickNameModalProps) {
    const [ open, setOpen ] = useState<boolean>(true);

    return <Dialog open={ open }>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Никнейм</DialogTitle>
                <DialogDescription>
                    Добро пожаловать! Установите никнейм, прежде чем начать работу.
                </DialogDescription>
            </DialogHeader>
            <PickNameForm
                onSubmit={ form => {
                    setOpen(false);
                    onSubmit && onSubmit(form);
                } }
            />
        </DialogContent>
    </Dialog>
}
