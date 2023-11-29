import { useCallback, useEffect, useState } from "react";
import usePagination from "./pagination";
import useRevalidation from "./revalidation";
import useSuspense from "./suspense";


export interface ITableHookParams<T> {
    fetch: (pageIndex: number) => Promise<T[]>
}

export default function useTable<T>({ fetch }: ITableHookParams<T>) {
    const pagination = usePagination();
    const { suspenseFor, isLoading } = useSuspense();
    const revalidation = useRevalidation();

    const [ rows, setRows ] = useState<T[]>();

    const update = async () => {
        const data = await suspenseFor(
            () => fetch(pagination.pageIndex)
        );
        setRows(data);
    }

    useEffect(() => {
        update();
    }, [ revalidation.revalidated, pagination.pageIndex ]);

    return {
        rows,
        update,
        pagination,
        isFetching: isLoading
    };
}
