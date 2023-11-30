'use server';

import { prisma } from "../prisma";
import { endpoint } from "../endpoint";
import { Prisma } from "@prisma/client";
import { tagPolicy } from "./policy";
import { Tag } from "./types";
import { getTagAdapter } from "./service";
import { UserAuth } from "../user/types";
import { ResourceActions } from "../resource/types";


export const createTag = endpoint(async (
    user: UserAuth,
    args: Prisma.tagCreateArgs
) => {
    await tagPolicy.validateInsert(args.data as Tag, user);

    return prisma.tag.createMany({
        data: { ...args.data, owner_id: user.id }
    }); 
});


export const findTag = endpoint(async (
    user: UserAuth,
    args: Prisma.tagFindManyArgs
) => {
    return tagPolicy.filterForbidden(
        ResourceActions.GET, await prisma.tag.findMany(args), user
    );
});


export const countTags = endpoint(async (
    user: UserAuth,
    args: Prisma.tagCountArgs
) => {
    return prisma.tag.count(args);
});


export const updateTag = endpoint(async (
    user: UserAuth,
    args: Prisma.tagUpdateArgs
) => {
    const tag = await getTagAdapter({ where: args.where });
    await tagPolicy.verifyAction(ResourceActions.UPDATE, tag, user);
    
    return prisma.tag.update(args);
});


export const deleteTag = endpoint(async (
    user: UserAuth,
    args: Prisma.tagDeleteArgs
) => {
    const tag = await getTagAdapter({ where: args.where });
    await tagPolicy.verifyAction(ResourceActions.DELETE, tag, user);

    return prisma.tag.delete(args);
});
