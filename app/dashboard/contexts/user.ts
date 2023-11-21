import { User } from "@/lib/user/types";
import { createContext } from "react";


export const userContext = createContext<User>({} as User);
