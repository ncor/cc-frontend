'use client';

import useVisibility from "@/app/hooks/visibility";
import BannerControls from "../../components/heading/BannerControls";
import RevalidationButton from "../../components/RevalidationButton";
import UserModal from "./UserModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function UserBannerControls() {
    const createModal = useVisibility();

    return <BannerControls>
        <RevalidationButton/>
        <Button onClick={ () => createModal.toggle(true) }>
            <Plus className="w-4 h-4 mr-2"/>
            Зарегистрировать
        </Button>
        <UserModal visibility={ createModal }/>
    </BannerControls>;
}
