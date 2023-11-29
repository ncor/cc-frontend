import { ReactNode } from "react"
import Section from "../section/Section"
import SectionContent from "../section/SectionContent"


export interface TableSectionProps {
    children: ReactNode
}

export default function TableSection({
    children
}: TableSectionProps) {
    return <Section className="pb-10">
        <SectionContent className="space-y-2">
            { children }
        </SectionContent>
    </Section>
}
