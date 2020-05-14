import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Friend, CreateFriendInput, UpdateFriendInput } from './Friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>
  ) {}

  async findUserFriendsById(userId: string): Promise<Friend[]> {
    const friends = await this.friendRepository.find({
      where: [{ user1Id: userId }, { user2Id: userId }],
      relations: ['user1', 'user2']
    });
    return friends;

  }

  async create(friendInput: CreateFriendInput): Promise<Friend> {
    const { fromId, toId } = friendInput;
    let input = { user1Id: fromId, user2Id: toId };
    // We place the lower id in user1Id
    if (toId > fromId) input = { user1Id: toId, user2Id: fromId };

    return this.friendRepository.create({ ...input, initiator: fromId }).save();
  }

  async update(updateInput: UpdateFriendInput): Promise<Friend | undefined> {
    await this.friendRepository.update({ id: updateInput.id }, updateInput);
    return this.friendRepository.findOne({ id: updateInput.id }, { relations: ['user1', 'user2'] });
  }

  async delete(user1Id: string, user2Id: string): Promise<Boolean> {

    let input = { user1Id, user2Id };
    if (user2Id > user1Id) input = { user1Id: user2Id, user2Id: user1Id };

    const { affected } = await this.friendRepository.createQueryBuilder()
      .delete()
      .where('user1Id = :user1Id AND user2Id = :user2Id', input)
      .execute();
    if (affected && affected > 0) return true;
    return false;
  }
}
