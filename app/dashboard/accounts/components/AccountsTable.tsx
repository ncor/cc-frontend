"use client";

import { useCallback } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
} from "@/components/ui/table";
import useUser from "../../users/hooks/user";
import useTable from "@/app/hooks/table";
import TableRowsAdapter from "../../components/table/TableRowsAdapter";
import TablePagination from "../../components/table/TablePagination";
import AccountModal from "./AccountModal";
import useTagSearch from "@/app/hooks/tag-search";
import TagSearchField from "../../components/TagSearchField";
import ScopeTabs from "../../components/ScopeTabs";
import useScope from "@/app/hooks/scope";
import TableCreateHead from "../../components/table/TableCreateHead";
import TableStatusHead from "../../components/table/TableStatusHead";
import FiltersWrapper from '../../components/FiltersWrapper';
import useSearch from "@/app/hooks/search";
import SearchField from "../../components/SearchField";
import useAccounts from "../hooks/data/accounts";
import { AccountExtended } from "@/lib/models/account/types";
import AccountsTableRow from "./AccountsTableRow";


export type AccountsTableRow = AccountExtended;

export default function AccountsTable() {
    const user = useUser();
    const scope = useScope();
    const search = useSearch();
    const { find } = useAccounts();
    const tagSearch = useTagSearch();

    const { rows, isFetching, pagination } = useTable<AccountExtended>({
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
                    <TableHead>Прокси</TableHead>
                    <TableStatusHead/>
                    <TableHead>Теги</TableHead>
                    <TableHead>Область</TableHead>
                    <TableHead>Дата создания</TableHead>
                    <TableHead>Владелец</TableHead>
                    <TableCreateHead modal={ AccountModal }/>
                </TableHeader>
                <TableBody>
                    <TableRowsAdapter
                        rows={ rows }
                        isFetching={ isFetching }
                    >
                        {
                            rows?.map(row =>
                                <AccountsTableRow key={ row.id } reference={ row }/>
                            )
                        }
                    </TableRowsAdapter>
                </TableBody>
            </Table>
            <TablePagination rows={ rows } pagination={ pagination }/>
        </div>
    );
}
