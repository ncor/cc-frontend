'use client';

import { cn } from "@/lib/client/utils";
import { ReactNode } from "react";


export interface SectionContentProps {
    children: ReactNode,
    className?: string
}

export default function SectionContent({
    children, className
}: SectionContentProps) {
    return <div className={ cn("w-full max-w-6xl", className) }>
        { children }
    </div>
}
