'use server';

import { User } from "./types";
import bcrypt from 'bcrypt';
import { PASSWORD_HASHING_ROUNDS, USER_NAME_IS_BUSY_ERROR } from "./constants";
import { prisma } from "../../prisma";
import { NOT_PERMITTED_ERROR } from "../../common/policy/constants";


export const verifyUserUpdateAccess = async (
    user: User,
    targetUser: User
) => {
    if (user.id != targetUser.id && !user.is_admin)
        throw NOT_PERMITTED_ERROR;
}

export const hashPassword = (password: string) =>
    bcrypt.hash(password, PASSWORD_HASHING_ROUNDS);

export const formatUserName = (name: string) => name.trim();

export const verifyUserNameAvailability = async (
    name: string, currentUserName?: string
) => {
    if (currentUserName && currentUserName == name) return;

    const possibleUser = await prisma.user.findFirst({ where: { name } });

    if (possibleUser) throw USER_NAME_IS_BUSY_ERROR;
}
