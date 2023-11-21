import { Session, User } from "@supabase/supabase-js";
import { createContext } from "react";


export const sessionContext = createContext<Session>({} as Session);
