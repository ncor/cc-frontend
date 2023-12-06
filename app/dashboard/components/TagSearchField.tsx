'use client';

import useTagSearch from "@/app/hooks/tag-search";
import TagSelect, { TagSelectProps } from "../tags/components/TagSelect";


export type TagSearchFieldProps = Omit<TagSelectProps, 'onValuesChange'> & {
    provider: ReturnType<typeof useTagSearch>
}

export default function TagSearchField({
    provider, ...props
}: TagSearchFieldProps) {
    return <TagSelect
        onValuesChange={ tags => provider.setList(tags) }
        { ...props }
    />;
}
