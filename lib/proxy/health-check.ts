import HealthCheck from '../common/health-check';
import { HealthCheckErrorStatus, HealthCheckOkStatus } from '../common/health-check/constants';
import { HealthCheckStatus } from '../common/health-check/types';
import { prisma } from '../prisma';
import { PROXY_INVALID_PROTOCOL_ERROR, PROXY_INVALID_URL_ERROR, PROXY_NOT_WORKING_ERROR } from './constants';
import { getProxyClient } from './service';
import { Proxy } from './types';


export const proxyHealthCheck = new HealthCheck<Proxy>(
    (status, data) => prisma.proxy.update({
        where: { id: data.id },
        data: { health_check: status }
    }),
    async data => {
        let resultStatus: HealthCheckStatus = HealthCheckOkStatus.OK;

        try {
            const proxyClient = getProxyClient(data, 'https://google.com');
    
            await proxyClient.get("/", {
                timeout: 5000,
            });
        } catch(e) {
            if (e === PROXY_INVALID_PROTOCOL_ERROR || e === PROXY_INVALID_URL_ERROR)
                resultStatus = HealthCheckErrorStatus.INVALID_DATA;
            if (e === PROXY_NOT_WORKING_ERROR)
                resultStatus = HealthCheckErrorStatus.NOT_FUNCTIONAL;
        }
    
        return resultStatus;
    }
);
