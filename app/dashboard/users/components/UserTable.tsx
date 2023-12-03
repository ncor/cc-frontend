"use client";

import { useState, useCallback } from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
} from "@/components/ui/table";
import { User } from "@/lib/user/types";
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


export type UserTableRow = User;

export default function UserTable() {
    const { find } = useUsers();
    const search = useSearch();
    const [ selectAdmins, toggleSelectAdmins ] = useState<boolean>(false);

    const { rows, isFetching, pagination } = useTable<User>({
        fetch: useCallback(async pagination => {
            const query = {
                where: {
                    ...search.composeQuery()?.where,
                    ...(selectAdmins && { is_admin: selectAdmins })
                },
                ...pagination?.composeQuery(),
            };
    
            const response = await find(query);

            return response?.data || [];
        }, [ search.text, selectAdmins ])
    });

    return <div className="space-y-2">
        <div className="w-full flex gap-2">
            <SearchField provider={ search }/>
            <Tabs defaultValue="users" onValueChange={ value => {
                toggleSelectAdmins(value === 'admins');
            }}>
                <TabsList>
                    <TabsTrigger value="users">Все пользователи</TabsTrigger>
                    <TabsTrigger value="admins">Администраторы</TabsTrigger>
                </TabsList>
            </Tabs>
        </div>
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
