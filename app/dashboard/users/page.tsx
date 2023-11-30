import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserModal from "./components/UserModal";
import UserPageStats from "./components/UserPageStats";
import PageContent from "../components/PageContent";
import Banner from "../components/heading/Banner";
import BannerControls from "../components/heading/BannerControls";
import BannerTitle from "../components/heading/BannerTitle";
import BannerHeader from "../components/heading/BannerHeader";
import BannerDescription from "../components/heading/BannerDescription";
import RevalidationButton from "../components/RevalidationButton";
import UserTable from "./components/UserTable";
import TableSection from "../components/table/TableSection";


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
            <BannerControls>
                <RevalidationButton/>
                <UserModal>
                    <Button>
                        <Plus className="w-4 h-4 mr-2"/>
                        Зарегистрировать
                    </Button>
                </UserModal>
            </BannerControls>
        </Banner>
        <UserPageStats/>
        <TableSection>
            <UserTable/>
        </TableSection>
    </PageContent>
}
