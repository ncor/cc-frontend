import { User } from "@/lib/models/user/types";
import { createContext } from "react";


export type IUserContext = {
    user: User,
    setUser: (user: User) => any
};

export const UserContext = createContext<IUserContext>({
    user: {} as User,
    setUser: () => {}
});
