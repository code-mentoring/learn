import { AssignmentInput } from '../../types';
import { TestClient } from '../utils/TestClient';

const assignmentInput: AssignmentInput = {
  description: 'Description of assignment'
};

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
};

describe('Assignment entity', () => {

  describe('Mutation: createAssignment', () => {
    beforeEach(setup);

    it('should create an assignment successfully', async () => {
      expect.assertions(2);

      const assignment = await TestClient.createAssignment(assignmentInput);

      expect(assignment.id).toBeDefined();
      expect(assignment.description).toEqual(assignmentInput.description);
      // Not sure if I somehow need to test reference to assignmentFile?
    });
  });
});
