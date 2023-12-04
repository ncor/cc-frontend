import { UserAuth } from "@/lib/models/user/types";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
    export type User = UserAuth;
    export interface JWT extends Record<string, unknown> {
        id: string
    }
    export interface Session {
        user: UserAuth
    }
}
