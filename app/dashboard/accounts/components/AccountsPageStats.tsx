'use client';

import { User, Users } from "lucide-react";
import StatCard from "../../components/stats/StatCard";
import useRevalidation from "@/app/hooks/revalidation";
import useSuspense from "@/app/hooks/suspense";
import { useEffect, useState } from "react";
import StatsSection from "../../components/stats/StatsSection";
import useAccounts from "../hooks/data/accounts";


export default function AccountPageStats() {
    const { countOwn, countPublic } = useAccounts();
    const { revalidated } = useRevalidation();
    const { suspenseFor, isLoading } = useSuspense(true);
    const [ ownAccountsCount, setOwnAccountsCount ] = useState<number>(0);
    const [ publicAccountsCount, setPublicAccountsCount ] = useState<number>(0);
    const [ ownPagesCount, setOwnPagesCount ] = useState<number>(0);
    const [ publicPagesCount, setPublicPagesCount ] = useState<number>(0);


    useEffect(() => {
        suspenseFor(async () => {
            setOwnAccountsCount((await countOwn({}))?.data || 0);
            setPublicAccountsCount((await countPublic({}))?.data || 0);
        });
    }, [ revalidated ]);

    return <StatsSection>
        <div className="grid gap-4 grid-rows-1 md:grid-cols-1 lg:grid-cols-2">
            <StatCard
                title="Личные аккаунты"
                icon={ <User className="w-full h-full"/> }
                isLoading={ isLoading }
            >
                { ownAccountsCount }
                <p className="text-sm font-normal text-muted-foreground">
                    { ownPagesCount } страниц
                </p>
            </StatCard>
            <StatCard
                title="Общие аккаунты"
                icon={ <Users className="w-full h-full"/> }
                isLoading={ isLoading }
            >
                { publicAccountsCount }
                <p className="text-sm font-normal text-muted-foreground">
                    { publicPagesCount } страниц
                </p>
            </StatCard>
        </div>
    </StatsSection>;
}
