import './MenuPop.styles';
import { TooltipProps as RCTooltipProps } from 'rc-tooltip/lib/Tooltip';
import React from 'react';
export interface MenuPopProps extends Omit<RCTooltipProps, 'prefixCls'> {
}
export declare const MenuPop: React.FunctionComponent<MenuPopProps>;
