import verifyToken from "./auth/verify";
import { CustomError } from "./error";
import { ArgsType } from "./types";
import { UserAuth } from "./user/types";


export type EndpointResponse<T> = {
    data?: T,
    error?: {
        message: string,
        code: string
    }
}

export const endpoint = <A extends Array<any>, R>(
    callback: (user: UserAuth, ...args: A) => R
) => {
    return async (
        ...args: ArgsType<typeof callback>
    ): Promise<EndpointResponse<Awaited<R>>> => {
        try {
            // verifyToken(args[0].token);

            const response = await callback(...args);
            
            return { data: response };
        } catch(e) {
            return {
                error: {
                    message: (e as CustomError)?.message,
                    code: (e as CustomError)?.code
                }
            }
        }
    }
}
