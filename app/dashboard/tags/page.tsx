import React from "react";
import PageContent from '../components/PageContent';
import Banner from '../components/heading/Banner';
import BannerHeader from '../components/heading/BannerHeader';
import BannerTitle from '../components/heading/BannerTitle';
import BannerDescription from '../components/heading/BannerDescription';
import TagsPageStats from "./components/TagsPageStats";
import TableSection from "../components/table/TableSection";
import TagTable from "./components/TagTable";
import TagBannerControls from "./components/TagBannerControls";


export default async function TagsPage() {
    return <PageContent>
        <Banner>
            <BannerHeader>
                <BannerTitle>
                    Теги
                </BannerTitle>
                <BannerDescription>
                    Теги служат для маркировки аккаунтов и прокси, упрощая организацию и поиск.
                </BannerDescription>
            </BannerHeader>
            <TagBannerControls/>
        </Banner>
        <TagsPageStats/>
        <TableSection>
            <TagTable/>
        </TableSection>
    </PageContent>;
}
