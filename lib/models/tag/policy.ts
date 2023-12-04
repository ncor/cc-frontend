import { Policy } from "../../common/policy";
import { RowActions } from "../../common/types";
import { Tag } from "./types";


export enum TagActions {
    USE='use'
}

export const tagPolicy = new Policy<Tag>({
    [RowActions.GET]: () =>        true,
    [RowActions.UPDATE]: () =>     false,
    [RowActions.DELETE]: () =>     false,
    [TagActions.USE]: () =>        true
});
