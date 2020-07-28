import fm from 'front-matter';
import fs from 'fs';
import MarkdownIt from 'markdown-it';
import MDPrism from 'markdown-it-prism';
import path from 'path';
import YAML from 'yaml';
import { Module, ModuleBase, ModuleLesson, ModuleType } from '../Module/Module.entity';
import { QuestionType, Question, QuestionMultiChoice, QuestionMemory, QuestionDragDrop, QuestionBugHighlight } from '../Question/Question.entity';
import { StorySection } from '../StorySection/StorySection.entity';
import {
  shapeQuestionBugHighlight,
  shapeQuestionDragDrop,
  shapeQuestionMemory,
  shapeQuestionMultiChoice
} from './Questions.types';


const md = new MarkdownIt();
md.use(MDPrism);

const tree = require('directory-tree');


export interface CMSPaths {
  [pathId: string]: Module[];
}

type Dir = {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: Dir[];
}

interface ModuleFile extends Pick<ModuleBase, 'id' | 'name' | 'icon' | 'type' | 'previousId'> {}
const fileTestName = new RegExp('(\\w+)\\.(\\d+)\\.md$');

/**
 * Handles reading all the file system files for paths, stories, questions, etc
 */
export class CMSLoader {
  paths: CMSPaths;

  modules: { [id: string]: Module }

  /** Load all data */
  async setup() {
    this.paths = await this._loadPaths();
  }

  /** Load all path data with modules, stories, questions, etc */
  private async _loadPaths(): Promise<CMSPaths> {
    const t = tree(path.resolve('./content/paths'), { extensions: /\.md$/ });

    const paths: CMSPaths = {};

    await Promise.all(t.children.map(async (dir: Dir) => {
      const dirChildren = dir.children?.filter(c => c.type === 'directory');
      // eslint-disable-next-line no-param-reassign
      paths[dir.name] = await Promise.all(
        (dirChildren || []).map(m => this._loadModule(dir.name, m))
      );
      return paths;
    }));

    return paths;
  }


  /**
   * Load a module from the directory and convert to Module entity
   * @param pathId Path id
   * @param moduleDir Dir of module
   */
  private async _loadModule(pathId: string, moduleDir: Dir): Promise<Module> {
    const fp = path.resolve(`./content/paths/${pathId}/${moduleDir.name}/module.yml`);
    const yml = fs.readFileSync(fp).toString();
    const m = <ModuleFile>YAML.parse(yml);

    if (!m.type) throw new Error(`Unknown module type for file '${fp}'`);

    if (m.type === ModuleType.lesson) {
      const storySections = this._loadStory(moduleDir.path);
      // TODO: Temp filtering of questions to test individually
      const questions = (await this._loadQuestions(pathId, moduleDir))
        .filter(q => (
          (q.type === QuestionType.multiChoice)
          || (q.type === QuestionType.memory)
        ));

      const lesson: ModuleLesson = {
        ...m,
        pathId,
        lesson: { questions, storySections }
      };
      return lesson;
    }

    throw new Error('TODO: Assignment');
  }


  /**
   * Loads a `story.md` for a module, and convert to StorySection[]
   * @param dir Path/Module directory to load
   */
  private _loadStory(dir: string): StorySection[] {
    const raw = fs.readFileSync(path.resolve(`${dir}/story.md`)).toString();
    const { body } = fm<{ title: string }>(raw);
    return body.split('---').map(content => ({
      content: md.render(content)
    }));
  }


  /**
   * Loads all question markdown files, validates them, and converts to Question list
   * @param pathId Path to load
   * @param moduleDir Module to load
   */
  private async _loadQuestions(pathId: string, moduleDir: Dir): Promise<Question[]> {
    if (!moduleDir.children) return [];

    const questionsDir = moduleDir.children.find(c => c.name === 'questions');
    if (!questionsDir) throw new Error(`Could not load questions directory for '${moduleDir.path}'`);

    return Promise.all((questionsDir.children || []).map<Promise<Question>>(async qf => {
      if (!fileTestName.test(qf.path)) throw new Error(`Unknown file format ${qf.path}`);

      const [, type, id] = fileTestName.exec(qf.path) as unknown as [any, QuestionType, string];

      const _md = fs.readFileSync(qf.path).toString();
      const { body, attributes } = fm<Question>(_md);
      const code = md.render(body);

      const base = { id: `${pathId}-${type}-${moduleDir.name}-${id}` };

      switch (type) {
        case QuestionType.multiChoice:
          const mc: QuestionMultiChoice = {
            ...base,
            ...(attributes as QuestionMultiChoice),
            type: QuestionType.multiChoice,
            code
          };
          await shapeQuestionMultiChoice.validate(mc);
          return mc;

        case QuestionType.memory:
          const mem: QuestionMemory = {
            ...base,
            ...(attributes as QuestionMemory),
            type: QuestionType.memory
          };
          await shapeQuestionMemory.validate(mem);
          return mem;

        case QuestionType.dragDrop:
          const dnd: QuestionDragDrop = {
            ...base,
            ...(attributes as QuestionDragDrop),
            type: QuestionType.dragDrop,
            code
          };
          await shapeQuestionDragDrop.validate(dnd);
          return dnd;

        case QuestionType.bugHighlight:
          const bh: QuestionBugHighlight = {
            ...base,
            ...(attributes as QuestionBugHighlight),
            type: QuestionType.bugHighlight,
            code
          };
          await shapeQuestionBugHighlight.validate(bh);
          return bh;
        default:
          throw new Error(`Unknown question file type '${type}' for '${qf.path}'`);
      }

    }));
  }
}
