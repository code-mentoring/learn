import { BadRequestException, Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { Module, ModuleLesson, ModuleType } from '../Module/Module.entity';
import { QuestionType, Question } from '../Question/Question.entity';
import { CMSLoader } from './CMSLoader';


@Injectable()
export class CMS implements OnModuleInit {

  questions: { [id: string]: Question } = {};

  modules: { [id: string]: Module } = {};

  data = new CMSLoader()

  /** Initialize the loading of all data */
  async onModuleInit() {

    await this.data.setup();

    // Convert modules to {id: Module, ...} format
    const modules = Object.values(this.data.paths).flat();
    this.modules = modules.reduce((m, _m) => {
      // eslint-disable-next-line no-param-reassign
      m[_m.id as string] = _m;
      return m;
    }, {} as CMS['modules']);

    // Convert modules to {id: Question, ...} format
    const questions = (modules
      .filter(m => m.type === ModuleType.lesson) as ModuleLesson[])
      .map(l => l.lesson.questions)
      .flat();

    this.questions = questions.reduce((q, _q) => {
      // eslint-disable-next-line no-param-reassign
      q[_q.id as string] = _q;
      return q;
    }, {} as CMS['questions']);
  }


  findModulesByPathId(pathId: string) {
    if (!this.data.paths[pathId]) throw new Error(`Unknown path ${pathId}`);
    return this.data.paths[pathId];
  }


  findModuleById(moduleId: string) {
    return this.modules[moduleId];
  }


  findModuleByName(moduleName: string) {
    return Object.values(this.modules).find(m => m.name === moduleName);
  }


  findLesson(pathId: string, lessonNameOrIndex: string | number): ModuleLesson | undefined {
    const p = this.findModulesByPathId(pathId);
    if (!p) return p;
    if (
      typeof lessonNameOrIndex === 'number'
      && p[lessonNameOrIndex].type === ModuleType.lesson
    ) return p[lessonNameOrIndex] as ModuleLesson;

    return p.find(m =>
      m.name === lessonNameOrIndex
      && m.type === ModuleType.lesson) as ModuleLesson;
  }


  findLessonById(lessonId: string): ModuleLesson | undefined {
    const p = this.findModuleById(lessonId);
    if (!p || p.type !== ModuleType.lesson) throw new NotFoundException('Lesson not found');
    return p as ModuleLesson;
  }


  async findStory(
    pathId: string,
    moduleNameOrIndex: string | number,
    storyIndex: number
  ) {
    const m = await this.findLesson(pathId, moduleNameOrIndex);
    if (!m) return;
    return m.lesson.storySections[storyIndex];
  }


  findQuestions(
    pathId: string,
    moduleNameOrIndex: string | number
  ): Object[] | undefined {
    const m = this.findLesson(pathId, moduleNameOrIndex);
    if (!m) return;
    return m.lesson.questions;
  }

  checkAnswer(questionId: string, answer: string): boolean {
    const q = this.questions[questionId];
    if (!q) throw new NotFoundException(`Question could not be found with id ${questionId}`);


    switch(q.type) {
      case QuestionType.multiChoice:
        return answer === q.options[q.answer];

      default:
      case QuestionType.memory:
        throw new BadRequestException(`Question type '${q.type}' is not check-able`);
    }
  }
}
