import { User } from "./types";
import { ERRORS } from "../error/constants";


export const verifyUserUpdateAccess = async (
    user: User,
    targetUser: User
) => {
    if (user.id != targetUser.id && user.is_admin)
        throw ERRORS.AUTH.NOT_PERMITTED;
}
