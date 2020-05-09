
import fs from 'fs';
import path from 'path';

export default {
  getPathByName: fs.readFileSync(path.join(__dirname, './getPathByName.gql')).toString(),
  me: fs.readFileSync(path.join(__dirname, './me.gql')).toString(),
  friendRequests: fs.readFileSync(path.join(__dirname, './friendRequests.gql')).toString(),
  getFriendRequestsFromMe: fs.readFileSync(path.join(__dirname, './getFriendRequestsFromMe.gql')).toString(),
  getFriendRequestsToMe: fs.readFileSync(path.join(__dirname, './getFriendRequestsToMe.gql')).toString(),
  getMyFriends: fs.readFileSync(path.join(__dirname, './getMyFriends.gql')).toString(),
  friends: fs.readFileSync(path.join(__dirname, './friends.gql')).toString(),
  getMyFridendsById: fs.readFileSync(path.join(__dirname, './getMyFridendsById.gql')).toString(),
};
