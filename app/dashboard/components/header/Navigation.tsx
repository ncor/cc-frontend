import { ListItem } from "@/components/ui/list-item";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Link2, Shield } from "lucide-react";
import Link from "next/link";
import { forwardRef } from "react";
import useUser from "../../user/hooks/user";


export default function Navigation() {
    const user = useUser();

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <Link href="/dashboard/proxy" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Прокси
                        </NavigationMenuLink>
                    </Link>
                </NavigationMenuItem>
                {
                    user.is_admin &&
                    <NavigationMenuItem>
                        <NavigationMenuTrigger className="flex items-center gap-1">
                            <Shield className="w-4 h-4"/>
                            Пользователи
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                            <ul className="grid p-3 w-[300px] lg:grid-cols-1">
                                <ListItem href="/dashboard/users" title="Список пользователей">
                                    Страница управления пользователями.
                                </ListItem>
                                <ListItem
                                    href="/dashboard/activity"
                                    title="Активность"
                                >
                                    Лог действий и изменений от лиц пользователей.
                                </ListItem>
                            </ul>
                        </NavigationMenuContent>
                    </NavigationMenuItem>
                }
            </NavigationMenuList>
        </NavigationMenu>
    );
}
