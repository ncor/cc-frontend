'use client';

import { ReactNode } from "react";


export interface BannerHeaderProps {
    children: ReactNode
}

export default function BannerHeader({
    children
}: BannerHeaderProps) {
    return <div className="flex flex-col gap-4">
        { children }
    </div>
}
