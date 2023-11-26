import { Badge } from "@/components/ui/badge";
import { User } from "@/lib/user/types";


export interface UserRankBadgeProps {
    user: User
}

export default function UserRankBadge({
    user
}: UserRankBadgeProps) {
    return <Badge
        variant={ user.is_admin ? 'default' : 'secondary' }
    >
        { user.is_admin ? 'Администратор' : 'Обычный' }
    </Badge>;
}
