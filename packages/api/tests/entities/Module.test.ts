import { Path } from '../../types';
import { TestClient } from '../utils/TestClient';
import { pathInput, characterInput } from './Path.test';
import { ModuleType } from '../../src/Module/Module.entity';

export const moduleInput = {
  name: 'module name',
  icon: 'icon',
  type: ModuleType.lesson
};


beforeAll(async () => { await TestClient.start(); });
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
      path = await TestClient.createPath(pathInput, characterInput);
    });

    it('should create a module successfully', async () => {
      expect.assertions(5);

      const module = await TestClient.createModule({ ...moduleInput, pathId: path.id });

      expect(module.id).toBeDefined();
      expect(module.name).toEqual(moduleInput.name);
      expect(module.icon).toEqual(moduleInput.icon);
      expect(module.type).toEqual(moduleInput.type);

      const moduleWithPrevious = await TestClient.createModule({
        ...moduleInput,
        name: 'moduleWithPrevious name',
        pathId: path.id,
        previousId: module.id
      });

      expect(moduleWithPrevious.previousId).toBeDefined();

    });

    it('should throw error if module name exists', async () => {
      expect.assertions(1);
      try {
        const [module1, module2] = Array(2).fill(undefined).map(() => ({
          ...moduleInput,
          pathId: path.id
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
      path = await TestClient.createPath(pathInput, characterInput);
    });

    it('should update a module successfully', async () => {
      expect.assertions(6);
      const modulePrev = await TestClient.createModule({ ...moduleInput, name: 'previous', pathId: path.id });
      const module = await TestClient.createModule({ ...moduleInput, pathId: path.id });
      const path2 = await TestClient.createPath({ ...pathInput, name: 'path 2' }, {name: 'name 2', displayName: 'display name 2'});
      const update = {
        id: module.id,
        name: 'New name',
        icon: 'new icon',
        type: ModuleType.assignment,
        previousId: modulePrev.id,
        pathId: path2.id
      };
      const updated = await TestClient.updateModule(update);

      expect(updated.id).toBeDefined();
      expect(updated.name).toEqual(update.name);
      expect(updated.icon).toEqual(update.icon);
      expect(updated.type).toEqual(update.type);
      expect(updated.pathId).toEqual(path2.id);
      expect(updated.previousId).toEqual(modulePrev.id);

    });
  });

  describe('Mutation: deleteModule', () => {
    beforeEach(async () => {
      await setup();
      path = await TestClient.createPath(pathInput, characterInput);
    });

    it('should delete a module successfully', async () => {
      expect.assertions(1);
      const module = await TestClient.createModule({ ...moduleInput, pathId: path.id });
      await TestClient.deleteModule(module.id);
      const modules = await TestClient.modules();
      expect(modules.length).toBe(0);

    });
  });
});
