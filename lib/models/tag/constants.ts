import { createCustomError } from "../../common/dto/custom-error";


export const TAG_NOT_EXISTS_ERROR = createCustomError(
    'TAG_NOT_EXISTS',
    'Тег не найден.'
);
