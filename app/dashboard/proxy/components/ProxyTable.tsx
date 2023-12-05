"use client";

import { useCallback } from "react";
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
} from "@/components/ui/table";
import { ProxyExtended } from "@/lib/models/proxy/types";
import useProxies from "../hooks/data/proxy";
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
import ProxyTableRow from "./ProxyTableRow";
import TableStatusHead from "../../components/table/TableStatusHead";
import FiltersWrapper from '../../components/FiltersWrapper';
import useSearch from "@/app/hooks/search";
import SearchField from "../../components/SearchField";


export type ProxyTableRow = ProxyExtended;

export default function ProxyTable() {
    const user = useUser();
    const scope = useScope();
    const search = useSearch();
    const { find } = useProxies();
    const tagSearch = useTagSearch();

    const { rows, isFetching, pagination } = useTable<ProxyExtended>({
        fetch: useCallback(async pagination => {
            const query = {
                where: {
                    ...search.composeQuery()?.where,
                    ...tagSearch.composeQuery()?.where,
                    ...scope.composeQuery(user)?.where,
                },
                ...pagination?.composeQuery(),
            };
    
            const response = await find(query);

            return response?.data || [];
        }, [ search.text, tagSearch.list, scope.value ])
    });

    return (
        <div className="space-y-2">
            <FiltersWrapper>
                <SearchField provider={ search }/>
                <TagSearchField provider={ tagSearch }/>
                <ScopeTabs provider={ scope }/>
            </FiltersWrapper>
            <Table>
                <TableHeader>
                    <TableHead>ID</TableHead>
                    <TableHead>Имя</TableHead>
                    <TableHead>URL</TableHead>
                    <TableStatusHead/>
                    <TableHead>Теги</TableHead>
                    <TableHead>Область</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableHead>Владелец</TableHead>
                    <TableCreateHead modal={ ProxyModal }/>
                </TableHeader>
                <TableBody>
                    <TableRowsAdapter
                        rows={ rows }
                        isFetching={ isFetching }
                    >
                        {
                            rows?.map(row =>
                                <ProxyTableRow key={ row.id } reference={ row }/>
                            )
                        }
                    </TableRowsAdapter>
                </TableBody>
            </Table>
            <TablePagination rows={ rows } pagination={ pagination }/>
        </div>
    );
}
