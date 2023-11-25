import { Prisma } from "@prisma/client";
import { prisma } from "../prisma";
import { ERRORS } from "../error/constants";
import { Proxy } from "./types";
import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";


export const getProxyAdapter = async (args: Prisma.proxyFindFirstArgs) => {
    const proxy = await prisma.proxy.findFirst(args);
    if (!proxy) throw ERRORS.PROXY.NOT_EXISTS;
    return proxy as Proxy;
}

export const getProxyClient = (proxy: Proxy, baseURL?: string) => {
    try {
        let httpsAgent: SocksProxyAgent | HttpsProxyAgent<string>;

        if (proxy.url.startsWith('socks')) {
            httpsAgent = new SocksProxyAgent(proxy.url);
        } else if (proxy.url.startsWith('https')) {
            httpsAgent = new HttpsProxyAgent(proxy.url);
        } else {
            throw ERRORS.PROXY.INVALID_PROTOCOL;
        }

        return axios.create({
            httpsAgent,
            ...(baseURL && { baseURL })
        });
    } catch(e) {
        if (e != ERRORS.PROXY.INVALID_PROTOCOL)
            throw ERRORS.PROXY.INVALID_URL;
        throw e;
    }
}

/**
 * Checks if proxy is ready to make requests through it.
 */
export const checkProxyConnection = async (proxy: Proxy) => {
    const proxyClient = getProxyClient(proxy, 'https://google.com');

    try {
        if (proxyClient)
            await proxyClient.get('/', {
                timeout: 5000
            });
    } catch(e) {
        throw ERRORS.PROXY.NOT_WORKING;
    }
}
