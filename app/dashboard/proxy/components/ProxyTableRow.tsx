'use client';

import { TableCell, TableRow } from "@/components/ui/table";
import { ProxyExtended } from "@/lib/models/proxy/types";
import TableActionsCell from "../../components/table/TableActionsCell";
import ProxyActionsMenu from "./ProxyActionsMenu";
import TableUserCell from "../../components/table/TableUserCell";
import TableScopeCell from "../../components/table/TableScopeCell";
import TableTagsCell from "../../components/table/TableTagsCell";
import TableHealthCheckStatusCell from "../../components/table/TableHealthCheckStatusCell";
import { Badge } from "@/components/ui/badge";
import useVisibility from "@/app/hooks/visibility";
import TableDateCell from '../../components/table/TableDateCell';


export interface ProxyTableRowProps {
    reference: ProxyExtended
}

export default function ProxyTableRow({
    reference
}: ProxyTableRowProps) {
    const actionsMenu = useVisibility();
    
    return <TableRow
        key={ reference.id }
        className="items-center h-[65px]"
    >
        <TableCell>{ reference.id }</TableCell>
        <TableCell>{ reference.name }</TableCell>
        <TableCell>
            <div className="flex items-center gap-2">
                <Badge variant="outline">
                    { reference.url.split('://')[0] }
                </Badge>
                { reference.url.split('@')[1] }
            </div>
        </TableCell>
        <TableHealthCheckStatusCell status={ reference.health_check }/>
        <TableTagsCell tags={ reference.tags }/>
        <TableScopeCell isPublic={ reference.is_public }/>
        <TableDateCell date={ reference.created_at }/>
        <TableUserCell user={ reference.user }/>
        <TableActionsCell visibility={ actionsMenu }>
            <ProxyActionsMenu
                reference={ reference }
                visibility={ actionsMenu }
            />
        </TableActionsCell>
    </TableRow>;
}
