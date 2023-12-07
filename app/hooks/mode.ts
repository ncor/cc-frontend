import { useState } from "react";


export default function useMode<T>(
    defaultValue: T, onList: T[] = []
) {
    const [ value, set ] = useState<T>(defaultValue);

    const rotate = () => {
        set(prev => onList[
            (onList.indexOf(prev) + 1) % onList.length
        ]);
    }

    /**
     * "as" expression is needed for type inference.
     */
    const reduceType = () => {
        return { value, set, rotate } as ReturnType<typeof useMode<unknown>>;
    }

    return { value, set, rotate, reduceType };
}
