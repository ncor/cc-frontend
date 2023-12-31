'use client';

import Navigation from "./Navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import LogoImage from "@/app/components/LogoImage";
import UserMenu from "../../users/components/UserMenu";
import useScrollPosition from "@/app/hooks/scroll-position";
import { useState } from "react";
import { cn } from "@/lib/client/utils";
import useVisibility from "@/app/hooks/visibility";


export default function Header() {
    const [ sticked, toggleSticked ] = useState<boolean>(false);
    const scrollPosition = useScrollPosition();

    const userMenu = useVisibility();

    if (scrollPosition >= 56 && !sticked) toggleSticked(true);
    if (scrollPosition < 56 && sticked) toggleSticked(false);

    const backgroundColor = sticked ? 'bg-background' : 'bg-muted';

    return <div className={ cn("w-screen flex flex-col", backgroundColor) }>
        <div className="flex items-center justify-between pt-4 px-6">
            <div className="h-6 mr-2 dark:invert">
                <LogoImage/>
            </div>
            <div className="ml-auto flex items-center gap-2">
                <ThemeSwitcher/>
                <UserMenu visibility={ userMenu }/>
            </div>
        </div>
        { sticked && <div className="h-[49px]"/> }
        <Navigation sticked={ sticked }/>
    </div>;
}
