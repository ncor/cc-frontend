'use client';

import useTagSearch from "@/app/hooks/tag-search";
import TagSelector from "../tags/components/TagSelector";


export interface TagSearchFieldProps {
    provider: ReturnType<typeof useTagSearch>
}

export default function TagSearchField({
    provider
}: TagSearchFieldProps) {
    return <TagSelector onTagsChange={(tags) =>
        provider.setList(tags)
    }/>;
}
