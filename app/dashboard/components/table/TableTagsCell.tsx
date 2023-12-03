import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import { Minus } from "lucide-react";


export interface TableTagsCellProps {
    tags: string[]
}

export default function TableTagsCell({
    tags
}: TableTagsCellProps) {
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
