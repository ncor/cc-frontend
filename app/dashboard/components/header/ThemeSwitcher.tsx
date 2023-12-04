'use client';

import useTheme from "@/app/hooks/theme";
import { Button } from "@/components/ui/button";
import { Moon, SunDim } from "lucide-react";


export default function ThemeSwitcher() {
    const { theme, switchTheme } = useTheme();

    const handleToggle = () => {
        switchTheme(theme == 'dark' ? 'light' : 'dark');
    };

    return <Button
        variant="ghost"
        size="icon"
        onClick={ () => handleToggle() }
    >
        {
            theme == 'dark'
            ? <SunDim className="w-5 h-5 text-muted-foreground"/>
            : <Moon className="w-4 h-4 text-muted-foreground"/>
        }
    </Button>
};
