'use server';

import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { ERRORS } from "../error/constants";
import { Tag } from "./types";


export const getTagAdapter = async (args: Prisma.tagFindFirstArgs) => {
    const tag = await prisma.tag.findFirst(args);
    if (!tag) throw ERRORS.PROXY.NOT_EXISTS;
    return tag as Tag;
}
