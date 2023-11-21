import { createContext } from "react";


export type RevalidationContext = {
    revalidated: number,
    revalidate: () => any
};

export const revalidationContext = createContext<RevalidationContext>({
    revalidated: 0,
    revalidate: () => {}
});
