'use server';

import { Prisma } from "@prisma/client";
import { endpoint } from "../endpoint";
import { User, UserAuth, UserBatchItem } from "./types";
import { verifyUserDataUpsert, verifyUserUpdateAccess } from "./service";
import { ERRORS } from "../error/constants";
import { prisma } from "../prisma";


export const createUser = endpoint(async (
    user: UserAuth,
    args: Prisma.userCreateArgs
) => {
    if (!user.is_admin) throw ERRORS.AUTH.NOT_PERMITTED;

    args.data = await verifyUserDataUpsert(args.data as User);

    return prisma.user.create(args);
});


export const findUser = endpoint(async (
    user: UserAuth,
    args: Prisma.userFindManyArgs
): Promise<UserBatchItem[]> => {
    return prisma.user.findMany(args);
});


export const countUsers = endpoint(async (
    user: UserAuth,
    args: Prisma.userCountArgs
) => {
    return prisma.user.count(args);
});


export const updateUser = endpoint(async (
    user: UserAuth,
    args: Prisma.userUpdateArgs
) => {
    const targetUser = await prisma.user.findFirst({ where: args.where });
    if (!targetUser) throw ERRORS.USER.NOT_EXISTS;
    await verifyUserUpdateAccess(user, targetUser);

    args.data = await verifyUserDataUpsert(args.data as User);

    return prisma.user.update(args);
});


export const deleteUser = endpoint(async (
    user: UserAuth,
    args: Prisma.userDeleteArgs
) => {
    if (!user.is_admin) throw ERRORS.AUTH.NOT_PERMITTED;

    return prisma.user.delete(args);
});
