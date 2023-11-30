import { Prisma } from "@prisma/client";


export type User = Prisma.userGetPayload<{}>;
export type UserAuth = User;
