import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";


export interface TableTagsColumnProps {
    tags: string[]
}

export default function TableTagsColumn({
    tags
}: TableTagsColumnProps) {
    return <TableCell className="space-x-1">
        { tags.map((tag, i) => (
            <Badge
                key={ i }
                variant="secondary"
            >
                {tag}
            </Badge>
        )) }
    </TableCell>
}
