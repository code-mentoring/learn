import Prism from 'prismjs';
import React, { useEffect, useMemo, useRef } from 'react';
import { Router } from 'react-router';
import { NavLink, Route, Switch, useParams } from 'react-router-dom';
import { Text } from '../components';
import StoryButtons from '../components/Button/Button.story.mdx';
import StoryIcons from '../components/Icon/Icon.story.mdx';
import { history } from '../lib/history';
import { StyleguideArticle, StyleguidePage, StyleguideSidebar } from './Styleguide.styles';

require('prismjs/components/prism-typescript');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-tsx');

export interface Story {
  id: string;
  title: string;
  story: React.ComponentClass
}
// components are to the story array
const stories: Story[] = [
  { id: 'buttons', title: 'Buttons', story: StoryButtons },
  { id: 'icons', title: 'ArrowDown', story: StoryIcons }
];
const Article = () => {
  const { comp } = useParams<{ comp: string }>();
  const wrapper = useRef<any>();
  // Highlight code
  useEffect(() => {
    if (wrapper.current) Prism.highlightAllUnder(wrapper.current);
  }, [wrapper.current]);
  const Story = useMemo(() => stories.find(s => s.id === comp), [comp]);
  if (!Story) return <span>Not found</span>;
  return <StyleguideArticle ref={wrapper}> <Story.story /> </StyleguideArticle>;
};
export const Styleguide = () => <Router history={history}>
  <StyleguidePage>
    <StyleguideSidebar>
      <Text variant="h3">Code Mentoring Style Guide  </Text>
      <div>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {stories.sort((a, b) => ((a.title > b.title) ? 1 : -1))
            .map(({ title, id }) => <NavLink to={id} style={{ marginBottom: '1em' }}>
              {title}
            </NavLink>)}
        </nav>
      </div>
    </StyleguideSidebar>
    <Switch>
      <Route path="/:comp" component={Article} />
      <Route path="*" component={Article}>
        Not Found
      </Route>
    </Switch>
  </StyleguidePage>
</Router>;
