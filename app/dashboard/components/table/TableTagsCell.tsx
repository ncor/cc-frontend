'use client';

import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { Minus } from "lucide-react";
import RevealExtraButton from "../RevealExtraButton";
import { Tag } from "@/lib/models/tag/types";
import TagBadge from "../../tags/components/TagBadge";


export const MAX_VISIBLE_TAGS = 1;

export interface TableTagsCellProps {
    tags: Tag[]
}

export default function TableTagsCell({
    tags
}: TableTagsCellProps) {
    const tagsList = (tags: Tag[]) => tags.map((tag, i) =>
        <TagBadge key={ i } reference={ tag }/>
    );

    return <TableCell>
        {
            tags.length
            ? <div className="flex items-center gap-1 flex-wrap">
                { tagsList(tags.slice(0, MAX_VISIBLE_TAGS)) }
                {
                    (tags.length - MAX_VISIBLE_TAGS) > 0 &&
                    <RevealExtraButton>
                        <div className="flex flex-col gap-1">
                            { tagsList(tags.slice(MAX_VISIBLE_TAGS)) }
                        </div>
                    </RevealExtraButton>
                }
            </div>
            : <Minus className="w-4 h-4 text-muted-foreground"/>
        }
    </TableCell>
}
