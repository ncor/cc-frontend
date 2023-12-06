import useUser from "../../users/hooks/user";
import useProxies from "../hooks/data/proxy";
import useScope from "@/app/hooks/scope";
import useTagSearch from "@/app/hooks/tag-search";
import useTable from "@/app/hooks/table";
import { Proxy } from "@/lib/models/proxy/types";
import { useCallback, useEffect, useRef } from "react";
import FiltersWrapper from "../../components/FiltersWrapper";
import TagSearchField from "../../components/TagSearchField";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import useSelection from "@/app/hooks/selection";
import { Check } from "lucide-react";
import Image from "next/image";
import { ScrollArea } from "@/components/ui/scroll-area";
import ScopeFilter from "../../components/ScopeFilter";
import ScopeBadge from "../../components/resource/ScopeBadge";
import HealthCheckIndicator from "../../components/resource/HealthCheckStatus";
import { HealthCheckStatus } from "@/lib/common/health-check/types";
import { Skeleton } from "@/components/ui/skeleton";


export interface ProxySelectProps {
    defaultValue?: Proxy;
    disabled?: boolean;
    onProxyChange?: (proxy?: Proxy) => void;
}

export default function ProxySelect({
    defaultValue,
    onProxyChange,
    disabled = false,
}: ProxySelectProps) {
    const user = useUser();
    const scope = useScope();
    const { find } = useProxies();
    const tagSearch = useTagSearch();
    const selection = useSelection<Proxy>({
        defaultFilter: (item, targetItem) => item.id != targetItem.id
    });
    const triggerRef = useRef<HTMLButtonElement>(null);

    const { rows } = useTable<Proxy>({
        fetch: useCallback(
            async (pagination) => {
                const query = {
                    where: {
                        ...tagSearch.composeQuery()?.where,
                        ...scope.composeQuery(user)?.where
                    },
                    ...pagination?.composeQuery(),
                };

                const response = await find(query);

                return response?.data || [];
            },
            [ scope.value, tagSearch.list ]
        ),
    });

    const handleSelect = (proxy: Proxy) => {
        selection.toggle(proxy);
    }

    useEffect(() => {
        if (defaultValue) selection.select(defaultValue);
    }, [ defaultValue ]);

    useEffect(() => {
        onProxyChange?.(selection.first);
    }, [ selection.items ]);

    const selectables = selection.merge(rows || []);

    return <div className="flex gap-2">
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    ref={ triggerRef }
                    variant="outline"
                    className="bg-muted flex-1"
                    disabled={ disabled }
                >
                    { selection.first?.name || "Не выбран" }
                </Button>
            </PopoverTrigger>
            <PopoverContent
                align="center"
                className="p-0"
                style={{
                    ...(triggerRef?.current && {
                        width: triggerRef.current.clientWidth + 2
                    })
                }}
            >
                <Command>
                    <CommandInput placeholder="Найти по имени..."/>
                    <CommandList>
                        {
                            rows &&
                            <CommandEmpty className="flex flex-col gap-2 items-center p-6">
                                <div className="relative w-8 h-8">
                                    <Image
                                        src="../../../crying-face.svg"
                                        alt=""
                                        fill
                                    />
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    Прокси не найдены.
                                </p>
                            </CommandEmpty>
                        }
                        <CommandGroup>
                            {
                                selectables.length > 0
                                ? <ScrollArea className='w-full h-32'>
                                    {
                                        selectables.map(row =>
                                            <CommandItem
                                                key={ row.id }
                                                onSelect={ () => handleSelect(row) }
                                            >
                                                <div className="flex items-center gap-2">
                                                    {
                                                        selection.isSelected(row)
                                                        ? <Check
                                                            className="w-4 h-4 text-accent-foreground"
                                                        />
                                                        : <div className="w-4 h-4"/>
                                                    }
                                                    { row.name }
                                                    <HealthCheckIndicator status={
                                                        row.health_check as HealthCheckStatus
                                                    }/>
                                                </div>
                                                <div className="ml-auto flex items-center gap-2">
                                                    <ScopeBadge isPublic={ row.is_public }/>
                                                </div>
                                            </CommandItem>
                                        )
                                    }
                                </ScrollArea>
                                : <Skeleton className="w-full h-10"/>
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
        <ScopeFilter provider={ scope }/>
        <TagSearchField provider={ tagSearch } fold/>
    </div>;
}
