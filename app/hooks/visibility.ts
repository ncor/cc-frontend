import { useState } from "react";


export default function useVisibility(defaultValue=false) {
    const [ isVisible, toggle ] = useState<boolean>(defaultValue);

    return { isVisible, toggle };
}

export type VisibilityInterface = ReturnType<typeof useVisibility>;
