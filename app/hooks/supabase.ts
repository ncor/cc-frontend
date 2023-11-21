import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";


export async function useServerSupabase() {
    return createServerComponentClient({ cookies });
}
