'use client';

import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "@/lib/models/user/types";
import { Edit2, MoreHorizontal, Sword, Trash } from "lucide-react";
import UserModal from "./UserModal";
import UserDeleteModal from "./UserDeleteModal";
import useUser from "@/app/dashboard/users/hooks/user";
import useVisibility, { VisibilityInterface } from "@/app/hooks/visibility";


export type UserActionsMenuProps = {
    visibility: VisibilityInterface,
    reference: User
};

export default function UserActionsMenu({
    visibility, reference
}: UserActionsMenuProps) {
    const user = useUser();

    const editModal = useVisibility();
    const deleteModal = useVisibility();

    return <DropdownMenu
        open={ visibility.isVisible }
        onOpenChange={ open => visibility.toggle(open) }
    >
        <DropdownMenuTrigger/>
        <DropdownMenuContent align="end">
            {
               user.is_admin &&
               <DropdownMenuItem
                    onClick={ () => editModal.toggle(true) }
                    className="cursor-pointer"
                >
                    <Edit2 className="mr-2 h-4 w-4"/>
                    Редактировать
                </DropdownMenuItem>
            }
            {
                user.is_admin &&
                <DropdownMenuItem
                    onClick={ () => deleteModal.toggle(true) }
                    className="cursor-pointer text-red-500"
                >
                    <Trash className="mr-2 h-4 w-4"/>
                    Удалить
                </DropdownMenuItem>
            }
        </DropdownMenuContent>
        <UserModal
            reference={ reference }
            visibility={ editModal }
        />
        <UserDeleteModal
            reference={ reference }
            visibility={ deleteModal }
        />
    </DropdownMenu>
}
