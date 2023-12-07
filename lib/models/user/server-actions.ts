'use server';

import { Prisma } from "@prisma/client";
import { createServerAction } from "../../common/middlewares/server-action";
import { UserAuth } from "./types";
import { formatUserName, hashPassword, verifyUserNameAvailability, verifyUserUpdateAccess } from "./service";
import { prisma } from "../../prisma";
import { NOT_PERMITTED_ERROR } from "../../common/policy/constants";


export const createUser = createServerAction(async (
    user: UserAuth,
    args: Prisma.userCreateArgs
) => {
    if (!user.is_admin) throw NOT_PERMITTED_ERROR;

    await verifyUserNameAvailability(args.data.name);

    args.data.name = formatUserName(args.data.name);
    args.data.password = await hashPassword(args.data.password);

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

    if (args.data.name)
        await verifyUserNameAvailability(
            args.data.name.toString(),
            targetUser.name
        );
    
    if (args.data.name && typeof args.data.name == 'string')
        args.data.name = formatUserName(args.data.name);
    if (args.data.password && typeof args.data.password == 'string')
        args.data.password = await hashPassword(args.data.password);

    return prisma.user.update(args);
});


export const deleteUser = createServerAction(async (
    user: UserAuth,
    args: Prisma.userDeleteArgs
) => {
    if (!user.is_admin) throw NOT_PERMITTED_ERROR;

    return prisma.user.delete(args);
});
