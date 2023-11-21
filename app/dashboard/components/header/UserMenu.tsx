import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { User } from "@/lib/user/types";
import { Session } from "@supabase/supabase-js";
import UserAvatar from "../UserAvatar";
import { Skeleton } from "@/components/ui/skeleton";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { userContext } from "../../contexts/user";
import { useContext } from "react";
import { sessionContext } from "../../contexts/session";


export default function UserMenu() {
    const router = useRouter();
    const supabase = createClientComponentClient();
    const user = useContext(userContext);
    const session = useContext(sessionContext);

    return <div className="ml-auto flex items-center space-x-4">
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="secondary"
                    className="relative h-8 w-8 rounded-full"
                >
                    <UserAvatar seed={ user.name }/>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56"
                align="end"
                forceMount
            >
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                            { user ? user.name : '...' }
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                            { session.user.email }
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={ async () => {
                    await supabase.auth.signOut();
                    router.push('/auth');
                } } className="cursor-pointer">
                    Выйти
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
}
