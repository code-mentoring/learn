import { TestClient } from '../utils/TestClient';
import { CharacterCreateInput } from '../../types';

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

// TODO: do tests when character enitity is reviewed

// const setup = async () => {
//   await TestClient.resetDatabase();
//   await TestClient.workflowSignup();
// };

// describe('Character entity', () => {

//   describe('Mutation: createCharacter', () => {
//     beforeEach(setup);

//     it('should create a character successfully', async () => {
//       expect.assertions(1);
//       const character = await TestClient.createCharacter(characterInput1);
//       expect(character).toMatchObject(characterInput1);
//     });

//     it('should throw error if character name exists', async () => {
//       expect.assertions(1);

//       try {
//         await TestClient.createCharacter(characterInput1);
//         await TestClient.createCharacter({ ...characterInput1, displayName: 'new' });

//       } catch (e) {
//         expect(e.message).toMatch(/unique constraint/i);
//       }
//     });

//     it('should throw error if character displayName exists', async () => {
//       expect.assertions(1);
//       try {
//         await TestClient.createCharacter(characterInput1);
//         await TestClient.createCharacter({ ...characterInput1, name: 'new' });
//       } catch (e) {
//         expect(e.message).toMatch(/unique constraint/i);
//       }
//     });
//   });

//   describe('Mutation: updateCharacter', () => {
//     beforeEach(setup);

//     it('update a character name by Id successfully', async () => {
//       expect.assertions(2);
//       const updateInput: CharacterUpdateInput = { name: 'Tom' };
//       const character = await TestClient.createCharacter(characterInput1);

//       await TestClient.updateCharacter({ id: character.id }, updateInput);
//       const { name, displayName } = await TestClient.getCharacter({ id: character.id });

//       expect(name).toEqual(updateInput.name);
//       expect(displayName).toEqual(character.displayName);
//     });

//     it('update a character by name successfully', async () => {
//       expect.assertions(2);
//       const updateInput = { name: 'Tom', displayName: 'TomTom' };
//       const character = await TestClient.createCharacter(characterInput1);

//       await TestClient.updateCharacter({ name: characterInput1.name }, updateInput);
//       const { name, displayName } = await TestClient.getCharacter({ id: character.id });

//       expect(name).toEqual(updateInput.name);
//       expect(displayName).toEqual(updateInput.displayName);
//     });

//     it('update a character by displayName successfully', async () => {
//       expect.assertions(2);
//       const updateInput = { name: 'Tom', displayName: 'TomTom' };
//       const character = await TestClient.createCharacter(characterInput1);

//       await TestClient.updateCharacter({ displayName: characterInput1.displayName }, updateInput);
//       const { name, displayName } = await TestClient.getCharacter({ id: character.id });

//       expect(name).toEqual(updateInput.name);
//       expect(displayName).toEqual(updateInput.displayName);
//     });

//     it('throw an error if update not exist character', async () => {
//       expect.assertions(1);
//       const updateInput = { name: 'Tom' };
//       const id = v4();
//       try {
//         const d = await TestClient.updateCharacter({ id }, updateInput);
//         console.log('UPDA', d);
//       } catch (e) {
//         console.log('ERROR');
//         expect(e.message).toMatch('Cannot return null for non-nullable field Mutation.updateCharacter');
//       }
//     });
//   });

//   describe('Query: Character', () => {
//     beforeEach(setup);

//     it('should query a character successfully', async () => {
//       expect.assertions(2);
//       await TestClient.createCharacter(characterInput1);
//       const characters = await TestClient.characters();

//       expect(characters.length).toEqual(1);
//       expect(characters[0]).toMatchObject(characterInput1);
//     });

//     it('should query two charcter successfully', async () => {
//       expect.assertions(3);
//       await TestClient.createCharacter(characterInput1);
//       await TestClient.createCharacter(characterInput2);
//       const characters = await TestClient.characters();

//       expect(characters.length).toEqual(2);
//       expect(characters[0]).toMatchObject(characterInput1);
//       expect(characters[1]).toMatchObject(characterInput2);
//     });

//     it('should return an empty array if there is no characters', async () => {
//       expect.assertions(1);
//       const characters = await TestClient.characters();
//       expect(characters.length).toEqual(0);
//     });
//   });
// });
