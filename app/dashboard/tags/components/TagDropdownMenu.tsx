import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal, Trash } from "lucide-react";
import { ResourceActions } from "@/lib/resource/types";
import useUser from "../../users/hooks/user";
import useTags from "@/app/hooks/data/tag";
import { TagExtended } from "@/lib/tag/types";
import TagDeleteModal from "./TagDeleteModal";

export type TagDropdownMenuProps = {
    data: TagExtended;
};

export default function TagDropdownMenu({ data }: TagDropdownMenuProps) {
    const user = useUser();
    const { can } = useTags();

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="flex flex-col">
                {can(ResourceActions.DELETE, data, user) && (
                    <TagDeleteModal data={data}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="w-full rounded-sm px-2 justify-start text-red-500"
                        >
                            <Trash className="mr-2 h-4 w-4" />
                            Удалить
                        </Button>
                    </TagDeleteModal>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
