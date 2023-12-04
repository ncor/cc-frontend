import { CustomError } from "../../common/dto/CustomError";


export const PROXY_INVALID_PROTOCOL_ERROR = new CustomError(
    'PROXY_INVALID_PROTOCOL',
    'Неподдерживаемый протокол.',
);

export const PROXY_INVALID_URL_ERROR = new CustomError(
    'PROXY_INVALID_URL',
    'Неверный формат URL.',
);

export const PROXY_NOT_WORKING_ERROR = new CustomError(
    'PROXY_NOT_WORKING',
    'Не пройден тестовый запрос, проверьте прокси на работоспособность.'
);

export const PROXY_NOT_EXISTS_ERROR = new CustomError(
    'PROXY_NOT_EXISTS',
    'Прокси не найден.'
);
