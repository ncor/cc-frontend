'use server';

import { Prisma } from "@prisma/client";
import { endpoint } from "../endpoint";
import { User, UserAuth, UserBatchItem } from "./types";
import { verifyUserUpdateAccess } from "./service";
import { ERRORS } from "../error/constants";
import { prisma } from "../prisma";
import bcrypt from 'bcrypt';
import { PASSWORD_HASHING_ROUNDS } from "./constants";


const hashPassword = (password: string) =>
    bcrypt.hash(password, PASSWORD_HASHING_ROUNDS);

const refactorUserData = async (data: User) => {
    if (data.name) data.name = data.name.trim();
    if (data.password) data.password = await hashPassword(data.password);

    return data;
}

const verifyUserNameAvailability = async (name: string) => {
    const possibleUser = await prisma.user.findFirst({ where: { name } });

    if (possibleUser) throw ERRORS.USER.NAME_IS_BUSY;
}

const verifyUserDataUpsert = async(data: User) => {
    data = await refactorUserData(data as User);
    await verifyUserNameAvailability(data.name);

    return data;
}

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
