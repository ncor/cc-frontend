'use client';

import { TableCell } from "@/components/ui/table";
import HealthCheckBadge from "../resource/HealthCheckBadge";
import { HealthCheckStatus } from "@/lib/common/health-check/types";


export interface TableHealthCheckStatusCellProps {
    status: string
}

export default function TableHealthCheckStatusCell({
    status
}: TableHealthCheckStatusCellProps) {
    return <TableCell>
        <HealthCheckBadge status={
            status as HealthCheckStatus
        }/>
    </TableCell>;
}
