import useUser from "../../users/hooks/user";
import useProxies from "../hooks/data/proxy";
import useScope from "@/app/hooks/scope";
import useTagSearch from "@/app/hooks/tag-search";
import useTable from "@/app/hooks/table";
import { Proxy, ProxyExtended } from "@/lib/models/proxy/types";
import { useCallback } from "react";
import FiltersWrapper from '../../components/FiltersWrapper';
import TagSearchField from "../../components/TagSearchField";
import ScopeTabs from "../../components/ScopeTabs";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import useSearch from "@/app/hooks/search";
import SearchField from "../../components/SearchField";


export interface ProxySelectProps {
    onProxyChange?: (id: number) => void;
    selected?: Proxy,
    disabled?: boolean
}

export default function ProxySelect({
    onProxyChange, selected, disabled=false
}: ProxySelectProps) {
    const user = useUser();
    const scope = useScope();
    const search = useSearch();
    const { find } = useProxies();
    const tagSearch = useTagSearch();

    const { rows } = useTable<ProxyExtended>({
        fetch: useCallback(async pagination => {
            const query = {
                where: {
                    ...search.composeQuery()?.where,
                    ...tagSearch.composeQuery()?.where,
                    ...scope.composeQuery(user)?.where,
                },
                ...pagination?.composeQuery(),
            };
    
            const response = await find(query);

            return response?.data || [];
        }, [ search.text, tagSearch.list, scope.value ])
    });

    return <div className="space-y-2">
        <FiltersWrapper className="sm:flex-col">
            <ScopeTabs provider={ scope } className="w-full"/>
            <SearchField provider={ search }/>
            <TagSearchField provider={ tagSearch }/>
        </FiltersWrapper>
        <Select
            value={ selected?.id.toString() || "" }
            defaultValue={ selected?.id.toString() }
            onValueChange={ value => onProxyChange?.(parseInt(value)) }
            disabled={ disabled }
        >
            <SelectTrigger className="w-full">
                <SelectValue placeholder="Выбери прокси"/>
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    {
                        rows && rows.map((row, i) =>
                            <SelectItem key={ i } value={ row.id.toString() }>
                                { row.name }
                            </SelectItem>
                        )
                    }
                </SelectGroup>
            </SelectContent>
        </Select>
    </div>
}
