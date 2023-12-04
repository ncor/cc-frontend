'use client';

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
        <Card className="bg-background p-6 flex flex-col gap-4">
            <CardHeader className="p-0 flex-row items-center gap-2 space-y-0">
                <div className="p-2 bg-accent rounded-full">
                    <div className="w-4 h-4 text-muted-foreground">
                        { icon }
                    </div>
                </div>
                <CardTitle className="text-sm font-medium">
                    { title }
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0 text-4xl flex flex-col gap-1 font-bold">
                {
                    isLoading
                    ? <Skeleton className="w-full h-[64px]"/>
                    : children
                }
            </CardContent>
        </Card>
    );
}
