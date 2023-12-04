'use client';

import { TableRow } from "@/components/ui/table";
import { User } from "@/lib/models/user/types";
import TableUuidCell from "../../components/table/TableUuidCell";
import TableUserCell from "../../components/table/TableUserCell";
import TableDateCell from "../../components/table/TableDateCell";
import TableActionsCell from "../../components/table/TableActionsCell";
import UserActionsMenu from "./UserActionsMenu";
import useVisibility from "@/app/hooks/visibility";


export interface UserTableRowProps {
    reference: User
}

export default function UserTableRow({
    reference
}: UserTableRowProps) {
    const actionsMenu = useVisibility();

    return <TableRow key={ reference.id }>
        <TableUuidCell uuid={ reference.id }/>
        <TableUserCell user={ reference }/>
        <TableDateCell date={ reference.created_at }/>
        <TableActionsCell visibility={ actionsMenu }>
            <UserActionsMenu
                reference={ reference }
                visibility={ actionsMenu }
            />
        </TableActionsCell>
    </TableRow>;
}
