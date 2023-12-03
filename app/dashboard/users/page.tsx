import UserPageStats from "./components/UserPageStats";
import PageContent from "../components/PageContent";
import Banner from "../components/heading/Banner";
import BannerTitle from "../components/heading/BannerTitle";
import BannerHeader from "../components/heading/BannerHeader";
import BannerDescription from "../components/heading/BannerDescription";
import UserTable from "./components/UserTable";
import TableSection from "../components/table/TableSection";
import UserBannerControls from "./components/UserBannerControls";


export default async function UsersPage() {
    return <PageContent>
        <Banner>
            <BannerHeader>
                <BannerTitle>
                    Пользователи
                </BannerTitle>
                <BannerDescription>
                    Управление пользователями.
                </BannerDescription>
            </BannerHeader>
            <UserBannerControls/>
        </Banner>
        <UserPageStats/>
        <TableSection>
            <UserTable/>
        </TableSection>
    </PageContent>
}
