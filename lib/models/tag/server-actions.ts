'use server';

import { prisma } from "../../prisma";
import { createServerAction } from "../../common/middlewares/server-action";
import { Prisma } from "@prisma/client";
import { tagPolicy } from "./policy";
import { Tag, TagExtended } from "./types";
import { UserAuth } from "../user/types";
import { RowActions } from "../../common/types";
import { TAG_NOT_EXISTS_ERROR } from "./constants";


export const createTag = createServerAction(async (
    user: UserAuth,
    args: Prisma.tagCreateArgs
) => {
    await tagPolicy.validateInsert(args.data as Tag, user);

    return prisma.tag.createMany({
        data: { ...args.data, owner_id: user.id }
    }); 
});


export const findTag = createServerAction(async (
    user: UserAuth,
    args: Prisma.tagFindManyArgs
) => {
    return tagPolicy.filterForbidden(
        RowActions.GET, await prisma.tag.findMany(args), user
    ) as TagExtended[];
});


export const countTags = createServerAction(async (
    user: UserAuth,
    args: Prisma.tagCountArgs
) => {
    return prisma.tag.count(args);
});


export const updateTag = createServerAction(async (
    user: UserAuth,
    args: Prisma.tagUpdateArgs
) => {
    const tag = await prisma.tag.findFirst({ where: args.where });
    if (!tag) throw TAG_NOT_EXISTS_ERROR;

    await tagPolicy.verifyAction(RowActions.UPDATE, tag, user);
    
    return prisma.tag.update(args);
});


export const deleteTag = createServerAction(async (
    user: UserAuth,
    args: Prisma.tagDeleteArgs
) => {
    const tag = await prisma.tag.findFirst({ where: args.where });
    if (!tag) throw TAG_NOT_EXISTS_ERROR;

    await tagPolicy.verifyAction(RowActions.DELETE, tag, user);

    return prisma.tag.delete(args);
});
