import './globals.css'
import './gradient.css'
import { Toaster } from '../components/ui/toaster';
import Script from 'next/script';
import Providers from './components/Providers';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';


export const metadata = {
    title: 'CommentCraft',
    description: '',
}

export default async function RootLayout({
    children
}: { children: React.ReactNode }) {
    const session = await getServerSession();

    if (session) {
        const fetchedUser = await prisma.user.findFirst({
            where: { name: session?.user?.name || '' }
        });
    
        if (fetchedUser) session.user = fetchedUser;
    }

    return (
        <html lang="en" className="dark" style={{colorScheme: "dark"}}>
            <Script type="text/javascript" src="gradient.js"/>
            <body className="antialiased">
                <Providers session={ session }>
                    { children }
                </Providers>
            </body>
            <Toaster/>
        </html>
    )
}
