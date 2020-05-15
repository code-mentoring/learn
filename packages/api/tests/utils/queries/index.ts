
import fs from 'fs';
import path from 'path';

export default {
  getPathByName: fs.readFileSync(path.join(__dirname, './getPathByName.gql')).toString(),
  me: fs.readFileSync(path.join(__dirname, './me.gql')).toString(),
  modules: fs.readFileSync(path.join(__dirname, './modules.gql')).toString()
};
