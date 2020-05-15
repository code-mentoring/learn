import { TestClient } from '../utils/TestClient';
import { randomPath, randomModule, randomAssignment } from '../../src/Database/seeders/random';

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

let moduleId: string;
const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
  const { id } = await TestClient.createPath(randomPath(undefined, 'path name'));
  const { id: modId } = await TestClient.createModule(randomModule('name', id));
  moduleId = modId;
};

describe('Assignment entity', () => {

  describe('Mutation: createAssignment', () => {
    beforeEach(setup);

    it('should create an assignment successfully', async () => {
      expect.assertions(2);

      const assignmentInput = randomAssignment(moduleId);
      const assignment = await TestClient.createAssignment(assignmentInput);

      expect(assignment.id).toBeDefined();
      expect(assignment).toMatchObject(assignmentInput);
    });
  });
});
