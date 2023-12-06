import { z } from "zod";


export const MAX_ROWS_IN_PAGE = 10;

export const relationsSetForm = (idType: z.ZodString | z.ZodNumber) =>
    z.object({
        set: z.array(z.any()).length(0),
        connect: z.array(z.object({ id: idType }))
    });
