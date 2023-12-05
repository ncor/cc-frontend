'use client';

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scope } from "../types";
import useScope from "@/app/hooks/scope";
import { cn } from "@/lib/client/utils";


export interface ScopeTabsProps {
    provider: ReturnType<typeof useScope>,
    className?: string
}

export default function ScopeTabs({
    provider, className
}: ScopeTabsProps) {
    return <Tabs
        defaultValue="all"
        onValueChange={ value => {
            provider.set(value as Scope);
        }}
    >
        <TabsList className={ cn(className) }>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="own">Личные</TabsTrigger>
            <TabsTrigger value="public">Общие</TabsTrigger>
        </TabsList>
    </Tabs>
}
