'use server';

import { Session } from "@supabase/supabase-js";
import { prisma } from "../prisma";
import { endpoint } from "../endpoint";
import { Prisma } from "@prisma/client";
import { getUserAdapter } from "../user/service";
import { tagPolicy } from "./policy";
import { ResourceActions } from "../resource/policy";
import { Tag } from "./types";
import { getTagAdapter } from "./service";


export const createTag = endpoint(async (
    session: Session,
    args: Prisma.tagCreateArgs
) => {
    const user = await getUserAdapter({ where: { id: session.user.id }});
    await tagPolicy.validateInsert(args.data as Tag, user);

    return prisma.tag.createMany({
        data: { ...args.data, owner_id: session.user.id }
    }); 
});


export const findTag = endpoint(async (
    session: Session,
    args: Prisma.tagFindManyArgs
) => {
    const user = await getUserAdapter({ where: { id: session.user.id }});

    return tagPolicy.filterForbidden(
        ResourceActions.GET, await prisma.tag.findMany(args), user
    );
});


export const updateTag = endpoint(async (
    session: Session,
    args: Prisma.tagUpdateArgs
) => {
    const user = await getUserAdapter({ where: { id: session.user.id } });
    const tag = await getTagAdapter({ where: args.where });
    await tagPolicy.verifyAction(ResourceActions.UPDATE, tag, user);
    
    return prisma.tag.update(args);
});


export const deleteTag = endpoint(async (
    session: Session,
    args: Prisma.tagDeleteArgs
) => {
    const user = await getUserAdapter({ where: { id: session.user.id } });
    const tag = await getTagAdapter({ where: args.where });
    await tagPolicy.verifyAction(ResourceActions.DELETE, tag, user);

    return prisma.tag.delete(args);
});
