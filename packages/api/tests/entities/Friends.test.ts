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

      expect(friend.id).toBeDefined();
      expect(friend.user1Id).toEqual(input.user1Id);
      expect(friend.user2Id).toEqual(input.user2Id);
      expect(friend.since).toBeDefined();
    });

    it('should throw error due to duplicate user1&user2', async () => {
      const input = {
        user1Id: me.id,
        user2Id: user2.id,
      };
  
      const friend = await TestClient.addFriend(input);

      try {
          await TestClient.addFriend(input);
        } catch (e) {
          expect(e.message).toContain('UNIQUE constraint');
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
      await TestClient.addFriend(input);
      const friends = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(1);
      expect(friends[0].id).toEqual(user2.id);
      expect(friends[0].firstName).toEqual(user2.firstName);
      expect(friends[0].lastName).toEqual(user2.firstName);
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

      await TestClient.addFriend(input1);
      await TestClient.addFriend(input2);
      const friends : User[] = await TestClient.getUserFriends(me.id);

      expect(friends.length).toEqual(2);

      expect(friends[0].id).toEqual(user2.id);
      expect(friends[0].firstName).toEqual(user2.firstName);
      expect(friends[0].lastName).toEqual(user2.firstName);

      expect(friends[1].id).toEqual(user3.id);
      expect(friends[1].firstName).toEqual(user3.firstName);
      expect(friends[1].lastName).toEqual(user3.firstName);
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

      await TestClient.addFriend(input1);
      await TestClient.addFriend(input2);
      await TestClient.addFriend(input3);

      const friends : User[] = await TestClient.getMyFriends();

      expect(friends.length).toEqual(2);

      expect(friends[0].id).toEqual(user2.id);
      expect(friends[0].firstName).toEqual(user2.firstName);
      expect(friends[0].lastName).toEqual(user2.firstName);

      expect(friends[1].id).toEqual(user3.id);
      expect(friends[1].firstName).toEqual(user3.firstName);
      expect(friends[1].lastName).toEqual(user3.firstName);
    });
  });
});
