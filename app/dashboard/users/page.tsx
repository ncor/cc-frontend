import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import UserModal from "./components/UserModal";
import UserPageStats from "./components/UserPageStats";
import Heading from "../components/heading/Heading";
import HeadingTitle from "../components/heading/HeadingTitle";
import HeadingControls from "../components/heading/HeadingControls";
import UserTableSection from "./components/UserTableSection";
import PageContent from "../components/PageContent";


export default async function UsersPage() {
    return <PageContent>
        <Heading>
            <HeadingTitle includeRevalidation>
                Пользователи
            </HeadingTitle>
            <HeadingControls>
                <UserModal>
                    <Button>
                        <Plus className="w-4 h-4 mr-2"/>
                        Зарегистрировать
                    </Button>
                </UserModal>
            </HeadingControls>
        </Heading>
        <UserPageStats/>
        <UserTableSection/>
    </PageContent>
}
