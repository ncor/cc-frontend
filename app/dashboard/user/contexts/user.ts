import { User } from "@/lib/user/types";
import { createContext } from "react";


export type IUserContext = {
    user: User,
    setUser: (user: User) => any
};

export const UserContext = createContext<IUserContext>({
    user: {} as User,
    setUser: () => {}
});
