import Prism from 'prismjs';
import React, { useEffect, useRef } from 'react';
import { BrowserRouter, NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { Text } from '../components';
import { stories, Story } from './stories';
import { StyleguideArticle, StyleguidePage, StyleguideSidebar } from './Styleguide.styles';

require('prismjs/components/prism-typescript');
require('prismjs/components/prism-jsx');
require('prismjs/components/prism-tsx');


const Article: React.FC<{ story: Story }> = ({ story }) => {
  const wrapper = useRef<any>();

  // Highlight code
  useEffect(() => {
    if (wrapper.current) Prism.highlightAllUnder(wrapper.current);
  }, [wrapper.current]);

  return <StyleguideArticle ref={wrapper}>
    <story.story />
  </StyleguideArticle>;
};

export const Styleguide = () => <BrowserRouter>
  <StyleguidePage>

    <StyleguideSidebar>
      <Text variant="h3">Code Mentoring Style Guide  </Text>
      <div>
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {stories
            .sort((a, b) => ((a.title > b.title) ? 1 : -1))
            .map(({ title, id }) => <NavLink to={`/${id}`}>
              {title}
            </NavLink>)}
        </nav>
      </div>
    </StyleguideSidebar>

    <Switch>
      {stories.map(s => <Route path={`/${s.id}`}>
        <Article story={s} key={s.id} />
      </Route>)}

      <Redirect to={`/${stories[0].id}`} />
    </Switch>

  </StyleguidePage>
</BrowserRouter>;
