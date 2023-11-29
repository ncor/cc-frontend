'use server';

import { User } from "./types";
import { ERRORS } from "../error/constants";
import bcrypt from 'bcrypt';
import { PASSWORD_HASHING_ROUNDS } from "./constants";
import { prisma } from "../prisma";


export const verifyUserUpdateAccess = async (
    user: User,
    targetUser: User
) => {
    if (user.id != targetUser.id && !user.is_admin)
        throw ERRORS.AUTH.NOT_PERMITTED;
}

export const hashPassword = (password: string) =>
    bcrypt.hash(password, PASSWORD_HASHING_ROUNDS);

export const refactorUserData = async (data: User) => {
    if (data.name) data.name = data.name.trim();
    if (data.password) data.password = await hashPassword(data.password);

    return data;
}

export const verifyUserNameAvailability = async (
    name: string, currentUserName?: string
) => {
    if (currentUserName && currentUserName == name) return;

    const possibleUser = await prisma.user.findFirst({ where: { name } });

    if (possibleUser) throw ERRORS.USER.NAME_IS_BUSY;
}

export const verifyUserDataUpsert = async(
    data: User, currentUserName?: string
) => {
    data = await refactorUserData(data as User);
    await verifyUserNameAvailability(data.name, currentUserName);

    return data;
}
