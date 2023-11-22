import { Prisma } from "@prisma/client";


export type Proxy = Prisma.proxyGetPayload<{}>;
export type ProxyExtended =
    Prisma.proxyGetPayload<{ include: { user: true } }>;
