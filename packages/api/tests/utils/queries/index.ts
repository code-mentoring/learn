
import fs from 'fs';
import path from 'path';

export default {
  getPathByName: fs.readFileSync(path.join(__dirname, './getPathByName.gql')).toString()
};
