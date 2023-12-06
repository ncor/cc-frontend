import { cn } from "@/lib/client/utils";
import HealthCheck from "@/lib/common/health-check";
import { HealthCheckStatus } from "@/lib/common/health-check/types";


const statusVariants = {
    ok: "bg-green-500",
    suspense: "bg-muted-foreground animate-pulse",
    error: "bg-red-500",
    cascade: "bg-yellow-500"
};

export interface HealthCheckIndicatorProps {
    status: HealthCheckStatus
}

export default function HealthCheckIndicator({
    status
}: HealthCheckIndicatorProps) {
    const mode = HealthCheck.getStatusMode(status);
    const statusStyle = statusVariants[mode];

    return <div className={
        cn("w-[10px] h-[10px] b rounded-full", statusStyle)
    }/>;
}
