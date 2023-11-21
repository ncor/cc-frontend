import { ResourceActions, ResourcePolicy } from "../resource/policy";
import { Tag } from "./types";


export enum TagActions {
    USE='use'
}

export const tagPolicy = new ResourcePolicy<Tag>({
    [ResourceActions.GET]: () =>        true,
    [ResourceActions.UPDATE]: () =>     false,
    [ResourceActions.DELETE]: () =>     false,
    [TagActions.USE]: () =>             true
});
