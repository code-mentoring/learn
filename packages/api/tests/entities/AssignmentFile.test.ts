import * as random from '../../src/Database/seeders/random';
import { TestClient } from '../utils/TestClient';

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

let assignmentId: string;
const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();

  const { id } = await TestClient.createPath();
  const { id: moduleId } = await TestClient.createModule(random.moduleInput('name', id));
  const { id: assgnmtId } = await TestClient.createAssignment(random.assignmentInput(moduleId));
  assignmentId = assgnmtId;
};

describe('AssignmentFile entity', () => {

  describe('Mutation: createAssignmentFile', () => {
    beforeEach(setup);

    it('should create an assignment file successfully', async () => {
      expect.assertions(1);

      const assignmentFileInput = random.assignmentFileInput(assignmentId);
      const assignmentFile = await TestClient.createAssignmentFile(assignmentFileInput);

      expect(assignmentFile).toMatchObject(assignmentFileInput);

    });

    it('should throw error if assignment file already exist', async () => {

          try {
            const assignmentFileInput = random.assignmentFileInput(assignmentId);
            const assignmentFile = await TestClient.createAssignmentFile(assignmentFileInput);
          } catch (e) {
            expect(e.message).toMatch(/unique constraint/i);
          }
    });
  });

  describe('Query: getAssignmentFiles', () => {
      beforeEach(setup);

      it('should return the existing assignment file', async () => {

        const assignmentFileInput = random.assignmentFileInput(assignmentId);
        const assignmentFile = await TestClient.createAssignmentFile(assignmentFileInput);

        //debugging
        console.log(assignmentFile)

        const getAssignmentFile = await TestClient.getAssignmentFiles();

        expect(getAssignmentFile).toBeArrayOfSize(1);
        expect(getAssignmentFile[0]).toMatchObject(assignmentFileInput);
      });
  });

  describe('Mutation: updateAssignmentFile', () => {
      beforeEach(setup);

      it('should update the existing assignment file', async () => {

        const assignmentFileInput = random.assignmentFileInput(assignmentId);
        const { id } = await TestClient.createAssignmentFile(assignmentFileInput);

        const update = {
          id,
          name: 'New',
          type: 'New'
        };

        const result = await TestClient.updateAssignmentFile(update);

        expect(result.name).toEqual(update.name);
        expect(result.type).toEqual(update.type);
        expect(result.id).toEqual(update.id);
      });
    });

    describe('Mutation: deleteAssignmentFile', () => {
        beforeEach(setup);

        it('should delete the existing assignment file', async () => {

          const assignmentFileInput = random.assignmentFileInput(assignmentId);
          const assignmentFile = await TestClient.createAssignmentFile(assignmentFileInput);
          await TestClient.deleteAssignmentFile(assignmentFile.id);
          const assignmentFiles = await TestClient.getAssignmentFiles();

          expect(assignmentFiles).toBeArrayOfSize(0);
      });
    });
});
