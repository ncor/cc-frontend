import { ThemeContext } from "@/app/contexts/theme";
import { ReactNode, useState } from "react"
import { setThemeCookie } from "./actions";


export interface ThemeProviderProps {
    defaultTheme: string,
    children: ReactNode
}

export default function ThemeProvider({
    defaultTheme, children
}: ThemeProviderProps) {
    const [ theme, _switchTheme ] = useState<string>(defaultTheme);

    const switchTheme = (theme: string) => {
        document.documentElement.className = theme;
        _switchTheme(theme);
        setThemeCookie(theme);
    }

    return <ThemeContext.Provider value={{
        theme, switchTheme
    }}>
        { children }
    </ThemeContext.Provider>;
}
