'use client';

import { countAccounts, createAccount, deleteAccount, findAccount, updateAccount } from "@/lib/models/account/server-actions";
import { ArgsType } from "@/lib/types";
import { accountPolicy } from "@/lib/models/account/policy";
import { Account } from "@/lib/models/account/types";
import { User } from "@/lib/models/user/types";
import { useToast } from "@/components/ui/use-toast";
import cook from "../../../../hooks/cook";
import useUser from "@/app/dashboard/users/hooks/user";


export default function useAccounts() {
    const toast = useToast();
    const user = useUser();

    const create = async (args: ArgsType<typeof createAccount>[1]) =>
        cook(toast, await createAccount(user, args));

    const find = async (args: ArgsType<typeof findAccount>[1]) =>
        cook(toast, await findAccount(user, {
            ...args, include: { user: true, proxy: true }
        }));

    const findOwn = (args: ArgsType<typeof findAccount>[1]) =>
        find({ ...args, where: { ...args.where, owner_id: user.id } });

    const findPublic = (args: ArgsType<typeof findAccount>[1]) =>
        find({ ...args, where: { ...args.where, is_public: true } });

    const count = async (args: ArgsType<typeof countAccounts>[1]) =>
        cook(toast, await countAccounts(user, args))

    const countOwn = async (args: ArgsType<typeof countAccounts>[1]) =>
        count({ ...args, where: { ...args.where, owner_id: user.id } })

    const countPublic = async (args: ArgsType<typeof countAccounts>[1]) =>
        count({ ...args, where: { ...args.where, is_public: true } })

    const update = async (args: ArgsType<typeof updateAccount>[1]) =>
        cook(toast, await updateAccount(user, args));

    const remove = async (args: ArgsType<typeof deleteAccount>[1]) =>
        cook(toast, await deleteAccount(user, args));

    const can = (action: string, account: Account,user: User) =>
        accountPolicy.isAllowed(action, account, user)

    return {
        create, find, findOwn, count, countOwn, countPublic, findPublic, update, remove, can
    };
}
