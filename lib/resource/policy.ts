import { ERRORS } from "../error/constants";
import { isAdmin } from "../user/service";
import { User } from "../user/types";
import { PrivateResource } from "./types";


export type ResourcePolicyFilter<T> = (resource: T, user: User) => boolean;
export type ResourcePolicyRules<T> = {
    [action: string]: ResourcePolicyFilter<T>
};

export enum ResourceActions {
    GET='get',
    UPDATE='update',
    DELETE='delete'
}

export class ResourcePolicy<T extends PrivateResource> {
    constructor(
        public rules: ResourcePolicyRules<T>
    ) {}

    public isAllowed(action: string, resource: T, user: User) {
        if (resource.owner_id == user.id || isAdmin(user.roles))
            return true;

        if (!resource.is_public)
            return false;

        return resource.is_public
            ? this.rules[action]?.(resource, user) || false
            : false;
    }

    public validateInsert(resource: T, user: User) {
        if (resource?.is_public && !isAdmin(user.roles))
            throw ERRORS.AUTH.NOT_PERMITTED;
    }

    public verifyAction(action: string, resource: T, user: User) {
        if (!this.isAllowed(action, resource, user))
            throw ERRORS.AUTH.NOT_PERMITTED;
    }

    public filterForbidden(action: string, resources: T[], user: User) {
        return resources.filter(resource =>
            this.isAllowed(action, resource, user)
        );
    }
}
