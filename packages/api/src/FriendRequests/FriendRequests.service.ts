import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { FriendRequests, FriendRequestsInput, ConfirmRejectInput } from './FriendRequests.entity';
import { Friends } from '../Friends/Friends.entity';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequests)
      private readonly friendRequestsRepository: Repository<FriendRequests>,
      private readonly connection: Connection
  ) {}

  async findAll(): Promise<FriendRequests[]> {
    return this.friendRequestsRepository.find({ relations: ['fromUser', 'toUser'] });
  }

  async findByFrom(from: string): Promise<FriendRequests[]> {
    return this.friendRequestsRepository.find({ where: { from } });
  }

  async findByTo(to: string): Promise<FriendRequests[]> {
    const friendRequests = await this.friendRequestsRepository.find({ where: { to } });
    if (!friendRequests) throw new NotFoundException('not found');
    return friendRequests;
  }

  async findByFromTo(from: string, to: string): Promise<FriendRequests[]> {
    const friendRequests = await this.friendRequestsRepository.find({ where: { from, to } });
    if (!friendRequests) throw new NotFoundException('not found');
    return friendRequests;
  }

  async create(friendRequestsInput: FriendRequestsInput): Promise<FriendRequests> {
    return this.friendRequestsRepository.create(friendRequestsInput).save();
  }

  async confirmRejectRequest(input: ConfirmRejectInput): Promise<boolean> {
    try {
      await this.connection.manager.transaction(async manager => {

        // set the request as true or false
        await manager.getRepository(FriendRequests).update(input.id, { accepted: input.accepted });

        // create the friendship if accepted
        if (input.accepted) {
          await manager.getRepository(Friends).create({
            user1Id: input.fromId,
            user2Id: input.toId
          }).save();
        }
      });
      return true;
    } catch (e) {
      return false;
    }
  }

  // async updateFriendRequest(friendRequestsInput: FriendRequestsInput): Promise<FriendRequests> {
  //   const existing = await this.friendRequestsRepository.findOne(
  //     { where: { from: friendRequestsInput.from, to: friendRequestsInput.to } }
  //   );
  //   if (existing) {
  //     Object.assign(existing, friendRequestsInput);
  //     return this.friendRequestsRepository.save(existing);
  //   }
  //   throw new NotFoundException('not found');
  // }
}
