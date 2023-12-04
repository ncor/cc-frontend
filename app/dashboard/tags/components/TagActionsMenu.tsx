import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit2, Trash } from "lucide-react";
import useUser from "../../users/hooks/user";
import useTags from "@/app/dashboard/tags/hooks/data/tag";
import { TagExtended } from "@/lib/models/tag/types";
import TagDeleteModal from "./TagDeleteModal";
import { RowActions } from "@/lib/common/types";
import useVisibility, { VisibilityInterface } from "@/app/hooks/visibility";
import TagModal from "./TagModal";


export type TagActionsMenuProps = {
    visibility: VisibilityInterface;
    reference: TagExtended;
};

export default function TagActionsMenu({
    visibility, reference
}: TagActionsMenuProps) {
    const user = useUser();
    const { can } = useTags();

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
        <TagModal
            reference={ reference }
            visibility={ editModal }
        />
        <TagDeleteModal
            reference={ reference }
            visibility={ deleteModal }
        />
    </DropdownMenu>;
}
