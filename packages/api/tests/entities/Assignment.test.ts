import { TestClient } from '../utils/TestClient';
import { CreateAssignmentInput } from '../../types';
import * as random from '../../src/Database/seeders/random';

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

let moduleId: string;
let assignmentInput: CreateAssignmentInput;
const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();

  const path = await TestClient.createPath(random.pathInput());
  const { id } = await TestClient.createModule(random.moduleInput('module name', path.id));
  moduleId = id;
  assignmentInput = random.assignmentInput(moduleId);

};

describe('Assignment entity', () => {

  describe('Mutation: createAssignment', () => {
    beforeEach(setup);

    it('should create an assignment successfully', async () => {

      const assignment = await TestClient.createAssignment(assignmentInput);

      expect(assignment.id).toBeDefined();
      expect(assignment).toMatchObject(assignmentInput);
    });

    it('should throw error if assignment already exist', async () => {

      try {
        await TestClient.createAssignment(random.assignmentInput(moduleId));
      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });

  describe('Query: getAssignments', () => {
    beforeEach(setup);

    it('should return the existing assignment', async () => {

      await TestClient.createAssignment(assignmentInput);
      const assignments = await TestClient.getAssignments();

      expect(assignments).toBeArrayOfSize(1);
      expect(assignments[0]).toMatchObject(assignmentInput);

    });
  });

  describe('Mutation: updateAssignment', () => {
    beforeEach(setup);

    it('should update the existing assignment', async () => {

      const { id } = await TestClient.createAssignment(assignmentInput);
      const update = {
        id,
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

      const assignment = await TestClient.createAssignment(assignmentInput);
      await TestClient.deleteAssignment(assignment.id);
      const assignments = await TestClient.getAssignments();

      expect(assignments).toBeArrayOfSize(0);
    });
  });
});
