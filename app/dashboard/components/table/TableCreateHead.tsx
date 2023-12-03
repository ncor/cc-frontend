import useVisibility from "@/app/hooks/visibility";
import { Button } from "@/components/ui/button";
import { TableHead } from "@/components/ui/table";
import { Plus } from "lucide-react";
import React from "react";


export interface TableCreateHeadProps {
    modal: React.ComponentType<any>
}

export default function TableCreateHead({
    modal
}: TableCreateHeadProps) {
    const modalView = useVisibility();
    
    const Modal = modal || React.Fragment;

    return <TableHead>
        <div className="float-right">
            <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                onClick={ () => modalView.toggle(true) }
            >
                <Plus className="h-4 w-4" />
            </Button>
            <Modal visibility={ modalView }/>
        </div>
    </TableHead>;
}
