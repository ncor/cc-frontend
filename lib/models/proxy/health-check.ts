import 'server-only';
import HealthCheck from '../../common/health-check';
import { HealthCheckErrorStatus, HealthCheckOkStatus } from '../../common/health-check/constants';
import { HealthCheckStatus } from '../../common/health-check/types';
import { prisma } from '../../prisma';
import { getProxyClient } from './service';
import { Proxy } from './types';


export const proxyHealthCheck = new HealthCheck<Proxy>(
    (status, data) => prisma.proxy.update({
        where: { id: data.id },
        data: { health_check: status }
    }),
    async data => {
        let resultStatus: HealthCheckStatus = HealthCheckOkStatus.OK;

        const proxyClient = await getProxyClient(data, 'https://google.com')
            .catch(e => {
                resultStatus = HealthCheckErrorStatus.INVALID_DATA
            });

        if (proxyClient) {
            const response = await proxyClient.get("/", {
                timeout: 5000,
            }).catch(e => {
                resultStatus = HealthCheckErrorStatus.NOT_FUNCTIONAL;
            });
        }
    
        return resultStatus;
    }
);
