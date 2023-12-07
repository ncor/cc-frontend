import 'server-only';
import HealthCheck from "@/lib/common/health-check";
import { Account } from "./types";
import { prisma } from "@/lib/prisma";
import { HealthCheckStatus } from "@/lib/common/health-check/types";
import { HealthCheckCascadeStatus, HealthCheckOkStatus } from "@/lib/common/health-check/constants";
import { proxyHealthCheck } from '../proxy/health-check';
import { Proxy } from '../proxy/types';


export const queueAccountHealthCheck = (accountId: number) => {
    prisma.account.findFirst({
        where: { id: accountId },
        include: { proxy: true }
    }).then(account => {
        if (account) accountHealthCheck.test(account)
    });
}

export const accountHealthCheck = new HealthCheck<Account<{ proxy: true }>>(
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
