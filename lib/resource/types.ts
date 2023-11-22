import { User } from "../user/types";


export type ProtectedResource = {
    owner_id: string,
    is_public: boolean
};
export type ResourcePolicyFilter<T> = (resource: T, user: User) => boolean;
export type ResourcePolicyRules<T> = {
    [action: string]: ResourcePolicyFilter<T>
};

export enum ResourceActions {
    GET='get',
    UPDATE='update',
    DELETE='delete'
}
