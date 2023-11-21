'use client';

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useContext, useState } from "react";
import { revalidationContext } from "../contexts/revalidation";
import { cn } from "@/lib/client/utils";


export default function RevalidationButton() {
    const [ isSpinning, setIsSpinning ] = useState<boolean>(false);
    const { revalidate } = useContext(revalidationContext);
    

    return <Button onClick={() => {
        revalidate();
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 1000);
    }} size="icon" variant="ghost" className="ml-2">
        <RefreshCcw className={cn(
            "w-4 h-4 text-muted-foreground",
            isSpinning ? 'animate-spin' : ''
        )}/>
    </Button>;
}
