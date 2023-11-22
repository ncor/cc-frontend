import { redirect } from 'next/navigation';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getServerSession } from 'next-auth';


export default async function Home() {
    const session = await getServerSession();

    if (!session)
        redirect('/login')
    else
        redirect('/dashboard');
}
