import { Button } from "@/components/ui/button";
import ProxyModal from "./components/ProxyModal";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProxyTable from "./components/ProxyTable";
import RevalidationButton from "../components/RevalidationButton";
import ProxyPageStats from "./components/ProxyPageStats";
import HeadingTitle from "../components/heading/HeadingTitle";
import HeadingControls from "../components/heading/HeadingControls";
import Heading from "../components/heading/Heading";
import PageContent from "../components/PageContent";
import ProxyTableSection from "./components/ProxyTableSection";


export default async function ProxyPage() {
    return <PageContent>
        <Heading>
            <HeadingTitle includeRevalidation>
                Прокси
            </HeadingTitle>
            <HeadingControls>
                <ProxyModal>
                    <Button variant="default">
                        <Plus className="w-4 h-4 mr-2" />
                        Новый прокси
                    </Button>
                </ProxyModal>
            </HeadingControls>
        </Heading>
        <ProxyPageStats/>
        <ProxyTableSection/>
    </PageContent>;
}
