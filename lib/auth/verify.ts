import { JWT, encode } from "next-auth/jwt";
import { UserAuth } from "../user/types";
import * as jwt from 'jsonwebtoken';
import { ERRORS } from "../error/constants";


export default function verifyToken(token: string) {
    try {
        jwt.verify(token, process.env.NEXTAUTH_SECRET!);
    } catch(e) {
        throw ERRORS.AUTH.SESSION_INVALID;
    }
}
