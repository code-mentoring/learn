import { BoxProps } from '../Box/Box';
export interface GridProps extends BoxProps {
    cols?: number;
}
export declare const Grid: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, BoxProps & GridProps, never>;
