'use server';

import { createServerAction } from "@/lib/common/middlewares/server-action";
import { UserAuth } from "../user/types";
import { Prisma } from "@prisma/client";
import { accountPolicy } from "./policy";
import { Account } from "./types";
import { prisma } from "@/lib/prisma";
import { verifyProxyUsagePermission } from "../proxy/policy";
import { accountHealthCheck, queueAccountHealthCheck } from "./health-check";
import { RowActions } from "@/lib/common/types";


const resolveProxy = async (id: number | undefined, user: UserAuth) => {
    const proxy = await prisma.proxy.findFirstOrThrow({
        where: { id }
    });

    await verifyProxyUsagePermission(proxy, user);

    return proxy;
}

export const createAccount = createServerAction(async (
    user: UserAuth,
    args: Prisma.accountCreateArgs
) => {
    await accountPolicy.validateInsert(args.data.is_public, user);

    await resolveProxy(args.data.proxy_id, user);

    const createResponse = await prisma.account.create(args);

    queueAccountHealthCheck(createResponse.id);

    return createResponse;
});


export const updateAccount = createServerAction(async (
    user: UserAuth,
    args: Prisma.accountUpdateArgs
) => {
    const account = await prisma.account.findFirstOrThrow({
        where: args.where,
        include: { proxy: true }
    });

    await accountPolicy.verifyAction(RowActions.UPDATE, account, user);
    
    if (args.data.proxy_id && typeof args.data.proxy_id == 'number')
        await resolveProxy(args.data.proxy_id, user);

    const updateResponse = await prisma.account.update({
        ...args, include: { proxy: true }
    });

    accountHealthCheck.test(updateResponse);

    return updateResponse;
});


export const findAccount = createServerAction(async (
    user: UserAuth,
    args: Prisma.accountFindManyArgs
) => {
    return accountPolicy.filterForbidden(
        RowActions.GET, await prisma.account.findMany(args), user
    );
});


export const countAccounts = createServerAction(async (
    user: UserAuth,
    args: Prisma.accountCountArgs
) => {
    return prisma.account.count(args);
});


export const deleteAccount = createServerAction(async (
    user: UserAuth,
    args: Prisma.accountDeleteArgs
) => {
    const account = await prisma.account.findFirstOrThrow({
        where: args.where
    });

    await accountPolicy.verifyAction(RowActions.DELETE, account, user);

    return prisma.account.delete(args);
});
