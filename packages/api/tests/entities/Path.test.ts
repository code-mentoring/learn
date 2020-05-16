import { PathInput, CharacterCreateInput } from '../../types';
import { TestClient } from '../utils/TestClient';

export const pathInput: PathInput = {
  name: 'Path name',
  icon: 'icon',
  description: 'Description text'
};

export const characterInput: CharacterCreateInput = {
  name: 'Tom',
  displayName: 'TomTom'
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
      const path = await TestClient.createPath(pathInput, characterInput);

      expect(path.id).toBeDefined();
      expect(path.name).toEqual(pathInput.name);
      expect(path.icon).toEqual(pathInput.icon);
      expect(path.description).toEqual(pathInput.description);
      expect(path.createdAt).toBeDefined();
      expect(path.character.id).toBeDefined();
      expect(path.character.name).toEqual(characterInput.name);
      expect(path.character.displayName).toEqual(characterInput.displayName);
    });

    it('should throw error if path name exists', async () => {
      expect.assertions(1);
      try {
        const [path1, path2] = Array(2).fill(undefined).map(() => ({
          name: 'Path name',
          icon: 'icon',
          description: 'Description text'
        }));

        const characterInput2: CharacterInput = {
          name: 'Tom',
          displayName: 'JerryJerry'
        }

        await TestClient.createPath(path1, characterInput);
        await TestClient.createPath(path2, characterInput2);

      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });

    it('should throw error if character name exists', async () => {
      expect.assertions(1);
      try {
        const pathInput2: PathInput = {
          name: 'Path name 2',
          icon: 'icon 2',
          description: 'Description text 2'
        };

        await TestClient.createPath(pathInput, characterInput);
        await TestClient.createPath(pathInput2, characterInput);

      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });

  describe('Mutation: Join Path', () => {
    beforeEach(setup);

    it('join a path successfully', async () => {
      await TestClient.createPath(pathInput, characterInput);
      // Find path
      const { id } = await TestClient.getPathByName(pathInput.name);
      // Join path
      const res = await TestClient.joinPath(id);
      await expect(res).toBe(true);
    });

    it('should not allow to join a path twice', async () => {
      expect.assertions(1);
      await TestClient.createPath(pathInput, characterInput);
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
