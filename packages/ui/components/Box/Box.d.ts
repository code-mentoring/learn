/// <reference types="react" />
import { Size } from '../../types/styled';
export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    padding?: number | Size;
    margin?: number | Size;
    shadow?: number;
}
export declare const Box: import("styled-components").StyledComponent<"div", import("styled-components").DefaultTheme, BoxProps, never>;
