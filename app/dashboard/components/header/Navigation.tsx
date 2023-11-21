import Link from "next/link";


export default function Navigation() {
    return <nav className="flex items-center space-x-4 lg:space-x-6">
        <Link
            href="/dashboard/proxy"
            className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
        >
            Прокси
        </Link>
    </nav>;
}
