import { CustomError } from "@/lib/common/dto/CustomError";


export const NOT_PERMITTED_ERROR = new CustomError(
    'NOT_PERMITTED',
    'Недостаточно прав.'
);
