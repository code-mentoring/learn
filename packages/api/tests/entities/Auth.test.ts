import { TestClient } from '../utils/TestClient';
import * as random from '../../src/Database/seeders/random';

describe('Auth entity', () => {
  beforeAll(async () => {
    await TestClient.start();
  });
  afterAll(async () => {
    await TestClient.stop();
  });

  describe('Mutation: login', () => {
    it('should successfully log in user', async () => {
      const input = random.userInput();
      // 1. Create user
      const user = await TestClient.createUser(input);
      // 2. Check user was created successfully
      expect(user.firstName).toEqual(input.firstName);
      // 3. Attempt to login with user
      const login = await TestClient.login(input.email, input.password);
      // 4. Check we get a token (JWT) back
      expect(login.accessToken).not.toBeNull();
    });

    ['email', 'password'].forEach((key) => {
      it(`should throw an error if ${key} is invalid`, async () => {
        const input = random.userInput();
        await TestClient.createUser(input);

        expect.assertions(1);

        try {
          if (key === 'email') {
            await TestClient.login('wrong-email', input.password);
          } else if (key === 'password') {
            await TestClient.login(input.email, 'wrong-password');
          }
        } catch (error) {
          expect(error.message).toEqual('Invalid login credentials');
        }
      });
    });

    it.only('should throw an error both email and password are invalid', async () => {
      expect.assertions(1);

      const email = 123456;
      const password = 126464;

      try {
        await TestClient.login(email, password);
      } catch (error) {
        console.log(error.message);
        expect(error.message).toEqual(
          `Variable "$email" got invalid value ${email}; String cannot represent a non string value: ${email}`
        );
      }
    });
  });
});
