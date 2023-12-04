'use client';

import { ReactNode } from "react";
import Section from "../section/Section";
import SectionContent from "../section/SectionContent";


export interface BannerProps {
    children: ReactNode
}

export default function Banner({
    children
}: BannerProps) {
    return <Section className="py-12 border-b">
        <SectionContent className="flex justify-between items-center">
            { children }
        </SectionContent>
    </Section>
}
