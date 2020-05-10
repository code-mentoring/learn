import { TestClient } from '../utils/TestClient';
import { FriendRequests, User, UserInput } from '../../types';

describe('FriendRequests entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  let me: User;
  let user2: User;
  let user3: User;
  let user4: User;

  const setup = async () => {
    await TestClient.resetDatabase();
    const userInput : UserInput = TestClient.seeder.randomUserInput();
    me = await TestClient.createUser(userInput);
    await TestClient.login(me.email, userInput.password);

    user2 = await TestClient.createUser(TestClient.seeder.randomUserInput());
    user3 = await TestClient.createUser(TestClient.seeder.randomUserInput());
    user4 = await TestClient.createUser(TestClient.seeder.randomUserInput());  
  };

  describe('Mutation: create FriendRequest', () => {
    beforeEach(setup);

    it('should create friend request successfully', async () => {
      const input = {
        from: me.id,
        to: user2.id,
      };

      const friendRequest = await TestClient.createFriendRequest(input);

      expect(friendRequest.id).toBeDefined();
      expect(friendRequest.from).toEqual(me.id);
      expect(friendRequest.to).toEqual(user2.id);
      expect(friendRequest.accepted).toBeNull();
      expect(friendRequest.requested).toBeDefined();
    });

    it('should throw error due to duplicate from & to', async () => {
      expect.assertions(1); // Expect there to be an error
      const input = {
        from: me.id,
        to: user2.id,
      };
  
      await TestClient.createFriendRequest(input);

      try {
          const request = await TestClient.createFriendRequest(input);
          console.log(request);
        } catch (e) {
          expect(e.message).toContain('SQLITE_CONSTRAINT: UNIQUE constraint failed: friend_requests.from, friend_requests.to');
        }
    });

    it('should throw error if from missing', async () => {
      expect.assertions(1); // Expect there to be an error
      try {
        const input = {
          to: user2.id,
        };
        // @ts-ignore Deliberately missing "from" to test error
        await TestClient.createFriendRequest(input);
      } catch (e) {
        expect(e.message).toContain('Field "from" of required type "String!" was not provided');
      }
    });

    it('should throw error if to missing', async () => {
      expect.assertions(1); // Expect there to be an error
      try {
        const input = {
          from: me.id,
        };
        // @ts-ignore Deliberately missing "to" to test error
        await TestClient.createFriendRequest(input);
      } catch (e) {
        expect(e.message).toContain('Field "to" of required type "String!" was not provided');
      }
    });
  });

  describe('Mutation: update FriendRequest', () => {
    beforeEach(setup);

    it('should update friend request successfully', async () => {
      const input = {
        from: me.id,
        to: user2.id,
      };
      
      const accepted = {
          accepted: true,
      }
      await TestClient.createFriendRequest(input);
      const friendRequest = await TestClient.updateFriendRequest({...input, ...accepted});

      expect(friendRequest.id).toBeDefined();
      expect(friendRequest.from).toEqual(me.id);
      expect(friendRequest.to).toEqual(user2.id);
      expect(friendRequest.accepted).toEqual(accepted.accepted);
      expect(friendRequest.requested).toBeDefined();
    }); 

    it('should update friend throw error if the request from/to does not exist', async () => {
        expect.assertions(1); // Expect there to be an error
        const input1 = {
          from: me.id,
          to: user2.id,
        };
        const input2 = {
            from: user2.id,
            to: me.id,
          };
        
        const accepted = {
            accepted: true,
        }
        await TestClient.createFriendRequest(input1);
        try{
            await TestClient.updateFriendRequest({...input2, ...accepted});
        } catch(e) {
            expect(e.message).toContain('not found');
        }
    }); 

    it('should update friend throw error if the accepted is not boolean', async () => {
        expect.assertions(1); // Expect there to be an error
        const input1 = {
          from: me.id,
          to: user2.id,
        };
        
        const accepted = {
            accepted: 'true',
        }
        await TestClient.createFriendRequest(input1);
        try{
            await TestClient.updateFriendRequest({...input1, ...accepted});
        } catch(e) {
            expect(e.message).toContain('Boolean cannot represent a non boolean value');
        }
    }); 
  });

  describe('Query: getMyFriendRequstsFromMe', () => {
    beforeEach(setup);
    it('should return null since no friend request', async () => {
      const input = {
          from: user2.id,
          to: me.id,
        };
      await TestClient.createFriendRequest(input);
      const friendRequests = await TestClient.getFriendRequestsFromMe();
      expect(friendRequests.length).toEqual(0);
    });

    it('should return one friend request', async () => {
      const input = {
        from: me.id,
        to: user2.id,
      };
      await TestClient.createFriendRequest(input);
      const friendRequests = await TestClient.getFriendRequestsFromMe();

      expect(friendRequests.length).toEqual(1);
      expect(friendRequests[0].from).toEqual(me.id);
      expect(friendRequests[0].to).toEqual(user2.id);
      expect(friendRequests[0].accepted).toBeNull;
      expect(friendRequests[0].requested).toBeDefined();
    });

    it('should return two friend request', async () => {
      const input1 = {
        from: me.id,
        to: user2.id,
      };

      const input2 = {
        from: me.id,
        to: user3.id,
      };

      const input3 = {
        from: user4.id,
        to: user3.id,
      };

      await TestClient.createFriendRequest(input1);
      await TestClient.createFriendRequest(input2);
      await TestClient.createFriendRequest(input3);
      const friendRequests : FriendRequests[] = await TestClient.getFriendRequestsFromMe();

      expect(friendRequests.length).toEqual(2);

      expect(friendRequests[0].from).toEqual(me.id);
      expect(friendRequests[0].accepted).toBeNull;
      expect(friendRequests[0].requested).toBeDefined();

      expect(friendRequests[1].from).toEqual(me.id);
      expect(friendRequests[1].accepted).toBeNull;
      expect(friendRequests[1].requested).toBeDefined();

      // the sequence returned is random
      expect(friendRequests[0].to + friendRequests[1].to).toContain( user2.id);
      expect(friendRequests[0].to + friendRequests[1].to).toContain( user3.id);
    });
  });

  describe('Query: getMyFriendRequstsToMe', () => {
    beforeEach(setup);
    it('should return null since no friend request', async () => {
      const input = {
          from: me.id,
          to: user2.id,
        };
      await TestClient.createFriendRequest(input);
      const friendRequests = await TestClient.getFriendRequestsToMe();
      expect(friendRequests.length).toEqual(0);
    });

    it('should return one friend request', async () => {
      const input = {
        from: user2.id,
        to: me.id,
      };
      await TestClient.createFriendRequest(input);
      const friends = await TestClient.getFriendRequestsToMe();

      expect(friends.length).toEqual(1);
      expect(friends[0].from).toEqual(user2.id);
      expect(friends[0].to).toEqual(me.id);
      expect(friends[0].accepted).toBeNull;
      expect(friends[0].requested).toBeDefined();
    });

    it('should return two friend request', async () => {
      const input1 = {
        from: user2.id,
        to: me.id,
      };

      const input2 = {
        from: user3.id,
        to: me.id
      };

      const input3 = {
        from: user4.id,
        to: user3.id,
      };

      await TestClient.createFriendRequest(input1);
      await TestClient.createFriendRequest(input2);
      await TestClient.createFriendRequest(input3);
      const friendRequests : FriendRequests[] = await TestClient.getFriendRequestsToMe();

      expect(friendRequests.length).toEqual(2);

      expect(friendRequests[0].from).toEqual(user2.id);
      expect(friendRequests[0].to).toEqual(me.id);
      expect(friendRequests[0].accepted).toBeNull;
      expect(friendRequests[0].requested).toBeDefined();

      expect(friendRequests[1].from).toEqual(user3.id);
      expect(friendRequests[1].to).toEqual(me.id);
      expect(friendRequests[1].accepted).toBeNull;
      expect(friendRequests[1].requested).toBeDefined();
    });  
  });

  describe('Query: FriendRequsts', () => {
    beforeEach(setup);
    it('should return null since no friend request', async () => {
      const friendRequests = await TestClient.friendRequests();
      expect(friendRequests.length).toEqual(0);
    });

    it('should return one friend request', async () => {
      const input = {
        from: user2.id,
        to: me.id,
      };
      await TestClient.createFriendRequest(input);
      const friends = await TestClient.friendRequests();

      expect(friends.length).toEqual(1);
      expect(friends[0].from).toEqual(user2.id);
      expect(friends[0].to).toEqual(me.id);
      expect(friends[0].accepted).toBeNull;
      expect(friends[0].requested).toBeDefined();
    });

    it('should return three friend request', async () => {
      const input1 = {
        from: me.id,
        to: user2.id,
      };

      const input2 = {
        from: user2.id,
        to: user3.id
      };

      const input3 = {
        from: user3.id,
        to: me.id,
      };

      await TestClient.createFriendRequest(input1);
      await TestClient.createFriendRequest(input2);
      await TestClient.createFriendRequest(input3);

      const friendRequests : FriendRequests[] = await TestClient.friendRequests();

      expect(friendRequests.length).toEqual(3);
      
      expect(friendRequests[0].from).toEqual(me.id);
      expect(friendRequests[0].to).toEqual(user2.id);
      expect(friendRequests[0].accepted).toBeNull;
      expect(friendRequests[0].requested).toBeDefined();

      expect(friendRequests[1].from).toEqual(user2.id);
      expect(friendRequests[1].to).toEqual(user3.id);
      expect(friendRequests[2].accepted).toBeNull;
      expect(friendRequests[2].requested).toBeDefined();

      expect(friendRequests[2].from).toEqual(user3.id);
      expect(friendRequests[2].to).toEqual(me.id);
      expect(friendRequests[2].accepted).toBeNull;
      expect(friendRequests[2].requested).toBeDefined();      
    });  
  });
});
