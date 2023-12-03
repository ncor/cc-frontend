import { useState } from "react";


export default function useSearch() {
    const [ text, setText ] = useState<string>('');
    const [ buffer, setBuffer ] = useState<string>('');

    const composeQuery = () => {
        return { where: { name: { contains: text } } };
    }

    return { text, setText, buffer, setBuffer, composeQuery };
}
