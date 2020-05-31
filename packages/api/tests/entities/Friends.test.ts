import { User } from '../../types';
import { TestClient } from '../utils/TestClient';

let me: User;
let user2: User;
let user3: User;

const setup = async () => {
  await TestClient.resetDatabase();
  ({ user: me } = await TestClient.workflowSignup());
  user2 = await TestClient.createUser();
  user3 = await TestClient.createUser();
};

describe('Friend entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  describe('Mutation: createFriendship', () => {
    beforeEach(setup);

    it('should create friend successfully', async () => {
      const toId = user2.id
      const friend = await TestClient.createFriendship(toId);

      expect(friend.id).toBeDefined();
      expect(friend.user1Id).toEqual((me.id < user2.id)? me.id: user2.id);
      expect(friend.user2Id).toEqual((me.id > user2.id)? me.id: user2.id);
      expect(friend.requested).toBeDefined();
      expect(friend.initiator).toEqual(me.id);
      expect(friend.status).toEqual('pending');
      expect(friend.since).toBeNull();
    });

    it('should throw error if from and to already exist', async () => {
      expect.assertions(1); // Expect there to be an error

      await TestClient.createFriendship(user2.id);

      try {
        await TestClient.createFriendship(user2.id);
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
      const addFriend = await TestClient.createFriendship(user2.id);
      const friends = await TestClient.getUserFriends(me.id);

      expect(friends[0]).toMatchObject(addFriend);
    });

    it('should return two friend', async () => {
      const addFriend1 = await TestClient.createFriendship(user2.id);
      const addFriend2 = await TestClient.createFriendship(user3.id);
      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(2);
      expect(friends[0]).toMatchObject(addFriend1);
      expect(friends[1]).toMatchObject(addFriend2);
    });
  });

  describe('Mutation: deleteFriend', () => {
    beforeEach(setup);

    it('should delete success', async () => {
      await TestClient.createFriendship(user2.id);
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
      const response = 'accepted';

      const request = await TestClient.createFriendship(user2.id);

      const result = await TestClient.respondToFriendRequest(request.user1Id, request.user2Id, response);

      expect(result.status).toEqual(response);
      expect(result.since).toBeDefined();
      expect(result.user1.id).toEqual(request.user1Id);
      expect(result.user2.id).toEqual(request.user2Id);
    });

    it('should confirm friend request successfully. case 2: user1Id > user2Id', async () => {
      const response = 'accepted';

      const request = await TestClient.createFriendship(user2.id);

      const result = await TestClient.respondToFriendRequest(request.user2Id, request.user1Id, response);

      expect(result.status).toEqual(response);
      expect(result.since).toBeDefined();
      expect(result.user1.id).toEqual(request.user1Id);
      expect(result.user2.id).toEqual(request.user2Id);
    });

    it('should reject friend request successfully', async () => {
      const response = 'rejected';

      const request = await TestClient.createFriendship(user2.id);

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

      const request = await TestClient.createFriendship(user2.id);
      const response = 'hmmmm';

      try {
        await TestClient.respondToFriendRequest(request.user2Id, request.user1Id, response);
      } catch (e) {
        expect(e.message).toContain('CHECK constraint failed');
      }
    });
  });
});
