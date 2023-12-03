import { TableCell, TableRow } from "@/components/ui/table";
import { ProxyExtended } from "@/lib/proxy/types";
import TableActionsCell from "../../components/table/TableActionsCell";
import ProxyActionsMenu from "./ProxyActionsMenu";
import TableUserColumn from "../../components/table/TableUserColumn";
import TableScopeColumn from "../../components/table/TableScopeColumn";
import TableTagsColumn from "../../components/table/TableTagsColumn";
import TableHealthCheckStatusColumn from "../../components/table/TableHealthCheckStatusColumn";
import { Badge } from "@/components/ui/badge";
import useVisibility from "@/app/hooks/visibility";


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
        <TableCell>
            <div className="flex items-center gap-2">
                <Badge variant="outline">
                    { reference.url.split('://')[0] }
                </Badge>
                { reference.url.split('@')[1] }
            </div>
        </TableCell>
        <TableHealthCheckStatusColumn status={ reference.health_check }/>
        <TableTagsColumn tags={ reference.tags }/>
        <TableScopeColumn isPublic={ reference.is_public }/>
        <TableUserColumn user={ reference.user }/>
        <TableActionsCell visibility={ actionsMenu }>
            <ProxyActionsMenu
                reference={ reference }
                visibility={ actionsMenu }
            />
        </TableActionsCell>
    </TableRow>;
}
