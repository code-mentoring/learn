import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Friend, UpdateFriendInput, FriendOutput } from './Friend.entity';

@Injectable()
export class FriendService {
  constructor(
    @InjectRepository(Friend) private readonly friendRepository: Repository<Friend>
  ) {}

  async findByUser(userId: string): Promise<Friend[]> {
    const friends = await this.friendRepository.find({
      where: [{ user1Id: userId }, { user2Id: userId }],
      relations: ['user1', 'user2']
    });
    return friends;

  }

  async create(fromId: string, toId: string): Promise<FriendOutput> {
    let input = { user1Id: fromId, user2Id: toId };
    // We place the lower id in user1Id
    if (toId < fromId) input = { user1Id: toId, user2Id: fromId };

    return this.friendRepository.create({ ...input, initiator: fromId }).save();
  }

  async update(updateInput: UpdateFriendInput): Promise<Friend | undefined> {
    // swap to make user1Id < user2Id
    let adjustInput = updateInput;
    if (updateInput.user1Id > updateInput.user2Id) {
      adjustInput = { ...updateInput, user1Id: updateInput.user2Id, user2Id: updateInput.user1Id };
    }

    await this.friendRepository.update(
      { user1Id: adjustInput.user1Id, user2Id: adjustInput.user2Id }, adjustInput
    );
    return this.friendRepository.findOne(
      { user1Id: adjustInput.user1Id, user2Id: adjustInput.user2Id }, { relations: ['user1', 'user2'] }
    );
  }

  async delete(user1Id: string, user2Id: string): Promise<Boolean> {

    let input = { user1Id, user2Id };
    if (user2Id < user1Id) input = { user1Id: user2Id, user2Id: user1Id };

    const { affected } = await this.friendRepository.createQueryBuilder()
      .delete()
      .where('user1Id = :user1Id AND user2Id = :user2Id', input)
      .execute();
    if (affected && affected > 0) return true;
    return false;
  }
}
