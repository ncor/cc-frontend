import { getServerSession } from "next-auth";
import Header from "./components/header/Header";
import { redirect } from "next/navigation";
import Confetti from "./components/Confetti";


export default async function DashboardLayout({
    children
}: { children: React.ReactNode }) {
    const session = await getServerSession();

    if (!session) redirect('/login');

    return <div className="w-full h-screen flex flex-col">
        <Header/>
        { children }
    </div>;
}
