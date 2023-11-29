import { ReactNode } from "react";
import Section from "../section/Section";
import SectionContent from "../section/SectionContent";


export interface StatsSectionProps {
    children: ReactNode
}

export default function StatsSection({
    children
}: StatsSectionProps) {
    return <Section className="py-10">
        <SectionContent>
            { children }
        </SectionContent>
    </Section>
}
