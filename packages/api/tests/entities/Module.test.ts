import { ModuleType } from '../../src/Module/Module.entity';
import { TestClient } from '../utils/TestClient';

export const moduleInput = {
  name: 'module name',
  icon: 'icon',
  type: ModuleType.lesson
};

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

describe('Module entity', () => {

  describe('Mutation: Join Module', () => {
    beforeEach(async () => {
      await setup();
    });

    it('should join a module successfully', async () => {
      expect.assertions(1);

      const [module] = Object.keys(TestClient.cms.modules);

      await TestClient.createUser();
      const res = await TestClient.joinModule(module);
      await expect(res).toBe(true);
    });

    it('should not allow a user to join a module more than once', async () => {
      expect.assertions(1);

      const [module] = Object.keys(TestClient.cms.modules);

      await TestClient.joinModule(module);

      try {
        await TestClient.joinModule(module);
      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });
});
