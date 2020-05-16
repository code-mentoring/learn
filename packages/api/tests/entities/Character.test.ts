import { TestClient } from '../utils/TestClient';

describe('Character entity', () => {

  beforeAll(async () => { await TestClient.start(); });
  afterAll(async () => { await TestClient.stop(); });

  describe('Mutation: character', () => {

    it('should create a new character successfully', async () => {
      const input = {
        name: 'Bob',
        displayName: 'Bob123',
      };
      // 1. TODO: Test to see if character got created properly
    });
});
