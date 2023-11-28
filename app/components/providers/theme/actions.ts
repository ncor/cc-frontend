'use server';

import { COOKIES } from "@/app/constants";
import { cookies } from "next/headers";


export const setThemeCookie = async (theme: string) => {
    cookies().set(COOKIES.PREFERRED_THEME, theme);
}
