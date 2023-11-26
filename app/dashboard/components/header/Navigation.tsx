'use client';

import useUser from "@/app/hooks/user";
import NavigationItem from "./NavigationItem";


export default function Navigation() {
    const user = useUser();

    return <nav className="flex items-center space-x-4 lg:space-x-6">
        <NavigationItem href="/dashboard/proxy">
            Прокси
        </NavigationItem>
        {
            user.is_admin &&
            <NavigationItem href="/dashboard/users">
                Пользователи
            </NavigationItem>
        }
    </nav>;
}
