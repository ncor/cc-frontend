"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { Skeleton } from "./skeleton";


export interface MultiSelectProps {
    placeholder: string,
    collection: string[],
    getItems: () => string[],
    setItems: (items: string[]) => void,
    disabled?: boolean
}

export function MultiSelect({
    placeholder, collection, getItems, setItems, disabled
}: MultiSelectProps) {
    const inputRef = React.useRef<HTMLInputElement>(null);
    const [ open, setOpen ] = React.useState(false);
    const [ inputValue, setInputValue ] = React.useState("");

    const handleUnselect = React.useCallback((item: string) => {
        setItems(getItems().filter((s) => s !== item));
    }, []);

    const handleKeyDown = React.useCallback(
        (e: React.KeyboardEvent<HTMLDivElement>) => {
            const input = inputRef.current;

            if (input) {
                if (e.key === "Delete" || e.key === "Backspace") {
                    if (input.value === "") {
                        const newSelected = [...getItems()];
                        newSelected.pop();
                        setItems(newSelected);
                    }
                }

                if (e.key === "Escape")
                    input.blur();
            }
        },
        []
    );

    const selectables = collection.filter(item => !getItems().includes(item));

    return (
        <Command
            onKeyDown={ handleKeyDown }
            className="overflow-visible bg-transparent"
        >
            <div className="group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
                <div className="flex gap-1 flex-wrap">
                    { getItems().map(item => {
                        return (
                            <Badge key={ item } variant="secondary">
                                { item }
                                <button
                                    className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            handleUnselect(item);
                                        }
                                    }}
                                    onMouseDown={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                    }}
                                    onClick={() => handleUnselect(item)}
                                >
                                    <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                                </button>
                            </Badge>
                        );
                    }) }
                    <CommandPrimitive.Input
                        ref={inputRef}
                        value={inputValue}
                        onValueChange={setInputValue}
                        onBlur={() => setOpen(false)}
                        onFocus={() => setOpen(true)}
                        placeholder={ placeholder }
                        className="ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1"
                        disabled={ disabled }
                    />
                </div>
            </div>
            <div className="relative">
                { open && (
                    <div className="absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
                        <CommandGroup className="h-full overflow-auto">
                            { selectables.length > 0 && selectables.map(item => {
                                return (
                                    <CommandItem
                                        key={ item }
                                        onMouseDown={(e) => {
                                            e.preventDefault();
                                            e.stopPropagation();
                                        }}
                                        onSelect={() => {
                                            setInputValue("");
                                            setItems([
                                                ...getItems(),
                                                item
                                            ]);
                                        }}
                                        className={"cursor-pointer"}
                                    >
                                        { item }
                                    </CommandItem>
                                );
                            }) }
                            { !collection.length &&
                                <div className="space-y-1">
                                    <Skeleton className="h-8 w-full rounded-sm"/>
                                </div>
                            }
                        </CommandGroup>
                    </div>
                ) }
            </div>
        </Command>
    );
}
