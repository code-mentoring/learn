import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Friends, FriendsInput } from './Friends.entity';
import { UserWithPassword } from '../User/User.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends) private readonly friendsRepository: Repository<Friends>
  ) {}

  async findUserFriendsById(userId: string): Promise<UserWithPassword[]> {
    const friends = await this.friendsRepository.find({
      where: [{ user1Id: userId }, { user2Id: userId }],
      relations: ['user1', 'user2']
    });
    const friendsResult = friends.map(friend =>
      (friend.user1Id === userId ? friend.user2 : friend.user1));
    return friendsResult;
  }

  async create(friendsInput: FriendsInput): Promise<Friends> {
    return this.friendsRepository.create(friendsInput).save();
  }

  async delete(friendsInput: FriendsInput): Promise<Boolean> {
    const a = Boolean(await this.friendsRepository.delete(
      { user1Id: friendsInput.user1Id, user2Id: friendsInput.user2Id }
    ));
    const b = Boolean(await this.friendsRepository.delete(
      { user1Id: friendsInput.user2Id, user2Id: friendsInput.user1Id }
    ));
    return a || b;
  }
}
