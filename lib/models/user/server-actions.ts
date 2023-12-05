'use server';

import { Prisma } from "@prisma/client";
import { createServerAction } from "../../common/middlewares/server-action";
import { User, UserAuth } from "./types";
import { verifyUserDataUpsert, verifyUserUpdateAccess } from "./service";
import { prisma } from "../../prisma";
import { NOT_PERMITTED_ERROR } from "../../common/policy/constants";
import { USER_NOT_EXISTS_ERROR } from "./constants";


export const createUser = createServerAction(async (
    user: UserAuth,
    args: Prisma.userCreateArgs
) => {
    if (!user.is_admin) throw NOT_PERMITTED_ERROR;

    args.data = await verifyUserDataUpsert(args.data as User);

    return prisma.user.create(args);
});


export const findUser = createServerAction(async (
    user: UserAuth,
    args: Prisma.userFindManyArgs
) => {
    return prisma.user.findMany(args);
});


export const countUsers = createServerAction(async (
    user: UserAuth,
    args: Prisma.userCountArgs
) => {
    return prisma.user.count(args);
});


export const updateUser = createServerAction(async (
    user: UserAuth,
    args: Prisma.userUpdateArgs
) => {
    const targetUser = await prisma.user.findFirstOrThrow({
        where: args.where
    });

    await verifyUserUpdateAccess(user, targetUser);

    args.data = await verifyUserDataUpsert(args.data as User, targetUser.name);

    return prisma.user.update(args);
});


export const deleteUser = createServerAction(async (
    user: UserAuth,
    args: Prisma.userDeleteArgs
) => {
    if (!user.is_admin) throw NOT_PERMITTED_ERROR;

    return prisma.user.delete(args);
});
