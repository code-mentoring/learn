import { TestClient } from '../utils/TestClient';


describe('User entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  describe('Mutation: createUser', () => {
    it('should create a user successfully', async () => {
      const input = {
        email: 'fake@user.com',
        firstName: 'Bob',
        lastName: 'Brown',
        password: 'secret'
      };

      const user = await TestClient.createUser(input);

      expect(user.id).toBeDefined();
      expect(user.email).toEqual(input.email);
      expect(user.firstName).toEqual(input.firstName);
      expect(user.lastName).toEqual(input.lastName);
      // @ts-ignore Access invalid property to test
      expect(user.password).toBeUndefined();
      expect(user.createdAt).toBeDefined();
    });

    it('should throw error if email missing', async () => {
      expect.assertions(1); // Expect there to be an error
      try {
        const input = {
          firstName: 'Bob',
          lastName: 'Brown',
          password: 'secret'
        };
        // @ts-ignore Deliberately missing email to test error
        await TestClient.createUser(input);
      } catch (e) {
        expect(e.message).toContain('Field \"email\" of required type \"String!\" was not provided');
      }
    });
  });

});
