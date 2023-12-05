import 'server-only';
import HealthCheck from "@/lib/common/health-check";
import { Account, AccountExtended } from "./types";
import { prisma } from "@/lib/prisma";
import { HealthCheckStatus } from "@/lib/common/health-check/types";
import { HealthCheckCascadeStatus, HealthCheckOkStatus } from "@/lib/common/health-check/constants";
import { proxyHealthCheck } from '../proxy/health-check';


export const accountHealthCheck = new HealthCheck<AccountExtended>(
    (status, data) => prisma.account.update({
        where: { id: data.id },
        data: { health_check: status }
    }),
    async data => {
        const status = await proxyHealthCheck.testImplicitly(data.proxy);

        if (HealthCheck.isErrorStatus(status))
            return HealthCheckCascadeStatus.PROXY_FAULT;

        let resultStatus: HealthCheckStatus = HealthCheckOkStatus.OK;

        return resultStatus;
    }
);
