import { ReactNode } from "react";
import RevalidationButton from "../RevalidationButton";


export interface HeadingTitleProps {
    children: ReactNode,
    includeRevalidation?: boolean
}

export default function HeadingTitle({
    children, includeRevalidation
}: HeadingTitleProps) {
    return <div className="flex">
        <h2 className="text-3xl font-semibold tracking-tight">
            { children }
        </h2>
        { includeRevalidation && <RevalidationButton/> }
    </div>;
}
