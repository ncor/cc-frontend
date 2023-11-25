import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { encode } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "sign-in",
            credentials: {
                id: { type: 'text' },
                name: { type: 'text' },
                password: { type: "password" },
                roles: { type: 'text' }
            },
            async authorize(credentials) {
                const name = credentials?.name;
                const password = credentials?.password;
                if (!name || !password) return null;

                const user = await prisma.user.findFirst({ where: { name } });
                if (!user) return null;

                const matches = await bcrypt.compare(password, user.password);

                return matches ? user : null;
            },
        }),
    ],
    callbacks: {
        async session({ session }) {
            const user = await prisma.user.findFirst({
                where: { name: session?.user?.name || '' }
            });
        
            if (user) session.user = user;

            return session;
        },
        async redirect({ url }) {
            return url;
        }
    },
    pages: {
        signIn: '/login',
        error: '/login'
    }
};
