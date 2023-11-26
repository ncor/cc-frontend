'use client';

import Navigation from "./Navigation";
import UserMenu from "../user/UserMenu";


export default function Header() {
    return (
        <div className="w-screen flex justify-center border-b px-8 pr-6">
            <div className="w-full max-w-5xl flex items-center h-16">
                <Navigation/>
                <UserMenu/>
            </div>
        </div>
    );
}
