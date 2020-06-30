import { createGlobalStyle } from 'styled-components';

const prefix = 'tooltip';
const border = '1px solid black';
const color = 'black';

// TODO: Move to Tooltip when we need it
export const TooltipStyles = createGlobalStyle`
.${prefix}.${prefix}-zoom-enter,
.${prefix}.${prefix}-zoom-leave {
  display: block;
}

.${prefix}-zoom-enter,
.${prefix}-zoom-appear {
  opacity: 0;
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.18, 0.89, 0.32, 1.28);
  animation-play-state: paused;
}
.${prefix}-zoom-leave {
  animation-duration: 0.3s;
  animation-fill-mode: both;
  animation-timing-function: cubic-bezier(0.6, -0.3, 0.74, 0.05);
  animation-play-state: paused;
}
.${prefix}-zoom-enter.${prefix}-zoom-enter-active,
.${prefix}-zoom-appear.${prefix}-zoom-appear-active {
  animation-name: rcToolTipZoomIn;
  animation-play-state: running;
}
.${prefix}-zoom-leave.${prefix}-zoom-leave-active {
  animation-name: rcToolTipZoomOut;
  animation-play-state: running;
}

@keyframes rcToolTipZoomIn {
  0% {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(0, 0);
  }
  100% {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(1, 1);
  }
}

@keyframes rcToolTipZoomOut {
  0% {
    opacity: 1;
    transform-origin: 50% 50%;
    transform: scale(1, 1);
  }
  100% {
    opacity: 0;
    transform-origin: 50% 50%;
    transform: scale(0, 0);
  }
}

.${prefix} {
  position: absolute;
  z-index: 1070;
  display: block;
  visibility: visible;
  line-height: 1.5;
  font-size: 12px;
  box-shadow: var(--shadow-10);
}
.${prefix}-hidden {
  display: none;
}
.${prefix}-inner {
  color: ${color};
  text-align: left;
  text-decoration: none;
  background-color: $bg;
  border-radius: 3px;
  min-height: 34px;
  border: 1px solid ${border};
}
.${prefix}-arrow,
.${prefix}-arrow-inner {
  position: absolute;
  width: 0;
  height: 0;
  border-color: transparent;
  border-style: solid;
}
.${prefix}-placement-top .${prefix}-arrow,
.${prefix}-placement-topLeft .${prefix}-arrow,
.${prefix}-placement-topRight .${prefix}-arrow {
  bottom: -5px;
  margin-left: -6px;
  border-width: 6px 6px 0;
  border-top-color: ${border};
}
.${prefix}-placement-top .${prefix}-arrow-inner,
.${prefix}-placement-topLeft .${prefix}-arrow-inner,
.${prefix}-placement-topRight .${prefix}-arrow-inner {
  bottom: 1px;
  margin-left: -6px;
  border-width: 6px 6px 0;
  border-top-color: $bg;
}
.${prefix}-placement-top .${prefix}-arrow {
  left: 50%;
}
.${prefix}-placement-topLeft .${prefix}-arrow {
  left: 15%;
}
.${prefix}-placement-topRight .${prefix}-arrow {
  right: 15%;
}
.${prefix}-placement-right .${prefix}-arrow,
.${prefix}-placement-rightTop .${prefix}-arrow,
.${prefix}-placement-rightBottom .${prefix}-arrow {
  left: -5px;
  margin-top: -6px;
  border-width: 6px 6px 6px 0;
  border-right-color: ${border};
}
.${prefix}-placement-right .${prefix}-arrow-inner,
.${prefix}-placement-rightTop .${prefix}-arrow-inner,
.${prefix}-placement-rightBottom .${prefix}-arrow-inner {
  left: 1px;
  margin-top: -6px;
  border-width: 6px 6px 6px 0;
  border-right-color: $bg;
}
.${prefix}-placement-right .${prefix}-arrow {
  top: 50%;
}
.${prefix}-placement-rightTop .${prefix}-arrow {
  top: 15%;
  margin-top: 0;
}
.${prefix}-placement-rightBottom .${prefix}-arrow {
  bottom: 15%;
}
.${prefix}-placement-left .${prefix}-arrow,
.${prefix}-placement-leftTop .${prefix}-arrow,
.${prefix}-placement-leftBottom .${prefix}-arrow {
  right: -5px;
  margin-top: -6px;
  border-width: 6px 0 6px 6px;
  border-left-color: ${border};
}
.${prefix}-placement-left .${prefix}-arrow-inner,
.${prefix}-placement-leftTop .${prefix}-arrow-inner,
.${prefix}-placement-leftBottom .${prefix}-arrow-inner {
  right: 1px;
  margin-top: -6px;
  border-width: 6px 0 6px 6px;
  border-left-color: $bg;
}
.${prefix}-placement-left .${prefix}-arrow {
  top: 50%;
}
.${prefix}-placement-leftTop .${prefix}-arrow {
  top: 15%;
  margin-top: 0;
}
.${prefix}-placement-leftBottom .${prefix}-arrow {
  bottom: 15%;
}
.${prefix}-placement-bottom .${prefix}-arrow,
.${prefix}-placement-bottomLeft .${prefix}-arrow,
.${prefix}-placement-bottomRight .${prefix}-arrow {
  top: -5px;
  margin-left: -6px;
  border-width: 0 6px 6px;
  border-bottom-color: ${border};
}

.${prefix}-placement-bottom .${prefix}-arrow-inner,
.${prefix}-placement-bottomLeft .${prefix}-arrow-inner,
.${prefix}-placement-bottomRight .${prefix}-arrow-inner {
  top: 1px;
  margin-left: -6px;
  border-width: 0 6px 6px;
  border-bottom-color: $bg;
}

.${prefix}-placement-bottom .${prefix}-arrow {
  left: 50%;
}
.${prefix}-placement-bottomLeft .${prefix}-arrow {
  left: 15%;
}
.${prefix}-placement-bottomRight .${prefix}-arrow {
  right: 15%;
}
`;
