'use client';

import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ButtonHTMLAttributes } from "react";


export default function MoreButton(props: ButtonHTMLAttributes<any>) {
    return <Button
        variant="ghost"
        className="h-8 w-8 p-0"
        { ...props }
    >
        <MoreHorizontal className="h-4 w-4" />
    </Button>;
}
