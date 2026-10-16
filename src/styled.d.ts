import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    ink: string;
    muted: string;
    glass: string;
    line: string;
    overlay: string;
    fontSizes: { xl: string; lg: string; md: string; sm: string; xs: string };
  }
}
