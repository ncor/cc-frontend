import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { Minus } from "lucide-react";


export interface TableTagsColumnProps {
    tags: string[]
}

export default function TableTagsColumn({
    tags
}: TableTagsColumnProps) {
    return <TableCell className="space-x-1">
        {
            tags.length
            ? tags.map((tag, i) => (
                <Badge
                    key={ i }
                    variant="secondary"
                >
                    {tag}
                </Badge>
            ))
            : <Minus className="w-4 h-4 text-muted-foreground"/>
        }
    </TableCell>
}
