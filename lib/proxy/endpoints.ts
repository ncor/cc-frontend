'use server';

import { Session } from "@supabase/supabase-js";
import { prisma } from "../prisma";
import { endpoint } from "../endpoint";
import { Prisma } from "@prisma/client";
import { getUserAdapter } from "../user/service";
import { proxyPolicy } from "./policy";
import { ResourceActions } from "../resource/policy";
import { Proxy } from "./types";
import { getProxyAdapter } from "./service";


export const createProxy = endpoint(async (
    session: Session,
    args: Prisma.proxyCreateArgs
) => {
    const user = await getUserAdapter({ where: { id: session.user.id }});
    await proxyPolicy.validateInsert(args.data as Proxy, user);

    return prisma.proxy.createMany({
        data: { ...args.data, owner_id: session.user.id }
    }); 
});


export const findProxy = endpoint(async (
    session: Session,
    args: Prisma.proxyFindManyArgs
) => {
    const user = await getUserAdapter({ where: { id: session.user.id }});

    return proxyPolicy.filterForbidden(
        ResourceActions.GET, await prisma.proxy.findMany(args), user
    );
});


export const updateProxy = endpoint(async (
    session: Session,
    args: Prisma.proxyUpdateArgs
) => {
    const user = await getUserAdapter({ where: { id: session.user.id } });
    const proxy = await getProxyAdapter({ where: args.where });
    await proxyPolicy.verifyAction(ResourceActions.UPDATE, proxy, user);
    
    return prisma.proxy.update(args);
});


export const deleteProxy = endpoint(async (
    session: Session,
    args: Prisma.proxyDeleteArgs
) => {
    const user = await getUserAdapter({ where: { id: session.user.id } });
    const proxy = await getProxyAdapter({ where: args.where });
    await proxyPolicy.verifyAction(ResourceActions.DELETE, proxy, user);

    return prisma.proxy.delete(args);
});
