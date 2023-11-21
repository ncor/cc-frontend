import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { ERRORS } from "../error/constants";
import { Proxy } from "./types";


export const getProxyAdapter = async (args: Prisma.proxyFindFirstArgs) => {
    const proxy = await prisma.proxy.findFirst(args);
    if (!proxy) throw ERRORS.PROXY.NOT_EXISTS;
    return proxy as Proxy;
}
