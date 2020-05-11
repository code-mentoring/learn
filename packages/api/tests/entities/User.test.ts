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
    it('should successfully return a list of user(s)', async () => {
      expect.assertions(8);

      const newUser1 = {
        firstName: 'Rick',
        lastName: 'Summerset',
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

      //return a list of users with matching last names
      const matchingLastNames = await TestClient.search('Sanchez');

      //assertions
      expect(matchingLastNames).toBeArrayOfSize(2);
      expect(matchingLastNames[0].lastName).toEqual(newUser2.lastName);
      expect(matchingLastNames[1].lastName).toEqual(newUser3.lastName);

      //return a list of users with matching first names
      const matchingFirstNames = await TestClient.search('Rick');

      //assertions
      expect(matchingFirstNames).toBeArrayOfSize(2);
      expect(matchingFirstNames[0].firstName).toEqual(newUser1.firstName);
      expect(matchingFirstNames[1].firstName).toEqual(newUser3.firstName);

      const newUsers = await TestClient.search('Lee');

      //assert undefined
      expect(newUsers).toBeEmpty();
      expect(newUsers[0]).toBeUndefined();
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
