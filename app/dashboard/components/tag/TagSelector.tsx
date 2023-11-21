"use client";

import * as React from "react";
import { Plus, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem, CommandSeparator } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import useTags from "../../hooks/data/tag";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { revalidationContext } from "../../contexts/revalidation";
import { Tag } from "@/lib/tag/types";
import { Skeleton } from "@/components/ui/skeleton";
import ScopeBadge from "../resource/ScopeBadge";
import CreateTagModal from "./CreateTagModal";
import { CreateTagSchemaType } from "./CreateTagForm";
import { z } from "zod";
import { Button } from "@/components/ui/button";


export interface MultiSelectProps {
    onTagsChange?: (tags: string[]) => void;
    selected?: string[];
    disabled?: boolean;
}

export function TagSelector({
    selected,
    onTagsChange,
    disabled,
}: MultiSelectProps) {
    const { revalidated } = useContext(revalidationContext);
    const { findOwn, findPublic } = useTags();
    const inputRef = useRef<HTMLInputElement>(null);
    const [open, setOpen] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [collection, setCollection] = useState<Tag[]>([]);
    const [tags, setTags] = useState<string[]>([]);

    const setAndPropagate = (tags: string[]) => {
        setTags(tags);
        onTagsChange?.(tags);
    }

    const updateCollection = async () => {
        const publicTags = await findPublic({});
        const ownTags = await findOwn({});
        const tags = [
            ...(publicTags?.data?.filter(tag =>
                    !ownTags?.data
                        ?.map(tag => tag.name)
                        ?.includes(tag.name)
                ) || []),
            ...(ownTags?.data || []),
        ];

        setCollection(tags);
    };

    useEffect(() => {
        updateCollection();
        if (selected) setTags(selected);
    }, [revalidated]);

    const handleUnselect = useCallback((unselectedTag: string) => {
        setAndPropagate(tags.filter(tag => tag !== unselectedTag));
    }, [ tags ]);

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
        [ tags ]
    );

    const selectables = collection.filter((tag) => !tags.includes(tag.name));

    return (
        <div className="flex gap-1">
            <div className="my-auto flex-1">
                <Command
                    onKeyDown={handleKeyDown}
                    className="overflow-visible bg-transparent"
                >
                    <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                        <div className="flex gap-1 flex-wrap">
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
                                onFocus={() => setOpen(true)}
                                placeholder="Теги"
                                className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                                disabled={disabled}
                            />
                        </div>
                    </div>
                    <div className="relative">
                        {open && (
                            <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                                <CommandGroup className="h-full overflow-auto">
                                    {selectables.length > 0 &&
                                        selectables.map((tag, i) => {
                                            return (<div>
                                                {
                                                    selectables[i - 1]?.is_public &&
                                                    <CommandSeparator className="my-1"/>
                                                }
                                                <CommandItem
                                                    key={tag.id}
                                                    onMouseDown={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                    }}
                                                    onSelect={() => {
                                                        setInputValue("");
                                                        setAndPropagate([ ...tags, tag.name ]);
                                                    }}
                                                    className="cursor-pointer"
                                                >
                                                    {tag.name}
                                                    <div className="ml-auto">
                                                        <ScopeBadge
                                                            isPublic={tag.is_public}
                                                        />
                                                    </div>
                                                </CommandItem>
                                            </div>);
                                        })}
                                    {!collection.length && (
                                        <div className="space-y-1">
                                            <Skeleton className="h-8 w-full rounded-sm" />
                                        </div>
                                    )}
                                </CommandGroup>
                            </div>
                        )}
                    </div>
                </Command>
            </div>
            <CreateTagModal
                onSubmit={async (form: z.infer<CreateTagSchemaType>) => 
                    setAndPropagate([...tags, form.name])
                }
            >
                <Button variant="ghost" size="icon" type="button">
                    <Plus className="h-4 w-4" />
                </Button>
            </CreateTagModal>
        </div>
    );
}
