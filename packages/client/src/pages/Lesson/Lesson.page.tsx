import React from 'react';
import { Lesson } from '@codement/api';

export const LessonPage: React.FC<{lesson: Lesson}> = ({ lesson }) => <div>{`LESSON ${lesson.id}`}</div>;
