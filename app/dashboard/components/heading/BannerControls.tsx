import { ReactNode } from "react"


export interface BannerControlsProps {
    children: ReactNode
}

export default function BannerControls({
    children
}: BannerControlsProps) {
    return <div className="flex items-center gap-2">
        { children }
    </div>
}
