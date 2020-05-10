import { TestClient } from '../utils/TestClient';
import { UserPreferencesInput } from '../../src/UserPreferences/UserPreferences.entity';

describe('User entity', () => {
  beforeAll(async () => {
    await TestClient.start();
  });
  afterAll(async () => {
    await TestClient.stop();
  });

  const setup = async () => {
    await TestClient.resetDatabase();
    await TestClient.workflowSignup();
  };

  describe('Mutation: createUser', () => {
    it('should create a user successfully', async () => {
      const input = {
        email: 'fake@user.com',
        firstName: 'Bob',
        lastName: 'Brown',
        password: 'secret',
      };

      const user = await TestClient.createUser(input);

      expect(user.id).toBeDefined();
      expect(user.email).toEqual(input.email);
      expect(user.firstName).toEqual(input.firstName);
      expect(user.lastName).toEqual(input.lastName);
      expect(user.profileImage).toBeString();
      expect(user.userPreferences).toBeNull();
      // @ts-ignore Access invalid property to test
      expect(user.password).toBeUndefined();
      expect(user.createdAt).toBeDefined();
    });

    it('should throw error if email missing', async () => {
      expect.assertions(1); // Expect there to be an error
      try {
        const input = {
          firstName: 'Bob',
          lastName: 'Brown',
          password: 'secret',
        };
        // @ts-ignore Deliberately missing email to test error
        await TestClient.createUser(input);
      } catch (e) {
        expect(e.message).toContain(
          'Field "email" of required type "String!" was not provided'
        );
      }
    });
  });

  describe('Query: me', () => {
    beforeEach(setup);
    it('should return a user when logged in', async () => {
      expect.assertions(6);
      const user = await TestClient.me();
      expect(user.id).toBeDefined();
      expect(user.email).toBeDefined();
      expect(user.firstName).toBeDefined();
      expect(user.lastName).toBeDefined();
      expect(user.userPreferences).toBeNull();
      expect(user.createdAt).toBeDefined();
    });
  });

  describe('Query: search', () => {
    beforeEach(setup);
    it('should return user by firstname', async () => {
      expect.assertions(4);

      const newUser = {
        firstName: 'Sam',
        lastName: 'Johnson',
        email: 'samjohnson@gmail.com',
        password: 'secret1',
      };

      //insert newUser
      await TestClient.createUser(newUser);

      //query newUser
      const users = await TestClient.search(newUser.firstName);

      //assertions
      expect(users).toBeArrayOfSize(1);
      expect(users[0].firstName).toEqual(newUser.firstName);
      expect(users[0].lastName).toEqual(newUser.lastName);
      expect(users[0].email).toEqual(newUser.email);
    });

    it('should return user by lastname', async () => {
      expect.assertions(4);

      const newUser = {
        firstName: 'Rick',
        lastName: 'Sanchez',
        email: 'RickSanchez@gmail.com',
        password: 'secret2',
      };

      //insert newUser
      await TestClient.createUser(newUser);

      //query newUser
      const users = await TestClient.search(newUser.lastName);

      //assertions
      expect(users).toBeArrayOfSize(1);
      expect(users[0].firstName).toEqual(newUser.firstName);
      expect(users[0].lastName).toEqual(newUser.lastName);
      expect(users[0].email).toEqual(newUser.email);
    });

    it('should return user by email', async () => {
      expect.assertions(4);

      const newUser = {
        firstName: 'Morty',
        lastName: 'Smith',
        email: 'MortySmith@gmail.com',
        password: 'secret3',
      };

      //insert newUser
      await TestClient.createUser(newUser);

      //query newUser
      const users = await TestClient.search(newUser.email);

      //assertions
      expect(users).toBeArrayOfSize(1);
      expect(users[0].firstName).toEqual(newUser.firstName);
      expect(users[0].lastName).toEqual(newUser.lastName);
      expect(users[0].email).toEqual(newUser.email);
    });

    it('should return an array of users with matching firstnames', async () => {
      expect.assertions(3);

      const newUser1 = {
        firstName: 'Rick',
        lastName: 'Sanchez',
        email: 'rickSanchez@gmail.com',
        password: 'secret1',
      };

      const newUser2 = {
        firstName: 'Morty',
        lastName: 'Smith',
        email: 'mortySmith@gmail.com',
        password: 'secret2',
      };

      const newUser3 = {
        firstName: 'Rick',
        lastName: 'Summerset',
        email: 'rickSummerset@gmail.com',
        password: 'secret3',
      };

      //insert newUsers
      await TestClient.createUser(newUser1);
      await TestClient.createUser(newUser2);
      await TestClient.createUser(newUser3);

      //query newUser
      const users = await TestClient.search('Rick');

      //assertions
      expect(users).toBeArrayOfSize(2);
      expect(users[0].firstName).toEqual(newUser1.firstName);
      expect(users[1].firstName).toEqual(newUser3.firstName);
    });

    it('should return an array of users with matching lastnames', async () => {
      expect.assertions(4);

      const newUser1 = {
        firstName: 'Kyle',
        lastName: 'Sanchez',
        email: 'rickSanchez@gmail.com',
        password: 'secret1',
      };

      const newUser2 = {
        firstName: 'Morty',
        lastName: 'Sanchez',
        email: 'mortySmith@gmail.com',
        password: 'secret2',
      };

      const newUser3 = {
        firstName: 'Rick',
        lastName: 'Sanchez',
        email: 'rickSummerset@gmail.com',
        password: 'secret3',
      };

      //insert newUsers
      await TestClient.createUser(newUser1);
      await TestClient.createUser(newUser2);
      await TestClient.createUser(newUser3);

      //query newUser
      const users = await TestClient.search('Sanchez');

      //assertions
      expect(users).toBeArrayOfSize(3);
      expect(users[0].lastName).toEqual(newUser1.lastName);
      expect(users[1].lastName).toEqual(newUser2.lastName);
      expect(users[2].lastName).toEqual(newUser3.lastName);
    });
  });

  describe('Mutation: updatePreferences', () => {
    const preferences: UserPreferencesInput = {
      why: 'why',
      codingAbility: 5,
      practiceGoal: 4,
    };
    beforeEach(setup);
    it('should update user preferences', async () => {
      expect.assertions(5);

      const userPreferences = await TestClient.updatePreferences(preferences);
      expect(userPreferences.id).toBeDefined();
      expect(userPreferences.why).toEqual(preferences.why);
      expect(userPreferences.practiceGoal).toEqual(preferences.practiceGoal);
      expect(userPreferences.codingAbility).toEqual(preferences.codingAbility);

      // Check that after updating preferences me returns user preferences filled
      const mePost = await TestClient.me();
      expect(mePost.userPreferences).not.toBeNull();
    });

    it('should validate before create/update preferences', async () => {
      expect.assertions(3);

      preferences.codingAbility = 11;
      preferences.practiceGoal = 6;
      try {
        await TestClient.updatePreferences(preferences);
      } catch (e) {
        expect(e.message).toContain('Unexpected error value:');
        expect(e.message).toContain(`, value: ${preferences.codingAbility}`);
        expect(e.message).toContain(`, value: ${preferences.practiceGoal}`);
      }
    });
  });
});
