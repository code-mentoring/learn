import { TestClient } from '../utils/TestClient';
import { UserPreferencesInput } from '../../src/UserPreferences/UserPreferences.entity';


describe('User entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  describe('Mutation: createUser', () => {
    it('should create a user successfully', async () => {
      const input = {
        email: 'fake@user.com',
        firstName: 'Bob',
        lastName: 'Brown',
        password: 'secret'
      };

      const user = await TestClient.createUser(input);

      expect(user.id).toBeDefined();
      expect(user.email).toEqual(input.email);
      expect(user.firstName).toEqual(input.firstName);
      expect(user.lastName).toEqual(input.lastName);
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
          password: 'secret'
        };
        // @ts-ignore Deliberately missing email to test error
        await TestClient.createUser(input);
      } catch (e) {
        expect(e.message).toContain('Field "email" of required type "String!" was not provided');
      }
    });
  });

  describe('Query: me', () => {
    beforeEach(() => TestClient.setup());
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

  describe('Mutation: updatePreferences', () => {
    beforeEach(() => TestClient.setup());
    it('should update user preferences', async () => {
      expect.assertions(5);
      const input: UserPreferencesInput = {
        why: 'why',
        codingAbility: 5,
        practiceGoal: 4
      };
      const userPreferences = await TestClient.updatePreferences(input);
      expect(userPreferences.id).toBeDefined();
      expect(userPreferences.why).toEqual(input.why);
      expect(userPreferences.practiceGoal).toEqual(input.practiceGoal);
      expect(userPreferences.codingAbility).toEqual(input.codingAbility);

      // Check that after updating preferences me returns user preferences filled
      const mePost = await TestClient.me();
      expect(mePost.userPreferences).not.toBeNull();
    });
  });

});
