
import fs from 'fs';
import path from 'path';

export default {
  getPathByName: fs.readFileSync(path.join(__dirname, './getPathByName.gql')).toString(),
  me: fs.readFileSync(path.join(__dirname, './me.gql')).toString(),
  getFriendsRequestFromMe: fs.readFileSync(path.join(__dirname, './getFriendsRequestFromMe.gql')).toString(),
  getFriendsRequestToMe: fs.readFileSync(path.join(__dirname, './getFriendsRequestToMe.gql')).toString(),
  getUserFriends: fs.readFileSync(path.join(__dirname, './getUserFriends.gql')).toString()
};
