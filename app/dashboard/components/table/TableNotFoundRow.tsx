'use client';

import { TableCell, TableRow } from "@/components/ui/table";


export default function TableNotFoundRow() {
    return <TableRow>
        <TableCell
            colSpan={ 99 }
            className="h-24 text-center"
        >
            Ничего не найдено.
        </TableCell>
    </TableRow>
}
