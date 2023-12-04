'use client';

import { ReactNode } from "react"


export interface SectionHeadingProps {
    children: ReactNode
}

export default function SectionHeading({
    children
}: SectionHeadingProps) {
    return <div className="w-full flex items-center gap-4 mb-7 text-2xl font-medium">
        { children }
    </div>;
}
