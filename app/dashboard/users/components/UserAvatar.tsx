'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/client/utils";
import { identicon } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";
import { useEffect, useState } from "react";


export type UserAvatarProps = {
    seed: string | null,
    size?: 'default' | 'sm'
};

export default function UserAvatar({
    seed, size='default'
}: UserAvatarProps) {
    const [ avatarUri, setAvatarUri ] = useState<string>('');

    useEffect(() => {
        const avatar = createAvatar(identicon, { seed: seed || '', scale: 70 });
        avatar.toDataUri().then(uri => setAvatarUri(uri));
    }, [ seed ]);

    const sizeStyle = size == 'default' ? 'w-[22px] h-[22px]' : 'w-4 h-4';

    return avatarUri && seed ?
        <Avatar className={ cn("relative rounded-full bg-white", sizeStyle) }>
            <AvatarImage
                src={ avatarUri }
                alt="@shadcn"
            />
            <AvatarFallback>?</AvatarFallback>
        </Avatar>
    :
        <Skeleton className={ cn("relative rounded-full h-8 w-8", sizeStyle) }/>;
}
