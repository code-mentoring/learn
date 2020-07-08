import { TestClient } from '../utils/TestClient';

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

const setup = async () => {
  await TestClient.resetDatabase(true);
  await TestClient.workflowSignup();
};

describe('Path entity', () => {

  describe('Mutation: Join Path', () => {
    beforeEach(setup);

    it('join a path successfully', async () => {
      const res = await TestClient.joinPath('html');
      await expect(res).toBe(true);
    });

    it('should not allow to join a path twice', async () => {
      expect.assertions(1);
      await TestClient.joinPath('html');

      try {
        // Join same path again
        await TestClient.joinPath('html');
      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });
});
