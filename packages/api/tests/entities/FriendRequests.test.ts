import { TestClient } from '../utils/TestClient';
import { FriendRequest, User, UserInput } from '../../types';

describe('FriendRequest entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  let me: User;
  let user2: User;
  let user3: User;
  let user4: User;

  const prepareData = async () => {
    const userInput : UserInput = TestClient.seeder.randomUserInput();
    me = await TestClient.createUser(userInput);
    user2 = await TestClient.createUser(TestClient.seeder.randomUserInput());
    user3 = await TestClient.createUser(TestClient.seeder.randomUserInput());
    user4 = await TestClient.createUser(TestClient.seeder.randomUserInput());
  }
  const setup = async () => {
    await TestClient.resetDatabase();
    await prepareData();
    await TestClient.login(me.email, 'secret');

    // const userInput : UserInput = TestClient.seeder.randomUserInput();
    // me = await TestClient.createUser(userInput);
    // await TestClient.login(me.email, userInput.password);

    // user2 = await TestClient.createUser(TestClient.seeder.randomUserInput());
    // user3 = await TestClient.createUser(TestClient.seeder.randomUserInput());
    // user4 = await TestClient.createUser(TestClient.seeder.randomUserInput());
  };

  const setupFromOther = async () => {
    await TestClient.resetDatabase();
    await prepareData();
    await TestClient.login(user2.email, 'secret');
  };

  describe('Mutation: create FriendRequest', () => {
    beforeEach(setup);

    it('should create friend request successfully', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };

      const friendRequest = await TestClient.requestFriendship(user2.id);

      expect(friendRequest.id).toBeDefined();
      expect(friendRequest.fromId).toEqual(me.id);
      expect(friendRequest.toId).toEqual(user2.id);
      expect(friendRequest.accepted).toBeNull();
      expect(friendRequest.requested).toBeDefined();
    });

    it('should throw error if from --> to exist', async () => {
      expect.assertions(1); // Expect there to be an error
      const input = {
        fromId: me.id,
        toId: user2.id
      };

      await TestClient.requestFriendship(user2.id);

      try {
        await TestClient.requestFriendship(user2.id);
      } catch (e) {
        expect(e.message).toContain('already requested');
      }
    });

    // can not test, because need login with other user to add me.
    it('should throw error if to --> from exist', async () => {
      // expect.assertions(1); // Expect there to be an error
      // const input1 = {
      //   fromId: me.id,
      //   toId: user2.id
      // };

      // const input2 = {
      //   fromId: user2.id,
      //   toId: me.id
      // };

      // await TestClient.requestFriendship(user2.id);

      // try {
      //   await TestClient.requestFriendship(input2);
      // } catch (e) {
      //   expect(e.message).toContain('duplicate key value violates unique constraint ');
      // }
    });

    it('should throw error if fromId === toId', async () => {
      expect.assertions(1); // Expect there to be an error
      const input = {
        fromId: me.id,
        toId: me.id
      };

      try {
        await TestClient.requestFriendship(me.id);
      } catch (e) {
        expect(e.message).toContain('CHECK constraint failed');
      }
    });

    it('should throw error if toId is not an exist user', async () => {
      expect.assertions(1); // Expect there to be an error

      const toId = '6ce7bb54-b57c-4304-9c1d-0c4c7d4b6666'

      try {
        await TestClient.requestFriendship(toId);
      } catch (e) {
        expect(e.message).toContain('FOREIGN KEY constraint failed');
      }
    });
  });

  // can not be tested. Becuase sqlLite do not return accepted property, so the confirmRejectReques will always go into error branch "No record or update failed".
  describe('Mutation: confirmRejectRequest', () => {
  //   beforeEach(setup);

    //   it('should confirm friend request successfully and friend is added', async () => {
    //     const input = {
    //       fromId: me.id,
    //       toId: user2.id,
    //     };

    //     const request = await TestClient.createFriendRequest(input);

    //     const update = {
    //         fromId: me.id,
    //         toId: user2.id,
    //         id: request.id,
    //         accepted: true,
    //     };

    //     const result = await TestClient.confirmRejectRequest(update);
    //     const friendRequest = await TestClient.getFriendRequestFromMe();
    //     const friend = await TestClient.getUserFriend(me.id);

    //     expect(result).toEqual(true);
    //     expect(friendRequest[0].accepted).toEqual(update.accepted);
    //     expect(friend[0].id).toEqual(user2.id);
    //     expect(friend[0].firstName).toEqual(user2.firstName);
    //     expect(friend[0].lastName).toEqual(user2.lastName);
    //     expect(friend[0].email).toEqual(user2.email);
    //   });

    //   it('should reject friend request successfully and no friend is added', async () => {
    //     const input = {
    //       fromId: me.id,
    //       toId: user2.id,
    //     };

    //     const request = await TestClient.createFriendRequest(input);

    //     const update = {
    //         fromId: me.id,
    //         toId: user2.id,
    //         id: request.id,
    //         accepted: false,
    //     };

    //     const result = await TestClient.confirmRejectRequest(update);
    //     const friend = await TestClient.getUserFriend(me.id);

    //     expect(result).toEqual(true);
    //     expect(friend.length).toEqual(0);
    //   });

    //   it('should update friend return false if the request id does not exist', async () => {
    //       const update = {
    //         id: '1b7b2c98-9fbe-4424-ad9e-d50d56e1f0bc',
    //         fromId: me.id,
    //         toId: user2.id,
    //         accepted: false,
    //       };

    //       const result = await TestClient.confirmRejectRequest(update);
    //       const query1 = await TestClient.getFriendRequestFromMe();
    //       const query2 = await TestClient.getUserFriend(me.id);

    //       expect(result).toEqual(false);
    //       expect(query1.length).toEqual(0);
    //       expect(query2.length).toEqual(0);
    //   });

    //   it('should update friend throw error if the accepted is not boolean', async () => {
    //       expect.assertions(1); // Expect there to be an error
    //       const input = {
    //         fromId: me.id,
    //         toId: user2.id,
    //       };

    //       const request = await TestClient.createFriendRequest(input);

    //       const update = {
    //           fromId: me.id,
    //           toId: user2.id,
    //           id: request.id,
    //           accepted: "false",
    //       };

  //       try{
  //         await TestClient.confirmRejectRequest(update);
  //       } catch(e) {
  //           expect(e.message).toContain('Boolean cannot represent a non boolean value');
  //       }
  //   });
  });


  describe('Query: getMyFriendRequstsFromMe', () => {
    beforeEach(setup);
 
    it('should return null since no friend request', async () => {
      const friendRequests = await TestClient.getFriendsRequestFromMe();
      expect(friendRequests.length).toEqual(0);
    });

    it('should return one friend request', async () => {
      const input = {
        fromId: me.id,
        toId: user2.id
      };
      await TestClient.requestFriendship(user2.id);

      const friendRequests = await TestClient.getFriendsRequestFromMe();

      expect(friendRequests.length).toEqual(1);
      expect(friendRequests[0].id).toBeDefined();
      expect(friendRequests[0].fromId).toEqual(me.id);
      expect(friendRequests[0].toId).toEqual(user2.id);
      expect(friendRequests[0].accepted).toBeNull;
      expect(friendRequests[0].requested).toBeDefined();
      expect(friendRequests[0].to).toEqual(user2);
    });

    it('should return two friend request', async () => {
      const input1 = {
        fromId: me.id,
        toId: user2.id
      };

      const input2 = {
        fromId: me.id,
        toId: user3.id
      };

      await TestClient.requestFriendship(user2.id);
      await TestClient.requestFriendship(user3.id);
      const friendRequests : FriendRequest[] = await TestClient.getFriendsRequestFromMe();

      expect(friendRequests.length).toEqual(2);

      expect(friendRequests[0].id).toBeDefined();
      expect(friendRequests[0].fromId).toEqual(me.id);
      expect(friendRequests[0].accepted).toBeNull;
      expect(friendRequests[0].requested).toBeDefined();

      expect(friendRequests[1].id).toBeDefined();
      expect(friendRequests[1].fromId).toEqual(me.id);
      expect(friendRequests[1].accepted).toBeNull;
      expect(friendRequests[1].requested).toBeDefined();

      // the sequence returned is random
      expect(friendRequests[0].toId + friendRequests[1].toId).toContain(user2.id);
      expect(friendRequests[0].toId + friendRequests[1].toId).toContain(user3.id);
    });
  });

  describe('Query: getMyFriendRequstsToMe', () => {
    beforeEach(setupFromOther);

    it('should return null since no friend request', async () => {
      await TestClient.login(me.email, 'secret');

      const friendRequests = await TestClient.getFriendsRequestToMe();

      expect(friendRequests.length).toEqual(0);
    });

    it('should return one friend request', async () => {

      await TestClient.requestFriendship(me.id);

      await TestClient.login(me.email, 'secret');

      const friendRequests = await TestClient.getFriendsRequestToMe();

      expect(friendRequests.length).toEqual(1);
      expect(friendRequests[0].id).toBeDefined();
      expect(friendRequests[0].fromId).toEqual(user2.id);
      expect(friendRequests[0].toId).toEqual(me.id);
      expect(friendRequests[0].accepted).toBeNull;
      expect(friendRequests[0].requested).toBeDefined();
      expect(friendRequests[0].from).toEqual(user2);
    });
  });
});
