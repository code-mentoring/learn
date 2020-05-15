import { TestClient } from '../utils/TestClient';
import { randomPath, randomModule, randomAssignmentFile, randomAssignment } from '../../src/Database/seeders/random';

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

let assignmentId: string;
const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
  const { id } = await TestClient.createPath(randomPath(undefined, 'path name'));
  const { id: moduleId } = await TestClient.createModule(randomModule('name', id));
  const { id: assgnmtId } = await TestClient.createAssignment(randomAssignment(moduleId));
  assignmentId = assgnmtId;
};

describe('AssignmentFile entity', () => {

  describe('Mutation: createAssignmentFile', () => {
    beforeEach(setup);

    it('should create an assignment file successfully', async () => {
      expect.assertions(1);

      const assignmentFileInput = randomAssignmentFile(assignmentId);
      const assignmentFile = await TestClient.createAssignmentFile(assignmentFileInput);

      expect(assignmentFile).toMatchObject(assignmentFileInput);

    });
  });
});
