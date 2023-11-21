import { Session } from "@supabase/supabase-js";
import { ERRORS } from "../error/constants";
import { supabase } from "../supabase";


export const verifySession = async (
    session: Session | null
) => {
    if (!session || !session.user.id)
        throw ERRORS.AUTH.SESSION_INVALID;

    const {
        data: { user: user }
    } = await supabase.auth.getUser(session?.access_token);

    if (!user)
        throw ERRORS.AUTH.SESSION_INVALID;
};
