'use client';

import { TableCell, TableRow } from "@/components/ui/table";
import TableUuidCell from "../../components/table/TableUuidCell";
import TableUserCell from "../../components/table/TableUserCell";
import TableScopeCell from "../../components/table/TableScopeCell";
import TableDateCell from '../../components/table/TableDateCell';
import { TagExtended } from "@/lib/models/tag/types";
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
        <TableUuidCell uuid={ reference.id }/>
        <TableCell>{ reference.name }</TableCell>
        <TableUserCell user={ reference.user }/>
        <TableScopeCell isPublic={ reference.is_public }/>
        <TableDateCell date={ reference.created_at }/>
        <TableActionsCell visibility={ actionsMenu }>
            <TagActionsMenu
                reference={ reference }
                visibility={ actionsMenu }
            />
        </TableActionsCell>
    </TableRow>
}
