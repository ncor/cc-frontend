import useSelection from "@/app/hooks/selection";
import useTags from "../hooks/data/tag"
import { Tag } from "@/lib/models/tag/types";
import { useEffect, useRef, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { ScrollArea } from "@/components/ui/scroll-area";
import Image from "next/image";
import { Check, TagIcon } from "lucide-react";
import ScopeBadge from "../../components/resource/ScopeBadge";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/client/utils";
import TagBadge from "./TagBadge";
import { Skeleton } from "@/components/ui/skeleton";


export interface TagSelectProps {
    onValuesChange: (tags: Tag[]) => any,
    defaultValues?: Tag[],
    disabled?: boolean,
    fold?: boolean,
    className?: string
}

export default function TagSelect({
    onValuesChange, defaultValues=[], disabled=false, fold=false, className
}: TagSelectProps) {
    const { find } = useTags();
    const [ collection, setCollection ] = useState<Tag[]>();
    const [ shouldUpdate, setShouldUpdate ] = useState<boolean>(true);
    const selection = useSelection<Tag>({
        multiSelect: true,
        defaultFilter: (item, targetItem) => item.id != targetItem.id
    });
    const triggerRef = useRef<HTMLButtonElement>(null);

    const updateCollection = async () => {
        const { data: tags } = await find({});

        setCollection(tags || []);
    }

    const handleSelect = (tag: Tag) => {
        selection.toggle(tag);
    }

    useEffect(() => {
        if (defaultValues) defaultValues.forEach(handleSelect);
    }, [ defaultValues ]);

    useEffect(() => {
        onValuesChange(selection.items);
    }, [ selection.items ]);

    const selectables = selection.merge(collection || []);

    return <Popover>
        <PopoverTrigger asChild>
            <Button
                ref={ triggerRef }
                variant="outline"
                className={cn(
                    "border-input bg-muted",
                    !fold && "flex-1 flex items-center gap-2 flex-wrap py-1.5 px-3 justify-start h-auto",
                    className
                )}
                size={ fold ? "icon" : "default" }
                disabled={ disabled }
                onClick={ () => {
                    if (shouldUpdate) {
                        updateCollection();
                        setShouldUpdate(false);
                    }
                } }
            >
                <TagIcon className={cn(
                    "h-4 w-4", !selection.items.length && "text-muted-foreground"
                )}/>
                {
                    !fold && (
                        !selection.items.length
                        ? <div className="text-muted-foreground">
                            Не выбраны
                        </div>
                        : selection.items.map((tag, i) =>
                            <TagBadge key={ i } reference={ tag }/>
                        )
                    )
                }
            </Button>
        </PopoverTrigger>
        <PopoverContent
            className="p-0"
            align="center"
            style={{
                ...((triggerRef?.current && !fold) && {
                    width: triggerRef.current.clientWidth + 2
                })
            }}
        >
            <Command>
                <CommandInput placeholder="Найти по имени..."/>
                <CommandList>
                    {
                        collection &&
                        <CommandEmpty className="flex flex-col gap-2 items-center p-6">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="../../../crying-face.svg"
                                    alt=""
                                    fill
                                />
                            </div>
                            <p className="text-sm text-muted-foreground">
                                Теги не найдены.
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
    </Popover>;
}
