import StoryButtons from '../components/Button/Button.story.mdx';
import StoryIcons from '../components/Icon/Icon.story.mdx';
import StorySliderField from '../components/SliderField/SliderField.story.mdx';

export interface Story {
  id: string;
  title: string;
  story: React.ComponentClass
}

export const stories: Story[] = [
  { id: 'buttons', title: 'Buttons', story: StoryButtons },
  { id: 'icons', title: 'Icons', story: StoryIcons },
  { id: 'sliderField', title: 'SliderField', story: StorySliderField }
];
