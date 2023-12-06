import useScope from "@/app/hooks/scope";
import { Minus, User, Users } from "lucide-react";
import ModeFilter from "./ModeFilter";


export interface ScopeFilterProps {
    provider: ReturnType<typeof useScope>
}

export default function ScopeFilter({
    provider
}: ScopeFilterProps) {
    return <ModeFilter
        provider={ provider.reduceType() }
        label={
            provider.value == 'all'
            ? "Все"
            : (provider.value == 'own' ? "Личные": "Общие")
        }
        icon={
            provider.value == 'all'
            ? <Minus className="w-4 h-4"/>
            : (provider.value == 'own'
                ? <User className="w-4 h-4"/>
                : <Users className="w-4 h-4"/>
            )
        }
    />;
}
