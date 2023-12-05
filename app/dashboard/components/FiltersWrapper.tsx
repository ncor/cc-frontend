import { cn } from "@/lib/client/utils";
import { ReactNode } from "react"


export interface FiltersWrapper extends React.Attributes {
    children: ReactNode,
    className?: string;
}

export default function FiltersWrapper({
    children, className
}: FiltersWrapper) {
    return <div className={
        cn("w-full flex flex-col sm:flex-row gap-2", className)
    }>
        { children }
    </div>
}
