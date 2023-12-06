"use client";

import HealthCheck from "@/lib/common/health-check";
import {
    HealthCheckCascadeStatus,
    HealthCheckErrorStatus,
    HealthCheckOkStatus,
    HealthCheckSuspenseStatus,
} from "@/lib/common/health-check/constants";
import { HealthCheckStatus } from "@/lib/common/health-check/types";
import HealthCheckIndicator from "./HealthCheckStatus";


const statusTextMap = {
    [HealthCheckOkStatus.OK]: "Активен",

    [HealthCheckSuspenseStatus.PENDING]: "Проверяется",

    [HealthCheckErrorStatus.FAILED]: "Ошибка",
    [HealthCheckErrorStatus.IRRELEVANT]: "Не актуально",
    [HealthCheckErrorStatus.BANNED]: "Бан",
    [HealthCheckErrorStatus.NOT_FUNCTIONAL]: "Не работает",
    [HealthCheckErrorStatus.NOT_AUTHORIZED]: "Не авторизован",
    [HealthCheckErrorStatus.INVALID_DATA]: "Ошибка данных",

    [HealthCheckCascadeStatus.PROXY_FAULT]: "Ошибка прокси",
    [HealthCheckCascadeStatus.ACCOUNT_FAULT]: "Ошибка аккаунта",
    [HealthCheckCascadeStatus.PAGE_FAULT]: "Ошибка страницы",
    [HealthCheckCascadeStatus.POST_FAULT]: "Ошибка поста",
};

export interface HealthCheckBadgeProps {
    status: HealthCheckStatus;
}

export default function HealthCheckBadge({ status }: HealthCheckBadgeProps) {
    const mode = HealthCheck.getStatusMode(status);
    const text = statusTextMap[status] || "Проверяется";

    return (
        <div className="flex items-center gap-2">
            <HealthCheckIndicator status={status} />
            <div className="font-medium">{text}</div>
        </div>
    );
}
