'use client';

import { TableHead } from "@/components/ui/table";
import DetailsMarker from "../DetailsMarker";


export default function TableStatusHead() {
    return <TableHead>
        <div className="flex items-center gap-2">
            Статус
            <DetailsMarker>
                Проверка производится каждые 2 часа.
            </DetailsMarker>
        </div>
    </TableHead>
}
