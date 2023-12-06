import { useState } from "react";


export type SelectionFilter<T> = (item: T, targetItem: T) => boolean;

export interface UseSelectionOptions<T> {
    allowClear?: boolean,
    multiSelect?: boolean,
    allowUnselect?: boolean,
    defaultFilter?: SelectionFilter<T>,
    defaultItems?: T[]
}

export default function useSelection<T>({
    allowClear=true, multiSelect=false, allowUnselect=true,
    defaultFilter=((item, targetItem) => item != targetItem),
    defaultItems=[]
}: UseSelectionOptions<T>) {
    const [ items, setItems ] = useState<T[]>(defaultItems);

    const _getFilter = (filter?: SelectionFilter<T>) => {
        return filter ? filter : defaultFilter;
    }

    const _filter = (items: T[], targetItem: T, filter?: SelectionFilter<T>) => {
        return items.filter(i => _getFilter(filter)(i, targetItem));
    }

    const _remove = (item: T, filter?: SelectionFilter<T>) => {
        setItems(prev => _filter(prev, item, filter));
    }

    const select = (item: T, filter?: SelectionFilter<T>) => {
        if (!multiSelect) clear();
        _remove(item, filter);
        setItems(prev => [ ...prev, item ]);
    }

    const unselect = (item: T, filter?: SelectionFilter<T>) => {
        if (allowUnselect) _remove(item, filter);
    }

    const clear = () => {
        if (allowClear) setItems([]);
    }

    const isSelected = (item: T, filter?: SelectionFilter<T>) => {
        return !!items.find(i => !_getFilter(filter)(i, item));
    }

    const toggle = (item: T, filter?: SelectionFilter<T>) => {
        if (isSelected(item, filter))
            unselect(item, filter)
        else
            select(item, filter);
    }

    const merge = (collection: T[], filter?: SelectionFilter<T>) => {
        return [
            ...items,
            ...collection.filter(collectionItem =>
                !items.some(item =>
                    !_getFilter(filter)(collectionItem, item)
                )
            )
        ];
    }

    return {
        items, setItems, select, unselect, clear, isSelected, toggle, merge,
        get first() {
            return items[0];
        },
        get last() {
            return items.at(-1);
        }
    };
}
