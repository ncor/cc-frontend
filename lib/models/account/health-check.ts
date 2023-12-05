import 'server-only';
import HealthCheck from "@/lib/common/health-check";
import { Account } from "./types";
import { prisma } from "@/lib/prisma";
import { HealthCheckStatus } from "@/lib/common/health-check/types";
import { HealthCheckOkStatus } from "@/lib/common/health-check/constants";


export const accountHealthCheck = new HealthCheck<Account>(
    (status, data) => prisma.account.update({
        where: { id: data.id },
        data: { health_check: status }
    }),
    async data => {
        let resultStatus: HealthCheckStatus = HealthCheckOkStatus.OK;

        return resultStatus;
    }
);
