import { ResourcePolicy } from "../resource/policy";
import { ResourceActions } from "../resource/types";
import { Proxy } from "./types";


export enum ProxyActions {
    USE='use'
}

export const proxyPolicy = new ResourcePolicy<Proxy>({
    [ResourceActions.GET]: () =>        true,
    [ResourceActions.UPDATE]: () =>     false,
    [ResourceActions.DELETE]: () =>     false,
    [ProxyActions.USE]: () =>           true
});
