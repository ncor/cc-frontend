import { Prisma } from "@prisma/client";


export type Account = Prisma.accountGetPayload<{}>;
export type AccountExtended =
    Prisma.accountGetPayload<{ include: { user: true, proxy: true } }>;
