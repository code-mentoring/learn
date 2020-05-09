import { Path } from '../../types';
import { TestClient } from '../utils/TestClient';
import { pathInput } from './Path.test';
import { UpdateModuleInput, ModuleType } from '../../src/Module/Module.entity';

export const moduleInput = {
  name: 'module name',
  icon: 'icon',
  type: ModuleType.lesson
};


beforeAll(async () => {
  await TestClient.start();
});
afterAll(async () => { await TestClient.stop(); });

const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
};

describe('Module entity', () => {
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

  describe('Mutation: updateModule', () => {
    beforeEach(async () => {
      await setup();
      path = await TestClient.createPath(pathInput);
    });

    it('should update a module successfully', async () => {
      expect.assertions(6);
      const modulePrev = await TestClient.createModule({ ...moduleInput, name: 'previous', path: path.id });
      const module = await TestClient.createModule({ ...moduleInput, path: path.id });
      const path2 = await TestClient.createPath({ ...pathInput, name: 'path 2' });
      const update: UpdateModuleInput = {
        id: module.id,
        name: 'New name',
        icon: 'new icon',
        type: ModuleType.assignment,
        previous: modulePrev.id,
        path: path2.id
      };
      const updated = await TestClient.updateModule(update);

      expect(updated.id).toBeDefined();
      expect(updated.name).toEqual(update.name);
      expect(updated.icon).toEqual(update.icon);
      expect(updated.type).toEqual(update.type);
      expect(updated.path.id).toEqual(path2.id);
      expect(updated.previous.id).toEqual(modulePrev.id);

    });
  });

  describe('Mutation: deleteModule', () => {
    beforeEach(async () => {
      await setup();
      path = await TestClient.createPath(pathInput);
    });

    it('should delete a module successfully', async () => {
      expect.assertions(1);
      const module = await TestClient.createModule({ ...moduleInput, path: path.id });
      const deleted = await TestClient.deleteModule(module.id);
      expect(deleted).toBe(true);

    });
  });
});
