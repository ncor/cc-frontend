import { Prisma } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";


export type Proxy<I extends Prisma.proxyInclude<DefaultArgs>={}> =
    Prisma.proxyGetPayload<{ include: I }>;
