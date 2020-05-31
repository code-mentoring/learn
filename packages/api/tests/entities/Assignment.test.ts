import { TestClient } from '../utils/TestClient';
import { PathInput } from '../../types';
import { ModuleType } from '../../src/Module/Module.entity';
import * as random from '../../src/Database/seeders/random';

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

export const assignment1 = "";

export const moduleInput = {
  name: 'module name',
  icon: 'icon',
  type: ModuleType.lesson,
};

export const pathInput: PathInput = {
  name: 'Path name',
  icon: 'icon',
  description: 'Description text'
};

let moduleId: string;
let path: Path;
const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();

  path = await TestClient.createPath(pathInput);

  const { id: modId } = await TestClient.createModule({ ...moduleInput, pathId: path.id });

  assignment1 = random.assignmentInput(modId);
};

describe('Assignment entity', () => {

  describe('Mutation: createAssignment', () => {
    beforeEach(setup);

    it('should create an assignment successfully', async () => {

      const assignment = await TestClient.createAssignment(assignment1);

      expect(assignment.id).toBeDefined();
      expect(assignment).toMatchObject(assignment1);
    });

    it('should throw error if assignment already exist', async () => {

        try {
            const assignment = await TestClient.createAssignment(assignment1);
        } catch(e) {
            expect(e.message).toMatch(/unique constraint/i);
        }
    });
  });

  describe('Query: getAssignments', () => {
      beforeEach(setup);

      it('should return the existing assignment', async () => {

           await TestClient.createAssignment(assignment1);
           const assignments = await TestClient.getAssignments(path.id);

           expect(assignments).toBeArrayOfSize(1);
           expect(assignments[0]).toMatchObject(assignment1);

      });
  });

  describe('Mutation: updateAssignment', () => {
      beforeEach(setup);

      it('should update the existing assignment', async () => {

          const startAssignment = await TestClient.createAssignment(assignment1);
          const update = {
          id: startAssignment.id,
          description: 'New'
          };

          const result = await TestClient.updateAssignment(update);

          expect(result.description).toEqual(update.description);
          expect(result.id).toEqual(update.id);
      });
  });

  describe('Mutation: deleteAssignment', () => {
      beforeEach(setup);

      it('should delete the existing assignment', async () => {

          await TestClient.createAssignment(assignment1);
          const assignmentArray1 = await TestClient.getAssignments();
          await TestClient.deleteAssignment(assignmentArray1.id);
          const assignmentArray2 = await TestClient.getAssignments();

          expect(assignmentArray1).toBeArrayOfSize(1);
          expect(assignmentArray2).toBeArrayOfSize(0);
      });

//       it('should delete a module successfully', async () => {
//             const module = await TestClient.createModule({
//               ...moduleInput,
//               pathId: path.id,
//             });
//             await TestClient.deleteModule(module.id);
//             const modules = await TestClient.modules();
//             expect(modules.length).toBe(0);
//
//           });
  });
});