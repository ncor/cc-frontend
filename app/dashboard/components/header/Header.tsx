'use client';

import Navigation from "./Navigation";
import ThemeSwitcher from "./ThemeSwitcher";
import LogoImage from "@/app/components/LogoImage";
import UserMenu from "../../users/components/UserMenu";


export default function Header() {
    return (
        <div className="w-screen flex justify-center border-b px-8 pr-6">
            <div className="w-full max-w-5xl flex items-center h-14">
                <div className="h-8 mr-2 dark:invert">
                    <LogoImage/>
                </div>
                <Navigation/>
                <div className="ml-auto flex items-center space-x-4">
                    <ThemeSwitcher/>
                    <UserMenu/>
                </div>
            </div>
        </div>
    );
}
