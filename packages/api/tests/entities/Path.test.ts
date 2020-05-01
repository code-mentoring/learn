import { PathInput } from '../../types';
import { TestClient } from '../utils/TestClient';

const pathInput: PathInput = {
  name: 'Path name',
  icon: 'icon',
  description: 'Description text'
};

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
};

describe('Path entity', () => {


  describe('Mutation: createPath', () => {
    beforeEach(setup);

    it('should create a path successfully', async () => {
      expect.assertions(5);

      const path = await TestClient.createPath(pathInput);

      expect(path.id).toBeDefined();
      expect(path.name).toEqual(pathInput.name);
      expect(path.icon).toEqual(pathInput.icon);
      expect(path.description).toEqual(pathInput.description);
      expect(path.createdAt).toBeDefined();
    });

    it('should throw error if path name exists', async () => {
      expect.assertions(1);
      try {
        const [path1, path2] = Array(2).fill(undefined).map(() => ({
          name: 'Path name',
          icon: 'icon',
          description: 'Description text'
        }));

        await TestClient.createPath(path1);
        await TestClient.createPath(path2);

      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });

  describe('Mutation: Join Path', () => {
    beforeEach(setup);

    it('join a path successfully', async () => {
      await TestClient.createPath(pathInput);
      // Find path
      const { id } = await TestClient.getPathByName(pathInput.name);
      // Join path
      const res = await TestClient.joinPath(id);
      await expect(res).toBe(true);
    });

    it('should not allow to join a path twice', async () => {
      expect.assertions(1);
      await TestClient.createPath(pathInput);
      // Find path
      const { id } = await TestClient.getPathByName(pathInput.name);
      // Join path
      await TestClient.joinPath(id);

      try {
        // Join same path again
        await TestClient.joinPath(id);
      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });

});
