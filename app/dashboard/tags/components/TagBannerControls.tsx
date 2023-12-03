'use client';

import useVisibility from "@/app/hooks/visibility";
import RevalidationButton from "../../components/RevalidationButton";
import BannerControls from "../../components/heading/BannerControls";
import TagModal from "./TagModal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";


export default function TagBannerControls() {
    const createModal = useVisibility();
    
    return <BannerControls>
        <RevalidationButton/>
        <Button
            onClick={ () => createModal.toggle(true) }
            variant="default"
        >
            <Plus className="w-4 h-4 mr-2" />
            Новый тег
        </Button>
        <TagModal visibility={ createModal }/>
    </BannerControls>;
}
