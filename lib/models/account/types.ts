import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";


export type Account<I extends Prisma.accountInclude<DefaultArgs>={}> =
    Prisma.accountGetPayload<{ include: I }>;
