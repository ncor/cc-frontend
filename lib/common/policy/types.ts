import { User } from "@/lib/user/types";


export type Protected = {
    owner_id: string,
    is_public: boolean
};

export type PolicyFilter<T> = (resource: T, user: User) => boolean;

export type PolicyRules<T> = {
    [action: string]: PolicyFilter<T>
};
