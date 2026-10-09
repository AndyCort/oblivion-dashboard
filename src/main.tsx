import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./style.css";
import App from "./App.tsx";
import { ThemeProvider } from "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    ink: string;
    muted: string;
    glass: string;
    line: string;
    fontSizes: {
      xl: string;
      lg: string;
      md: string;
      sm: string;
      xs: string;
    };
    themes?: any[];
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider
      theme={
        {
          fontSizes: {
            xl: "6rem",
            lg: "2.5rem",
            md: "1.5rem",
            sm: "1rem",
            xs: "0.85rem",
          },
          themes: [
            {
              name: "main",
              bgImg: "https://w.wallhaven.cc/full/gj/wallhaven-gjyoq7.png",
              colors: {
                ink: "oklch(0.9 0 312)",
                muted: "oklch(0.92 0.01 312 / 0.48)",
                glass: "oklch(1 0 0 / 0.24)",
                line: "oklch(1 0 0 / 0.48)",
              },
            },
          ],
        } as any
      }
    >
      <App />
    </ThemeProvider>
  </StrictMode>,
);
