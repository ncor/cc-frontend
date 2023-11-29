import { ReactNode } from "react";
import Section from "../section/Section";
import SectionContent from "../section/SectionContent";


export interface HeadingProps {
    children: ReactNode
}

export default function Heading({
    children
}: HeadingProps) {
    return <Section className="py-12 border-b">
        <SectionContent className="flex justify-between items-center">
            { children }
        </SectionContent>
    </Section>
}
