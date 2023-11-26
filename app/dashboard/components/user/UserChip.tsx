import { Shield } from "lucide-react";
import UserAvatar from "./UserAvatar";
import { User } from "@/lib/user/types";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";


export interface UserChipProps {
    user: User,
    includeAvatar?: boolean
}

export default function UserChip({
    user, includeAvatar=true
}: UserChipProps) {
    return <HoverCard>
        <HoverCardTrigger>
            <div className={
                `flex items-center text-sm font-medium gap-2 ${ user.is_admin ? 'text-green-400' : '' }`
            }>
                {
                    includeAvatar &&
                    <UserAvatar seed={ user.name } size="sm" />
                }
                <div className="flex items-center gap-1">
                    { user.name }
                    {
                        user.is_admin &&
                        <Shield className="w-4 h-4"/>
                    }
                </div>
            </div>
        </HoverCardTrigger>
        {
            user.is_admin &&
            <HoverCardContent className="flex flex-col gap-1 text-green-400">
                <div className="flex items-center gap-1 text-sm font-medium">
                    Администратор
                    <Shield className="w-4 h-4"/>
                </div>
                <div className="text-sm font-regular text-muted-foreground">
                    Данный пользователь состоит в команде проекта.
                </div>
            </HoverCardContent>
        }
    </HoverCard>
}
