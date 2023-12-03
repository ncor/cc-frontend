import { useCallback, useEffect, useState } from "react";
import usePagination from "./pagination";
import useRevalidation from "./revalidation";
import useSuspense from "./suspense";


export interface ITableHookParams<T> {
    fetch: (pagination: ReturnType<typeof usePagination>) => Promise<T[]>
}

export default function useTable<T>({ fetch }: ITableHookParams<T>) {
    const pagination = usePagination();
    const { suspenseFor, isLoading } = useSuspense(true);
    const revalidation = useRevalidation();

    const [ rows, setRows ] = useState<T[]>();

    const update = useCallback(async () => {
        const data = await suspenseFor(
            () => fetch(pagination)
        );
        setRows(data);
    }, [ fetch, pagination.pageIndex ]); 

    useEffect(() => {
        update();
    }, [ update, revalidation.revalidated ]);

    return {
        rows,
        update,
        pagination,
        isFetching: isLoading
    };
}
