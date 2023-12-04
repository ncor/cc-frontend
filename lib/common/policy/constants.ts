import { createCustomError } from "@/lib/common/dto/custom-error";


export const NOT_PERMITTED_ERROR = createCustomError(
    'NOT_PERMITTED',
    'Недостаточно прав.'
);
