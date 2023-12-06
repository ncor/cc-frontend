"use client";

import { useState, useCallback } from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
} from "@/components/ui/table";
import { User } from "@/lib/models/user/types";
import useUser from "@/app/dashboard/users/hooks/user";
import useUsers from "../hooks/data/user";
import useTable from "@/app/hooks/table";
import TableRowsAdapter from "../../components/table/TableRowsAdapter";
import TablePagination from "../../components/table/TablePagination";
import UserModal from './UserModal';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useSearch from '@/app/hooks/search';
import SearchField from '../../components/SearchField';
import TableCreateHead from '../../components/table/TableCreateHead';
import useVisibility from '@/app/hooks/visibility';
import UserTableRow from './UserTableRow';
import FiltersWrapper from '../../components/FiltersWrapper';
import useMode from '@/app/hooks/mode';
import RoleFilter from '../../components/RoleFilter';


export type UserTableRow = User;

export default function UserTable() {
    const { find } = useUsers();
    const search = useSearch();
    const selectAdmins = useMode<boolean>(false, [ false, true ]); 

    const { rows, isFetching, pagination } = useTable<User>({
        fetch: useCallback(async pagination => {
            const query = {
                where: {
                    ...search.composeQuery()?.where,
                    ...(selectAdmins.value && { is_admin: selectAdmins.value })
                },
                ...pagination?.composeQuery(),
            };
    
            const response = await find(query);

            return response?.data || [];
        }, [ search.text, selectAdmins.value ])
    });

    return <div className="space-y-2">
        <FiltersWrapper>
            <SearchField provider={ search }/>
            <RoleFilter provider={ selectAdmins }/>
        </FiltersWrapper>
        <Table>
            <TableHeader>
                <TableHead>ID</TableHead>
                <TableHead>Профиль</TableHead>
                <TableHead>Дата регистрации</TableHead>
                <TableCreateHead modal={ UserModal }/>
            </TableHeader>
            <TableBody>
                <TableRowsAdapter
                    rows={ rows }
                    isFetching={ isFetching }
                >
                    {
                        rows?.map(row =>
                            <UserTableRow key={ row.id } reference={ row }/>
                        )
                    }
                </TableRowsAdapter>
            </TableBody>
        </Table>
        <TablePagination rows={ rows } pagination={ pagination }/>
    </div>;
}
