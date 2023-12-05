import { Policy } from "../../common/policy";
import { RowActions } from "../../common/types";
import { Account } from "./types";


export enum AccountActions {
    USE='use'
}

export const accountPolicy = new Policy<Account>({
    [RowActions.GET]: () =>        true,
    [RowActions.UPDATE]: () =>     false,
    [RowActions.DELETE]: () =>     false,
    [AccountActions.USE]: () =>    true
});
