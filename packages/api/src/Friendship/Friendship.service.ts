import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

import { Friendship, FriendRequestInput, UserFriendshipOutput, FriendshipStatus, ConfirmRejectInput } from './Friendship.entity';

@Injectable()
export class FriendshipService {
  constructor(
    @InjectRepository(Friendship) private readonly friendshipRepository: Repository<Friendship>
  ) {}

  async findUserFriendsById(userId: string): Promise<UserFriendshipOutput[]> {
    const friends = await this.friendshipRepository.find({
      where: [{ user1Id: userId }, { user2Id: userId }],
      relations: ['user1', 'user2']
    });

    const friendsResult = friends.map(friend => {
      const userFriend = new UserFriendshipOutput();
      userFriend.id = friend.id;
      userFriend.userId = userId;
      userFriend.since = friend.since;
      userFriend.requested = friend.requested;
      userFriend.status = friend.status;
      userFriend.initiator = friend.initiator;
      userFriend.userFriend = (friend.user1Id === userId ? friend.user2 : friend.user1);
      return userFriend;
    });

    return friendsResult;
  }

  async createRequest(fromId: string, toId: string): Promise<Friendship> {
    const friendRequestInput = new FriendRequestInput();
    if (fromId === toId) {
      throw new Error('self request is not allowed');
    }
    if (fromId > toId) {
      friendRequestInput.user1Id = toId;
      friendRequestInput.user2Id = fromId;
    } else {
      friendRequestInput.user1Id = fromId;
      friendRequestInput.user2Id = toId;

    }
    friendRequestInput.initiator = fromId;
    friendRequestInput.status = FriendshipStatus.pending;

    return this.friendshipRepository.create(friendRequestInput).save();
  }

  async confirmRejectRequest(input: ConfirmRejectInput): Promise<boolean> {
    let result = new UpdateResult();

    if (input.accepted) {
      result = await this.friendshipRepository.update(
        input.id, { status: FriendshipStatus.accepted, since: new Date().toISOString() }
      );
    } else {
      result = await this.friendshipRepository.update(
        input.id, { status: FriendshipStatus.rejected }
      );
    }

    if (result.affected && result.affected > 0) return true;
    return false;
  }

  async delete(user1Id: string, user2Id: string): Promise<Boolean> {
    let inputUser1 = user1Id;
    let inputUser2 = user2Id;

    if (user1Id > user2Id) {
      inputUser1 = user2Id;
      inputUser2 = user1Id;
    }
    const { affected } = await this.friendshipRepository.createQueryBuilder()
      .delete()
      .where('(user1Id = :user1Id AND user2Id = :user2Id )', { inputUser1, inputUser2 })
      .execute();
    if (affected && affected > 0) return true;
    return false;
  }
}
