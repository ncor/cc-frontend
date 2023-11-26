"use client";

import { useContext, useEffect, useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { User, UserBatchItem } from "@/lib/user/types";
import useSuspense from "@/app/hooks/suspense";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import useUser from "@/app/hooks/user";
import { RevalidationContext } from "@/app/contexts/revalidation";
import { MAX_ROWS_IN_PAGE } from "../../constants";
import useUsers from "../../../hooks/data/user";
import UserRankBadge from "./UserRankBadge";
import UserChip from "./UserChip";
import UserDropDownMenu from "./UserDropdownMenu";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";


export type UserTableRow = User;

export default function UserTable() {
    const user = useUser();
    const { find } = useUsers();
    const { isLoading, suspenseFor } = useSuspense();
    const { revalidate, revalidated } = useContext(RevalidationContext);

    const [ page, setPage ] = useState<number>(0);
    const [ rows, setRows ] = useState<UserTableRow[]>();
    const [ search, setSearch ] = useState<string>('');

    const fetch = async () => {
        const query = {
            where: {
                ...(search && { name: { contains: search } })
            },
            skip: page * MAX_ROWS_IN_PAGE,
            take: MAX_ROWS_IN_PAGE
        };

        const response = await suspenseFor(() => find(query));

        if (response?.data) setRows(response.data as User[]);
    };

    useEffect(() => {
        fetch();
    }, [ page, revalidated ]);

    return (
        <div className="space-y-2">
            <div className="w-full flex items-center gap-1">
                <Input
                    onKeyDown={ e => {
                        if (e.key == 'Enter') revalidate()
                    } }
                    onChange={ e => setSearch(e.target.value) }
                    placeholder="Найти по имени..."
                />
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={ () => revalidate() }
                >
                    <Search className="w-4 h-4"/>
                </Button>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="border-b">
                        <TableHead>ID</TableHead>
                        <TableHead>Профиль</TableHead>
                        <TableHead>Дата регистрации</TableHead>
                    </TableHeader>
                    <TableBody>
                        {!rows || isLoading ? (
                            [ ...Array(rows?.length || MAX_ROWS_IN_PAGE) ].map(
                                (_, i) => (
                                    <TableRow key={i}>
                                        <TableCell colSpan={100}>
                                            <Skeleton className="h-8" />
                                        </TableCell>
                                    </TableRow>
                                )
                            )
                        ) : rows?.length ? (
                            rows.map((row) => (
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
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={5}
                                    className="h-24 text-center"
                                >
                                    Ничего не найдено.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="w-full flex gap-2 items-center justify-end">
                <p className="text-sm text-muted-foreground mr-auto">
                    Страница {page + 1}
                </p>
                <Button
                    variant="outline"
                    disabled={page < 1}
                    onClick={() => setPage(page < 1 ? 0 : page - 1)}
                >
                    Назад
                </Button>
                <Button
                    variant="outline"
                    disabled={!rows || rows.length < MAX_ROWS_IN_PAGE}
                    onClick={() => setPage(page + 1)}
                >
                    Дальше
                </Button>
            </div>
        </div>
    );
}
