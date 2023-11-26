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
import { Proxy } from "@/lib/proxy/types";
import { User } from "@/lib/user/types";
import { Badge } from "@/components/ui/badge";
import UserAvatar from "../user/UserAvatar";
import useSuspense from "@/app/hooks/suspense";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import useProxies from "../../../hooks/data/proxy";
import ProxyDropDownMenu from "./ProxyDropdownMenu";
import { createTagsSearchBody } from "@/app/hooks/helpers";
import ScopeBadge from "../resource/ScopeBadge";
import { TagSelector } from "../tag/TagSelector";
import useUser from "@/app/hooks/user";
import { RevalidationContext } from "@/app/contexts/revalidation";
import { ResourceActions } from "@/lib/resource/types";
import { MAX_ROWS_IN_PAGE } from "../../constants";
import UserChip from "../user/UserChip";

export type ProxyTableRow = Proxy & { user: User };

export type ProxyTableProps = {
    selectPublic?: boolean;
};

export default function ProxyTable({ selectPublic }: ProxyTableProps) {
    const user = useUser();
    const { revalidated } = useContext(RevalidationContext);
    const { findOwn, findPublic, can } = useProxies();
    const { isLoading, suspenseFor } = useSuspense();

    const [rows, setRows] = useState<ProxyTableRow[]>();
    const [tags, setTags] = useState<string[]>([]);
    const [page, setPage] = useState<number>(0);

    const fetch = async () => {
        const query = {
            ...createTagsSearchBody(tags),
            skip: page * MAX_ROWS_IN_PAGE,
            take: MAX_ROWS_IN_PAGE
        };

        const response = await suspenseFor(async () => {
            return selectPublic
                ? findPublic(query)
                : findOwn(query);
        });

        if (response?.data) setRows(response.data as any);
    };

    useEffect(() => {
        fetch();
    }, [tags, page, revalidated]);

    return (
        <div className="space-y-2">
            <TagSelector onTagsChange={(tags) => setTags(tags)} />
            <div className="rounded-md border">
                <Table>
                    <TableHeader className="border-b">
                        <TableHead>ID</TableHead>
                        <TableHead>URL</TableHead>
                        <TableHead>Теги</TableHead>
                        <TableHead>Владелец</TableHead>
                        <TableHead>Область</TableHead>
                    </TableHeader>
                    <TableBody>
                        {!rows || isLoading ? (
                            [...Array(rows?.length || MAX_ROWS_IN_PAGE)].map(
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
                                    <TableCell>{row.id}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Badge variant="outline">
                                                { row.url.split('://')[0] }
                                            </Badge>
                                            { row.url.split('@')[1] }
                                        </div>
                                    </TableCell>
                                    <TableCell className="space-x-1">
                                        {row.tags.map((tag) => (
                                            <Badge
                                                key={row.id}
                                                variant="secondary"
                                            >
                                                {tag}
                                            </Badge>
                                        ))}
                                    </TableCell>
                                    <TableCell>
                                        <UserChip user={ row.user }/>
                                    </TableCell>
                                    <TableCell>
                                        <ScopeBadge isPublic={row.is_public} />
                                    </TableCell>
                                    <TableCell className="float-right">
                                        {(can(
                                            ResourceActions.UPDATE,
                                            row,
                                            user
                                        ) ||
                                            can(
                                                ResourceActions.DELETE,
                                                row,
                                                user
                                            )) && (
                                            <ProxyDropDownMenu data={row} />
                                        )}
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
