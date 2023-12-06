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
import { Tag } from "@/lib/models/tag/types";
import useTags from "@/app/dashboard/tags/hooks/data/tag";
import CreateTagModal from "./TagModal";
import useScope from "@/app/hooks/scope";
import SearchField from "../../components/SearchField";
import useSearch from "@/app/hooks/search";
import TableCreateHead from "../../components/table/TableCreateHead";
import TagTableRow from "./TagTableRow";
import FiltersWrapper from '../../components/FiltersWrapper';
import ScopeFilter from "../../components/ScopeFilter";


export type TagTableRow = Tag<{ user: true }>;

export default function TagTable() {
    const user = useUser();
    const { find, can } = useTags();
    const search = useSearch();
    const scope = useScope();

    const { rows, isFetching, pagination } = useTable<Tag<{ user: true }>>({
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
            <FiltersWrapper>
                <SearchField provider={ search }/>
                <div className="ml-auto">
                    <ScopeFilter provider={ scope }/>
                </div>
            </FiltersWrapper>
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
