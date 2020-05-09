import { Path } from '../../types';
import { TestClient } from '../utils/TestClient';
import { pathInput } from './Path.test';

export const moduleInput = {
  name: 'module name',
  icon: 'icon',
  type: 'lesson'
};


beforeAll(async () => {
  await TestClient.start();
});
afterAll(async () => { await TestClient.stop(); });

const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
};

describe.only('Module entity', () => {
  let path: Path;
  describe('Mutation: createModule', () => {
    beforeEach(async () => {
      await setup();
      path = await TestClient.createPath(pathInput);
    });

    it('should create a module successfully', async () => {
      expect.assertions(6);

      const module = await TestClient.createModule({ ...moduleInput, path: path.id });

      expect(module.id).toBeDefined();
      expect(module.name).toEqual(moduleInput.name);
      expect(module.icon).toEqual(moduleInput.icon);
      expect(module.type).toEqual(moduleInput.type);

      const moduleWithPrevious = await TestClient.createModule({
        ...moduleInput,
        name: 'moduleWithPrevious name',
        path: path.id,
        previous: module.id
      });

      expect(moduleWithPrevious.previous).toBeTruthy();
      expect(typeof moduleWithPrevious.previous).toBe('object');

    });

    it('should throw error if module name exists', async () => {
      expect.assertions(1);
      try {
        const [module1, module2] = Array(2).fill(undefined).map(() => ({
          ...moduleInput,
          path: path.id
        }));

        await TestClient.createModule(module1);
        await TestClient.createModule(module2);

      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });

});
