import fs from 'fs';
import path from 'path';

const files = [
  'getPathByName',
  'me',
  'modules',
  'getUserFriends',
  'search',
  'users',
  'getUserFriends',
  'getCharacters',
  'assignments',
  'getConceptByName'
];

export default files.reduce((obj, file) => {
  // eslint-disable-next-line no-param-reassign
  obj[file] = fs.readFileSync(path.join(__dirname, `./${file}.gql`)).toString();
  return obj;
}, {} as {[key: string]: string});
