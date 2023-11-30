import { Button } from "@/components/ui/button";
import ProxyModal from "./components/ProxyModal";
import { Plus } from "lucide-react";
import ProxyTable from "./components/ProxyTable";
import RevalidationButton from "../components/RevalidationButton";
import ProxyPageStats from "./components/ProxyPageStats";
import BannerTitle from "../components/heading/BannerTitle";
import BannerControls from "../components/heading/BannerControls";
import Banner from "../components/heading/Banner";
import PageContent from "../components/PageContent";
import BannerDescription from "../components/heading/BannerDescription";
import BannerHeader from "../components/heading/BannerHeader";
import TableSection from "../components/table/TableSection";


export default async function ProxyPage() {
    return <PageContent>
        <Banner>
            <BannerHeader>
                <BannerTitle>
                    Прокси
                </BannerTitle>
                <BannerDescription>
                    Прокси используются для анонимизации запросов и обхода лимита частоты запросов.
                </BannerDescription>
            </BannerHeader>
            <BannerControls>
                <RevalidationButton/>
                <ProxyModal>
                    <Button variant="default">
                        <Plus className="w-4 h-4 mr-2" />
                        Новый прокси
                    </Button>
                </ProxyModal>
            </BannerControls>
        </Banner>
        <ProxyPageStats/>
        <TableSection>
            <ProxyTable/>
        </TableSection>
    </PageContent>;
}
