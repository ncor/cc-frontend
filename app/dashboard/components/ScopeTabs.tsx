import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Scope } from "../types";
import useScope from "@/app/hooks/scope";


export interface ScopeTabsProps {
    provider: ReturnType<typeof useScope>
}

export default function ScopeTabs({
    provider
}: ScopeTabsProps) {
    return <Tabs defaultValue="all" onValueChange={ value => {
        provider.set(value as Scope);
    }}>
        <TabsList>
            <TabsTrigger value="all">Все</TabsTrigger>
            <TabsTrigger value="own">Личные</TabsTrigger>
            <TabsTrigger value="public">Общие</TabsTrigger>
        </TabsList>
    </Tabs>
}
