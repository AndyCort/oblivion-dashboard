import type { DefaultTheme } from "styled-components";

export const backgroundImage = "https://w.wallhaven.cc/full/gj/wallhaven-gjyoq7.png";

const fontSizes = { xl: "6rem", lg: "2.5rem", md: "1.5rem", sm: "1rem", xs: "0.85rem" };

export const themes: Record<"light" | "dark", DefaultTheme> = {
  light: { ink: "#292630", muted: "#595361", glass: "rgba(255,255,255,0.72)", line: "rgba(40,37,42,0.22)", overlay: "rgba(239,235,241,0.88)", fontSizes },
  dark: { ink: "#f3eff5", muted: "#c1b8ca", glass: "rgba(25,21,33,0.78)", line: "rgba(255,255,255,0.25)", overlay: "rgba(15,12,23,0.72)", fontSizes },
};
