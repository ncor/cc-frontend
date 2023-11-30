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
    const Wrapper = modal || React.Fragment;

    return <TableHead>
        <Wrapper className="float-right">
            <Button variant="ghost" className="h-8 w-8 p-0">
                <Plus className="h-4 w-4" />
            </Button>
        </Wrapper>
    </TableHead>;
}
