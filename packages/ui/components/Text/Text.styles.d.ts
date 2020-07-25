import { DefaultTheme } from 'styled-components';
import { Color, Size } from '../../types/styled';
interface BaseTypeProps {
    color?: Color;
    fontSize?: Size | number;
    letterSpacing?: keyof DefaultTheme['letterSpacing'];
    fontFamily?: keyof DefaultTheme['fontFamily'];
    fontWeight?: keyof DefaultTheme['fontWeight'];
    uppercase?: boolean;
}
export declare const baseText: ({ color, fontSize, fontFamily, letterSpacing, fontWeight, uppercase }: BaseTypeProps) => any;
export declare const title: import("styled-components").StyledComponent<"h1", DefaultTheme, BaseTypeProps, never>;
export declare const subTitle: import("styled-components").StyledComponent<"h2", DefaultTheme, BaseTypeProps, never>;
export declare const h1: import("styled-components").StyledComponent<"h1", DefaultTheme, BaseTypeProps, never>;
export declare const h2: import("styled-components").StyledComponent<"h2", DefaultTheme, BaseTypeProps, never>;
export declare const h3: import("styled-components").StyledComponent<"h3", DefaultTheme, BaseTypeProps, never>;
export declare const h5: import("styled-components").StyledComponent<"h5", DefaultTheme, BaseTypeProps, never>;
export declare const body1: import("styled-components").StyledComponent<"p", DefaultTheme, BaseTypeProps, never>;
export declare const body2: import("styled-components").StyledComponent<"span", DefaultTheme, BaseTypeProps, never>;
export declare const span: import("styled-components").StyledComponent<"span", DefaultTheme, BaseTypeProps, never>;
export declare const small: import("styled-components").StyledComponent<"small", DefaultTheme, BaseTypeProps, never>;
export declare const strong: import("styled-components").StyledComponent<"strong", DefaultTheme, BaseTypeProps, never>;
export {};
