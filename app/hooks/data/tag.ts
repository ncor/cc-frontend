'use client';

import { useToast } from "@/components/ui/use-toast";
import { ArgsType } from "@/lib/types";
import { createTag, findTag, deleteTag, updateTag } from "@/lib/tag/endpoints";
import { tagPolicy } from "@/lib/tag/policy";
import { Tag } from "@/lib/tag/types";
import { User } from "@/lib/user/types";
import cook from "../cook";
import useUser from "../../dashboard/users/hooks/user";


export default function useTags() {
    const toast = useToast();
    const user = useUser();

    const create = async (args: ArgsType<typeof createTag>[1]) =>
        cook(toast, await createTag(user, args));

    const find = async (args: ArgsType<typeof findTag>[1]) =>
        cook(toast, await findTag(user, {
            ...args, orderBy: { is_public: 'desc' }
        }));

    const findOwn = (args: ArgsType<typeof findTag>[1]) =>
        find({ ...args, where: { ...args.where, owner_id: user.id } });

    const findPublic = (args: ArgsType<typeof findTag>[1]) =>
        find({ ...args, where: { ...args.where, is_public: true } });

    const update = async (args: ArgsType<typeof updateTag>[1]) =>
        cook(toast, await updateTag(user, args));

    const remove = async (args: ArgsType<typeof deleteTag>[1]) =>
        cook(toast, await deleteTag(user, args));

    const can = (action: string, tag: Tag, user: User) =>
        tagPolicy.isAllowed(action, tag, user)

    return {
        create, find, findOwn, findPublic, update, remove, can
    };
}
