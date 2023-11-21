import { Prisma } from "@prisma/client";
import { ROLES } from "./constants";
import { prisma } from "../prisma";
import { ERRORS } from "../error/constants";
import { User } from "./types";


export const isAdmin = (roles: string[]) => {
    return roles.includes(ROLES.ADMIN);
}

export const getUserAdapter = async (args: Prisma.userFindFirstArgs) => {
    const user = await prisma.user.findFirst(args);
    if (!user) throw ERRORS.USER.NOT_EXISTS;
    return user as User;
}

export const verifyUserUpdateAccess = async (
    user: User,
    targetUser: User
) => {
    if (user != targetUser && !isAdmin(user.roles))
        throw ERRORS.AUTH.NOT_PERMITTED;
}

export const verifyRolesModifyAccess = async (
    userRoles: string[],
    targetUserRoles: string[]
) => {
    const isUserAdmin = isAdmin(userRoles);
    const isTargetUserAdmin = isAdmin(targetUserRoles);

    if (!isUserAdmin || isUserAdmin == isTargetUserAdmin)
        throw ERRORS.AUTH.NOT_PERMITTED;
};
