import React from "react";
import PageContent from '../components/PageContent';
import Banner from '../components/heading/Banner';
import BannerHeader from '../components/heading/BannerHeader';
import BannerTitle from '../components/heading/BannerTitle';
import BannerDescription from '../components/heading/BannerDescription';
import BannerControls from '../components/heading/BannerControls';
import RevalidationButton from "../components/RevalidationButton";
import CreateTagModal from './components/CreateTagModal';
import { Plus } from "lucide-react";
import { Button } from '@/components/ui/button';
import TagsPageStats from "./components/TagsPageStats";
import TableSection from "../components/table/TableSection";
import TagTable from "./components/TagTable";


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
            <BannerControls>
                <RevalidationButton/>
                <CreateTagModal>
                    <Button variant="default">
                        <Plus className="w-4 h-4 mr-2" />
                        Новый тег
                    </Button>
                </CreateTagModal>
            </BannerControls>
        </Banner>
        <TagsPageStats/>
        <TableSection>
            <TagTable/>
        </TableSection>
    </PageContent>;
}
