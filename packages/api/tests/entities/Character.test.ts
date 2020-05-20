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

  describe('Mutation: updateCharacter', () => {
    beforeEach(setup);

    it('update character name successfully', async () => {
      expect.assertions(2);
      const updateInput = { name: 'New' };
      const character = await TestClient.createCharacter(characterInput1);
      try{
        await TestClient.updateCharacter({ id: character.id, ...updateInput });
      }catch(e) {};

      const updateResult = await TestClient.getCharacters();

      expect(updateResult[0].name).toEqual(updateInput.name);
      expect(updateResult[0].displayName).toEqual(characterInput1.displayName);
    });

    it('update character displayName successfully', async () => {
      expect.assertions(2);
      const updateInput = { displayName: 'New' };
      const character = await TestClient.createCharacter(characterInput1);
      try{
        await TestClient.updateCharacter({ id: character.id, ...updateInput });
      }catch(e) {};

      const updateResult = await TestClient.getCharacters();

      expect(updateResult[0].name).toEqual(characterInput1.name);
      expect(updateResult[0].displayName).toEqual(updateInput.displayName);
    });

    it('throw an error if update not exist character', async () => {
      expect.assertions(1);
      const updateInput = { name: 'New' };
      const id = uuid();
      try {
        const d = await TestClient.updateCharacter({ id: id, ...updateInput});
      } catch (e) {
        expect(e.message).toMatch('not found');
      }
    });
  });  
});
