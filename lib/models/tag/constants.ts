import { CustomError } from "../../common/dto/CustomError";


export const TAG_NOT_EXISTS_ERROR = new CustomError(
    'TAG_NOT_EXISTS',
    'Тег не найден.'
);
