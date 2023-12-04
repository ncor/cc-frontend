'use client';

import { cn } from "@/lib/client/utils";
import { ReactNode } from "react";


export interface SectionProps {
    children: ReactNode,
    className?: string
}

export default function Section({
    children, className
}: SectionProps) {
    return <div className={ cn("w-full flex justify-center px-6", className) }>
        { children }
    </div>;
}
