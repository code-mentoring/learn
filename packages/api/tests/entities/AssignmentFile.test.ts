import { AssignmentFileInput } from '../../types';
import { TestClient } from '../utils/TestClient';

const assignmentFileInput: AssignmentFileInput = {
  name: 'Assignment file name',
  type: 'type',
  content: 'content'
};

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
};

describe('AssignmentFile entity', () => {

  describe('Mutation: createAssignmentFile', () => {
    beforeEach(setup);

    it('should create an assignment file successfully', async () => {
      expect.assertions(4);

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
