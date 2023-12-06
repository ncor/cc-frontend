import { Minus, Shield } from "lucide-react";
import ModeFilter from "./ModeFilter";
import useMode from "@/app/hooks/mode";


export interface RoleFilterProps {
    provider: ReturnType<typeof useMode<boolean>>
}

export default function RoleFilter({
    provider
}: RoleFilterProps) {
    return <ModeFilter
        provider={ provider.reduceType() }
        label={
            provider.value
            ? "Администраторы"
            : "Все пользователи"
        }
        icon={
            provider.value
            ? <Shield className="w-4 h-4"/>
            : <Minus className="w-4 h-4"/>
        }
    />;
}
