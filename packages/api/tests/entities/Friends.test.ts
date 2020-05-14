import { TestClient } from '../utils/TestClient';
import { User } from '../../types';

let me: User;
let user2: User;
let user3: User;

const setup = async () => {
  await TestClient.resetDatabase();
  const userInput = TestClient.seeder.randomUserInput();
  me = await TestClient.createUser(userInput);
  await TestClient.login(me.email, userInput.password);

  user2 = await TestClient.createUser(TestClient.seeder.randomUserInput());
  user3 = await TestClient.createUser(TestClient.seeder.randomUserInput());
};

describe('Friend entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  describe('Mutation: createFriend', () => {
    beforeEach(setup);

    it('should create friend successfully, case 1: from > to', async () => {
      let input = { fromId: me.id, toId: user2.id };

      if (me.id < user2.id) {
        input = { fromId: user2.id, toId: me.id };
      }
      const friend = await TestClient.createFriend(input);

      expect(friend.id).toBeDefined();
      expect(friend.user1Id).toEqual(input.fromId);
      expect(friend.user2Id).toEqual(input.toId);
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
      const friend = await TestClient.createFriend(input);

      expect(friend.id).toBeDefined();
      expect(friend.user1Id).toEqual(input.toId);
      expect(friend.user2Id).toEqual(input.fromId);
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

      await TestClient.createFriend(input);

      try {
        await TestClient.createFriend(input);
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

      await TestClient.createFriend(input1);

      const input2 = {
        fromId: user2.id,
        toId: me.id
      };

      try {
        await TestClient.createFriend(input2);
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
      const addFriend = await TestClient.createFriend(input);
      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(1);
      expect(friends[0].id).toEqual(addFriend.id);
      expect(friends[0].user1Id).toEqual(addFriend.user1Id);
      expect(friends[0].user2Id).toEqual(addFriend.user2Id);
      expect(friends[0].since).toEqual(addFriend.since);
      expect(friends[0].status).toEqual(addFriend.status);
      expect(friends[0].requested).toEqual(addFriend.requested);
      expect(friends[0].initiator).toEqual(addFriend.initiator);
      expect(friends[0].user1.id).toEqual(addFriend.user1Id);
      expect(friends[0].user2.id).toEqual(addFriend.user2Id);
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

      const addFriend1 = await TestClient.createFriend(input1);
      const addFriend2 = await TestClient.createFriend(input2);
      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(2);

      expect(friends[0].id).toEqual(addFriend1.id);
      expect(friends[0].user1Id).toEqual(addFriend1.user1Id);
      expect(friends[0].user2Id).toEqual(addFriend1.user2Id);
      expect(friends[0].since).toEqual(addFriend1.since);
      expect(friends[0].status).toEqual(addFriend1.status);
      expect(friends[0].requested).toEqual(addFriend1.requested);
      expect(friends[0].initiator).toEqual(addFriend1.initiator);
      expect(friends[0].user1.id).toEqual(addFriend1.user1Id);
      expect(friends[0].user2.id).toEqual(addFriend1.user2Id);

      expect(friends[1].id).toEqual(addFriend2.id);
      expect(friends[1].user1Id).toEqual(addFriend2.user1Id);
      expect(friends[1].user2Id).toEqual(addFriend2.user2Id);
      expect(friends[1].since).toEqual(addFriend2.since);
      expect(friends[1].status).toEqual(addFriend2.status);
      expect(friends[1].requested).toEqual(addFriend2.requested);
      expect(friends[1].initiator).toEqual(addFriend2.initiator);
      expect(friends[1].user1.id).toEqual(addFriend2.user1Id);
      expect(friends[1].user2.id).toEqual(addFriend2.user2Id);
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

      const addFriend1 = await TestClient.createFriend(input1);
      const addFriend2 = await TestClient.createFriend(input2);

      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(2);

      expect(friends[0].id).toEqual(addFriend1.id);
      expect(friends[0].user1Id).toEqual(addFriend1.user1Id);
      expect(friends[0].user2Id).toEqual(addFriend1.user2Id);
      expect(friends[0].since).toEqual(addFriend1.since);
      expect(friends[0].status).toEqual(addFriend1.status);
      expect(friends[0].requested).toEqual(addFriend1.requested);
      expect(friends[0].initiator).toEqual(addFriend1.initiator);
      expect(friends[0].user1.id).toEqual(addFriend1.user1Id);
      expect(friends[0].user2.id).toEqual(addFriend1.user2Id);

      expect(friends[1].id).toEqual(addFriend2.id);
      expect(friends[1].user1Id).toEqual(addFriend2.user1Id);
      expect(friends[1].user2Id).toEqual(addFriend2.user2Id);
      expect(friends[1].since).toEqual(addFriend2.since);
      expect(friends[1].status).toEqual(addFriend2.status);
      expect(friends[1].requested).toEqual(addFriend2.requested);
      expect(friends[1].initiator).toEqual(addFriend2.initiator);
      expect(friends[1].user1.id).toEqual(addFriend2.user1Id);
      expect(friends[1].user2.id).toEqual(addFriend2.user2Id);
    });
  });

  describe('Mutation: deleteFriend', () => {
    beforeEach(setup);

    it('should delete success', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };
      await TestClient.createFriend(input);
      const query1 = await TestClient.getUserFriends(me.id);

      await TestClient.deleteFriend(user2.id);
      const query2 = await TestClient.getUserFriends(me.id);

      // since sqlite doesn't return affected property as Postgres does,
      // the result always return false, alternatively to check the result by query.
      // expect(result).toEqual(true);
      expect(query1.length).toEqual(1);
      expect(query2.length).toEqual(0);
    });

    it('should throw error since the friend doest not exist', async () => {
      const result = await TestClient.deleteFriend(user2.id);
      expect(result).toEqual(false);
    });
  });

  describe('Mutation: confirmRejectRequest', () => {
    beforeEach(setup);

    it('should confirm friend request successfully', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };

      const response = 'accepted';

      const request = await TestClient.createFriend(input);

      const result = await TestClient.confirmRejectRequest(response, request.id);

      expect(result.status).toEqual(response);
      expect(result.since).toBeDefined();
      expect(result.user1.id).toBeDefined();
      expect(result.user2.id).toBeDefined();
    });

    it('should reject friend request successfully', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };

      const response = 'rejected';

      const request = await TestClient.createFriend(input);

      const result = await TestClient.confirmRejectRequest(response, request.id);

      expect(result.status).toEqual(response);
      expect(result.since).toBeDefined();
      expect(result.user1.id).toBeDefined();
      expect(result.user2.id).toBeDefined();
    });

    it('should throw an error if no friend exist', async () => {
      expect.assertions(1); // Expect there to be an error
      const id = '1b7b2c98-9fbe-4424-ad9e-d50d56e1f0bc';
      const response = 'accepted';

      try {
        await TestClient.confirmRejectRequest(response, id);
      } catch (e) {
        expect(e.message).toContain('Cannot return null for non-nullable field Mutation.confirmRejectRequest.');
      }
    });

    it('should throw an error if response is not valid value', async () => {
      expect.assertions(1); // Expect there to be an error
      const input = {
        fromId: me.id,
        toId: user2.id
      };

      const request = await TestClient.createFriend(input);
      const response = 'hmmmm';

      try {
        await TestClient.confirmRejectRequest(response, request.id);
      } catch (e) {
        expect(e.message).toContain('CHECK constraint failed');
      }
    });
  });
});
