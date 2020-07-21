/* eslint-disable no-cond-assign, react/no-danger */
import React, { useMemo } from 'react';
import styled from 'styled-components';

import unescape from 'lodash/unescape';
import { CodeInputRegex, theme } from '@codement/ui';
import { ConceptText } from './ConceptText';
import { Quote } from './Quote';

export interface StoryTextProps {
  text: string,
  obj: object
}

const Piece = styled.div`
  &, p:last-child {
    display: inline;
  }
  & + * {
    margin-top: ${theme.size('lg')};
  }
`;

/**
 * A string renderer that takes a HTML string (from markdown story) and replaces
 * {{foo}} with `obj.foo`, AND also replaces <a href="#type-details">Content</a>
 * links with things like ConceptTexts, CodeInputRegex, etc
 */
export const StoryContent: React.FC<StoryTextProps> = ({
  text, obj
}) => useMemo(() => {

  let hydrated = text;
  const pieces: React.ReactNode[] = [];

  // 1. Replace {{stuff}}
  const rHydrate = /\{\{(\w+)\}\}/g;
  let found: RegExpExecArray | null;
  while (found = rHydrate.exec(text)) {
    const [, _key] = found;
    // const [, key] = rHydrate.exec(text)!;
    // eslint-disable-next-line no-prototype-builtins
    if (!obj.hasOwnProperty(_key)) throw new Error(`Could not replace value '${_key}'`);
    hydrated = hydrated.replace(new RegExp(`\\{\\{${_key}\\}\\}`), obj[_key as keyof typeof obj]);
  }

  /**
   * 2. Replace <a href="#type-details">Content</a>
   *   The `type` could be a concept, a CodeInputRegex, etc
   *   The `details` is passed to the component
   *   The `content` is used as a child for the mapped element
   */
  const rLink = /(<a href="#(\w+)(.*)">(.*?)<\/a>)/gm;
  const split = hydrated.split(rLink);

  for (let i = 0; i < split.length; i += 1) {
    const cur = split[i];

    if (rLink.test(cur)) {
      const type = split[i + 1];
      const details = split[i + 2];
      const contents = split[i + 3];
      i += 3;

      switch (type) {
        case 'concept':
          pieces.push(<ConceptText
            name={details.slice(1)}
            dangerouslySetInnerHTML={{ __html: contents }}
          />);
          break;
        case 'writeCode':
          pieces.push(<CodeInputRegex
            regex={new RegExp(unescape(contents))}
          />);
          break;
        default:
          throw new Error(`Unknown type ${type} in story`);
      }

    } else {
      pieces.push(<Piece dangerouslySetInnerHTML={{ __html: cur }} />);
    }
  }

  return <Quote> {pieces.map(c => c)} </Quote>;

}, [text, obj]);
