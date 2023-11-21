import { redirect } from 'next/navigation';
import useSession from './hooks/session';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';


export default async function Home() {
    const supabase = createServerComponentClient({ cookies });
    const session = await useSession(supabase);
    
    if (!session)
        redirect('/auth')
    else
        redirect('/dashboard');
}
