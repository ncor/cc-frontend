import { useState } from "react";
import { Scope } from "../dashboard/types";
import { User } from "next-auth";
import useMode from "./mode";


const rotationList: Scope[] = [ 'all', 'own', 'public' ];

export default function useScope() {
    const mode = useMode<Scope>('all', rotationList);

    const composeQuery = (user: User) => {
        return mode.value == 'all'
            ? {}
            : (mode.value == 'own'
                ? { where: { owner_id: user.id } }
                : { where: { is_public: true } }
            )
    }

    return { ...mode, composeQuery };
}
