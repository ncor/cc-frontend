import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserTable from "./UserTable";
import TableSection from "../../components/table/TableSection";


export default function UserTableSection() {
    return <TableSection>
        <Tabs defaultValue="users" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="users">Все пользователи</TabsTrigger>
                <TabsTrigger value="admins">Администраторы</TabsTrigger>
            </TabsList>
            <TabsContent value="users">
                <UserTable/>
            </TabsContent>
            <TabsContent value="admins">
                <UserTable selectAdmins/>
            </TabsContent>
        </Tabs>
    </TableSection>;
}
