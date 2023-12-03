import { User } from "../../user/types";
import { NOT_PERMITTED_ERROR } from "./constants";
import { PolicyRules, Protected } from "./types";


export class Policy<T extends Protected> {
    constructor(
        public rules: PolicyRules<T>
    ) {}

    public isAllowed(action: string, resource: T, user: User) {
        if (resource.owner_id == user.id || user.is_admin)
            return true;

        if (!resource.is_public)
            return false;

        return resource.is_public
            ? this.rules[action]?.(resource, user) || false
            : false;
    }

    public validateInsert(resource: T, user: User) {
        if (resource?.is_public && !user.is_admin)
            throw NOT_PERMITTED_ERROR;
    }

    public verifyAction(action: string, resource: T, user: User) {
        if (!this.isAllowed(action, resource, user))
            throw NOT_PERMITTED_ERROR;
    }

    public filterForbidden(action: string, resources: T[], user: User) {
        return resources.filter(resource =>
            this.isAllowed(action, resource, user)
        );
    }
}
