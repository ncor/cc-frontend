'use client';

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Edit2, Trash } from "lucide-react";
import AccountModal from "./AccountModal";
import AccountDeleteModal from "./AccountDeleteModal";
import useUser from "../../users/hooks/user";
import { RowActions } from "@/lib/common/types";
import useVisibility, { VisibilityInterface } from "@/app/hooks/visibility";
import useAccounts from "../hooks/data/accounts";
import { Account } from "@/lib/models/account/types";


export type AccountActionsMenuProps = {
    visibility: VisibilityInterface,
    reference: Account<{ user: true, proxy: true, tags: true }>
};

export default function AccountActionsMenu({
    visibility, reference
}: AccountActionsMenuProps) {
    const { can } = useAccounts();
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
                can(RowActions.UPDATE, reference, user) &&
                <DropdownMenuItem
                    onClick={ () => editModal.toggle(true) }
                    className="cursor-pointer"
                >
                    <Edit2 className="mr-2 h-4 w-4"/>
                    Редактировать
                </DropdownMenuItem>
            }
            {
                can(RowActions.DELETE, reference, user) &&
                <DropdownMenuItem
                    onClick={ () => deleteModal.toggle(true) }
                    className="cursor-pointer text-red-500"
                >
                    <Trash className="mr-2 h-4 w-4"/>
                    Удалить
                </DropdownMenuItem>
            }
        </DropdownMenuContent>
        <AccountModal
            reference={ reference }
            visibility={ editModal }
        />
        <AccountDeleteModal
            reference={ reference }
            visibility={ deleteModal }
        />
    </DropdownMenu>;
}
