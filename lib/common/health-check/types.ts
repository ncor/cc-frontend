import { HealthCheckCascadeStatus, HealthCheckErrorStatus, HealthCheckOkStatus, HealthCheckSuspenseStatus } from "./constants";

export type Monitored = {
    owner_id: string,
    is_public: boolean
};

export type HealthCheckStatus =
    `${HealthCheckOkStatus}` | 
    `${HealthCheckSuspenseStatus}` | 
    `${HealthCheckErrorStatus}` | 
    `${HealthCheckCascadeStatus}`;

export type HealthCheckStatusMode = 'ok' | 'suspense' | 'error' | 'cascade';

export type StatusDispatcher<T> = (status: string, data: T) => Promise<any>;

export type TestCallback<T> = (data: T) => Promise<HealthCheckStatus>;
