import StoryButtons from '../components/Button/Button.story.mdx';
import StoryIcons from '../components/Icon/Icon.story.mdx';
import StoryBox from '../components/Box/Box.story.mdx';
import StoryCard from '../components/Card/Card.story.mdx';

export interface Story {
  id: string;
  title: string;
  story: React.ComponentClass
}

export const stories: Story[] = [
  { id: 'buttons', title: 'Buttons', story: StoryButtons },
  { id: 'icons', title: 'Icons', story: StoryIcons },
  { id: 'box', title: 'Box', story: StoryBox },
  { id: 'card', title: 'Card', story: StoryCard }
];
