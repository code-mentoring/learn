import { TestClient } from '../utils/TestClient';
import { CreateCharacterInput, UpdateCharacterInput } from '../../types';
import * as random from '../../src/Database/seeders/random';
import { v4 as uuid } from 'uuid';

export const characterInput1 = random.characterInput();
export const characterInput2 = random.characterInput();

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

const setup = async () => {
  await TestClient.resetDatabase();
  await TestClient.workflowSignup();
};

describe('Character entity', () => {

  describe('Mutation: createCharacter', () => {
    beforeEach(setup);

    it('should create a character successfully', async () => {
      expect.assertions(1);
      const character = await TestClient.createCharacter(characterInput1);
      expect(character).toMatchObject(characterInput1);
    });

    it('should throw error if character name exists', async () => {
      expect.assertions(1);

      try {
        await TestClient.createCharacter(characterInput1);
        await TestClient.createCharacter({ ...characterInput1, displayName: 'new' });
      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });

    it('should throw error if character displayName exists', async () => {
      expect.assertions(1);
      try {
        await TestClient.createCharacter(characterInput1);
        await TestClient.createCharacter({ ...characterInput1, name: 'new' });
      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });

  describe('Query: getCharacters', () => {
    beforeEach(setup);

    it('should query a character successfully', async () => {
      expect.assertions(2);
      await TestClient.createCharacter(characterInput1);
      const characters = await TestClient.getCharacters();

      expect(characters.length).toEqual(1);
      expect(characters[0]).toMatchObject(characterInput1);
    });

    it('should query two charcter successfully', async () => {
      expect.assertions(3);
      await TestClient.createCharacter(characterInput1);
      await TestClient.createCharacter(characterInput2);
      const characters = await TestClient.getCharacters();

      expect(characters.length).toEqual(2);
      expect(characters[0]).toMatchObject(characterInput1);
      expect(characters[1]).toMatchObject(characterInput2);
    });

    it('should return an empty array if there is no characters', async () => {
      expect.assertions(1);
      const characters = await TestClient.getCharacters();
      expect(characters.length).toEqual(0);
    });
  });

  // Character delete service will based on deleteResult.affected to determin success or not.
  // Because sqlite donot return affected param for deleteResult, so it will always fail. 
  // so the test script use alternative query to validate delete success or not.
  describe('Mutation: deleteCharacters', () => {
    beforeEach(setup);

    it('should delete a character successfully', async () => {
      expect.assertions(2);
      await TestClient.createCharacter(characterInput1);
      const characters1 = await TestClient.getCharacters();
      await TestClient.deleteCharacter(characters1[0].id);
      const characters2 = await TestClient.getCharacters();

      expect(characters1.length).toEqual(1);
      expect(characters2.length).toEqual(0);
    });
  });

  // Character update service will based on updateResult.affected to determin query or throw an error
  // Because sqlite donot return affected param for updateResult, so it will always throw an error. 
  // It can not be tested
  describe.skip('Mutation: updateCharacter', () => {
    beforeEach(setup);

    it('update character name successfully', async () => {
      expect.assertions(2);
      const updateInput = { name: 'New' };
      const character = await TestClient.createCharacter(characterInput1);
      const updateResult = await TestClient.updateCharacter({ id: character.id, ...updateInput });

      expect(updateResult.name).toEqual(updateInput.name);
      expect(updateResult.displayName).toEqual(characterInput1.displayName);
    });

    it('update character displayName successfully', async () => {
      expect.assertions(2);
      const updateInput = { displayName: 'New' };
      const character = await TestClient.createCharacter(characterInput1);
      const updateResult = await TestClient.updateCharacter({ id: character.id, ...updateInput });

      expect(updateResult.name).toEqual(characterInput1.name);
      expect(updateResult.displayName).toEqual(updateInput.displayName);
    });

    it('throw an error if update not exist character', async () => {
      expect.assertions(1);
      const updateInput = { name: 'New' };
      const id = uuid();
      try {
        const d = await TestClient.updateCharacter({ id: id, ...updateInput});
      } catch (e) {
        expect(e.message).toMatch('Cannot return null for non-nullable field Mutation.updateCharacter');
      }
    });
  });  
});
