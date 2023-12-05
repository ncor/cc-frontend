'use client';

import { User, Users } from "lucide-react";
import StatCard from "../../components/stats/StatCard";
import useRevalidation from "@/app/hooks/revalidation";
import useSuspense from "@/app/hooks/suspense";
import { useEffect, useState } from "react";
import StatsSection from "../../components/stats/StatsSection";
import useTags from "@/app/dashboard/tags/hooks/data/tag";


export default function TagsPageStats() {
    const { countOwn, countPublic } = useTags();
    const { revalidated } = useRevalidation();
    const { suspenseFor, isLoading } = useSuspense(true);
    const [ ownTagsCount, setOwnTagsCount ] = useState<number>(0);
    const [ publicTagsCount, setPublicTagsCount ] = useState<number>(0);
    const [ ownLinkedCount, setOwnLinkedCount ] = useState<number>(0);
    const [ publicLinkedCount, setPublicLinkedCount ] = useState<number>(0);


    useEffect(() => {
        suspenseFor(async () => {
            setOwnTagsCount((await countOwn({}))?.data || 0);
            setPublicTagsCount((await countPublic({}))?.data || 0);
        });
    }, [ revalidated ]);

    return <StatsSection>
        <div className="grid gap-4 grid-rows-1 md:grid-cols-1 lg:grid-cols-2">
            <StatCard
                title="Личные теги"
                icon={ <User className="w-full h-full"/> }
                isLoading={ isLoading }
            >
                { ownTagsCount }
                <p className="text-sm font-normal text-muted-foreground">
                    { ownLinkedCount } ресурсов
                </p>
            </StatCard>
            <StatCard
                title="Общие теги"
                icon={ <Users className="w-full h-full"/> }
                isLoading={ isLoading }
            >
                { publicTagsCount }
                <p className="text-sm font-normal text-muted-foreground">
                    { publicLinkedCount } ресурсов
                </p>
            </StatCard>
        </div>
    </StatsSection>;
}
