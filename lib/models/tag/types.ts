import { Prisma } from "@prisma/client";


export type Tag = Prisma.tagGetPayload<{}>;
export type TagExtended =
    Prisma.tagGetPayload<{ include: { user: true } }>;
