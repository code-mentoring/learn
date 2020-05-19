import { TestClient } from '../utils/TestClient';
import { User } from '../../types';
import * as random from '../../src/Database/seeders/random';

let me: User;
let user2: User;
let user3: User;

const setup = async () => {
  await TestClient.resetDatabase();
  const userInput = random.userInput();
  me = await TestClient.createUser(userInput);
  await TestClient.login(me.email, userInput.password);

  user2 = await TestClient.createUser(random.userInput());
  user3 = await TestClient.createUser(random.userInput());
};

describe('Friend entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  describe('Mutation: createFriendship', () => {
    beforeEach(setup);

    it('should create friend successfully, case 1: from > to', async () => {
      let input = { fromId: me.id, toId: user2.id };

      if (me.id < user2.id) {
        input = { fromId: user2.id, toId: me.id };
      }
      const friend = await TestClient.createFriendship(input);

      expect(friend.id).toBeDefined();
      expect(friend.user1Id).toEqual(input.toId);
      expect(friend.user2Id).toEqual(input.fromId);
      expect(friend.requested).toBeDefined();
      expect(friend.initiator).toEqual(input.fromId);
      expect(friend.status).toEqual('pending');
      expect(friend.since).toBeNull();
    });

    it('should create friend successfully, case 2: from < to', async () => {
      let input = { fromId: me.id, toId: user2.id };

      if (me.id > user2.id) {
        input = { fromId: user2.id, toId: me.id };
      }
      const friend = await TestClient.createFriendship(input);

      expect(friend.id).toBeDefined();
      expect(friend.user1Id).toEqual(input.fromId);
      expect(friend.user2Id).toEqual(input.toId);
      expect(friend.requested).toBeDefined();
      expect(friend.initiator).toEqual(input.fromId);
      expect(friend.status).toEqual('pending');
      expect(friend.since).toBeNull();
    });

    it('should throw error if from and to already exist', async () => {
      expect.assertions(1); // Expect there to be an error

      const input = {
        fromId: me.id,
        toId: user2.id
      };

      await TestClient.createFriendship(input);

      try {
        await TestClient.createFriendship(input);
      } catch (e) {
        expect(e.message).toContain('UNIQUE constraint failed: friend.user1Id, friend.user2Id');
      }
    });

    it('should throw error when add B and A if A and B are already exist', async () => {
      expect.assertions(1); // Expect there to be an error

      const input1 = {
        fromId: me.id,
        toId: user2.id
      };

      await TestClient.createFriendship(input1);

      const input2 = {
        fromId: user2.id,
        toId: me.id
      };

      try {
        await TestClient.createFriendship(input2);
      } catch (e) {
        expect(e.message).toContain('UNIQUE constraint failed: friend.user1Id, friend.user2Id');
      }
    });

  });

  describe('Query: getUserFriends', () => {
    beforeEach(setup);
    it('should return null since no friends', async () => {
      const friends = await TestClient.getUserFriends(me.id);
      expect(friends.length).toEqual(0);
    });

    it('should return one friend', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };
      const addFriend = await TestClient.createFriendship(input);
      const friends = await TestClient.getUserFriends(me.id);

      expect(friends[0]).toMatchObject(addFriend);
    });

    it('should return two friend', async () => {
      const input1 = {
        fromId: me.id,
        toId: user2.id
      };

      const input2 = {
        fromId: user3.id,
        toId: me.id
      };

      const addFriend1 = await TestClient.createFriendship(input1);
      const addFriend2 = await TestClient.createFriendship(input2);
      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(2);
      expect(friends[0]).toMatchObject(addFriend1);
      expect(friends[1]).toMatchObject(addFriend2);
    });

    it('should return two friend', async () => {
      const input1 = {
        fromId: me.id,
        toId: user2.id
      };

      const input2 = {
        fromId: user3.id,
        toId: me.id
      };

      const addFriend1 = await TestClient.createFriendship(input1);
      const addFriend2 = await TestClient.createFriendship(input2);

      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(2);
      expect(friends[0]).toMatchObject(addFriend1);
      expect(friends[1]).toMatchObject(addFriend2);
    });
  });

  describe('Mutation: deleteFriend', () => {
    beforeEach(setup);

    it('should delete success', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };
      await TestClient.createFriendship(input);
      const query1 = await TestClient.getUserFriends(me.id);

      await TestClient.deleteFriendship(user2.id);
      const query2 = await TestClient.getUserFriends(me.id);

      // since sqlite doesn't return affected property as Postgres does,
      // the result always return false, alternatively to check the result by query.
      // expect(result).toEqual(true);
      expect(query1.length).toEqual(1);
      expect(query2.length).toEqual(0);
    });

    it('should throw error since the friend doest not exist', async () => {
      const result = await TestClient.deleteFriendship(user2.id);
      expect(result).toEqual(false);
    });
  });

  describe('Mutation: respondToFriendRequest', () => {
    beforeEach(setup);

    it('should confirm friend request successfully. case 1: user1Id < user2Id', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };

      const response = 'accepted';

      const request = await TestClient.createFriendship(input);

      const result = await TestClient.respondToFriendRequest(request.user1Id, request.user2Id, response);

      expect(result.status).toEqual(response);
      expect(result.since).toBeDefined();
      expect(result.user1.id).toEqual(request.user1Id);
      expect(result.user2.id).toEqual(request.user2Id);
    });

    it('should confirm friend request successfully. case 2: user1Id > user2Id', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };

      const response = 'accepted';

      const request = await TestClient.createFriendship(input);

      const result = await TestClient.respondToFriendRequest(request.user2Id, request.user1Id, response);

      expect(result.status).toEqual(response);
      expect(result.since).toBeDefined();
      expect(result.user1.id).toEqual(request.user1Id);
      expect(result.user2.id).toEqual(request.user2Id);
    });

    it('should reject friend request successfully', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };

      const response = 'rejected';

      const request = await TestClient.createFriendship(input);

      const result = await TestClient.respondToFriendRequest(request.user2Id, request.user1Id, response);

      expect(result.status).toEqual(response);
      expect(result.since).toBeDefined();
      expect(result.user1.id).toEqual(request.user1Id);
      expect(result.user2.id).toEqual(request.user2Id);
    });

    it('should throw an error if no friend exist', async () => {
      expect.assertions(1); // Expect there to be an error
      const user1Id = '9ba63166-5a19-4a4f-a33a-0192469dd378';
      const user2Id = me.id;
      const response = 'accepted';

      try {
        await TestClient.respondToFriendRequest(user1Id, user2Id, response);
      } catch (e) {
        expect(e.message).toContain('Cannot return null for non-nullable field Mutation.respondToFriendRequest.');
      }
    });

    it('should throw an error if response is not valid value', async () => {
      expect.assertions(1); // Expect there to be an error
      const input = {
        fromId: me.id,
        toId: user2.id
      };

      const request = await TestClient.createFriendship(input);
      const response = 'hmmmm';

      try {
        await TestClient.respondToFriendRequest(request.user2Id, request.user1Id, response);
      } catch (e) {
        expect(e.message).toContain('CHECK constraint failed');
      }
    });
  });
});
