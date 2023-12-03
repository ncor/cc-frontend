import { TableRow } from "@/components/ui/table";
import { User } from "@/lib/user/types";
import TableUuidColumn from "../../components/table/TableUuidColumn";
import TableUserColumn from "../../components/table/TableUserColumn";
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
        <TableUuidColumn uuid={ reference.id }/>
        <TableUserColumn user={ reference }/>
        <TableDateCell date={ reference.created_at }/>
        <TableActionsCell visibility={ actionsMenu }>
            <UserActionsMenu
                reference={ reference }
                visibility={ actionsMenu }
            />
        </TableActionsCell>
    </TableRow>;
}
