import StoryButtons from '../components/Button/Button.story.mdx';
import StoryIcons from '../components/Icon/Icon.story.mdx';
import StoryErrorMessage from '../components/ErrorMessage/ErrorMessage.story.mdx';
import StoryText from '../components/Text/Text.story.mdx';

export interface Story {
  id: string;
  title: string;
  story: React.ComponentClass
}

export const stories: Story[] = [
  { id: 'buttons', title: 'Buttons', story: StoryButtons },
  { id: 'icons', title: 'Icons', story: StoryIcons },
  { id: 'error-message', title: 'Error Message', story: StoryErrorMessage },
  { id: 'text', title: 'Text', story: StoryText }
];
