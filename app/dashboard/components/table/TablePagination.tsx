'use client';

import usePagination from "@/app/hooks/pagination";
import { Button } from "@/components/ui/button";
import { MAX_ROWS_IN_PAGE } from "../../constants";


export interface TablePaginationProps {
    pagination: ReturnType<typeof usePagination>,
    rows?: any[]
}

export default function TablePagination({
    rows, pagination
}: TablePaginationProps) {
    return <div className="w-full flex gap-2 items-center justify-end">
        <p className="text-sm text-muted-foreground mr-auto">
            Страница { pagination.pageIndex }
        </p>
        <Button
            variant="outline"
            disabled={ pagination.pageIndex < 1 }
            onClick={ () => pagination.prevPage() }
        >
            Назад
        </Button>
        <Button
            variant="outline"
            disabled={ !rows || rows.length < MAX_ROWS_IN_PAGE }
            onClick={ () => pagination.nextPage() }
        >
            Дальше
        </Button>
    </div>
}
