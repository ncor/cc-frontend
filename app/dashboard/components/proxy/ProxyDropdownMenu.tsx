import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Proxy } from "@/lib/proxy/types";
import { Edit2, MoreHorizontal, Trash } from "lucide-react";
import ProxyModal from "./ProxyModal";
import ProxyDeleteModal from "./ProxyDeleteModal";
import { useContext } from "react";
import { userContext } from "../../contexts/user";
import useProxies from "../../hooks/data/proxy";
import { ResourceActions } from "@/lib/resource/policy";


export type ProxyDropdownMenuProps = {
    data: Proxy
};

export default function ProxyDropDownMenu({
    data
}: ProxyDropdownMenuProps) {
    const { can } = useProxies();
    const user = useContext(userContext);

    return <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Действия</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="flex flex-col">
            {
                can(ResourceActions.UPDATE, data, user) &&
                <ProxyModal update={ data }>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full rounded-sm px-2 justify-start"
                    >
                        <Edit2 className="mr-2 h-4 w-4"/>
                        Редактировать
                    </Button>
                </ProxyModal>
            }
            {
                can(ResourceActions.DELETE, data, user) &&
                <ProxyDeleteModal data={ data }>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full rounded-sm px-2 justify-start"
                    >
                        <Trash className="mr-2 h-4 w-4"/>
                        Удалить
                    </Button>
                </ProxyDeleteModal>
            }
        </DropdownMenuContent>
    </DropdownMenu>
}
