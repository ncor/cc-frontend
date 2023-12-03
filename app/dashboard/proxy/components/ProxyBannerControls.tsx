'use client';

import { Button } from "@/components/ui/button";
import RevalidationButton from "../../components/RevalidationButton";
import BannerControls from "../../components/heading/BannerControls";
import ProxyModal from "./ProxyModal";
import { Plus } from "lucide-react";
import useVisibility from "@/app/hooks/visibility";


export default function ProxyBannerControls() {
    const createModal = useVisibility();

    return <BannerControls>
        <RevalidationButton/>
        <Button onClick={ () => createModal.toggle(true) }>
            <Plus className="w-4 h-4 mr-2" />
            Новый прокси
        </Button>
        <ProxyModal visibility={ createModal }/>     
    </BannerControls>
}
