import StoryButtons from '../components/Button/Button.story.mdx';
import StoryIcons from '../components/Icon/Icon.story.mdx';
import StorySliderField from '../components/SliderField/SliderField.story.mdx';
import StoryErrorMessage from '../components/ErrorMessage/ErrorMessage.story.mdx';
import StoryText from '../components/Text/Text.story.mdx';
import StoryBox from '../components/Box/Box.story.mdx';
import StoryCard from '../components/Card/Card.story.mdx';
import StoryLoader from '../components/Loader/Loader.story.mdx';

export interface Story {
  id: string;
  title: string;
  story: React.ComponentClass
}

export const stories: Story[] = [
  { id: 'buttons', title: 'Buttons', story: StoryButtons },
  { id: 'icons', title: 'Icons', story: StoryIcons },
  { id: 'box', title: 'Box', story: StoryBox },
  { id: 'card', title: 'Card', story: StoryCard },
  { id: 'sliderField', title: 'SliderField', story: StorySliderField },
  { id: 'error-message', title: 'Error Message', story: StoryErrorMessage },
  { id: 'text', title: 'Text', story: StoryText },
  { id: 'box', title: 'Box', story: StoryBox },
  { id: 'card', title: 'Card', story: StoryCard },
  { id: 'loader', title: 'Loader', story: StoryLoader }
];
