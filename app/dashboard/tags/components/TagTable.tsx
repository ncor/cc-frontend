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
import { MAX_ROWS_IN_PAGE } from "../../constants";
import { ResourceActions } from "@/lib/resource/types";
import useUser from "../../users/hooks/user";
import useTable from "@/app/hooks/table";
import TableRowsAdapter from "../../components/table/TableRowsAdapter";
import TablePagination from "../../components/table/TablePagination";
import { TagExtended } from "@/lib/tag/types";
import useTags from "@/app/hooks/data/tag";
import CreateTagModal from "./CreateTagModal";
import ScopeTabs from "../../components/ScopeTabs";
import useScope from "@/app/hooks/scope";
import SearchField from "../../components/SearchField";
import useSearch from "@/app/hooks/search";
import TableCreateHead from "../../components/table/TableCreateHead";
import TableUuidColumn from '../../components/table/TableUuidColumn';
import TableUserColumn from "../../components/table/TableUserColumn";
import TagDropdownMenu from "./TagDropdownMenu";
import TableScopeColumn from "../../components/table/TableScopeColumn";


export type TagTableRow = TagExtended;

export default function TagTable() {
    const user = useUser();
    const { find, findOwn, findPublic, can } = useTags();
    const search = useSearch();
    const scope = useScope();

    const { rows, isFetching, pagination } = useTable<TagExtended>({
        fetch: useCallback(async pageIndex => {
            const query = {
                where: {
                    ...(search.text && { name: { contains: search.text } }),
                },
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
        }, [ search.text, scope.value ])
    });

    return (
        <div className="space-y-2">
            <div className="w-full flex gap-2">
                <SearchField provider={ search }/>
                <ScopeTabs provider={ scope }/>
            </div>
            <Table>
                <TableHeader>
                    <TableHead>ID</TableHead>
                    <TableHead>Имя</TableHead>
                    <TableHead>Владелец</TableHead>
                    <TableHead>Область</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableCreateHead modal={ CreateTagModal }/>
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
                                <TableUuidColumn uuid={ row.id }/>
                                <TableCell>{ row.name }</TableCell>
                                <TableUserColumn user={ row.user }/>
                                <TableScopeColumn isPublic={ row.is_public }/>
                                <TableCell>
                                    { row.created_at.toDateString() }
                                </TableCell>
                                <TableCell className="float-right">
                                    {
                                        can(ResourceActions.DELETE, row, user) &&
                                        <TagDropdownMenu data={row} />
                                    }
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
