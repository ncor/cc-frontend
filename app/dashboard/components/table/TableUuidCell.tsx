'use client';

import { TableCell } from "@/components/ui/table"


export interface TableUuidCell {
    uuid: string
}

export default function TableUuidCell({
    uuid
}: TableUuidCell) {
    return <TableCell className="pt-5">
        { uuid.slice(0, 4) }
        { ' ... ' }
        { uuid.slice(-4) }
    </TableCell>;
}
