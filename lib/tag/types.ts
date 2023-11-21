import { PrivateResource } from "../resource/types";
import { User } from "../user/types";


export type Tag =
    PrivateResource &
    {
        id: string,
        name: string,
        user?: User
    };
