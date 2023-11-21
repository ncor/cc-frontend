import { redirect } from "next/navigation";
import useSession from "../hooks/session";
import { useServerSupabase } from "../hooks/supabase";
import { useToast } from "@/components/ui/use-toast";
import DashboardClientLayout from "./DashboardClientLayout";
import { getSessionUser } from "@/lib/user/endpoints";
import { User } from "@/lib/user/types";


export default async function DashboardLayout({
    children
}: { children: React.ReactNode }) {
    const supabase = await useServerSupabase();
    const session = await useSession(supabase);

    if (!session) redirect('/auth');

    const { data: user } = await getSessionUser(session);

    return <DashboardClientLayout
        session={ session }
        sessionUser={ user as User }
    >
        { children }
    </DashboardClientLayout>;
}
