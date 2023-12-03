"use client";

import { useCallback } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ProxyExtended } from "@/lib/proxy/types";
import useProxies from "../hooks/data/proxy";
import { Badge } from "@/components/ui/badge";
import useUser from "../../users/hooks/user";
import useTable from "@/app/hooks/table";
import TableRowsAdapter from "../../components/table/TableRowsAdapter";
import TablePagination from "../../components/table/TablePagination";
import ProxyModal from "./ProxyModal";
import useTagSearch from "@/app/hooks/tag-search";
import TagSearchField from "../../components/TagSearchField";
import ScopeTabs from "../../components/ScopeTabs";
import useScope from "@/app/hooks/scope";
import TableCreateHead from "../../components/table/TableCreateHead";
import TableUserCell from "../../components/table/TableUserCell";
import TableTagsCell from "../../components/table/TableTagsCell";
import TableScopeCell from "../../components/table/TableScopeCell";
import TableHealthCheckStatusCell from "../../components/table/TableHealthCheckStatusCell";
import useVisibility from "@/app/hooks/visibility";
import MoreButton from "../../components/MoreButton";
import ProxyActionsMenu from "./ProxyActionsMenu";
import TableActionsCell from "../../components/table/TableActionsCell";


export type ProxyTableRow = ProxyExtended;

export default function ProxyTable() {
    const user = useUser();
    const scope = useScope();
    const tagSearch = useTagSearch();
    const { find, can } = useProxies();

    const actionsMenu = useVisibility();

    const { rows, isFetching, pagination } = useTable<ProxyExtended>({
        fetch: useCallback(async pagination => {
            const query = {
                where: {
                    ...tagSearch.composeQuery()?.where,
                    ...scope.composeQuery(user)?.where,
                },
                ...pagination?.composeQuery(),
            };
    
            const response = await find(query);

            return response?.data || [];
        }, [ tagSearch.list, scope.value ])
    });

    return (
        <div className="space-y-2">
            <div className="w-full flex gap-2">
                <TagSearchField provider={ tagSearch }/>
                <ScopeTabs provider={ scope }/>
            </div>
            <Table>
                <TableHeader>
                    <TableHead>ID</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Статус</TableHead>
                    <TableHead>Теги</TableHead>
                    <TableHead>Область</TableHead>
                    <TableHead>Владелец</TableHead>
                    <TableCreateHead modal={ ProxyModal }/>
                </TableHeader>
                <TableBody>
                    <TableRowsAdapter
                        rows={ rows }
                        isFetching={ isFetching }
                    >
                        { rows?.map((row) => (
                            <TableRow
                                key={ row.id }
                                className="items-center h-[65px]"
                            >
                                <TableCell>{ row.id }</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                            { row.url.split('://')[0] }
                                        </Badge>
                                        { row.url.split('@')[1] }
                                    </div>
                                </TableCell>
                                <TableHealthCheckStatusCell status={ row.health_check }/>
                                <TableTagsCell tags={ row.tags }/>
                                <TableScopeCell isPublic={ row.is_public }/>
                                <TableUserCell user={ row.user }/>
                                <TableActionsCell visibility={ actionsMenu }>
                                    <ProxyActionsMenu
                                        reference={ row }
                                        visibility={ actionsMenu }
                                    />
                                </TableActionsCell>
                            </TableRow>
                        )) }
                    </TableRowsAdapter>
                </TableBody>
            </Table>
            <TablePagination rows={ rows } pagination={ pagination }/>
        </div>
    );
}
