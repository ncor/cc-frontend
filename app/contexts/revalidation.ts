import { createContext } from "react";


export type IRevalidationContext = {
    revalidated: number,
    revalidate: () => any
};

export const RevalidationContext = createContext<IRevalidationContext>({
    revalidated: 0,
    revalidate: () => {}
});
