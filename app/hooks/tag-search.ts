import { useState } from "react";


export default function useTagSearch(selected?: string[]) {
    const [ list, setList ] = useState<string[]>(selected || []);

    return { list, setList };
}
