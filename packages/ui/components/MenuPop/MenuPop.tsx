import './MenuPop.styles';

import RCTooltip from 'rc-tooltip';
import { TooltipProps as RCTooltipProps } from 'rc-tooltip/lib/Tooltip';
import React from 'react';

export interface MenuPopProps extends Omit<RCTooltipProps, 'prefixCls'> {
}

export const MenuPop: React.FunctionComponent<MenuPopProps> = ({
  children,
  ...props
}) => <RCTooltip
  trigger="click"
  prefixCls="tooltip"
  {...props}
>{children}</RCTooltip>;
