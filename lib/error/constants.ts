import { CustomError } from "../error";


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
        )
    },
    PROXY: {
        NOT_EXISTS: new CustomError(
            'PROXY_NOT_EXISTS',
            'Прокси не найден.'
        )
    }
};
