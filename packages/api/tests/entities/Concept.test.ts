import { TestClient } from '../utils/TestClient';
import * as random from '../../src/Database/seeders/random';


beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

let taughtInId: string;

const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
  [taughtInId] = Object.keys(TestClient.cms.modules);
};

describe('Concept', () => {

  describe('Mutation: createConcept', () => {
    beforeEach(setup);

    it('should create a concept successfully', async () => {


      const conceptInput = random.conceptInput(taughtInId);
      const concept = await TestClient.createConcept(conceptInput);

      expect(concept.id).toBeDefined();
      expect(concept.name).toEqual(conceptInput.name);
      expect(concept.icon).toEqual(conceptInput.icon);
      expect(concept.taughtInId).toEqual(conceptInput.taughtInId);

      expect(concept).toMatchObject(conceptInput);

    });
  });

  describe('Mutation: learnConcept', () => {
    beforeEach(setup);

    it('should add user to a concept', async () => {
      // populate conceptInput
      const conceptInput = random.conceptInput(taughtInId);
      // create concept
      const { id } = await TestClient.createConcept(conceptInput);
      // add user to concept
      const res = await TestClient.learnConcept(id);
      expect(res).toBe(true);
    });

    it('should not allow to add user to the same concept', async () => {
      const conceptInput = random.conceptInput(taughtInId);
      const { id } = await TestClient.createConcept(conceptInput);
      await TestClient.learnConcept(id);

      try {
        // add user to the same concept
        await TestClient.learnConcept(id);
      } catch (error) {
        expect(error.message).toMatch(/unique constraint/i);
      }

    });

  });

  describe('Mutation: updateConcept', () => {
    beforeEach(setup);

    it('should update concept successfully', async () => {
      const conceptInput = random.conceptInput(taughtInId);
      const concept = await TestClient.createConcept(conceptInput);
      const result = await TestClient.updateConcept({ id: concept.id, taughtInId });

      const updatedConcept = await TestClient.concept(concept.name);

      expect(updatedConcept.taughtInId).toEqual(result.taughtInId);

    });
  });

});
