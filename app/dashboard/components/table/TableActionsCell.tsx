import { TableCell } from "@/components/ui/table";
import MoreButton from "../MoreButton";
import { VisibilityInterface } from "@/app/hooks/visibility";
import { ReactNode } from "react";


export interface TableActionsCellProps {
    visibility: VisibilityInterface,
    children: ReactNode
}

export default function TableActionsCell({
    visibility, children
}: TableActionsCellProps) {
    return <TableCell className="float-right">
        <div className="flex flex-col">
            <MoreButton
                onClick={ () => visibility.toggle(true) }
            />
            { children }
        </div>
    </TableCell>;
}
