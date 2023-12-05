import BannerTitle from "../components/heading/BannerTitle";
import Banner from "../components/heading/Banner";
import PageContent from "../components/PageContent";
import BannerDescription from "../components/heading/BannerDescription";
import BannerHeader from "../components/heading/BannerHeader";
import TableSection from "../components/table/TableSection";
import SectionHeading from "../components/section/SectionHeading";
import AccountsBannerControls from "./components/AccountsBannerControls";
import AccountsPageStats from "./components/AccountsPageStats";
import AccountsTable from "./components/AccountsTable";


export default async function AccountsPage() {
    return <PageContent>
        <Banner>
            <BannerHeader>
                <BannerTitle>
                    Аккаунты
                </BannerTitle>
                <BannerDescription>
                    Точки входа в рекламную систему Facebook.
                </BannerDescription>
            </BannerHeader>
            <AccountsBannerControls/>
        </Banner>
        <AccountsPageStats/>
        <TableSection>
            <SectionHeading>
                База
            </SectionHeading>
            <AccountsTable/>
        </TableSection>
    </PageContent>;
}
