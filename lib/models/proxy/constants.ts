import { createCustomError } from "../../common/dto/custom-error";


export const PROXY_INVALID_PROTOCOL_ERROR = createCustomError(
    'PROXY_INVALID_PROTOCOL',
    'Неподдерживаемый протокол.',
);

export const PROXY_INVALID_URL_ERROR = createCustomError(
    'PROXY_INVALID_URL',
    'Неверный формат URL.',
);

export const PROXY_NOT_WORKING_ERROR = createCustomError(
    'PROXY_NOT_WORKING',
    'Не пройден тестовый запрос, проверьте прокси на работоспособность.'
);
