'use client';

import { ReactNode } from "react";
import Section from "../section/Section";
import SectionContent from "../section/SectionContent";


export interface StatsSectionProps {
    children: ReactNode
}

export default function StatsSection({
    children
}: StatsSectionProps) {
    return <Section className="bg-muted border-b mb-10 pb-5">
        <SectionContent className="-translate-y-4">
            { children }
        </SectionContent>
    </Section>
}
