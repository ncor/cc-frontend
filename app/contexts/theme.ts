import { createContext } from "react";


export type IThemeContext = {
    theme: string,
    switchTheme: (theme: string) => any
};

export const ThemeContext = createContext<IThemeContext>({
    theme: 'dark',
    switchTheme: (theme: string) => {}
});
