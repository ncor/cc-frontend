import { Button } from "@/components/ui/button";
import ProxyModal from "../components/proxy/ProxyModal";
import { Plus } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProxyTable from "../components/proxy/table/ProxyTable";
import RevalidationButton from "../components/RevalidationButton";


export default function ProxyPage() {
    return (
        <div className="w-full p-8 pt-6 flex justify-center">
            <div className="space-y-4 w-full max-w-5xl">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Прокси
                        <RevalidationButton/>
                    </h2>
                    <div className="ml-auto flex gap-2">
                        <ProxyModal>
                            <Button variant="default">
                                <Plus className="w-4 h-4 mr-2" />
                                Новый прокси
                            </Button>
                        </ProxyModal>
                    </div>
                </div>
                <Tabs defaultValue="own" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="own">Личные</TabsTrigger>
                        <TabsTrigger value="public">Публичные</TabsTrigger>
                    </TabsList>
                    <TabsContent value="own">
                        <ProxyTable/>
                    </TabsContent>
                    <TabsContent value="public">
                        <ProxyTable selectPublic/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
