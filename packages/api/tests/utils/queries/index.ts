
import fs from 'fs';
import path from 'path';

export default {
  getPathByName: fs.readFileSync(path.join(__dirname, './getPathByName.gql')).toString(),
  me: fs.readFileSync(path.join(__dirname, './me.gql')).toString(),
  characters: fs.readFileSync(path.join(__dirname, './characters.gql')).toString(),
  getCharacter: fs.readFileSync(path.join(__dirname, './getCharacter.gql')).toString(),
  getUserFriends: fs.readFileSync(path.join(__dirname, './getUserFriends.gql')).toString()
};
