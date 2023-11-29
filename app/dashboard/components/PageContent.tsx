import { ReactNode } from "react"


export interface PageContentProps {
    children: ReactNode
}

export default function PageContent({
    children
}: PageContentProps) {
    return <div className="w-full flex flex-col">
        { children }
    </div>
}