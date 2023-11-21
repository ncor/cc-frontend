import { Session } from "@supabase/supabase-js";
import { CustomError } from "./error";
import { ArgsType } from "./types";
import { verifySession } from "./supabase/filters";


export type EndpointResponse<T> = {
    data?: T,
    error?: {
        message: string,
        code: string
    }
}

export const endpoint = <A extends Array<any>, R>(
    callback: (session: Session, ...args: A) => R
) => {
    return async (
        ...args: ArgsType<typeof callback>
    ): Promise<EndpointResponse<Awaited<R>>> => {
        try {
            await verifySession(args[0]);
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
