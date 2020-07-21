export interface Answer {
  id: string;
  content: string;
}

export interface Column {
  id: string;
  answersIds: string[];
}

export const answersData: Answer[] = [
  { id: 'answer-1', content: '<body>' },
  { id: 'answer-2', content: '<div>' },
  { id: 'answer-3', content: '</ul>' },
  { id: 'answer-4', content: '<.ul>' },
  { id: 'answer-5', content: '</li>' },
  { id: 'answer-6', content: '</body>' }
];

export const columnsData: Column[] = [
  {
    id: 'column-1',
    answersIds: []
  },
  {
    id: 'column-2',
    answersIds: [
      'answer-1',
      'answer-2',
      'answer-3',
      'answer-4',
      'answer-5',
      'answer-6'
    ]
  }
];
