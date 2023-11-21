'use client';

import { useContext } from "react";
import { sessionContext } from "../../contexts/session";
import { createProxy, deleteProxy, findProxy, updateProxy } from "@/lib/proxy/endpoints";
import { ArgsType } from "@/lib/types";
import { proxyPolicy } from "@/lib/proxy/policy";
import { Proxy } from "@/lib/proxy/types";
import { User } from "@/lib/user/types";
import { useToast } from "@/components/ui/use-toast";
import cook from "../cook";


export default function useProxies() {
    const toast = useToast();
    const session = useContext(sessionContext);

    const create = async (args: ArgsType<typeof createProxy>[1]) =>
        cook(toast, await createProxy(session, args));

    const find = async (args: ArgsType<typeof findProxy>[1]) =>
        cook(toast, await findProxy(session, {
            ...args, include: { user: true }
        }));

    const findOwn = async(args: ArgsType<typeof findProxy>[1]) =>
        find({ ...args, where: { ...args.where, owner_id: session.user.id } });

    const findPublic = async(args: ArgsType<typeof findProxy>[1]) =>
        find({ ...args, where: { ...args.where, is_public: true } });

    const update = async (args: ArgsType<typeof updateProxy>[1]) =>
        cook(toast, await updateProxy(session, args));

    const remove = async (args: ArgsType<typeof deleteProxy>[1]) =>
        cook(toast, await deleteProxy(session, args));

    const can = (action: string,proxy: Proxy,user: User) =>
        proxyPolicy.isAllowed(action, proxy, user)

    return {
        create, find, findOwn, findPublic, update, remove, can
    };
}
