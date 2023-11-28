import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RevalidationButton from "../components/RevalidationButton";
import UserModal from "./components/UserModal";
import UserTable from "./components/UserTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserPageStats from "./components/UserPageStats";


export default async function UsersPage() {
    return (
        <div className="w-full p-8 pt-6 flex justify-center">
            <div className="space-y-4 w-full max-w-5xl">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Пользователи
                        <RevalidationButton />
                    </h2>
                    <div className="flex items-center gap-2">
                        <UserModal>
                            <Button variant="default">
                                <Plus className="w-4 h-4 mr-2"/>
                                Зарегистрировать
                            </Button>
                        </UserModal>
                    </div>
                </div>
                <UserPageStats/>
                <Tabs defaultValue="users" className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="users">Все пользовати</TabsTrigger>
                        <TabsTrigger value="admins">Администраторы</TabsTrigger>
                    </TabsList>
                    <TabsContent value="users">
                        <UserTable/>
                    </TabsContent>
                    <TabsContent value="admins">
                        <UserTable selectAdmins/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
}
