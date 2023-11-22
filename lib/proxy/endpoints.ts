'use server';

import { Session } from "@supabase/supabase-js";
import { prisma } from "../prisma";
import { endpoint } from "../endpoint";
import { Prisma } from "@prisma/client";
import { getUserAdapter } from "../user/service";
import { proxyPolicy } from "./policy";
import { Proxy } from "./types";
import { getProxyAdapter } from "./service";
import { ResourceActions } from "../resource/types";
import { UserAuth } from "../user/types";


export const createProxy = endpoint(async (
    user: UserAuth,
    args: Prisma.proxyCreateArgs
) => {
    await proxyPolicy.validateInsert(args.data as Proxy, user);

    return prisma.proxy.createMany({
        data: { ...args.data, owner_id: user.id }
    }); 
});


export const findProxy = endpoint(async (
    user: UserAuth,
    args: Prisma.proxyFindManyArgs
) => {
    return proxyPolicy.filterForbidden(
        ResourceActions.GET, await prisma.proxy.findMany(args), user
    );
});


export const updateProxy = endpoint(async (
    user: UserAuth,
    args: Prisma.proxyUpdateArgs
) => {
    const proxy = await getProxyAdapter({ where: args.where });
    await proxyPolicy.verifyAction(ResourceActions.UPDATE, proxy, user);
    
    return prisma.proxy.update(args);
});


export const deleteProxy = endpoint(async (
    user: UserAuth,
    args: Prisma.proxyDeleteArgs
) => {
    const proxy = await getProxyAdapter({ where: args.where });
    await proxyPolicy.verifyAction(ResourceActions.DELETE, proxy, user);

    return prisma.proxy.delete(args);
});
