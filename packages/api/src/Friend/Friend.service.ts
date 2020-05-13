import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Friend, FriendInput, UserFriendOutput } from './Friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>
  ) {}

  async findUserFriendsById(userId: string): Promise<UserFriendOutput[]> {
    const friends = await this.friendRepository.find({
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

  async create(friendsInput: FriendInput): Promise<Friend> {
    const { user1Id, user2Id } = friendsInput;
    // check if they are already friends
    const existingFriendship = await this.friendRepository.findOne({
      where: [
        { user1Id, user2Id },
        { user1Id: user2Id, user2Id: user1Id }
      ]
    });
    if (existingFriendship) throw new Error('already friends');
    return this.friendRepository.create(friendsInput).save();
  }

  async delete(user1Id: string, user2Id: string): Promise<Boolean> {
    const { affected } = await this.friendRepository.createQueryBuilder()
      .delete()
      .where('(user1Id = :user1Id AND user2Id = :user2Id ) OR (user1Id = :user2Id AND user2Id = :user1Id )', { user1Id, user2Id })
      .execute();
    if (affected && affected > 0) return true;
    return false;
  }
}
