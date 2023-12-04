'use client';

import { Shield, Sword, Users } from "lucide-react";
import StatCard from "../../components/stats/StatCard";
import useUsers from "@/app/dashboard/users/hooks/data/user";
import useRevalidation from "@/app/hooks/revalidation";
import useSuspense from "@/app/hooks/suspense";
import { useEffect, useState } from "react";
import StatsSection from "../../components/stats/StatsSection";


export default function UserPageStats() {
    const { count } = useUsers();
    const { revalidated } = useRevalidation();
    const { suspenseFor, isLoading } = useSuspense(true);
    const [ usersCount, setUsersCount ] = useState<number>(0);
    const [ newUsersCount, setNewUsersCount ] = useState<number>(0);
    const [ adminsCount, setAdminsCount ] = useState<number>(0);
    const [ newAdminsCount, setNewAdminsCount ] = useState<number>(0);
    const [ bansCount, setBansCount ] = useState<number>(0);
    const [ newBansCount, setNewBansCount ] = useState<number>();

    useEffect(() => {
        suspenseFor(async () => {
            const now = new Date();
            const monthAgo = new Date(now);
            monthAgo.setDate(now.getDate() - 30);

            setUsersCount((await count({}))?.data || 0);

            setAdminsCount((await count({
                where: { is_admin: true }
            }))?.data || 0);

            setNewUsersCount((await count({
                where: { created_at: { gte: monthAgo, lte: now } }
            }))?.data || 0);

            setNewAdminsCount((await count({
                where: {
                    is_admin: true,
                    created_at: { gte: monthAgo, lte: now }
                }
            }))?.data || 0);
        });
    }, [ revalidated ]);

    return <StatsSection>
        <div className="grid gap-4 grid-rows-1 md:grid-cols-1 lg:grid-cols-3">
            <StatCard
                title="Пользователи"
                icon={ <Users className="w-full h-full"/> }
                isLoading={ isLoading }
            >
                { usersCount }
                <p className="text-sm font-normal text-muted-foreground">
                    +{ newUsersCount } за прошлый месяц
                </p>
            </StatCard>
            <StatCard
                title="Администраторы"
                icon={ <Shield className="w-full h-full"/> }
                isLoading={ isLoading }
            >
                { adminsCount }
                <p className="text-xs font-normal text-muted-foreground">
                    +{ newAdminsCount } за прошлый месяц
                </p>
            </StatCard>
            <StatCard
                title="Баны"
                icon={ <Sword className="w-full h-full"/> }
                isLoading={ isLoading }
            >
                { bansCount }
                <p className="text-xs font-normal text-muted-foreground">
                    +{ newBansCount } за прошлый месяц
                </p>
            </StatCard>
        </div>
    </StatsSection>
}
