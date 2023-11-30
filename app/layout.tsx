import './globals.css'
import { Toaster } from '../components/ui/toaster';
import Script from 'next/script';
import Providers from './components/Providers';
import { getServerSession } from 'next-auth';
import { cookies } from 'next/headers';
import { COOKIES, THEMES } from './constants';


export const metadata = {
    title: 'CommentCraft',
    description: '',
}

export default async function RootLayout({
    children
}: { children: React.ReactNode }) {
    const session = await getServerSession();

    let theme = cookies().get(COOKIES.PREFERRED_THEME)?.value;
    if (!theme || !Object.values(THEMES).includes(theme)) theme = 'dark';

    return (
        <html lang="en" className={ theme }>
            <Script type="text/javascript" src="gradient.js"/>
            <body className="antialiased">
                <Providers
                    defaultTheme={ theme }
                    session={ session }
                >
                    { children }
                </Providers>
            </body>
            <Toaster/>
        </html>
    )
}
