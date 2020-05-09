import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Friends, FriendsInput } from './Friends.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friends) private readonly friendsRepository: Repository<Friends>
  ) {}

  async findByUser1(userId: string): Promise<Friends[]> {
    return this.friendsRepository.find({ where: { user1Id: userId }});
  }

  async findByUser2(userId: string): Promise<Friends[]> {
    return this.friendsRepository.find({ where: { user2Id: userId }});
  }

  async findByTwoId(id1: string, id2: string): Promise<Friends[]> {
    return this.friendsRepository.find({ 
        where: [
          { user1Id: id1, user2Id: id2 },
          { user2Id: id1, user1Id: id2 }
        ] 
      });
  }

  async findbyOneId(id: string): Promise<Friends[]> {
    return (await this.friendsRepository.find({
        where: [
          { user1Id: id }, 
          { user2Id: id }
        ]
      }));
  }

  async findAll(): Promise<Friends[]> {
    return this.friendsRepository.find();
  }

  async create(friendsInput: FriendsInput): Promise<Friends> {
    if (friendsInput.user1Id === friendsInput.user2Id)
      throw new NotFoundException('You can\'t add yourself as friend');
    if (this.findByTwoId(friendsInput.user1Id, friendsInput.user2Id))
      throw new NotFoundException('The friendship exist already');  
    return this.friendsRepository.create(friendsInput).save();
  }
}