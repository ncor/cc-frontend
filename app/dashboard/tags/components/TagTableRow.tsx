import { TableCell, TableRow } from "@/components/ui/table";
import TableUuidColumn from "../../components/table/TableUuidColumn";
import TableUserColumn from "../../components/table/TableUserColumn";
import TableScopeColumn from "../../components/table/TableScopeColumn";
import TableDateCell from '../../components/table/TableDateCell';
import { TagExtended } from "@/lib/tag/types";
import TableActionsCell from "../../components/table/TableActionsCell";
import TagActionsMenu from "./TagActionsMenu";
import useVisibility from "@/app/hooks/visibility";


export interface TagTableRowProps {
    reference: TagExtended
}

export default function TagTableRow({
    reference
}: TagTableRowProps) {
    const actionsMenu = useVisibility();

    return <TableRow
        key={ reference.id }
        className="items-center h-[65px]"
    >
        <TableUuidColumn uuid={ reference.id }/>
        <TableCell>{ reference.name }</TableCell>
        <TableUserColumn user={ reference.user }/>
        <TableScopeColumn isPublic={ reference.is_public }/>
        <TableDateCell date={ reference.created_at }/>
        <TableActionsCell visibility={ actionsMenu }>
            <TagActionsMenu
                reference={ reference }
                visibility={ actionsMenu }
            />
        </TableActionsCell>
    </TableRow>
}
