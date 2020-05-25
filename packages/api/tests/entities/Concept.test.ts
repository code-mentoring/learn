import { TestClient } from '../utils/TestClient';
// import { CreateConceptInput } from '../../types';
import * as random from '../../src/Database/seeders/random';



beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

let taughtInId: string;

const setup = async () => {
    await TestClient.resetDatabase();
    await TestClient.workflowSignup();
    const { id } = await TestClient.createPath();
    const { id: modId } = await TestClient.createModule(random.moduleInput('name', id));
    taughtInId = modId;
};

describe('Concept', () => {

    describe('Mutation: CreateConcept', () => {
        beforeEach(setup);

        it('should create a concept successfully', async () => {
            

            const conceptInput = random.conceptInput(taughtInId);
            const concept = await TestClient.createConcept(conceptInput);

            // expect(concept.id).toBeDefined();
            expect(concept).toMatchObject(conceptInput);

            


        })
    });

});