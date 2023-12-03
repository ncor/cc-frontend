'use client';

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import UserAvatar from "./UserAvatar";
import UserChip from "./UserChip";
import UserModal from "./UserModal";
import useUser from "../hooks/user";
import useVisibility, { VisibilityInterface } from "@/app/hooks/visibility";
import { LogOut, User } from "lucide-react";


export interface UserMenuProps {
    visibility: VisibilityInterface
}

export default function UserMenu({
    visibility
}: UserMenuProps) {
    const user = useUser();

    const editModal = useVisibility();

    const leave = () =>
        signOut({ callbackUrl: window.location.origin + '/login' });

    return <DropdownMenu
        open={ visibility.isVisible }
        onOpenChange={ open => visibility.toggle(open) }
    >
        <DropdownMenuTrigger>
            <UserAvatar seed={ user.name }/>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                    <UserChip user={ user } includeAvatar={ false }/>
                    {
                        user.is_admin &&
                        <div className="text-xs leading-none text-muted-foreground">
                            Администратор
                        </div>                   
                    }
                </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                onClick={ () => editModal.toggle(true) }
                className="cursor-pointer"
            >
                <User className="w-4 h-4 mr-2"/>
                Профиль
            </DropdownMenuItem>
            <DropdownMenuItem
                onClick={ () => leave() }
                className="cursor-pointer"
            >
                <LogOut className="w-4 h-4 mr-2"/>
                Выйти
            </DropdownMenuItem>
        </DropdownMenuContent>
        <UserModal
            reference={ user }
            visibility={ editModal }
        />
    </DropdownMenu>;
}
