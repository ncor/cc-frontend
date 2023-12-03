import { TableCell } from "@/components/ui/table";
import HealthCheckBadge from "../resource/HealthCheckBadge";
import { HealthCheckStatus } from "@/lib/common/health-check/types";


export interface TableHealthCheckStatusColumnProps {
    status: string
}

export default function TableHealthCheckStatusColumn({
    status
}: TableHealthCheckStatusColumnProps) {
    return <TableCell>
        <HealthCheckBadge status={
            status as HealthCheckStatus
        }/>
    </TableCell>;
}
