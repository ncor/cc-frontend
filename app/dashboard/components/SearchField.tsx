import useSearch from "@/app/hooks/search";
import { Search } from "@/components/ui/input";


export interface SearchFieldProps {
    provider: ReturnType<typeof useSearch>
}

export default function SearchField({
    provider
}: SearchFieldProps) {
    return <Search
        onKeyDown={ e => {
            if (e.key == 'Enter')
                provider.setText(provider.buffer);
        } }
        onChange={ e => provider.setBuffer(e.target.value) }
        placeholder="Найти по имени..."
        className="w-full"
    />
}
