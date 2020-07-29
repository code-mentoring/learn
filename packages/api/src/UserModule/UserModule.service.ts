import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuid } from 'uuid';
import { UserModule } from './UserModule.entity';

import SimpleCrypto from 'simple-crypto-js'
import { CMS } from '../CMS/CMS';
import config from 'config';
import { QuestionType } from '../Question/Question.entity';

@Injectable()
export class UserModuleService {
  constructor(
    @InjectRepository(UserModule) private readonly userModuleRepository: Repository<UserModule>,
    private readonly cms: CMS
  ) { }


  async beginModule(userId: string, moduleId: string): Promise<string> {
    const secret = uuid();

    // Upsert
    const existing = await this.findOne(userId, moduleId);
    if (existing) {
      this.userModuleRepository.update(
        { userId, moduleId },
        { secret, viewed: existing.viewed + 1 } // Update secret and viewed counter
      )
    } else {
      await this.userModuleRepository.create({
        userId,
        secret,
        moduleId
      }).save();
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

    let answers: { [key: string]: string[] };

    // Attempt to decrypte and parse answers as JSON
    try {
      const { secret } = um;
      const key = new SimpleCrypto(secret);
      answers = key.decrypt(encryptedAnswers) as any;
    } catch (e) {
      throw new BadRequestException('Incorrect lesson submission');
    }


    // Check ALL answers, and return false if even one is wrong
    const allCorrect = this.cms.findLessonById(moduleId)!.lesson.questions.every(q => {
      // Memory game is not checked as it's client only
      if (q.type === QuestionType.memory) return true;

      if (!answers[q.id]) return false; // answer not submitted

      const correct = this.cms.checkAnswer(q.id, answers[q.id]).every(a => a);

      if (config.get('env') === 'development' && !correct) {
        console.log(`Incorrect question answer ${q.id}. Expected ${JSON.stringify(q, null, 2)}`);
      }

      return correct;
    });

    if (!allCorrect) return false;

    um.completedAt = new Date();
    await um.save();

    return true;
  }


  async findByUser(userId: string): Promise<UserModule[]> {
    const userModules = await this.userModuleRepository.find({
      where: { userId },
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

  async create(
    userId: string,
    moduleId: string
  ) {
    return this.userModuleRepository.create({ userId, moduleId }).save();
  }

}
