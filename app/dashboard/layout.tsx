import { getServerSession } from "next-auth";
import Header from "./components/header/Header";
import { redirect } from "next/navigation";
import Confetti from "./components/Confetti";
import UserProvider from "./users/components/UserProvider";
import { prisma } from "@/lib/prisma";


export default async function DashboardLayout({
    children
}: { children: React.ReactNode }) {
    const session = await getServerSession();

    if (!session) redirect('/login');

    const user = await prisma.user.findFirst({
        where: { name: session.user.name }
    });

    return <UserProvider defaultUser={ user! }>
        <div className="w-full h-screen flex flex-col">
            <Header/>
            { children }
        </div>
    </UserProvider>;
}
