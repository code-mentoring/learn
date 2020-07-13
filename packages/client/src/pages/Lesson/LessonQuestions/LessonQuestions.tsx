import { ModuleLesson } from '@codement/api';
import React from 'react';
import { LessonHeader } from '../LessonHeader';

export interface LessonQuestionsProps {
  lesson: ModuleLesson;
}

export const LessonQuestions: React.FC<LessonQuestionsProps> = () => <LessonHeader />;
