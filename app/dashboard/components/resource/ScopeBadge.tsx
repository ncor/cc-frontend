import { Badge } from "@/components/ui/badge"
import { Users2 } from "lucide-react"

export type ScopeBadgeProps = {
    isPublic?: boolean
}

export default function ScopeBadge({
    isPublic
}: ScopeBadgeProps) {
    return isPublic
        ? <Badge>
            <Users2 className="h-4 w-4 mr-1"/>
            Публичный
        </Badge>
        : <Badge variant="secondary">
            Приватный
        </Badge>
}
