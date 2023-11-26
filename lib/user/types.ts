import { Prisma } from "@prisma/client";


export type User = Prisma.userGetPayload<{}>;
export type UserBatchItem = Omit<User, 'password'>;
export type UserAuth = User;
