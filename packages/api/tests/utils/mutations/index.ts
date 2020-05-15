
import fs from 'fs';
import path from 'path';

export default {
  createUser: fs.readFileSync(path.join(__dirname, './createUser.gql')).toString(),
  login: fs.readFileSync(path.join(__dirname, './login.gql')).toString(),
  createPath: fs.readFileSync(path.join(__dirname, './createPath.gql')).toString(),
  joinPath: fs.readFileSync(path.join(__dirname, './joinPath.gql')).toString(),
  updatePreferences: fs.readFileSync(path.join(__dirname, './updatePreferences.gql')).toString(),
  respondToFriendRequest: fs.readFileSync(path.join(__dirname, './respondToFriendRequest.gql')).toString(),
  createFriendship: fs.readFileSync(path.join(__dirname, './createFriendship.gql')).toString(),
  deleteFriendship: fs.readFileSync(path.join(__dirname, './deleteFriendship.gql')).toString(),
  createModule: fs.readFileSync(path.join(__dirname, './createModule.gql')).toString(),
  updateModule: fs.readFileSync(path.join(__dirname, './updateModule.gql')).toString(),
  deleteModule: fs.readFileSync(path.join(__dirname, './deleteModule.gql')).toString()
};
