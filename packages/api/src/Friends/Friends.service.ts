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

  // async findByUser1(userId: string): Promise<Friends[]> {
  //   return this.friendsRepository.find({ where: { user1Id: userId } });
  // }

  // async findByUser2(userId: string): Promise<Friends[]> {
  //   return this.friendsRepository.find({ where: { user2Id: userId } });
  // }

  // async findByTwoId(id1: string, id2: string): Promise<Friends[]> {
  //   return this.friendsRepository.find({
  //     where: [
  //       { user1Id: id1, user2Id: id2 },
  //       { user2Id: id1, user1Id: id2 }
  //     ]
  //   });
  // }

  // async findbyOneId(id: string): Promise<Friends[]> {
  //   return this.friendsRepository.find({
  //     where: [
  //       { user1Id: id },
  //       { user2Id: id }
  //     ]
  //   });
  // }

  // async findAll(): Promise<Friends[]> {
  //   return this.friendsRepository.find();
  // }

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

  // TODO: delete
}
