import { Tag } from "@/lib/models/tag/types";
import { useState } from "react";


export default function useTagSearch(selected?: Tag[]) {
    const [ list, setList ] = useState<Tag[]>(selected || []);

    const composeQuery = () => {
        return list.length ? {
            where: {
                tags: {
                    every: {
                        name: {
                            in: list.map(tag => tag.name)
                        }
                    }
                }
            }
        } : null;
    }

    return { list, setList, composeQuery };
}
