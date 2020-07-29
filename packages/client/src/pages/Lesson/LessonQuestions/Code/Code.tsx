/* eslint-disable no-cond-assign, react/no-danger */
import { Icon, IconProps } from '@codement/ui';
import React, { useMemo, useRef } from 'react';
import styled from 'styled-components';
import { CodeSlot, CodeSlotState } from './CodeSlot';

export interface CodeProps {
  code: string;
  values: CodeSlotValue[];
  drag?: boolean;
  onRemove?: (index: number) => void;
  onDrop?: (index: number, value: string) => void;
}

export interface CodeSlotValue {
  value: string | null,
  grade: boolean | null;
}



const StyledCode = styled.pre`
  &[class*="language-"] {
    margin: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;


/**
 * A string renderer that takes a code string (from question file) and replaces
 * %%CODE%% etc with parts like drag and drop, and multiple choice selections
 *
 * This is wizadry. Yes I am bragging.
 */
export const Code: React.FC<CodeProps> = ({
  code,
  values,
  drag,
  onRemove,
  onDrop
}) => {
  const wrapper = useRef<any>();

  const [lang, innerCode] = useMemo(() => {
    const [, l, c] = /.*<code class="language-(\w+)">([^]*?)(?:<\/code>)|((?!<\/code>)[^]*)/.exec(code)!;
    return [l, c];
  }, [code]);

  const pieces = useMemo<React.ReactNode[]>(() => {
    if (!innerCode) return [];

    const p: React.ReactNode[] = innerCode.split(/%%(\w+)%%/);


    for (let i = 0; i < p.length; i += 2) {
      // Current text
      p[i] = <span dangerouslySetInnerHTML={{ __html: p[i] as string }} />;

      // Current value
      const v = values[i / 2] || {};

      // Code Slot state
      const state: CodeSlotState = (!v.value)
        ? null
        : (v.grade === null) ? 'filled' : v.grade;


      if (p[i + 1]) {
        let icon: IconProps | null = null;

        switch (state) {
          case true:
            icon = { icon: 'check', color: 'white' };
            break;
          case false:
            icon = { icon: 'x', color: 'white' };
            break;
          case 'filled':
            if (drag) {
              icon = {
                icon: 'trash',
                color: 'grey.900',
                onClick: () => onRemove?.(i / 2)
              };
            }
            break;
          default:
        }

        p[i + 1] = <CodeSlot
          state={state}
          onDrop={v => onDrop?.(i / 2, v)}
        >
          {v.value || <>&nbsp;&nbsp;&nbsp;</>}
          {icon && <Icon {...icon} size="xbig" /> }
        </CodeSlot>;
      }
    }

    return p;
  }, [innerCode, values]);


  return useMemo(() => <StyledCode ref={wrapper} className={`language-${lang}`}>
    <code className={`language-${lang}`}>
      {pieces}
    </code>
  </StyledCode>, [pieces]);

};
