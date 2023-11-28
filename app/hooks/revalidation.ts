import { useContext } from "react";
import { RevalidationContext } from "../contexts/revalidation";


export default function useRevalidation() {
    const { revalidated, revalidate } = useContext(RevalidationContext);

    return { revalidated, revalidate };
}
