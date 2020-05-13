import { TestClient } from '../utils/TestClient';
import { Friends, User } from '../../types';

  let me: User;
  let user2: User;
  let user3: User;
  let user4: User;

  const setup = async () => {
    await TestClient.resetDatabase();
    const userInput = TestClient.seeder.randomUserInput();
    me = await TestClient.createUser(userInput);
    await TestClient.login(me.email, userInput.password);

    user2 = await TestClient.createUser(TestClient.seeder.randomUserInput());
    user3 = await TestClient.createUser(TestClient.seeder.randomUserInput());
    user4 = await TestClient.createUser(TestClient.seeder.randomUserInput());  
  };

  describe('Friends entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  describe('Mutation: addFriend', () => {
    beforeEach(setup);

    it('should create friend successfully', async () => {
      const input = {
        user1Id: me.id,
        user2Id: user2.id,
      };

      const friend = await TestClient.addFriend(input);
      
      //swap the value if user1Id > user2Id
      (input.user1Id > input.user2Id) && ( [ input.user1Id, input.user2Id ] = [ input.user2Id, input.user1Id ] );
      expect(friend.id).toBeDefined();
      expect(friend.user1Id).toEqual(input.user1Id);
      expect(friend.user2Id).toEqual(input.user2Id);
      expect(friend.since).toBeDefined();
    });

    it('should throw error if user1 and user2 already exist', async () => {
      expect.assertions(1); // Expect there to be an error

      const input = {
        user1Id: me.id,
        user2Id: user2.id,
      };

      await TestClient.addFriend(input);

      try {
          await TestClient.addFriend(input);
        } catch (e) {
          expect(e.message).toContain('UNIQUE constraint');
        }
    });

    it('should throw error when add B and A if A and B are already exist', async () => {
      expect.assertions(1); // Expect there to be an error

      const input1 = {
        user1Id: me.id,
        user2Id: user2.id,
      };

      await TestClient.addFriend(input1);

      const input2 = {
        user1Id: user2.id,
        user2Id: me.id,
      };

      try {
          await TestClient.addFriend(input2);
        } catch (e) {
          expect(e.message).toContain('UNIQUE constraint');
        }
    });    

    it('should throw error if user1 === user2', async () => {
      expect.assertions(1); // Expect there to be an error

      const input = {
        user1Id: me.id,
        user2Id: me.id,
      };
    
      try {
          await TestClient.addFriend(input);
        } catch (e) {
          expect(e.message).toContain('CHECK constraint failed');
        }
    });
  
    it('should throw error if user1Id missing', async () => {
      expect.assertions(1); // Expect there to be an error
      try {
        const input = {
          user2Id: user2.id,
        };
        // @ts-ignore Deliberately missing user1Id to test error
        await TestClient.addFriend(input);
      } catch (e) {
        expect(e.message).toContain('Field "user1Id" of required type "String!" was not provided');
      }
    });

    it('should throw error if user2Id missing', async () => {
      expect.assertions(1); // Expect there to be an error
      try {
        const input = {
          user1Id: user2.id,
        };
        // @ts-ignore Deliberately missing user2Id to test error
        await TestClient.addFriend(input);
      } catch (e) {
        expect(e.message).toContain('Field "user2Id" of required type "String!" was not provided');
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
        user1Id: me.id,
        user2Id: user2.id,
      };
      const addFriend = await TestClient.addFriend(input);
      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(1);
      expect(friends[0].id).toEqual(addFriend.id);
      expect(friends[0].since).toEqual(addFriend.since);
      expect(friends[0].userFriend.id).toEqual(user2.id);
      expect(friends[0].userFriend.firstName).toEqual(user2.firstName);
      expect(friends[0].userFriend.lastName).toEqual(user2.lastName);
      expect(friends[0].userFriend.email).toEqual(user2.email);
    });

    it('should return two friend', async () => {
      const input1 = {
        user1Id: me.id,
        user2Id: user2.id,
      };

      const input2 = {
        user1Id: user3.id,
        user2Id: me.id,
      };

      const addFriend1 = await TestClient.addFriend(input1);
      const addFriend2 = await TestClient.addFriend(input2);
      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(2);

      expect(friends[0].id).toEqual(addFriend1.id);
      expect(friends[0].since).toEqual(addFriend1.since);
      expect(friends[0].userFriend.id).toEqual(user2.id);
      expect(friends[0].userFriend.firstName).toEqual(user2.firstName);
      expect(friends[0].userFriend.lastName).toEqual(user2.lastName);
      expect(friends[0].userFriend.email).toEqual(user2.email);

      expect(friends[1].id).toEqual(addFriend2.id);
      expect(friends[1].since).toEqual(addFriend2.since);
      expect(friends[1].userFriend.id).toEqual(user3.id);
      expect(friends[1].userFriend.firstName).toEqual(user3.firstName);
      expect(friends[1].userFriend.lastName).toEqual(user3.lastName);
      expect(friends[1].userFriend.email).toEqual(user3.email);
    });

    it('should return two friend', async () => {
      const input1 = {
          user1Id: me.id,
          user2Id: user2.id,
        };
        
      const input2 = {
          user1Id: user3.id,
          user2Id: me.id,
        };
    
      const input3 = {
        user1Id: user4.id,
        user2Id: user3.id,
      };

      const addFriend1 = await TestClient.addFriend(input1);
      const addFriend2 = await TestClient.addFriend(input2);
      const addFriend3 = await TestClient.addFriend(input3);

      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(2);

      expect(friends[0].id).toEqual(addFriend1.id);
      expect(friends[0].since).toEqual(addFriend1.since);
      expect(friends[0].userFriend.id).toEqual(user2.id);
      expect(friends[0].userFriend.firstName).toEqual(user2.firstName);
      expect(friends[0].userFriend.lastName).toEqual(user2.lastName);
      expect(friends[0].userFriend.email).toEqual(user2.email);

      expect(friends[1].id).toEqual(addFriend2.id);
      expect(friends[1].since).toEqual(addFriend2.since);
      expect(friends[1].userFriend.id).toEqual(user3.id);
      expect(friends[1].userFriend.firstName).toEqual(user3.firstName);
      expect(friends[1].userFriend.lastName).toEqual(user3.lastName);
      expect(friends[1].userFriend.email).toEqual(user3.email);
    });
  });

  describe('Mutation: deleteFriend', () => {
    beforeEach(setup);

    it('should delete success by user1 user2', async () => {
      const input = {
        user1Id: me.id,
        user2Id: user2.id,
      };
      await TestClient.addFriend(input);
      const query1 = await TestClient.getUserFriends(input.user1Id);


      const result = await TestClient.deleteFriend(input);
      const query2 = await TestClient.getUserFriends(input.user1Id);

      // since sqlite doesn't reture affected property as Postgres does, the result actually return false, alternatively to check the result by query.
      // expect(result).toEqual(true);
      expect(query1.length).toEqual(1);
      expect(query2.length).toEqual(0);
    });

    it('should delete success by user2 user1', async () => {
      const addInput = {
        user1Id: me.id,
        user2Id: user2.id,
      };

      const deleteInput = {
        user1Id: user2.id,
        user2Id: me.id,
      };

      await TestClient.addFriend(addInput);
      const query1 = await TestClient.getUserFriends(addInput.user1Id);

      const result = await TestClient.deleteFriend(deleteInput);
      const query2 = await TestClient.getUserFriends(addInput.user1Id);

      // since sqlite doesn't reture affected property as Postgres does, the result actually return false, alternatively to check the result by query.
      // expect(result).toEqual(true);
      expect(query1.length).toEqual(1);
      expect(query2.length).toEqual(0);
    });

    it('should throw error since the friend doest not exist', async () => {
      const input = {
        user1Id: me.id,
        user2Id: user2.id,
      };

      const result = await TestClient.deleteFriend(input);
      expect(result).toEqual(false);
    });
  });
});
