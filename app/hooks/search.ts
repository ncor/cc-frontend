import { useState } from "react";


export default function useSearch() {
    const [ text, setText ] = useState<string>('');
    const [ buffer, setBuffer ] = useState<string>('');

    return { text, setText, buffer, setBuffer };
}
