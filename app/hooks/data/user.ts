'use client';

import cook from "../cook";
import useUser from "../user";
import { ArgsType } from "@/lib/types";
import { useToast } from "@/components/ui/use-toast";
import { createUser, deleteUser, findUser, updateUser } from "@/lib/user/endpoints";


export default function useUsers() {
    const toast = useToast();
    const user = useUser();

    const create = async (args: ArgsType<typeof createUser>[1]) =>
        cook(toast, await createUser(user, args));

    const find = async (args: ArgsType<typeof findUser>[1]) =>
        cook(toast, await findUser(user, args));

    const update = async (args: ArgsType<typeof updateUser>[1]) =>
        cook(toast, await updateUser(user, args));

    const remove = async (args: ArgsType<typeof deleteUser>[1]) =>
        cook(toast, await deleteUser(user, args));

    return {
        create, find, update, remove
    };
}
