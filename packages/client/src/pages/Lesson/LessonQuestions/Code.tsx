/* eslint-disable no-cond-assign, react/no-danger */
import React, { useMemo, useRef } from 'react';
import styled, { keyframes, css as CSS } from 'styled-components';
import { theme, cover, Icon, timingBounce } from '@codement/ui';
import { codeColors } from '@codement/ui/css/code';

const flash = keyframes`
  0% {opacity: 0; }
  100% {opacity: 0.3; }
`;

const bounce = keyframes`
  0% {transform: scale(0%); }
  100% {transform: scale(100%); }
`;

export interface CodeSlot {
  value: string | null,
  grade: boolean | null;
}

export interface CodeProps {
  code: string;
  values: CodeSlot[];
}

const StyledCode = styled.pre`
  &[class*="language-"] {
    margin: 0;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`;

type MissingState = null | 'filled' | boolean;

const Missing = styled.span<{ state?: MissingState }>`
  position: relative;
  --color: ${({ state }) => {
    switch (state) {
      default:
      case null: // Not selected or graded
        return codeColors.operator;
      case true: // Correct
        return theme.color('secondary');
      case false: // Incorrect
        return theme.color('tertiary');
      case 'filled': // Selected, not graded
        return theme.color('primary.300');
    }
  }};

  &:before {
    ${cover};
    content: '';
    background: var(--color);
    opacity: 0.2;
    ${p => (p.state === null) && CSS`animation: ${flash} 0.5s infinite alternate-reverse forwards`};
  }
  &, &:before {
    border-radius: ${theme.borderRadius.medium};
  }
  border: 2px solid var(--color);
  padding: 0 ${theme.size('tiny')};

  ${Icon} {
    position: absolute;
    top: -${theme.size('xsm')};
    right: -${theme.size('xsm')};
    border-radius: 50%;
    background: ${p => theme.color((p.state! === true) ? 'secondary' : 'tertiary')};
    padding: ${theme.size('xtiny')};
    animation: ${bounce} 0.2s ${timingBounce};
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
  values
}) => {
  const wrapper = useRef<any>();

  const [lang, innerCode] = useMemo(() => {
    const [, l, c] = /.*<code class="language-(\w+)">([^]*?)(?:<\/code>)|((?!<\/code>)[^]*)/.exec(code)!;
    return [l, c];
  }, [code]);

  const pieces = useMemo<React.ReactNode[]>(() => {
    if (!innerCode) return []

    const p: React.ReactNode[] = innerCode.split(/%%(\w+)%%/);

    for (let i = 0; i < p.length; i += 2) {
      p[i] = <span dangerouslySetInnerHTML={{ __html: p[i] as string }} />
      const v = values[i / 2] || {};
      const state: MissingState = (!v.value)
        ? null
        : (v.grade === null) ? 'filled' : v.grade;

      if (p[i + 1]) p[i + 1] = <Missing state={state}>
        {v.value || <>&nbsp;&nbsp;&nbsp;</>}
        {(v.grade !== null) && <Icon icon={v.grade ? 'check' : 'x'} color="white" size="xbig" />}
      </Missing>;
    }

    return p;
  }, [innerCode, values]);


  return useMemo(() => <StyledCode ref={wrapper} className={`language-${lang}`}>
    <code className={`language-${lang}`}>
      {pieces}
    </code>
  </StyledCode>, [pieces]);

};
