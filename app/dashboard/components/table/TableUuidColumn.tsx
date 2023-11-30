import { TableCell } from "@/components/ui/table"


export interface TableUuidColumn {
    uuid: string
}

export default function TableUuidColumn({
    uuid
}: TableUuidColumn) {
    return <TableCell className="pt-5">
        { uuid.slice(0, 4) }
        { ' ... ' }
        { uuid.slice(-4) }
    </TableCell>;
}
