import { ReactNode } from "react";
import RevalidationButton from "../RevalidationButton";


export interface HeadingTitleProps {
    children: ReactNode
}

export default function BannerTitle({
    children
}: HeadingTitleProps) {
    return <h1 className="text-[2rem] leading-[2.5rem] font-medium tracking-tight">
        { children }
    </h1>;
}
