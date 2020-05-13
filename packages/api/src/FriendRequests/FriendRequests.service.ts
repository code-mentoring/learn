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

  async findByFrom(fromId: string): Promise<FriendRequests[]> {
    return this.friendRequestsRepository.find({ where: { fromId }, relations: ['to'] });
  }

  async findByTo(toId: string): Promise<FriendRequests[]> {
    const friendRequests = await this.friendRequestsRepository.find({ where: { toId }, relations: ['from'] });
    if (!friendRequests) throw new NotFoundException('not found');
    return friendRequests;
  }

  async create(friendRequestsInput: FriendRequestsInput): Promise<FriendRequests> {
    // from -> to and to -> from are treated as same, only one direction is allowed in DB
    const friendRequest = await this.friendRequestsRepository.find({ where:
      { toId: friendRequestsInput.fromId, fromId: friendRequestsInput.toId } });

    if (friendRequest.length > 0) {
      throw new Error('duplicate key value violates unique constraint "fromto"');
    } else return this.friendRequestsRepository.create(friendRequestsInput).save();
  }

  async confirmRejectRequest(input: ConfirmRejectInput): Promise<boolean> {
    try {
      await this.connection.manager.transaction(async manager => {

        // set the request as true or false
        const update = await manager.getRepository(FriendRequests).update(
          input.id, { accepted: input.accepted }
        );
        if (update.affected !== 1) {
          throw new Error('No record or update failed');
        }

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
}
