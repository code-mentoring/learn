import styled, { keyframes } from 'styled-components';

interface TimerProps {
  duration: null | string;
}

const animState = (duration: string | null) => {
  if (duration === null) {
    return 'paused';
  }
  return 'running';
};
const flashCardAnimation = keyframes`
  from {background:  #FF91D0;
              box-shadow: 0px 2px 10px #EAE7F6;
             }
  to      {background-color: #ffffff; }
    `;

const flashTimerAnimation = keyframes`
  from {color: #FFFFFF; }
  to      {color: #74727C; }
    `;

export const StyledCardProgress = styled.div<TimerProps>`
  position: absolute;

  left: 0%;
  right: 0%;
  top: 0%;
  bottom: 0%;
  width: 160px;
  height: 32px;

  /* White */
  background-color: #ffffff;

  /* Shadow/Blue */
  box-shadow: 0px 2px 10px #eae7f6;
  border-radius: 8px;

  /*Flashing card animation*/
  animation-name: ${flashCardAnimation};
  animation-duration: ${p => p.duration};
  animation-play-state: ${p => animState(p.duration)};
  animation-iteration-count: infinite;
`;

export const StyledTimer = styled.div<TimerProps>`
  position: absolute;
  left: 24.77%;
  right: 24.77%;
  top: 3.12%;
  bottom: 3.12%;

  /* Headings/H2 */

  font-family: Open Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 21px;
  line-height: 29px;
  display: flex;
  align-items: center;
  text-align: center;

  /* GrayBlue/400 */

  color: #74727c;

  /*Flashing timer animation*/
  animation-name: ${flashTimerAnimation};
  animation-duration: ${p => p.duration};
  animation-play-state: ${p => animState(p.duration)};
  animation-iteration-count: infinite;
`;
