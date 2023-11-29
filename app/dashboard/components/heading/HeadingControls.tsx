import { ReactNode } from "react"


export interface HeadingControlsProps {
    children: ReactNode
}

export default function HeadingControls({
    children
}: HeadingControlsProps) {
    return <div className="flex items-center gap-2">
        { children }
    </div>
}
