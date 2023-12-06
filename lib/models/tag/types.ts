import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";


export type Tag<I extends Prisma.tagInclude<DefaultArgs>={}> =
    Prisma.tagGetPayload<{ include: I }>;
