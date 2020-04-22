
import fs from 'fs';
import path from 'path';

export default {
  createUser: fs.readFileSync(path.join(__dirname, './createUser.gql')).toString()
};
