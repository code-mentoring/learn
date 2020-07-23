import { createGlobalStyle } from 'styled-components';
import { theme } from './theme';

export const codeColors = {
  textShadow: "#222245",
  selection: "#a599e9",
  comment: "#b362ff",
  delimiter: theme.colors.code.color,
  operator: "#FFB300",
  punctuation: theme.color('white'),
  boolean: 'rgb(255, 98, 140)',
  tag: theme.color('primary.300'),
  entity: '#6897bb',
  number: "#ff628c",
  variable: "#ff628c",
  string: "#a5ff90",
  attrValue: theme.color('secondary'),
  attrValueFirst: "#a9b7c6",
  url: theme.color('primary.400'),
  function: 'rgb(250, 208, 0)',
  regex: '#364135',
  inserted: '#00ff00',
  deleted: '#ff000d',
  className: "#fb94ff",

  cssProperty: "#a9b7c6",
  cssSelector: '#ffc66d',
}

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
  text-shadow: 0 1px ${codeColors.textShadow};
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
  background: ${codeColors.selection};
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
  color: ${codeColors.comment};
}

.token.delimiter,
.token.keyword,
.token.selector,
.token.important,
.token.atrule {
  color: ${codeColors.delimiter};
}

.token.operator,
.token.attr-name {
  color: ${codeColors.operator};
}

.token.punctuation {
  color: ${codeColors.punctuation};
}

.token.boolean {
  color: ${codeColors.boolean};
}

.token.tag,
.token.tag .punctuation,
.token.doctype,
.token.builtin {
  color: ${codeColors.tag};
}

.token.entity,
.token.symbol {
  color: ${codeColors.entity};
}

.token.number {
  color: ${codeColors.number};
}

.token.property,
.token.constant,
.token.variable {
  color: ${codeColors.variable};
}

.token.string,
.token.char {
  color: ${codeColors.string};
}

.token.attr-value,
.token.attr-value .punctuation {
  color: ${codeColors.attrValue};
}

.token.attr-value .punctuation:first-child {
  color: ${codeColors.attrValueFirst};
}

.token.url {
  color: ${codeColors.url};
  text-decoration: underline;
}

.token.function {
  color: ${codeColors.function};
}

.token.regex {
  background: ${codeColors.regex};
}

.token.bold {
  font-weight: bold;
}

.token.italic {
  font-style: italic;
}

.token.inserted {
  background: ${codeColors.inserted};
}

.token.deleted {
  background: ${codeColors.deleted};
}

code.language-css .token.property,
code.language-css .token.property + .token.punctuation {
  color: ${codeColors.cssProperty};
}

code.language-css .token.id {
  color: ${codeColors.cssSelector};
}

code.language-css .token.selector > .token.class,
code.language-css .token.selector > .token.attribute,
code.language-css .token.selector > .token.pseudo-class,
code.language-css .token.selector > .token.pseudo-element {
  color: ${codeColors.cssSelector};
}

.token.class-name {
  color: ${codeColors.className};
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
