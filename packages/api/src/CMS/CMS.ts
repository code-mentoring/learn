import { Injectable } from '@nestjs/common';
import { CMSLoader, CMSPath, CMSModule } from './CMSLoader';

@Injectable()
export class CMS {
  data: CMSLoader;

  constructor() {
    this.data = new CMSLoader();
  }

  findPath(pathName: string): CMSPath | undefined {
    return this.data.paths[pathName];
  }

  findModule(pathName: string, moduleNameOrIndex: string | number): CMSModule | undefined {
    const p = this.findPath(pathName);
    if (!p) return p;
    if (typeof moduleNameOrIndex === 'number') return p.modules[moduleNameOrIndex];
    return p.modules.find(m => m.name === moduleNameOrIndex);
  }

  findStory(
    pathName: string,
    moduleNameOrIndex: string | number,
    storyIndex: number
  ): string | undefined {
    const m = this.findModule(pathName, moduleNameOrIndex);
    if (!m) return;
    return m.storySections[storyIndex];
  }
}
