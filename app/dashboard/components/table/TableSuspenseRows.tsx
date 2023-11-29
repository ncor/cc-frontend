import { TableCell, TableRow } from "@/components/ui/table"
import { MAX_ROWS_IN_PAGE } from "../../constants"
import { Skeleton } from "@/components/ui/skeleton"


export interface TableSuspenseRowsProps {
    count?: number
}

export default function TableSuspenseRows({
    count
}: TableSuspenseRowsProps) {
    return [ ...Array(count || MAX_ROWS_IN_PAGE) ].map(
        (_, i) => (
            <TableRow key={i}>
                <TableCell colSpan={100}>
                    <Skeleton className="h-8"/>
                </TableCell>
            </TableRow>
        )
    )
}
