import { useContext } from "react";
import { ThemeContext } from "../contexts/theme";


export default function useTheme() {
    const { theme, switchTheme } = useContext(ThemeContext);

    return { theme, switchTheme };
}
