'use client';

import { Button } from "@/components/ui/button";
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


export default function UserMenu() {
    const user = useUser();

    const leave = () =>
        signOut({ callbackUrl: window.location.origin + '/login' });

    return <DropdownMenu>
        <DropdownMenuTrigger>
            <UserChip user={ user } card/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
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
            <UserModal update={ user } className="w-full">
                <Button
                    variant="ghost"
                    size="sm"
                    className="w-full rounded-sm px-2 justify-start font-normal"
                >
                    Профиль
                </Button>
            </UserModal>
            <DropdownMenuItem
                onClick={ () => leave() }
                className="cursor-pointer"
            >
                Выйти
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>;
}
