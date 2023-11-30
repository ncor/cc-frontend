"use client";

import { useCallback, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ProxyExtended } from "@/lib/proxy/types";
import { MAX_ROWS_IN_PAGE } from "../../constants";
import useProxies from "../../../hooks/data/proxy";
import ProxyDropDownMenu from "./ProxyDropdownMenu";
import { Badge } from "@/components/ui/badge";
import { createTagsSearchBody } from "@/app/hooks/helpers";
import { ResourceActions } from "@/lib/resource/types";
import ScopeBadge from "../../components/resource/ScopeBadge";
import useUser from "../../users/hooks/user";
import TagSelector from "../../tags/components/TagSelector";
import UserChip from "../../users/components/UserChip";
import useTable from "@/app/hooks/table";
import TableRowsAdapter from "../../components/table/TableRowsAdapter";
import TablePagination from "../../components/table/TablePagination";
import ProxyModal from "./ProxyModal";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useTagSearch from "@/app/hooks/tag-search";
import TagSearchField from "../../components/TagSearchField";
import ScopeTabs from "../../components/ScopeTabs";
import useScope from "@/app/hooks/scope";
import TableCreateHead from "../../components/table/TableCreateHead";
import TableUserColumn from "../../components/table/TableUserColumn";
import TableTagsColumn from "../../components/table/TableTagsColumn";
import TableScopeColumn from "../../components/table/TableScopeColumn";


export type ProxyTableRow = ProxyExtended;

export default function ProxyTable() {
    const user = useUser();
    const { find, findOwn, findPublic, can } = useProxies();
    const tagSearch = useTagSearch();
    const scope = useScope();

    const { rows, isFetching, pagination } = useTable<ProxyExtended>({
        fetch: useCallback(async pageIndex => {
            const query = {
                ...createTagsSearchBody(tagSearch.list),
                skip: pageIndex * MAX_ROWS_IN_PAGE,
                take: MAX_ROWS_IN_PAGE
            };
    
            const response = await (scope.value == 'all'
                ? find(query)
                : (scope.value == 'own'
                    ? findOwn(query)
                    : findPublic(query)
                )
            );

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
                    <TableHead>Теги</TableHead>
                    <TableHead>Владелец</TableHead>
                    <TableHead>Область</TableHead>
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
                                <TableTagsColumn tags={ row.tags }/>
                                <TableUserColumn user={ row.user }/>
                                <TableScopeColumn isPublic={ row.is_public }/>
                                <TableCell className="float-right">
                                    {(can(
                                        ResourceActions.UPDATE,
                                        row,
                                        user
                                    ) ||
                                        can(
                                            ResourceActions.DELETE,
                                            row,
                                            user
                                        )) && (
                                        <ProxyDropDownMenu data={row} />
                                    )}
                                </TableCell>
                            </TableRow>
                        )) }
                    </TableRowsAdapter>
                </TableBody>
            </Table>
            <TablePagination rows={ rows } pagination={ pagination }/>
        </div>
    );
}
