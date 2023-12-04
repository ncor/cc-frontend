import UserPageStats from "./components/UserPageStats";
import PageContent from "../components/PageContent";
import Banner from "../components/heading/Banner";
import BannerTitle from "../components/heading/BannerTitle";
import BannerHeader from "../components/heading/BannerHeader";
import BannerDescription from "../components/heading/BannerDescription";
import UserTable from "./components/UserTable";
import TableSection from "../components/table/TableSection";
import UserBannerControls from "./components/UserBannerControls";
import SectionHeading from "../components/section/SectionHeading";
import DetailsMarker from "../components/DetailsMarker";


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
            <SectionHeading>
                Список
                <DetailsMarker>
                    После редактирования имени пользователю придется перелогиниться.
                </DetailsMarker>
            </SectionHeading>
            <UserTable/>
        </TableSection>
    </PageContent>
}
