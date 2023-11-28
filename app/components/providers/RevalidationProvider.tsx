import { RevalidationContext } from "@/app/contexts/revalidation"
import { ReactNode, useState } from "react"


export interface RevalidationProviderProps {
    children: ReactNode
}

export default function RevalidationProvider({
    children
}: RevalidationProviderProps) {
    const [ revalidated, revalidate ] = useState<number>(Math.random());

    return <RevalidationContext.Provider value={{
        revalidated, revalidate: () => { revalidate(Date.now()) }
    }}>
        { children }
    </RevalidationContext.Provider>;
}
