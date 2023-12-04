'use client';

import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import TagForm from "./TagForm";
import { ModalProps } from "@/lib/client/types";
import { TagExtended } from "@/lib/models/tag/types";
import { VisibilityInterface } from "@/app/hooks/visibility";
import UserChip from "../../users/components/UserChip";


export type TagModalProps = ModalProps & {
    visibility: VisibilityInterface,
    reference?: TagExtended
};

export default function TagModal({
    visibility, reference, onSubmit
}: TagModalProps) {
    return <Dialog
        open={ visibility.isVisible }
        onOpenChange={ open => visibility.toggle(open) }
    >
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                    {
                        reference &&
                        <UserChip user={ reference.user } card/>
                    }
                    Тег
                </DialogTitle>
                <DialogDescription>
                    Теги служат для маркировки аккаунтов и прокси, упрощая организацию и поиск.
                </DialogDescription>
            </DialogHeader>
            <TagForm
                reference={ reference }
                onSubmit={ form => {
                    visibility.toggle(false);
                    onSubmit && onSubmit(form);
                } }
            />
        </DialogContent>
    </Dialog>
}
