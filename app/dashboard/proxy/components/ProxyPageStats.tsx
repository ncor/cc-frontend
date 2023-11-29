'use client';

import { Network } from "lucide-react";
import StatCard from "../../components/stats/StatCard";
import useRevalidation from "@/app/hooks/revalidation";
import useSuspense from "@/app/hooks/suspense";
import { useEffect, useState } from "react";
import useProxies from "@/app/hooks/data/proxy";
import StatsSection from "../../components/stats/StatsSection";


export default function ProxyPageStats() {
    const { countOwn, countPublic } = useProxies();
    const { revalidated } = useRevalidation();
    const { suspenseFor, isLoading } = useSuspense();
    const [ ownProxiesCount, setOwnProxiesCount ] = useState<number>(0);
    const [ publicProxiesCount, setPublicProxiesCount ] = useState<number>(0);
    const [ ownRequestsCount, setOwnRequestsCount ] = useState<number>(0);
    const [ publicRequestsCount, setPublicRequestsCount ] = useState<number>(0);


    useEffect(() => {
        suspenseFor(async () => {
            setOwnProxiesCount((await countOwn({}))?.data || 0);
            setPublicProxiesCount((await countPublic({}))?.data || 0);
        });
    }, [ revalidated ]);

    return <StatsSection>
        <div className="grid gap-4 grid-rows-1 md:grid-cols-1 lg:grid-cols-2">
            <StatCard
                title="Личные прокси"
                icon={ <Network className="w-full h-full"/> }
                isLoading={ isLoading }
            >
                { ownProxiesCount }
                <p className="text-xs font-normal text-muted-foreground">
                    { ownRequestsCount } запросов
                </p>
            </StatCard>
            <StatCard
                title="Публичные прокси"
                icon={ <Network className="w-full h-full"/> }
                isLoading={ isLoading }
            >
                { publicProxiesCount }
                <p className="text-xs font-normal text-muted-foreground">
                    { publicRequestsCount } запросов
                </p>
            </StatCard>
        </div>
    </StatsSection>;
}
