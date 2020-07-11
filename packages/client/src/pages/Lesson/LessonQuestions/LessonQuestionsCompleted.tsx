import { ModuleLesson } from '@codement/api';
import React from 'react';

export interface LessonQuestionsCompletedProps {
  lesson: ModuleLesson;
}

export const LessonQuestionsCompleted: React.FC<LessonQuestionsCompletedProps> = ({
  lesson
}) => <span>{lesson.lesson.storySections.length}</span>;
