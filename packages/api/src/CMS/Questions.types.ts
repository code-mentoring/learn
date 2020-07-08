import * as yup from 'yup';

export type CMSQuestionFile =
  CMSQuestionMultiChoice |
  CMSQuestionMemory |
  CMSQuestionDragDrop |
  CMSQuestionBugHighlight;


export interface CMSQuestionMultiChoice {
  options: string[];
  answer: number;
}

export interface CMSQuestionMemory {
  pairs: [string, string][]
}
export interface CMSQuestionDragDrop {
  options: string[];
  answers: number[];
}

export interface CMSQuestionBugHighlight {
}


export const shapeQuestionMultiChoice = yup.object().shape({
  options: yup.string().required(),
  answer: yup.number().required()
});

export const shapeQuestionMemory = yup.object().shape({
  pairs: yup.array(yup.string()).required()
});

export const shapeQuestionDragDrop = yup.object().shape({
  options: yup.string().required(),
  answer: yup.array(yup.number()).required()
});

export const shapeQuestionBugHighlight = yup.object();
