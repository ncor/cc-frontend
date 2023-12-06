'use client';

import { TableCell, TableRow } from "@/components/ui/table";
import TableActionsCell from "../../components/table/TableActionsCell";
import TableUserCell from "../../components/table/TableUserCell";
import TableScopeCell from "../../components/table/TableScopeCell";
import TableTagsCell from "../../components/table/TableTagsCell";
import TableHealthCheckStatusCell from "../../components/table/TableHealthCheckStatusCell";
import useVisibility from "@/app/hooks/visibility";
import TableDateCell from '../../components/table/TableDateCell';
import { Account } from "@/lib/models/account/types";
import AccountActionsMenu from "./AccountActionsMenu";


export interface AccountsTableRowProps {
    reference: Account<{ user: true, proxy: true, tags: true }>
}

export default function AccountsTableRow({
    reference
}: AccountsTableRowProps) {
    const actionsMenu = useVisibility();
    
    return <TableRow
        key={ reference.id }
        className="items-center h-[65px]"
    >
        <TableCell>{ reference.id }</TableCell>
        <TableCell>{ reference.name }</TableCell>
        <TableCell>{ reference.proxy.name }</TableCell>
        <TableHealthCheckStatusCell status={ reference.health_check }/>
        <TableTagsCell tags={ reference.tags }/>
        <TableScopeCell isPublic={ reference.is_public }/>
        <TableDateCell date={ reference.created_at }/>
        <TableUserCell user={ reference.user }/>
        <TableActionsCell visibility={ actionsMenu }>
            <AccountActionsMenu
                reference={ reference }
                visibility={ actionsMenu }
            />
        </TableActionsCell>
    </TableRow>;
}
