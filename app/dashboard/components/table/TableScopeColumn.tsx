import { TableCell } from "@/components/ui/table";
import ScopeBadge from "../resource/ScopeBadge";


export interface TableScopeColumnProps {
    isPublic: boolean
}

export default function TableScopeColumn({
    isPublic
}: TableScopeColumnProps) {
    return <TableCell>
        <ScopeBadge isPublic={ isPublic }/>
    </TableCell>
}
