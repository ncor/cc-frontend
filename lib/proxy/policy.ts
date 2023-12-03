import { Policy } from "../common/policy";
import { RowActions } from "../common/types";
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
