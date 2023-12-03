import ProxyTable from "./components/ProxyTable";
import ProxyPageStats from "./components/ProxyPageStats";
import BannerTitle from "../components/heading/BannerTitle";
import Banner from "../components/heading/Banner";
import PageContent from "../components/PageContent";
import BannerDescription from "../components/heading/BannerDescription";
import BannerHeader from "../components/heading/BannerHeader";
import TableSection from "../components/table/TableSection";
import ProxyBannerControls from "./components/ProxyBannerControls";


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
            <ProxyBannerControls/>
        </Banner>
        <ProxyPageStats/>
        <TableSection>
            <ProxyTable/>
        </TableSection>
    </PageContent>;
}
