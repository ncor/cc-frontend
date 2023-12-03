import { TableCell } from "@/components/ui/table";
import ScopeBadge from "../resource/ScopeBadge";


export interface TableScopeCellProps {
    isPublic: boolean
}

export default function TableScopeCell({
    isPublic
}: TableScopeCellProps) {
    return <TableCell>
        <ScopeBadge isPublic={ isPublic }/>
    </TableCell>
}
