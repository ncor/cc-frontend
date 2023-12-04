"use client";

import { useCallback } from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
} from "@/components/ui/table";
import useUser from "../../users/hooks/user";
import useTable from "@/app/hooks/table";
import TableRowsAdapter from "../../components/table/TableRowsAdapter";
import TablePagination from "../../components/table/TablePagination";
import { TagExtended } from "@/lib/models/tag/types";
import useTags from "@/app/dashboard/tags/hooks/data/tag";
import CreateTagModal from "./TagModal";
import ScopeTabs from "../../components/ScopeTabs";
import useScope from "@/app/hooks/scope";
import SearchField from "../../components/SearchField";
import useSearch from "@/app/hooks/search";
import TableCreateHead from "../../components/table/TableCreateHead";
import TagTableRow from "./TagTableRow";


export type TagTableRow = TagExtended;

export default function TagTable() {
    const user = useUser();
    const { find, can } = useTags();
    const search = useSearch();
    const scope = useScope();

    const { rows, isFetching, pagination } = useTable<TagExtended>({
        fetch: useCallback(async pagination => {
            const query = {
                where: {
                    ...search.composeQuery()?.where,
                    ...scope.composeQuery(user)?.where,
                },
                ...pagination?.composeQuery(),
            };

            const response = await find(query);

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
                        {
                            rows?.map(row => 
                                <TagTableRow key={ row.id } reference={ row }/>
                            )
                        }
                    </TableRowsAdapter>
                </TableBody>
            </Table>
            <TablePagination rows={ rows } pagination={ pagination }/>
        </div>
    );
}
