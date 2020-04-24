import { TestClient } from '../utils/TestClient';

describe('Auth entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  describe('Mutation: login', () => {

    it('should successfully log in user', async () => {
      const input = {
        email: 'loginMutation@user.com',
        firstName: 'Bob',
        lastName: 'Brown',
        password: 'secret'
      };
      // 1. Create user
      const user = await TestClient.createUser(input);
      // 2. Check user was created successfully
      expect(user.firstName).toEqual(input.firstName);
      // 3. Attempt to login with user
      const login = await TestClient.login(input.email, input.password);
      // 4. Check we get a token (JWT) back
      expect(login.accessToken).not.toBeNull();
    });

    it('should throw error if email missing', async () => {
      const input = {
        email: 'loginMutationFail@user.com',
        firstName: 'Bob',
        lastName: 'Brown',
        password: 'secret'
      };

      await TestClient.createUser(input);

      expect.assertions(1); // Expect there to be an error
      try {
        await TestClient.login(input.email, 'wrong-password');
      } catch (e) {
        expect(e.message).toEqual('Invalid login credentials');
      }
    });
  });

});
