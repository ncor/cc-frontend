'use client';

import cook from "../../../../hooks/cook";
import { ArgsType } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { countUsers, createUser, deleteUser, findUser, updateUser } from "@/lib/models/user/server-actions";
import useUser from "@/app/dashboard/users/hooks/user";


export default function useUsers() {
    const toast = useToast();
    const user = useUser();

    const create = async (args: ArgsType<typeof createUser>[1]) =>
        cook(toast, await createUser(user, args));

    const find = async (args: ArgsType<typeof findUser>[1]) =>
        cook(toast, await findUser(user, args));

    const count = async (args: ArgsType<typeof countUsers>[1]) =>
        cook(toast, await countUsers(user, args));

    const update = async (args: ArgsType<typeof updateUser>[1]) =>
        cook(toast, await updateUser(user, args));

    const remove = async (args: ArgsType<typeof deleteUser>[1]) =>
        cook(toast, await deleteUser(user, args));

    return {
        create, find, count, update, remove
    };
}
