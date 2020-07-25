import React from 'react';
import { CardProps } from '../Card/Card';
export interface ModalProps extends React.HTMLProps<HTMLElement> {
    show?: boolean;
    heading?: string | React.ComponentType;
    padding?: CardProps['padding'];
    onClose?: () => void;
    buttons?: React.ReactNode[];
}
export declare const Modal: React.FC<ModalProps>;
