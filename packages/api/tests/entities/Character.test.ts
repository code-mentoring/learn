import { TestClient } from '../utils/TestClient';
import { CharacterCreateInput, CharacterUpdateInput } from '../../types';
import { Controller } from '@nestjs/common';

export const characterInput1: CharacterCreateInput = {
  name: 'Murphy',
  displayName: 'MurphyMurphy'
};

export const characterInput2: CharacterCreateInput = {
  name: 'Christian',
  displayName: 'ChristianChristian'
};

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
      const character = await TestClient.createCharacter(characterInput1);

      expect(character.id).toBeDefined();
      expect(character.name).toEqual(characterInput1.name);
      expect(character.displayName).toEqual(characterInput1.displayName);
    });

    it('should throw error if character name exists', async () => {
      expect.assertions(1);
      
      try {
        await TestClient.createCharacter(characterInput1);
        await TestClient.createCharacter({...characterInput1, displayName: 'new'});

      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });

    it('should throw error if character displayName exists', async () => {
      expect.assertions(1);
      try {
        await TestClient.createCharacter(characterInput1);
        await TestClient.createCharacter({...characterInput1, name: 'new'});
      } catch (e) {
        expect(e.message).toMatch(/unique constraint/i);
      }
    });
  });

  describe('Mutation: updateCharacter', () => {
    beforeEach(setup);

    it('update a character name by Id successfully', async () => {
      const updateInput: CharacterUpdateInput = { name: 'Tom'};
      const character = await TestClient.createCharacter(characterInput1);

      const result = await TestClient.updateCharacter({id: character.id}, updateInput);

      const query = await TestClient.getCharacter({id: character.id});
      
      // sqlite always return false due to no {affected} return. so validate by query.
      // expect(result).toEqual(true);
      expect(query.name).toEqual(updateInput.name);
      expect(query.displayName).toEqual(character.displayName);
    });

    it('update a character by name successfully', async () => {
      const updateInput = { name: 'Tom', displayName: 'TomTom'};
      const character = await TestClient.createCharacter(characterInput1);

      const updatedCharacter = await TestClient.updateCharacter({name: characterInput1.name}, updateInput);
      const query = await TestClient.getCharacter({id: character.id});

      expect(query.name).toEqual(updateInput.name);
      expect(query.displayName).toEqual(updateInput.displayName);
    });
  
    it('update a character by displayName successfully', async () => {
      const updateInput = { name: 'Tom', displayName: 'TomTom'};
      const character = await TestClient.createCharacter(characterInput1);

      const updatedCharacter = await TestClient.updateCharacter({displayName: characterInput1.displayName}, updateInput);
      const query = await TestClient.getCharacter({id: character.id});

      expect(query.name).toEqual(updateInput.name);
      expect(query.displayName).toEqual(updateInput.displayName);
    });

    it('throw an error if update not exist character', async () => {
      const updateInput = { name: 'Tom'};
      const id = '7f25705f-b0d3-42c7-aede-47390cbfb415';
      try{
        const updatedCharacter = await TestClient.updateCharacter({id: id}, updateInput);
      }catch (e) {
        expect(e.message).toMatch('Cannot return null for non-nullable field Mutation.updateCharacter');
      };
    });
  });

  describe('Query: Character', () => {
    beforeEach(setup);

    it('should query a character successfully', async () => {
      const character = await TestClient.createCharacter(characterInput1);
      const query = await TestClient.characters();

      expect(query.length).toEqual(1);
      expect(query[0].id).toBeDefined();
      expect(query[0].name).toEqual(characterInput1.name);
      expect(query[0].displayName).toEqual(characterInput1.displayName);
    });

    it('should query two charcter successfully', async () => {
      const character1 = await TestClient.createCharacter(characterInput1);
      const character2 = await TestClient.createCharacter(characterInput2);
      const query = await TestClient.characters();

      expect(query.length).toEqual(2);
      expect(query[0].id).toBeDefined();
      expect(query[0].name).toEqual(character1.name);
      expect(query[0].displayName).toEqual(character1.displayName);

      expect(query[1].id).toBeDefined();
      expect(query[1].name).toEqual(character2.name);
      expect(query[1].displayName).toEqual(character2.displayName);
    });

    it('should return null if there is no characters', async () => {
      const query = await TestClient.characters();
      expect(query.length).toEqual(0);
    });
  });
});
