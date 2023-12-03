import { useState } from "react";


export default function useTagSearch(selected?: string[]) {
    const [ list, setList ] = useState<string[]>(selected || []);

    const composeQuery = () => {
        return list.length ? { where: { tags: { hasEvery: list } }} : null;
    }

    return { list, setList, composeQuery };
}
