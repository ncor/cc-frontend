import { TableCell } from "@/components/ui/table";
import { User } from "@/lib/user/types";
import UserChip from "../../users/components/UserChip";
import UserAvatar from "../../users/components/UserAvatar";


export interface TableUserColumnProps {
    user: User
}

export default function TableUserColumn({
    user
}: TableUserColumnProps) {
    return <TableCell className="pt-5">
        <UserChip user={ user }/>
    </TableCell>;
}
