import { ReactNode } from "react";
import RevalidationButton from "../RevalidationButton";


export interface HeadingDescriptionProps {
    children: ReactNode
}

export default function BannerDescription({
    children
}: HeadingDescriptionProps) {
    return <p className="text-sm text-muted-foreground">
        { children }
    </p>;
}
