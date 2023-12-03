'use client';

import { useToast } from "@/components/ui/use-toast";
import { ArgsType } from "@/lib/types";
import { createTag, findTag, deleteTag, updateTag, countTags } from "@/lib/tag/endpoints";
import { tagPolicy } from "@/lib/tag/policy";
import { Tag } from "@/lib/tag/types";
import { User } from "@/lib/user/types";
import cook from "../../../../hooks/cook";
import useUser from "@/app/dashboard/users/hooks/user";


export default function useTags() {
    const toast = useToast();
    const user = useUser();

    const create = async (args: ArgsType<typeof createTag>[1]) =>
        cook(toast, await createTag(user, args));

    const find = async (args: ArgsType<typeof findTag>[1]) =>
        cook(toast, await findTag(user, {
            ...args, orderBy: { is_public: 'desc' }, include: { user: true }
        }));

    const findOwn = (args: ArgsType<typeof findTag>[1]) =>
        find({ ...args, where: { ...args.where, owner_id: user.id } });

    const findPublic = (args: ArgsType<typeof findTag>[1]) =>
        find({ ...args, where: { ...args.where, is_public: true } });

    const count = async (args: ArgsType<typeof countTags>[1]) =>
        cook(toast, await countTags(user, args))

    const countOwn = async (args: ArgsType<typeof countTags>[1]) =>
        count({ ...args, where: { ...args.where, owner_id: user.id } })

    const countPublic = async (args: ArgsType<typeof countTags>[1]) =>
        count({ ...args, where: { ...args.where, is_public: true } })

    const update = async (args: ArgsType<typeof updateTag>[1]) =>
        cook(toast, await updateTag(user, args));

    const remove = async (args: ArgsType<typeof deleteTag>[1]) =>
        cook(toast, await deleteTag(user, args));

    const can = (action: string, tag: Tag, user: User) =>
        tagPolicy.isAllowed(action, tag, user)

    return {
        create, find, findOwn, findPublic, count, countOwn, countPublic, update, remove, can
    };
}
