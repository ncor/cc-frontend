import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ProxyExtended } from "@/lib/proxy/types";
import { Edit2, Trash } from "lucide-react";
import ProxyModal from "./ProxyModal";
import ProxyDeleteModal from "./ProxyDeleteModal";
import useProxies from "../hooks/data/proxy";
import useUser from "../../users/hooks/user";
import { RowActions } from "@/lib/common/types";
import useVisibility, { VisibilityInterface } from "@/app/hooks/visibility";


export type ProxyActionsMenuProps = {
    visibility: VisibilityInterface,
    reference: ProxyExtended
};

export default function ProxyActionsMenu({
    visibility, reference
}: ProxyActionsMenuProps) {
    const { can } = useProxies();
    const user = useUser();

    const editModal = useVisibility();
    const deleteModal = useVisibility();

    return <DropdownMenu
        open={ visibility.isVisible }
        onOpenChange={ open => visibility.toggle(open) }
    >
        <DropdownMenuTrigger/>
        <DropdownMenuContent>
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
        <ProxyModal
            reference={ reference }
            visibility={ editModal }
        />
        <ProxyDeleteModal
            reference={ reference }
            visibility={ deleteModal }
        />
    </DropdownMenu>;
}
