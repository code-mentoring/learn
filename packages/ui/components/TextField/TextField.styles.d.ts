/// <reference types="react" />
import { TextFieldProps } from './TextField';
export interface BaseFieldProps {
    iconLeft?: boolean;
    iconRight?: boolean;
    size?: TextFieldProps['size'];
}
export declare const StyledInput: import("styled-components").StyledComponent<"input", import("styled-components").DefaultTheme, BaseFieldProps, never>;
export declare const StyledTextarea: import("styled-components").StyledComponent<"textarea", import("styled-components").DefaultTheme, BaseFieldProps, never>;
export declare const TextField: import("styled-components").StyledComponent<import("react").FunctionComponent<TextFieldProps>, import("styled-components").DefaultTheme, {}, never>;
