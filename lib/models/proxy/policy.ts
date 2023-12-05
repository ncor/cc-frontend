import { NOT_PERMITTED_ERROR } from "@/lib/common/policy/constants";
import { Policy } from "../../common/policy";
import { RowActions } from "../../common/types";
import { User } from "../user/types";
import { Proxy } from "./types";


export enum ProxyActions {
    USE='use'
}

export const proxyPolicy = new Policy<Proxy>({
    [RowActions.GET]: () =>        true,
    [RowActions.UPDATE]: () =>     false,
    [RowActions.DELETE]: () =>     false,
    [ProxyActions.USE]: () =>      true
});

export const verifyProxyUsagePermission = (
    proxy: Proxy, user: User
) => {
    if (!proxyPolicy.isAllowed(ProxyActions.USE, proxy, user))
        throw NOT_PERMITTED_ERROR;
}
