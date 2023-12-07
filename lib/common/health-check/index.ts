import {
    HealthCheckSuspenseStatus,
    HealthCheckOkStatus,
    HealthCheckErrorStatus,
    HealthCheckCascadeStatus,
} from "./constants";
import {
    HealthCheckStatus,
    HealthCheckStatusMode,
    Monitored,
    StatusDispatcher,
    TestCallback,
} from "./types";


export default class HealthCheck<T extends Monitored> {
    constructor(
        public statusDispatcher: StatusDispatcher<T>,
        public testCallback: TestCallback<T>
    ) {}

    private static _unpackStatusMap(map: Record<string, string>) {
        return Object.values(map);
    }

    public static isOkStatus(status: HealthCheckStatus) {
        return this._unpackStatusMap(HealthCheckOkStatus).includes(status);
    }

    public static isSuspenseStatus(status: HealthCheckStatus) {
        return this._unpackStatusMap(HealthCheckSuspenseStatus).includes(
            status
        );
    }

    public static isErrorStatus(status: HealthCheckStatus) {
        return this._unpackStatusMap(HealthCheckErrorStatus).includes(status);
    }

    public static isCascadeStatus(status: HealthCheckStatus) {
        return this._unpackStatusMap(HealthCheckCascadeStatus).includes(status);
    }

    public static getStatusMode(
        status: HealthCheckStatus
    ): HealthCheckStatusMode {
        if (HealthCheck.isOkStatus(status)) return "ok";
        if (HealthCheck.isSuspenseStatus(status)) return "suspense";
        if (HealthCheck.isErrorStatus(status)) return "error";
        if (HealthCheck.isCascadeStatus(status)) return "cascade";

        return "suspense";
    }

    public async test(data: T) {
        await this.setStatus(HealthCheckSuspenseStatus.PENDING, data);

        const resultStatus = await this.testCallback(data);

        await this.setStatus(resultStatus, data);

        return resultStatus;
    }

    public async testImplicitly(data: T) {
        const resultStatus = await this.testCallback(data);

        if (HealthCheck.isErrorStatus(resultStatus))
            await this.setStatus(resultStatus, data);

        return resultStatus;
    }

    public setStatus(status: string, data: T) {
        return this.statusDispatcher(status, data);
    }
}
