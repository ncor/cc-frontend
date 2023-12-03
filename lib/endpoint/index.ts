import { EndpointResponse } from '@/lib/endpoint/types';
import { CustomError } from "../common/dto/CustomError";
import { ArgsType } from "../types";
import { UserAuth } from "../user/types";


export const endpoint = <A extends Array<any>, R>(
    callback: (user: UserAuth, ...args: A) => R
) => {
    return async (
        ...args: ArgsType<typeof callback>
    ): Promise<EndpointResponse<Awaited<R>>> => {
        try {
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
