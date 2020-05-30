import * as random from '../../src/Database/seeders/random';
import { TestClient } from '../utils/TestClient';
import { UserPreferencesInput } from '../../src/UserPreferences/UserPreferences.entity';

describe('User entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  const setup = async () => {
    await TestClient.resetDatabase();
    await TestClient.workflowSignup();
  };

  describe('Mutation: createUser', () => {
    it('should create a user successfully', async () => {
      const input = random.userInput();
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

    ['firstName', 'lastName', 'email', 'password'].forEach(key => {
      const input = random.userInput();

      it(`should throw error if ${key} is missing`, async () => {
        expect.assertions(1);
        try {
          if (key === 'firstName') {
            delete input.firstName;
          } else if (key === 'lastName') {
            delete input.lastName;
          } else if (key === 'email') {
            delete input.email;
          } else if (key === 'password') {
            delete input.password;
          }

          await TestClient.createUser(input);
        } catch (error) {
          expect(error.message).toContain(`Field "${key}" of required type "String!" was not provided`);
        }
      });
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

    ['firstName', 'lastName', 'email'].forEach(key => {
      it(`should return user by ${key}`, async () => {
        expect.assertions(4);
        const newUser = await TestClient.createUser();
        const users = await TestClient.search(newUser[key]);

        expect(users).toBeArrayOfSize(1);
        expect(users[0].firstName).toEqual(newUser.firstName);
        expect(users[0].lastName).toEqual(newUser.lastName);
        expect(users[0].email).toEqual(newUser.email);
      });
    });
  });

  describe('Query: users', () => {
    beforeEach(setup);
    it('should return all users', async () => {
      expect.assertions(1);
      await TestClient.createUser(random.userInput());
      await TestClient.createUser(random.userInput());
      const users = await TestClient.users();

      // should return 3 for the above two and the already logged-in user
      expect(users).toBeArrayOfSize(3);
    });
  });


  describe('Mutation: updatePreferences', () => {
    const preferences: UserPreferencesInput = {
      why: 'why',
      codingAbility: 5,
      practiceGoal: 4
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

    ['firstName', 'lastName'].forEach(key => {
      it(`should return users by ${key}`, async () => {
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
});
