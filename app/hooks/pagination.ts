import { useState } from "react";
import { MAX_ROWS_IN_PAGE } from "../dashboard/constants";


export default function usePagination(
    maxPagesCount?: number
) {
    const [ pageIndex, setPageIndex ] = useState<number>(0);

    const clamp = (pageIndex: number) => {
        if (pageIndex < 0)
            pageIndex = 0;
        
        if (maxPagesCount && maxPagesCount > 0 && pageIndex > maxPagesCount)
            pageIndex = maxPagesCount;

        return pageIndex;
    }

    const setPage = (
        callback: (prev: number) => number
    ) => {
        setPageIndex(prevIndex => clamp(callback(prevIndex)));
    }

    const nextPage = () => setPage(prevIndex => prevIndex + 1);
    
    const prevPage = () => setPage(prevIndex => prevIndex - 1);

    const composeQuery = () => {
        return {
            skip: pageIndex * MAX_ROWS_IN_PAGE,
            take: MAX_ROWS_IN_PAGE
        }
    }

    return { pageIndex, setPage, nextPage, prevPage, composeQuery };
}
