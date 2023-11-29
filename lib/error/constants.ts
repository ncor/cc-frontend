import { CustomError } from ".";


export const ERRORS = {
    COMMON: {
        INVALID_DATA: new CustomError(
            'INVALID_DATA',
            'Неверный формат данных.'
        ),
        UNKNOWN: new CustomError(
            'UNKNOWN',
            'Неизвестная ошибка'
        )
    },
    AUTH: {
        SESSION_INVALID: new CustomError(
            'SESSION_INVALID',
            'Недействительная сессия.'
        ),
        NOT_PERMITTED: new CustomError(
            'NOT_PERMITTED',
            'Недостаточно прав.'
        )
    },
    USER: {
        NOT_EXISTS: new CustomError(
            'USER_NOT_EXISTS',
            'Пользователь не найден.'
        ),
        NAME_IS_BUSY: new CustomError(
            'USER_NAME_IS_BUSY',
            'Данное имя уже занято.'
        )
    },
    PROXY: {
        INVALID_PROTOCOL: new CustomError(
            'PROXY_INVALID_PROTOCOL',
            'Неподдерживаемый протокол.',
        ),
        INVALID_URL: new CustomError(
            'PROXY_INVALID_URL',
            'Неверный формат URL.',
        ),
        NOT_WORKING: new CustomError(
            'PROXY_NOT_WORKING',
            'Не пройден тестовый запрос, проверьте прокси на работоспособность.'
        ),
        NOT_EXISTS: new CustomError(
            'PROXY_NOT_EXISTS',
            'Прокси не найден.'
        )
    }
};
