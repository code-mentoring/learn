import { TestClient } from '../utils/TestClient';
import { PathInput } from '../../types';

const pathInput: PathInput = {
  name: 'Path name',
  icon: 'icon',
  description: 'Description text'
};

describe('Path entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  beforeEach(async () => {
    await TestClient.resetDatabase();
    await TestClient.createUser({ firstName: 'Name', lastName: 'Lastname', email: 'test@test.com', password: 'test123' });
    const { accessToken } = await TestClient.login('test@test.com', 'test123');
    TestClient.token = accessToken;
  });
  afterAll(async () => { await TestClient.stop(); });

  describe('Mutation: createPath', () => {

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
        expect(e.message).toContain('duplicate key value violates unique constraint "Name"');
      }
    });
  });

  describe('Mutation: Join Path', () => {
    beforeEach(async () => {
      const path = await TestClient.createPath(pathInput);
      return path;
    });
    it('join a path successfully', async () => {
      expect.assertions(1);

      // Find path
      const { id } = await TestClient.getPathByName(pathInput.name);
      // Join path
      const res = await TestClient.joinPath(id);

      expect(res).toBe(true);

    });

    it('should not allow to join a path twice', async () => {
      expect.assertions(1);
      try {
        // Find path
        const { id } = await TestClient.getPathByName(pathInput.name);
        // Join path
        await TestClient.joinPath(id);
        // Join same path again
        await TestClient.joinPath(id);
      } catch (e) {
        expect(e.message).toContain('duplicate key value violates unique constraint');
      }
    });
  });

});
