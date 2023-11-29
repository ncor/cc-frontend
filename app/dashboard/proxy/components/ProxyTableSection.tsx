import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TableSection from "../../components/table/TableSection";
import ProxyTable from "./ProxyTable";


export default function ProxyTableSection() {
    return <TableSection>
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
    </TableSection>;
}
