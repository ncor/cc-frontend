import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "@/lib/user/types";
import { Edit2, MoreHorizontal, Trash } from "lucide-react";
import UserModal from "./UserModal";
import UserDeleteModal from "./UserDeleteModal";
import useUser from "@/app/hooks/user";


export type UserDropdownMenuProps = {
    data: User
};

export default function UserDropDownMenu({
    data
}: UserDropdownMenuProps) {
    const user = useUser();

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Действия</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
            {
               user.is_admin &&
                <UserModal update={ data }>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full rounded-sm px-2 justify-start"
                    >
                        <Edit2 className="mr-2 h-4 w-4"/>
                        Редактировать
                    </Button>
                </UserModal>
            }
            {
                user.is_admin &&
                <UserDeleteModal data={ data }>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full rounded-sm px-2 justify-start"
                    >
                        <Trash className="mr-2 h-4 w-4"/>
                        Удалить
                    </Button>
                </UserDeleteModal>
            }
        </DropdownMenuContent>
    </DropdownMenu>
}
