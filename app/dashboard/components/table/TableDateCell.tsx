'use client';

import { TableCell } from "@/components/ui/table";


export interface TableDateCell {
    date: Date
}

export default function TableDateCell({
    date
}: TableDateCell) {
    return <TableCell>
        { date.toDateString() }
    </TableCell>;
}
