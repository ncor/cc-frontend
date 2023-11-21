'use server';

import { Session } from "@supabase/supabase-js";
import { prisma } from "../prisma";
import { endpoint } from "../endpoint";
import { Prisma } from "@prisma/client";
import { getUserAdapter, verifyRolesModifyAccess } from "./service";
import { User } from "./types";


export const acquireUser = endpoint((session: Session) => {
    return prisma.user.upsert({
        where: { id: session.user.id },
        create: { id: session.user.id, roles: [ 'user' ] },
        update: {}
    });
});

export const getSessionUser = endpoint((session: Session) => {
    return getUserAdapter({ where: { id: session.user.id } });
});

export const updateSessionUser = endpoint(async(
    session: Session,
    args: Prisma.userUpdateArgs
) => {
    const user = await getUserAdapter({ where: { id: session.user.id } });

    if (args.data.roles) await verifyRolesModifyAccess(user.roles, user.roles);

    return prisma.user.update(args);
});

export const findUser = endpoint((
    session: Session,
    args: Prisma.userFindManyArgs
) => {
    return prisma.user.findMany(args);
});
