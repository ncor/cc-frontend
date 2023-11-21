import './globals.css'
import { Toaster } from '../components/ui/toaster';


export const metadata = {
    title: 'CommentCraft',
    description: '',
}

export default function RootLayout({
    children
}: { children: React.ReactNode }) {
    return (
        <html lang="en" className="dark" style={{colorScheme: "dark"}}>
            <body className="antialiased">
                { children }
            </body>
            <Toaster/>
        </html>
    )
}
