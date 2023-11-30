"use client";

import { useState, useCallback } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User } from "@/lib/user/types";
import useUser from "@/app/dashboard/users/hooks/user";
import { MAX_ROWS_IN_PAGE } from "../../constants";
import useUsers from "../../../hooks/data/user";
import UserDropDownMenu from "./UserDropdownMenu";
import useTable from "@/app/hooks/table";
import TableRowsAdapter from "../../components/table/TableRowsAdapter";
import TablePagination from "../../components/table/TablePagination";
import UserModal from './UserModal';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import useSearch from '@/app/hooks/search';
import SearchField from '../../components/SearchField';
import TableCreateHead from '../../components/table/TableCreateHead';
import TableUuidColumn from '../../components/table/TableUuidColumn';
import TableUserColumn from '../../components/table/TableUserColumn';


export type UserTableRow = User;

export default function UserTable() {
    const user = useUser();
    const { find } = useUsers();
    const search = useSearch();
    const [ selectAdmins, toggleSelectAdmins ] = useState<boolean>(false);

    const { rows, isFetching, pagination } = useTable<User>({
        fetch: useCallback(async pageIndex => {
            const query = {
                where: {
                    ...(search.text && { name: { contains: search.text } }),
                    ...(selectAdmins && { is_admin: selectAdmins })
                },
                skip: pageIndex * MAX_ROWS_IN_PAGE,
                take: MAX_ROWS_IN_PAGE
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
                    { rows?.map((row) => (
                            <TableRow
                                key={row.id}
                                className="items-center h-[65px]"
                            >
                                <TableUuidColumn uuid={ row.id }/>
                                <TableUserColumn user={ row }/>
                                <TableCell>
                                    { row.created_at.toDateString() }
                                </TableCell>
                                <TableCell className="float-right">
                                    {
                                        user.is_admin && 
                                        <UserDropDownMenu data={ row }/>
                                    }
                                </TableCell>
                            </TableRow>
                    )) }
                </TableRowsAdapter>
            </TableBody>
        </Table>
        <TablePagination rows={ rows } pagination={ pagination }/>
    </div>;
}
