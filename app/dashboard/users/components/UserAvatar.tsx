'use client';

import useSuspense from "@/app/hooks/suspense";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/client/utils";
import { identicon } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useEffect, useState } from "react";


export type UserAvatarProps = {
    seed: string | null,
    size?: 'default' | 'md' | 'sm'
};

const sizeVariants = {
    default: 'w-[30px] h-[30px]',
    md: 'w-6 h-6',
    sm: 'w-5 h-5'
};

export default function UserAvatar({
    seed, size='default'
}: UserAvatarProps) {
    const { isLoading, suspenseFor } = useSuspense(true);
    const [ avatarUri, setAvatarUri ] = useState<string>('');

    const loadAvatar = async () => {
        const avatar = createAvatar(identicon, { seed: seed || '', scale: 70 });
        const dataUri = await suspenseFor(() => avatar.toDataUri());

        setAvatarUri(dataUri);
    };

    useEffect(() => {
        loadAvatar();
    }, [ seed ]);

    const sizeStyle = sizeVariants[size];

    if (isLoading)
        return <Skeleton className={ cn("relative rounded-full h-8 w-8", sizeStyle) }/>;

    return <Avatar className={ cn("relative rounded-full bg-white", sizeStyle) }>
        <AvatarImage src={ avatarUri } alt={ seed || '' }/>
        <AvatarFallback>?</AvatarFallback>
    </Avatar>;
}
