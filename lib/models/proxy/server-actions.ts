'use server';

import { prisma } from "../../prisma";
import { createServerAction } from "../../common/middlewares/server-action";
import { Prisma } from "@prisma/client";
import { proxyPolicy } from "./policy";
import { UserAuth } from "../user/types";
import { RowActions } from "../../common/types";
import { proxyHealthCheck } from "./health-check";


export const createProxy = createServerAction(async (
    user: UserAuth,
    args: Prisma.proxyCreateArgs
) => {
    await proxyPolicy.validateInsert(args.data.is_public, user);

    const proxy = await prisma.proxy.create({
        // @todo: resolve next time
        // @ts-ignore
        data: { ...args.data, owner_id: user.id }
    });

    proxyHealthCheck.test(proxy);
});


export const updateProxy = createServerAction(async (
    user: UserAuth,
    args: Prisma.proxyUpdateArgs
) => {
    const proxy = await prisma.proxy.findFirstOrThrow({
        where: args.where
    });

    await proxyPolicy.verifyAction(RowActions.UPDATE, proxy, user);

    const updateResponse = await prisma.proxy.update(args);

    proxyHealthCheck.test(updateResponse);
    
    return updateResponse;
});


export const findProxy = createServerAction(async (
    user: UserAuth,
    args: Prisma.proxyFindManyArgs
) => {
    return proxyPolicy.filterForbidden(
        RowActions.GET, await prisma.proxy.findMany(args), user
    );
});


export const countProxies = createServerAction(async (
    user: UserAuth,
    args: Prisma.proxyCountArgs
) => {
    return prisma.proxy.count(args);
});


export const deleteProxy = createServerAction(async (
    user: UserAuth,
    args: Prisma.proxyDeleteArgs
) => {
    const proxy = await prisma.proxy.findFirstOrThrow({
        where: args.where
    });

    await proxyPolicy.verifyAction(RowActions.DELETE, proxy, user);

    return prisma.proxy.delete(args);
});
