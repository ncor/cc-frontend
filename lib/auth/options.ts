import { prisma } from "@/lib/prisma";
import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        Credentials({
            name: "sign-in",
            credentials: {
                name: { type: 'text' },
                password: { type: "password" },
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
        async jwt({ token, user }) {
            if (user) token.id = user.id;
            return token;
        },
        async session({ session, token }) {
            const user = await prisma.user.findFirst({
                where: { id: token.id || '' }
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
