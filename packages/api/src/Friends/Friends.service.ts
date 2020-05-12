import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Friends, FriendsInput, UserFriendOutput } from './Friends.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends) private readonly friendsRepository: Repository<Friends>
  ) {}

  async findUserFriendsById(userId: string): Promise<UserFriendOutput[]> {
    const friends = await this.friendsRepository.find({
      where: [{ user1Id: userId }, { user2Id: userId }],
      relations: ['user1', 'user2']
    });

    const friendsResult = friends.map(friend => {
      const userFriend = new UserFriendOutput();
      userFriend.id = friend.id;
      userFriend.since = friend.since;
      userFriend.userFriend = (friend.user1Id === userId ? friend.user2 : friend.user1);
      return userFriend;
    });

    return friendsResult;
  }

  async create(friendsInput: FriendsInput): Promise<Friends> {
    if (friendsInput.user1Id > friendsInput.user2Id) {
      const swapInput : FriendsInput = {
        user1Id: friendsInput.user2Id,
        user2Id: friendsInput.user1Id
      };
      return this.friendsRepository.create(swapInput).save();
    }
    return this.friendsRepository.create(friendsInput).save();
  }

  async delete(friendsInput: FriendsInput): Promise<Boolean> {
    if (friendsInput.user1Id > friendsInput.user2Id) {
      return (Boolean)((await this.friendsRepository.delete(
        { user1Id: friendsInput.user2Id, user2Id: friendsInput.user1Id }
      )).affected);
    }
    return (Boolean)((await this.friendsRepository.delete(
      { user1Id: friendsInput.user1Id, user2Id: friendsInput.user2Id }
    )).affected);
  }
}
