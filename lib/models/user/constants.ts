import { CustomError } from "../../common/dto/CustomError";


export const PASSWORD_HASHING_ROUNDS = 10;

export const USER_NOT_EXISTS_ERROR = new CustomError(
    'USER_NOT_EXISTS',
    'Пользователь не найден.'
);

export const USER_NAME_IS_BUSY_ERROR = new CustomError(
    'USER_NAME_IS_BUSY',
    'Данное имя уже занято.'
);
