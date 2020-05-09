import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FriendRequests, FriendRequestsInput } from './FriendRequests.entity';

@Injectable()
export class FriendRequestsService {
  constructor(
    @InjectRepository(FriendRequests) private readonly friendRequestsRepository: Repository<FriendRequests>
  ) {}

  async findAll(): Promise<FriendRequests[]> {
    return this.friendRequestsRepository.find();
  }

  async findByFrom(from: string): Promise<FriendRequests[]> {
    // const friendRequests = await this.friendRequestsRepository.find({ where: { from: from } });
    // if (!friendRequests) throw new NotFoundException('not found');
    // return friendRequests;
    return this.friendRequestsRepository.find({ where: { from: from } });
  }

  async findByTo(to: string): Promise<FriendRequests[]> {
    const friendRequests = await this.friendRequestsRepository.find({ where: { to: to } });
    if (!friendRequests) throw new NotFoundException('not found');
    return friendRequests;
  }

  async findByFromTo(from: string, to: string): Promise<FriendRequests[]> {
    const friendRequests = await this.friendRequestsRepository.find({ where: { from: from, to: to } });
    if (!friendRequests) throw new NotFoundException('not found');
    return friendRequests;
  }

  async create(friendRequestsInput: FriendRequestsInput): Promise<FriendRequests> {
    return this.friendRequestsRepository.create(friendRequestsInput).save();
  }

  async updateAccepted(friendRequestsInput: FriendRequestsInput): Promise<FriendRequests> {
    const existing = await this.friendRequestsRepository.findOne({ where: { from: friendRequestsInput.from, to: friendRequestsInput.to }});
    console.log(existing);
    if (existing) {
      Object.assign(existing, friendRequestsInput);
      return this.friendRequestsRepository.save(existing);
    }
    else throw new NotFoundException('not found');
  }
}
