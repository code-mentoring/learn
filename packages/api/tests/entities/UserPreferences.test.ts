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

  describe('', () => {
    beforeEach(setup);
    it('', () => {});
  });

});
