import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Plus } from "lucide-react"
import { ReactNode } from "react"


export interface RevealExtraButtonProps {
    children: ReactNode
}

export default function RevealExtraButton({
    children
}: RevealExtraButtonProps) {
    return <TooltipProvider>
        <Tooltip>
            <TooltipTrigger>
                <Button
                    variant="ghost"
                    className="p-1 h-6"
                >
                    <Plus className="w-4 h-4 text-muted-foreground"/>
                </Button>
            </TooltipTrigger>
            <TooltipContent className="w-full max-w-sm">
                { children }
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>;
}
