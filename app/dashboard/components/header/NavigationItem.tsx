'use client';

import Link from "next/link";
import { ReactNode } from "react";


export interface NavigationItemProps {
    href: string,
    children: ReactNode
}

export default function NavigationItem({
    href, children
}: NavigationItemProps) {
    return <Link
        href={ href }
        className="text-sm font-medium transition-colors text-muted-foreground hover:text-primary"
    >
        { children }
    </Link>
}
