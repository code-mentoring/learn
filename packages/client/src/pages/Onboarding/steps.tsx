import React from 'react';

import ImageAbility from './images/ability.svg';
import ImageFinal from './images/final.svg';
import ImagePaths from './images/paths.svg';
import ImagePractice from './images/practice.svg';
import ImageWelcome from './images/welcome.svg';
import ImageWhy from './images/why.svg';


export const steps = [
  {
    title: 'Welcome to Code Mentoring ! 🎉',
    text: <>We’re excited you’re with us. Really! To get you started,
      help us understand a little bit about you.</>,
    graphic: <ImageWelcome />
  },
  {
    title: 'How would you rate your coding skills?',
    text: <>Don’t worry, there’s no wrong answer! We only ask so
      we can help you get to where you want to go.</>,
    graphic: <ImageAbility />
  },
  {
    title: 'Great! So... Why are you here? 😀',
    text: <>Looking for a career change? Always been interested in coding?
      We will put this on your profile so others can get to know you better.</>,
    graphic: <ImageWhy />
  },
  {
    title: 'What are you interested in learning?',
    text: <>Choose some of the base paths to get you started. You’ll unlock
      more as you go, but these are here to get you started.</>,
    graphic: <ImagePaths />
  },
  {
    title: 'Nice! How often do you want to practice?',
    text: <>We recommend building a daily habit for any skill you want to learn.
      We can help you stick to your goal.</>,
    graphic: <ImagePractice />
  },
  {
    title: 'You’re good to go!',
    text: 'Thanks for introducing yourself. Let’s start learning some code!',
    graphic: <ImageFinal />
  }
];
