import {
  Injectable,
  NotFoundException,
  BadRequestException,
  Inject,
  forwardRef,
  Logger
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import SimpleCrypto from 'simple-crypto-js';
import config from 'config';


import { UserModule } from './UserModule.entity';
import { CMS } from '../CMS/CMS';
import { QuestionType } from '../Question/Question.entity';
import { UserService } from '../User/User.service';

@Injectable()
export class UserModuleService {
  constructor(
    @InjectRepository(UserModule)
    private readonly userModuleRepository: Repository<UserModule>,
    @Inject(forwardRef(() => UserService))
    private readonly userService: UserService,
    private readonly cms: CMS
  ) { }

  async beginModule(userId: string, moduleId: string): Promise<string> {
    const secret = uuid(); // Secret gets updated every time user reuqests module

    // Upsert
    const existing = await this.findOne(userId, moduleId);
    if (existing) {
      this.userModuleRepository.update(
        { userId, moduleId },
        { secret, viewed: existing.viewed + 1 } // Update secret and viewed counter
      );
    } else {
      await this.userModuleRepository
        .create({ userId, secret, moduleId })
        .save();
    }

    return secret;
  }


  /**
   * Attempt to complete a lesson with an encrypted answer string from client submissions
   * @param userId User
   * @param moduleId Module to complete
   * @param encryptedAnswers Encrypted answer string
   */
  async completeLesson(
    userId: string,
    moduleId: string,
    encryptedAnswers: string // encrypted
  ): Promise<boolean> {
    const um = await this.findOne(userId, moduleId);
    if (!um) throw new NotFoundException('You have not begun this lesson yet');

    let answers: { [questionId: string]: string[] };

    // Attempt to decrypte and parse answers as JSON
    try {
      const { secret } = um;
      const key = new SimpleCrypto(secret);
      answers = key.decrypt(encryptedAnswers) as any;
    } catch (e) {
      throw new BadRequestException('Incorrect lesson submission');
    }


    // Check ALL answers, and return false if even one is wrong
    const allCorrect = this.cms
      .findLessonById(moduleId)!
      .lesson.questions.every(q => {
        // Memory game is not checked as it's client only
        if (q.type === QuestionType.memory) return true;

        if (!answers[q.id]) return false; // answer not submitted

        const correct = this.cms
          .checkAnswer(q.id, answers[q.id])
          .every(a => a);

        if (
          (config.get('env') === 'development' || config.get('env') === 'test')
          && !correct
        ) {
          // eslint-disable-next-line no-console
          Logger.warn(
            `Incorrect question answer ${q.id}. Expected ${JSON.stringify(q, null, 2)}`
          );
        }

        return correct;
      });

    if (!allCorrect) return false;

    um.completedAt = new Date();

    await um.save();

    await this.userService.incrementStreak(userId);

    return true;
  }


  async findByUser(userId: string): Promise<UserModule[]> {
    const userModules = await this.userModuleRepository.find({
      where: { userId },
      order: { completedAt: 'DESC' },
      relations: ['path']
    });
    if (!userModules) throw new NotFoundException('UserModule not found');
    return userModules;
  }

  async countCompleted(userId: string, pathId: string): Promise<number> {
    return this.userModuleRepository.count({
      where: { userId, path: { id: pathId } }
    });
  }

  async findOne(userId: string, moduleId: string) {
    return this.userModuleRepository.findOne({
      where: { userId, moduleId },
      relations: ['user']
    });
  }

  /**
   * Find the last module completedAt the user completed
   * @param userId User
   */
  async findLatestCompletedAtByUser(userId: string) {
    const um = await this.userModuleRepository.findOne({
      where: { userId },
      order: { completedAt: 'DESC' },
      select: ['completedAt']
    });
    return um?.completedAt;
  }

  async create(userId: string, moduleId: string) {
    return this.userModuleRepository.create({ userId, moduleId }).save();
  }


  prepareLessonAnswer(lessonId: string, secret: string) {
    const { lesson: { questions } } = this.cms.findLessonById(lessonId)!;
    const answers = questions.reduce((a, q) => {
      /* eslint-disable no-param-reassign */
      switch (q.type) {
        case QuestionType.dragDrop:
          a[q.id] = q.answer.map(i => q.options[i]);
          break;
        case QuestionType.multiChoice:
          a[q.id] = [q.options[q.answer]];
          break;
        default:
      }
      return a;
    }, {} as { [qId: string]: string[] });

    const key = new SimpleCrypto(secret);
    return key.encrypt(answers).toString();
  }
}
