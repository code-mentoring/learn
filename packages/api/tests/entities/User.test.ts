
import { TestClient } from '../utils/TestClient';

describe('User entity', () => {
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
      expect(user.email).equals(input.email);
      expect(user.firstName).equals(input.firstName);
      expect(user.lastName).equals(input.lastName);
      expect(user.password).equals(input.password);
      expect(user.createdAt).equals(input.password);
    });

    it('should throw error if email missing', async () => {
      try {
        const input = {
          firstName: 'Bob',
          lastName: 'Brown',
          password: 'secret'
        };
        const user = await TestClient.createUser(input);
      } catch (e) {
        expect(e.message).toContain('Email was not passed');
      }
    });
  });
});
