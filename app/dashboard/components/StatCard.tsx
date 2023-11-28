import useSuspense from "@/app/hooks/suspense";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { ReactNode } from "react";


export interface StatCardProps {
    title: string,
    icon: ReactNode,
    isLoading?: boolean,
    children: ReactNode
}

export default function StatCard({
    title, icon, isLoading, children
}: StatCardProps) {
    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <CardTitle className="text-sm font-medium">
                    { title }
                </CardTitle>
                <div className="w-4 h-4 text-muted-foreground">
                    { icon }
                </div>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
                {
                    isLoading
                    ? <Skeleton className="w-full h-[48px]"/>
                    : children
                }
            </CardContent>
        </Card>
    );
}
