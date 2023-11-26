import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import RevalidationButton from "../components/RevalidationButton";
import UserModal from "../components/user/UserModal";
import UserTable from "../components/user/UserTable";


export default async function UsersPage() {
    return (
        <div className="w-full p-8 pt-6 flex justify-center">
            <div className="space-y-4 w-full max-w-5xl">
                <div className="flex justify-between">
                    <h2 className="text-3xl font-bold tracking-tight">
                        Пользователи
                        <RevalidationButton/>
                    </h2>
                    <div className="ml-auto flex gap-2">
                        <UserModal>
                            <Button variant="default">
                                <Plus className="w-4 h-4 mr-2" />
                                Зарегистрировать
                            </Button>
                        </UserModal>
                    </div>
                </div>
                <UserTable/>
            </div>
        </div>
    );
}
