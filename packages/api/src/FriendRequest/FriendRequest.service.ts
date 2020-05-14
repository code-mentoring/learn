import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Connection } from 'typeorm';

import { FriendRequest, ConfirmRejectInput } from './FriendRequest.entity';
import { Friend } from '../Friend/Friend.entity';

@Injectable()
export class FriendRequestService {
  constructor(
    @InjectRepository(FriendRequest)
      private readonly friendRequestsRepository: Repository<FriendRequest>,
      private readonly connection: Connection
  ) {}

  async findAll(): Promise<FriendRequest[]> {
    return this.friendRequestsRepository.find({ relations: ['fromUser', 'toUser'] });
  }

  async findByFrom(fromId: string): Promise<FriendRequest[]> {
    return this.friendRequestsRepository.find({ where: { fromId }, relations: ['to'] });
  }

  async findByTo(toId: string): Promise<FriendRequest[]> {
    const friendRequests = await this.friendRequestsRepository.find({ where: { toId }, relations: ['from'] });
    if (!friendRequests) throw new NotFoundException('not found');
    return friendRequests;
  }

  async create(fromId: string, toId: string): Promise<FriendRequest> {
    let input = { fromId, toId };

    // We place the lower id in fromId
    if (toId > fromId) {
      input = { fromId: toId, toId: fromId };
    }
    return this.friendRequestsRepository.create(input).save();
  }

  async confirmRejectRequest(input: ConfirmRejectInput): Promise<boolean> {
    try {
      await this.connection.manager.transaction(async manager => {

        // set the request as true or false
        const update = await manager.getRepository(FriendRequest).update(
          input.id, { accepted: input.accepted }
        );
        if (update.affected !== 1) {
          throw new Error('No record or update failed');
        }

        // create the friendship if accepted
        if (input.accepted) {
          await manager.getRepository(Friend).create({
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
}
