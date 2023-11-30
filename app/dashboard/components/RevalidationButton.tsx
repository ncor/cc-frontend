'use client';

import { Button } from "@/components/ui/button";
import { RefreshCcw } from "lucide-react";
import { useContext, useState } from "react";
import { RevalidationContext } from "../../contexts/revalidation";
import { cn } from "@/lib/client/utils";


export default function RevalidationButton() {
    const [ isSpinning, setIsSpinning ] = useState<boolean>(false);
    const { revalidate } = useContext(RevalidationContext);
    

    return <Button onClick={() => {
        revalidate();
        setIsSpinning(true);
        setTimeout(() => setIsSpinning(false), 1000);
    }} variant="outline">
        <RefreshCcw className={cn(
            "w-4 h-4 text-muted-foreground mr-2",
            isSpinning ? 'animate-spin' : ''
        )}/>
        Обновить
    </Button>;
}
