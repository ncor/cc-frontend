import { ReactNode } from "react"
import TableNotFoundRow from "./TableNotFoundRow"
import TableSuspenseRows from "./TableSuspenseRows"


export interface TableRowsAdapterProps {
    children: ReactNode,
    rows?: any[],
    isFetching?: boolean
}

export default function TableRowsAdapter({
    children, rows, isFetching
}: TableRowsAdapterProps) {
    if (!rows || isFetching)
        return <TableSuspenseRows count={ rows?.length }/>

    if (!rows?.length)
        return <TableNotFoundRow/>

    return children;
}
