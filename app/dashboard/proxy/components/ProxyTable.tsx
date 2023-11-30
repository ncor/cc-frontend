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
import TagSelector from "../../tag/components/TagSelector";
import UserChip from "../../users/components/UserChip";
import useTable from "@/app/hooks/table";
import TableRowsAdapter from "../../components/table/TableRowsAdapter";
import TablePagination from "../../components/table/TablePagination";
import ProxyModal from "./ProxyModal";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";


export type ProxyTableRow = ProxyExtended;

export default function ProxyTable() {
    const user = useUser();
    const { findOwn, findPublic, can } = useProxies();
    const [ tags, setTags ] = useState<string[]>([]);
    const [ selectPublic, toggleSelectPublic ] = useState<boolean>(false);

    const { rows, isFetching, pagination } = useTable<ProxyExtended>({
        fetch: useCallback(async pageIndex => {
            const query = {
                ...createTagsSearchBody(tags),
                skip: pageIndex * MAX_ROWS_IN_PAGE,
                take: MAX_ROWS_IN_PAGE
            };
    
            const response = await (selectPublic
                ? findPublic(query)
                : findOwn(query)
            );

            return response?.data || [];
        }, [ tags, selectPublic ])
    });

    return (
        <div className="space-y-2">
            <div className="w-full flex gap-2">
                <TagSelector onTagsChange={(tags) =>
                    setTags(tags)
                }/>
                <Tabs defaultValue="own" onValueChange={ value => {
                    toggleSelectPublic(value === 'public');
                }}>
                    <TabsList>
                        <TabsTrigger value="own">Личные</TabsTrigger>
                        <TabsTrigger value="public">Общие</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <Table>
                <TableHeader>
                    <TableHead>ID</TableHead>
                    <TableHead>URL</TableHead>
                    <TableHead>Теги</TableHead>
                    <TableHead>Владелец</TableHead>
                    <TableHead>Область</TableHead>
                    <TableHead>
                        <ProxyModal className="float-right">
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Новый прокси</span>
                                <Plus className="h-4 w-4" />
                            </Button>
                        </ProxyModal>
                    </TableHead>
                </TableHeader>
                <TableBody>
                    <TableRowsAdapter
                        rows={ rows }
                        isFetching={ isFetching }
                    >
                        { rows?.map((row) => (
                            <TableRow
                                key={row.id}
                                className="items-center h-[65px]"
                            >
                                <TableCell>{row.id}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline">
                                            { row.url.split('://')[0] }
                                        </Badge>
                                        { row.url.split('@')[1] }
                                    </div>
                                </TableCell>
                                <TableCell className="space-x-1">
                                    {row.tags.map((tag) => (
                                        <Badge
                                            key={row.id}
                                            variant="secondary"
                                        >
                                            {tag}
                                        </Badge>
                                    ))}
                                </TableCell>
                                <TableCell>
                                    <UserChip user={ row.user }/>
                                </TableCell>
                                <TableCell>
                                    <ScopeBadge isPublic={row.is_public} />
                                </TableCell>
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
