import * as random from '../../src/Database/seeders/random';
import { TestClient } from '../utils/TestClient';
import { UserPreferencesInput } from '../../src/UserPreferences/UserPreferences.entity';


describe('UserPreferences entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  const setup = async () => {
    await TestClient.resetDatabase();
    await TestClient.workflowSignup();
  };

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
