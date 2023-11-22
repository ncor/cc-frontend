import { UserAuth } from "@/lib/user/types";
import { JWT } from "next-auth/jwt";


declare module "next-auth" {
    interface Session {
        user: UserAuth
    }
}
