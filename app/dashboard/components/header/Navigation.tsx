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
import useUser from "../../users/hooks/user";
import { cn } from "@/lib/client/utils";
import LogoImage from "@/app/components/LogoImage";
import { AnimatePresence, motion } from "framer-motion";


export interface NavigationProps {
    sticked?: boolean
}

export default function Navigation({
    sticked=false
}: NavigationProps) {
    const user = useUser();

    const positioningStyles = sticked ? 'fixed top-0' : '';
    const backgroundColor = sticked ? 'bg-background' : 'bg-transparent';

    return <div
        className={
            cn(
                "w-full flex items-center py-2 border-b px-3 z-10",
                positioningStyles,
                backgroundColor
            )
        }
    >
        <AnimatePresence>
            {
                sticked &&
                <motion.div
                    initial={{ opacity: 0, y: -24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -24 }}
                    transition={{ type: "tween", duration: 0.2 }}
                    className="absolute left-6 h-6 dark:invert"
                >
                    <LogoImage/>
                </motion.div>
            }
        </AnimatePresence>
        <NavigationMenu className={
            cn("transition-all duration-200", sticked && "translate-x-16")
        }>
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
                <NavigationMenuItem>
                    <Link href="/dashboard/tags" legacyBehavior passHref>
                        <NavigationMenuLink
                            className={navigationMenuTriggerStyle()}
                        >
                            Теги
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
    </div>
}
