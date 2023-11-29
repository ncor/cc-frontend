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
import { Button } from "@/components/ui/button";
import useUser from "@/app/dashboard/users/hooks/user";
import { MAX_ROWS_IN_PAGE } from "../../constants";
import useUsers from "../../../hooks/data/user";
import UserChip from "./UserChip";
import UserDropDownMenu from "./UserDropdownMenu";
import { Input, Search } from "@/components/ui/input";
import { Plus } from "lucide-react";
import useTable from "@/app/hooks/table";
import TableRowsAdapter from "../../components/table/TableRowsAdapter";
import TablePagination from "../../components/table/TablePagination";
import UserModal from './UserModal';
import SectionContent from '../../components/section/SectionContent';
import Section from '../../components/section/Section';


export type UserTableRow = User;

export interface UserTableProps {
    selectAdmins?: boolean
}

export default function UserTable({
    selectAdmins=false
}: UserTableProps) {
    const user = useUser();
    const { find } = useUsers();
    const [ search, setSearch ] = useState<string>('');

    const { rows, update, isFetching, pagination } = useTable<User>({
        fetch: async pageIndex => {
            const query = {
                where: {
                    ...(search && { name: { contains: search } }),
                    ...(selectAdmins && { is_admin: selectAdmins })
                },
                skip: pageIndex * MAX_ROWS_IN_PAGE,
                take: MAX_ROWS_IN_PAGE
            };
    
            const response = await find(query);

            return response?.data || [];
        }
    });

    return <div className="space-y-2">
        <div className="w-full">
            <Search
                onKeyDown={ e => {
                    if (e.key == 'Enter') update();
                } }
                onChange={ e => setSearch(e.target.value) }
                placeholder="Найти по имени..."
            />
        </div>
        <Table>
            <TableHeader>
                <TableHead>ID</TableHead>
                <TableHead>Профиль</TableHead>
                <TableHead>Дата регистрации</TableHead>
                <TableHead>
                    <UserModal className="float-right">
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Новый пользователь</span>
                            <Plus className="h-4 w-4" />
                        </Button>
                    </UserModal>
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
                                <TableCell className="pt-5">
                                    { row.id.slice(0, 4) }
                                    { ' ... ' }
                                    { row.id.slice(-4) }
                                </TableCell>
                                <TableCell className="pt-5">
                                    <UserChip user={ row }/>
                                </TableCell>
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
