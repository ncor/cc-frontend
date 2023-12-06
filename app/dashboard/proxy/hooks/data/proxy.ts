'use client';

import { countProxies, createProxy, deleteProxy, findProxy, updateProxy } from "@/lib/models/proxy/server-actions";
import { ArgsType } from "@/lib/types";
import { proxyPolicy } from "@/lib/models/proxy/policy";
import { Proxy } from "@/lib/models/proxy/types";
import { User } from "@/lib/models/user/types";
import { useToast } from "@/components/ui/use-toast";
import cook from "../../../../hooks/cook";
import useUser from "@/app/dashboard/users/hooks/user";


export default function useProxies() {
    const toast = useToast();
    const user = useUser();

    const create = async (args: ArgsType<typeof createProxy>[1]) =>
        cook(toast, await createProxy(user, args));

    const find = async (args: ArgsType<typeof findProxy>[1]) =>
        cook(toast, await findProxy(user, {
            ...args, include: { user: true, tags: true }
        }));

    const findOwn = (args: ArgsType<typeof findProxy>[1]) =>
        find({ ...args, where: { ...args.where, owner_id: user.id } });

    const findPublic = (args: ArgsType<typeof findProxy>[1]) =>
        find({ ...args, where: { ...args.where, is_public: true } });

    const count = async (args: ArgsType<typeof countProxies>[1]) =>
        cook(toast, await countProxies(user, args))

    const countOwn = async (args: ArgsType<typeof countProxies>[1]) =>
        count({ ...args, where: { ...args.where, owner_id: user.id } })

    const countPublic = async (args: ArgsType<typeof countProxies>[1]) =>
        count({ ...args, where: { ...args.where, is_public: true } })

    const update = async (args: ArgsType<typeof updateProxy>[1]) =>
        cook(toast, await updateProxy(user, args));

    const remove = async (args: ArgsType<typeof deleteProxy>[1]) =>
        cook(toast, await deleteProxy(user, args));

    const can = (action: string, proxy: Proxy,user: User) =>
        proxyPolicy.isAllowed(action, proxy, user);

    return {
        create, find, findOwn, count, countOwn, countPublic, findPublic, update, remove, can
    };
}
