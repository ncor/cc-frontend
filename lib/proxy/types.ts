import { MarkedResourse, PrivateResource } from "../resource/types";
import { User } from "../user/types";


export type Proxy =
    PrivateResource &
    MarkedResourse &
    {
        id: number,
        url: string,
        user?: User
    };
