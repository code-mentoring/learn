
import fs from 'fs';
import path from 'path';

export default {
  getPathByName: fs.readFileSync(path.join(__dirname, './getPathByName.gql')).toString(),
  me: fs.readFileSync(path.join(__dirname, './me.gql')).toString(),
  getFriendRequestFromMe: fs.readFileSync(path.join(__dirname, './getFriendRequestFromMe.gql')).toString(),
  getFriendRequestToMe: fs.readFileSync(path.join(__dirname, './getFriendRequestToMe.gql')).toString(),
  getUserFriend: fs.readFileSync(path.join(__dirname, './getUserFriend.gql')).toString()
};
