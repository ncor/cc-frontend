import { useState } from "react";
import { Scope } from "../dashboard/types";


export default function useScope() {
    const [ value, set ] = useState<Scope>('all');

    return { value, set };
}
