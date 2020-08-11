import { UserService } from '../../src/User/User.service';
import { UserModuleService } from '../../src/UserModule/UserModule.service';
import { TestClient } from '../utils/TestClient';

beforeAll(async () => { await TestClient.start(); });
afterAll(async () => { await TestClient.stop(); });

let umService: UserModuleService;

const setup = async () => {
  await TestClient.resetDatabase();
  umService = TestClient.get(UserModuleService);
};

describe('Lesson', () => {

  describe('Mutation: beginLesson', () => {
    beforeEach(async () => { await setup(); });

    it('should begin a lesson', async () => {
      const { mod1, me, lesson1, secret1 } = await TestClient.workflowLesson();

      // find userModule lesson created
      const userModule = await umService.findOne(me.id, mod1.id);

      expect(lesson1.id).toEqual(mod1.id);
      expect(secret1).toBeDefined();
      expect(userModule).toBeDefined();
      expect(userModule.user.id).toEqual(me.id);
    });

  });

  describe('Mutation: completeLesson', () => {
    beforeEach(async () => { await setup(); });

    it('should successfully complete a lesson', async () => {
      const { me, answers1, lesson1 } = await TestClient.workflowLesson();
      const res = await TestClient.completeLesson(answers1, lesson1.id);
      expect(res).toBeTrue();
      const um = await umService.findOne(me.id, lesson1.id);
      expect(um.completedAt).not.toBeEmpty();
    });


    it('should update a users streak on lesson complete', async () => {
      const { me, mod1, answers1 } = await TestClient.workflowLesson();
      expect(me.streak).toEqual(0);
      await TestClient.completeLesson(answers1, mod1.id);
      const { streak } = await TestClient.get(UserService).findByEmail(me.email);
      expect(streak).toEqual(1);
    });

    it('should skip updating a users streak if lesson aleady completed today', async () => {
      const { me, mod1, mod2, answers1, answers2 } = await TestClient.workflowLesson();

      expect(me.streak).toEqual(0);
      await TestClient.completeLesson(answers1, mod1.id);
      const { streak: s1 } = await TestClient.get(UserService).findByEmail(me.email);
      expect(s1).toEqual(1);

      await TestClient.completeLesson(answers2, mod2.id);
      const { streak: s2 } = await TestClient.get(UserService).findByEmail(me.email);
      expect(s2).toEqual(1);
    });

    it('should increment streak if completed lesson yesterday', async () => {
      const { me, mod1, mod2, answers1, answers2 } = await TestClient.workflowLesson();
      const uRep = await TestClient.db.getRepository('UserWithPassword');

      // Complete first lesson...
      await TestClient.completeLesson(answers1, mod1.id);

      // and reset to done yesterday
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      await uRep.update({ id: me.id }, { updatedStreak: yesterday });

      await TestClient.completeLesson(answers2, mod2.id);
      const { streak } = await TestClient.get(UserService).findByEmail(me.email);
      expect(streak).toEqual(2);
    });

    it('should reset streak if user skipped a day', async () => {
      const { me, mod1, mod2, answers1, answers2 } = await TestClient.workflowLesson();
      const uRep = await TestClient.db.getRepository('UserWithPassword');

      // Complete first lesson...
      await TestClient.completeLesson(answers1, mod1.id);

      // and reset to done 2 days ago
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);
      await uRep.update({ id: me.id }, { updatedStreak: twoDaysAgo });

      await TestClient.completeLesson(answers2, mod2.id);
      const { streak } = await TestClient.get(UserService).findByEmail(me.email);
      expect(streak).toEqual(0);
    });
  });

  describe('Property: User.streak', () => {
    beforeEach(async () => { await setup(); });

    it('should initially be set to zero', async () => {
      const { me } = await TestClient.workflowLesson();
      expect(me.streak).toEqual(0);
    });

    it('should reset streak if user skipped a day', async () => {
      const { me, mod1, answers1 } = await TestClient.workflowLesson();
      const uRep = await TestClient.db.getRepository('UserWithPassword');

      // Complete first lesson...
      await TestClient.completeLesson(answers1, mod1.id);
      const { streak: s1 } = await TestClient.me();
      expect(s1).toEqual(1);

      // and reset to done 2 days ago
      const twoDaysAgo = new Date();
      twoDaysAgo.setDate(twoDaysAgo.getDate() - 2);

      await uRep.update({ id: me.id }, { updatedStreak: twoDaysAgo });

      const { streak: s2 } = await TestClient.me();
      expect(s2).toEqual(0);
    });
  });
});
