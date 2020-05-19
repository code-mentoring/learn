import { TestClient } from '../utils/TestClient';
import * as random from '../../src/Database/seeders/random';

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

let moduleId: string;
const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
  const { id } = await TestClient.createPath(random.pathInput({ name: 'path name' }));
  const { id: modId } = await TestClient.createModule(random.moduleInput('name', id));
  moduleId = modId;
};

describe('Assignment entity', () => {

  describe('Mutation: createAssignment', () => {
    beforeEach(setup);

    it('should create an assignment successfully', async () => {
      expect.assertions(2);

      const assignmentInput = random.assignmentInput(moduleId);
      const assignment = await TestClient.createAssignment(assignmentInput);

      expect(assignment.id).toBeDefined();
      expect(assignment).toMatchObject(assignmentInput);
    });
  });
});
