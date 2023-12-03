import { useState } from "react";
import { Scope } from "../dashboard/types";
import { User } from "next-auth";


export default function useScope() {
    const [ value, set ] = useState<Scope>('all');

    const composeQuery = (user: User) => {
        return value == 'all'
            ? {}
            : (value == 'own'
                ? { where: { owner_id: user.id } }
                : { where: { is_public: true } }
            )
    }

    return { value, set, composeQuery };
}
