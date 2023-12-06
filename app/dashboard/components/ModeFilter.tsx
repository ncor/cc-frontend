import useMode from "@/app/hooks/mode";
import useVisibility from "@/app/hooks/visibility";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ReactNode } from "react";


export interface ModeFilterProps {
    provider: ReturnType<typeof useMode>,
    label: ReactNode,
    icon: ReactNode
}

export default function ModeFilter({
    provider, label, icon
}: ModeFilterProps) {
    const tooltip = useVisibility();

    return <TooltipProvider>
        <Tooltip
            open={ tooltip.isVisible }
            onOpenChange={ open => tooltip.toggle(open) }
            delayDuration={ 0 }
        >
            <TooltipTrigger asChild>
                <Button
                    size="icon"
                    variant="outline"
                    className="bg-muted"
                    onClick={ () => {
                        provider.rotate();
                        tooltip.toggle(true);
                    } }
                    type="button"
                >

                    { icon }
                </Button>
            </TooltipTrigger>
            <TooltipContent className="w-full max-w-sm">
                { label }
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>;
}
