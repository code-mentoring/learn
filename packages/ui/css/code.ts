import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const CodeStyle = createGlobalStyle`
/**
 * Shades of Purple Theme for Prism.js
 *
 * @author Ahmad Awais <https://twitter.com/MrAhmadAwais/>
 * @support Follow/tweet at https://twitter.com/MrAhmadAwais/
 */

body code[class*='language-'],
body pre[class*='language-'] {
  color: ${theme.colors.code.color};
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;

  -moz-tab-size: 4;
  -o-tab-size: 4;
  tab-size: 4;

  -webkit-hyphens: none;
  -moz-hyphens: none;
  -ms-hyphens: none;
  hyphens: none;

  /* font-family: 'Operator Mono', 'Fira Code', Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace; */
  font-family: ${theme.fontFamily.code};
  font-weight: 400;
  font-size: ${theme.size()};
  line-height: 1.75;
  letter-spacing: 0.5px;
  text-shadow: 0 1px #222245;
}

pre[class*='language-']::-moz-selection,
pre[class*='language-'] ::-moz-selection,
code[class*='language-']::-moz-selection,
code[class*='language-'] ::-moz-selection,
pre[class*='language-']::selection,
pre[class*='language-'] ::selection,
code[class*='language-']::selection,
code[class*='language-'] ::selection {
  color: inherit;
  background: #a599e9;
}

/* Code blocks. */
pre[class*='language-'] {
  padding: 1em;
  margin: 0.5em 0;
  margin-bottom: ${theme.size('big')};
  overflow: auto;
  border-radius: ${theme.borderRadius.default};
}

:not(pre) > code[class*='language-'],
pre[class*='language-'] {
  background: ${theme.colors.code.background};
}

/* Inline code */
:not(pre) > code[class*='language-'] {
  padding: 0.1em;
  border-radius: 0.3em;
}

.token {
  font-weight: 400;
}

.token.comment,
.token.prolog,
.token.cdata {
  color: #b362ff;
}

.token.delimiter,
.token.keyword,
.token.selector,
.token.important,
.token.atrule {
  color: #ff9d00;
}

.token.operator,
.token.attr-name {
  color: rgb(255, 180, 84);
}

.token.punctuation {
  color: #ffffff;
}

.token.boolean {
  color: rgb(255, 98, 140);
}

.token.tag,
.token.tag .punctuation,
.token.doctype,
.token.builtin {
  color: rgb(255, 157, 0);
}

.token.entity,
.token.symbol {
  color: #6897bb;
}

.token.number {
  color: #ff628c;
}

.token.property,
.token.constant,
.token.variable {
  color: #ff628c;
}

.token.string,
.token.char {
  color: #a5ff90;
}

.token.attr-value,
.token.attr-value .punctuation {
  color: #a5c261;
}

.token.attr-value .punctuation:first-child {
  color: #a9b7c6;
}

.token.url {
  color: #287bde;
  text-decoration: underline;
}

.token.function {
  color: rgb(250, 208, 0);
}

.token.regex {
  background: #364135;
}

.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.inserted {
  background: #00ff00;
}

.token.deleted {
  background: #ff000d;
}

code.language-css .token.property,
code.language-css .token.property + .token.punctuation {
  color: #a9b7c6;
}

code.language-css .token.id {
  color: #ffc66d;
}

code.language-css .token.selector > .token.class,
code.language-css .token.selector > .token.attribute,
code.language-css .token.selector > .token.pseudo-class,
code.language-css .token.selector > .token.pseudo-element {
  color: #ffc66d;
}

.token.class-name {
  color: #fb94ff;
}

.token.operator,
.token.entity,
.token.url,
.language-css .token.string,
.style .token.string {
  background: none;
}

pre .line-highlight,
pre .line-highlight.line-highlight,
pre > code.line-highlight {
  margin-top: 36px;
  background: linear-gradient(to right, rgba(179, 98, 255, 0.17), transparent);
}

pre .line-highlight:before,
pre > code.line-highlight:before,
pre .line-highlight[data-end]:after,
pre > code.line-highlight[data-end]:after {
  content: '';
}
`;