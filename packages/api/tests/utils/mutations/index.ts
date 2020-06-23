import fs from 'fs';
import path from 'path';

const files = [
  'createUser',
  'login',
  'createPath',
  'joinPath',
  'updatePath',
  'updatePreferences',
  'createAssignment',
  'updateAssignment',
  'deleteAssignment',
  'createAssignmentFile',
  'respondToFriendRequest',
  'createFriendship',
  'deleteFriendship',
  'createModule',
  'updateModule',
  'deleteModule',
  'joinModule',
  'createCharacter',
  'updateCharacter',
  'deleteCharacter',
  'createConcept',
  'learnConcept',
  'updateConcept'
];

export default files.reduce((obj, file) => {
  // eslint-disable-next-line no-param-reassign
  obj[file] = fs.readFileSync(path.join(__dirname, `./${file}.gql`)).toString();
  return obj;
}, {} as { [key: string]: string });
