import AuthModal from "./components/AuthModal";
import { redirect } from "next/navigation";
import useSession from "../hooks/session";
import { useServerSupabase } from "../hooks/supabase";


export default async function Login() {
    const supabase = await useServerSupabase();
    const session = await useSession(supabase);
    
    if (session) redirect('/dashboard');

    return <div
        className="w-full h-screen flex justify-center \
            items-center grainy-background"
    >
        <AuthModal/>
    </div>
}
