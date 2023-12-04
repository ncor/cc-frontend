'use client';

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";
import { ReactNode } from "react";


export interface DetailsMarkerProps {
    children: ReactNode
}

export default function DetailsMarker({
    children
}: DetailsMarkerProps) {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <InfoIcon className="w-4 h-4 text-muted-foreground"/>
            </TooltipTrigger>
            <TooltipContent className="w-full max-w-sm">
                { children }
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
}
