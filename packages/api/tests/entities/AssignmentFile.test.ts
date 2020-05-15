import { TestClient } from '../utils/TestClient';
import { randomPath, randomModule, randomAssignmentFile, randomAssignment } from '../../src/Database/seeders/random';

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

let assignmentId: string;
let authorId: string;
const setup = async () => {
  await TestClient.resetDatabase();
  const { user } = await TestClient.workflowSignup();
  const { id } = await TestClient.createPath(randomPath(undefined, 'path name'));
  const { id: moduleId } = await TestClient.createModule(randomModule('name', id));
  const { id: assgnmtId } = await TestClient.createAssignment(randomAssignment(moduleId));
  assignmentId = assgnmtId;
  authorId = user.id;
};

describe('AssignmentFile entity', () => {

  describe('Mutation: createAssignmentFile', () => {
    beforeEach(setup);

    it('should create an assignment file successfully', async () => {
      expect.assertions(4);

      const assignmentFileInput = randomAssignmentFile(authorId, assignmentId);

      const assignmentFile = await TestClient.createAssignmentFile(assignmentFileInput);

      expect(assignmentFile.id).toBeDefined();
      expect(assignmentFile.name).toEqual(assignmentFileInput.name);
      expect(assignmentFile.type).toEqual(assignmentFileInput.type);
      expect(assignmentFile.content).toEqual(assignmentFileInput.content);

      // TODO: I'm unsure if I need to add more tests, and I also don't know
      // how to test the reference to module and user...
    });
  });
});
