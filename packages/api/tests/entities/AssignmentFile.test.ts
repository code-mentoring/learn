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
  });
});
