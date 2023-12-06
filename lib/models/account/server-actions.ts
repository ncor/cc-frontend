'use server';

import { createServerAction } from "@/lib/common/middlewares/server-action";
import { UserAuth } from "../user/types";
import { Prisma } from "@prisma/client";
import { accountPolicy } from "./policy";
import { Account } from "./types";
import { prisma } from "@/lib/prisma";
import { verifyProxyUsagePermission } from "../proxy/policy";
import { accountHealthCheck } from "./health-check";
import { RowActions } from "@/lib/common/types";


const resolveProxy = async (id: number | undefined, user: UserAuth) => {
    const proxy = await prisma.proxy.findFirstOrThrow({
        where: { id }
    });

    await verifyProxyUsagePermission(proxy, user);
}

export const createAccount = createServerAction(async (
    user: UserAuth,
    args: Prisma.accountCreateArgs
) => {
    await accountPolicy.validateInsert(args.data as Account, user);

    await resolveProxy(args.data.proxy_id, user);

    const account = await prisma.account.create({
        // @todo: resolve next time
        // @ts-ignore
        data: { ...args.data, owner_id: user.id },
        include: { proxy: true }
    });

    accountHealthCheck.test(account as Account<{ proxy: true }>);
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
    
    await resolveProxy(args.data.proxy_id as number, user);

    const updateResponse = await prisma.account.update({
        ...args, include: { proxy: true }
    });

    accountHealthCheck.test(updateResponse as Account<{ proxy: true }>);

    return updateResponse;
});


export const findAccount = createServerAction(async (
    user: UserAuth,
    args: Prisma.accountFindManyArgs
) => {
    return accountPolicy.filterForbidden(
        RowActions.GET, await prisma.account.findMany(args), user
    ) as Account<{ user: true, proxy: true, tags: true }>[];
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
