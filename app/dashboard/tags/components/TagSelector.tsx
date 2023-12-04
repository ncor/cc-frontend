"use client";

import * as React from "react";
import { Plus, Tag as TagIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandSeparator,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import useTags from "../hooks/data/tag";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Tag } from "@/lib/models/tag/types";
import { Skeleton } from "@/components/ui/skeleton";
import ScopeBadge from "../../components/resource/ScopeBadge";
import { RevalidationContext } from "@/app/contexts/revalidation";
import useSuspense from "@/app/hooks/suspense";
import useUser from "../../users/hooks/user";


export interface TagSelectorProps {
    onTagsChange?: (tags: string[]) => void;
    selected?: string[];
    disabled?: boolean;
}

export default function TagSelector({
    selected,
    onTagsChange,
    disabled,
}: TagSelectorProps) {
    const user = useUser();
    const { find } = useTags();
    const { suspenseFor, isLoading } = useSuspense();
    const { revalidated } = useContext(RevalidationContext);
    const inputRef = useRef<HTMLInputElement>(null);
    const [ collection, setCollection ] = useState<Tag[]>([]);
    const [ open, setOpen ] = useState(false);
    const [ tags, setTags ] = useState<string[]>([]);
    const [ inputValue, setInputValue ] = useState("");
    const [ shouldUpdate, setShouldUpdate ] = useState<boolean>(false);

    const setAndPropagate = (tags: string[]) => {
        setTags(tags);
        onTagsChange?.(tags);
    };

    const updateCollection = async () => {
        setCollection((await suspenseFor(() => find({})))?.data || []);
    };

    useEffect(() => {
        setShouldUpdate(true);
        if (selected) setAndPropagate(selected);
    }, [ revalidated ]);

    const handleUnselect = useCallback(
        (unselectedTag: string) => {
            setAndPropagate(tags.filter((tag) => tag !== unselectedTag));
        },
        [ tags ]
    );

    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;

            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        const newSelected = [...tags];
                        newSelected.pop();
                        setAndPropagate(newSelected);
                    }
                }

                if (e.key === "Escape") input.blur();
            }
        },
        [tags]
    );

    const selectables = collection.filter((tag) => !tags.includes(tag.name));

    return <div className="my-auto w-full flex-1">
        <Command
            onKeyDown={handleKeyDown}
            className="overflow-visible bg-transparent"
        >
            <div className="group border border-input h-10 flex items-center pl-3 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 bg-accent dark:bg-accent/25">
                <div className="flex items-center gap-2 flex-wrap">
                    <TagIcon className="h-[16px] w-[16px] text-muted-foreground"/>
                    {tags.map((tag) => {
                        return (
                            <Badge key={tag} variant="secondary">
                                {tag}
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(tag);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(tag)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        );
                    })}
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => {
                            setOpen(true);
                            if (shouldUpdate) {
                                updateCollection();
                                setShouldUpdate(false);
                            }
                        }}
                        placeholder="Теги"
                        className="bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                        disabled={disabled}
                    />
                </div>
            </div>
            <div className="relative">
                {open && (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        <CommandGroup className="h-full overflow-auto">
                            {
                                !isLoading && selectables.length > 0 &&
                                selectables.map((tag, i) => {
                                    return (
                                        <div key={tag.name}>
                                            {selectables[i - 1]
                                                ?.is_public && (
                                                <CommandSeparator className="my-1" />
                                            )}
                                            <CommandItem
                                                key={tag.id}
                                                onMouseDown={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                }}
                                                onSelect={() => {
                                                    setInputValue("");
                                                    setAndPropagate([
                                                        ...tags,
                                                        tag.name,
                                                    ]);
                                                }}
                                                className="cursor-pointer"
                                            >
                                                {tag.name}
                                                <div className="ml-auto">
                                                    <ScopeBadge
                                                        isPublic={
                                                            tag.is_public
                                                        }
                                                    />
                                                </div>
                                            </CommandItem>
                                        </div>
                                    );
                                })
                            }
                            {
                                isLoading &&
                                <Skeleton className="h-8 w-full rounded-sm" />
                            }
                            {
                                !isLoading && !collection.length &&
                                <div className="w-full text-center p-2 text-sm">
                                    Теги не найдены.
                                </div>                             
                            }
                        </CommandGroup>
                    </div>
                )}
            </div>
        </Command>
    </div>
}
