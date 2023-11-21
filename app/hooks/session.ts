import { SupabaseClient } from "@supabase/supabase-js";


export default async function useSession(supabase: SupabaseClient) {
    if (!supabase) return null;

    const { data: { session: session } } = await supabase.auth.getSession();

    return session;
}
