"use server";

import { Proxy } from "./types";
import { SocksProxyAgent } from "socks-proxy-agent";
import axios from "axios";
import { HttpsProxyAgent } from "https-proxy-agent";
import {
    PROXY_INVALID_PROTOCOL_ERROR,
    PROXY_INVALID_URL_ERROR
} from "./constants";


export const getProxyClient = async (proxy: Proxy, baseURL?: string) => {
    let httpsAgent: SocksProxyAgent | HttpsProxyAgent<string>;

    if (proxy.url.startsWith("socks")) {
        httpsAgent = new SocksProxyAgent(proxy.url);
    } else if (proxy.url.startsWith("https")) {
        httpsAgent = new HttpsProxyAgent(proxy.url);
    } else {
        throw PROXY_INVALID_PROTOCOL_ERROR;
    }

    try {
        return axios.create({
            httpsAgent,
            ...(baseURL && { baseURL }),
        });
    } catch(e) {
        throw PROXY_INVALID_URL_ERROR;
    }
}
