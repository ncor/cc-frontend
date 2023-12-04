import { ServerActionResponse } from '@/lib/common/middlewares/server-action/types';
import { ArgsType } from "../../../types";
import { UserAuth } from "../../../models/user/types";


export const createServerAction = <A extends Array<any>, R>(
    callback: (user: UserAuth, ...args: A) => R
) => {
    return async (
        ...args: ArgsType<typeof callback>
    ): Promise<ServerActionResponse<Awaited<R>>> => {
        try {
            const response = await callback(...args);
        
            return { data: response };
        } catch(e) {
            return { error: e as Error };
        }
    }
}
