import path from 'path';
import fs from 'fs';
import fm from 'front-matter';
import MarkdownIt from 'markdown-it';

const tree = require('directory-tree');

const MD = new MarkdownIt();


export interface CMSPaths {
  [pathName: string]: CMSPath;
}

export interface CMSPath {
  name: string;
  modules: CMSModule[];
}

export interface CMSModule {
  name: string;
  storySections: string[];
  questions: string[];
}

type Dir = {
  name: string;
  path: string;
  type: 'file' | 'directory';
  children?: Dir[];
}


export class CMSLoader {
  paths: CMSPaths;

  constructor() {
    this.paths = this._getPaths();
  }

  private _getPaths(): CMSPaths {
    const t = tree(path.resolve('./content/paths'), { extensions: /\.md$/ });

    return t.children.reduce((paths: CMSPaths, dir: Dir) => {
      // eslint-disable-next-line no-param-reassign
      paths[dir.name] = this._getPath(dir);
      return paths;
    }, {} as CMSPaths);
  }

  private _getPath(pathDir: Dir): CMSPath {
    return {
      name: pathDir.name,
      modules: pathDir.children?.map(m => this._getModule(pathDir.name, m)) || []
    };
  }

  private _getModule(pathName: string, moduleDir: Dir): CMSModule {
    const [name, storySections] = this._readStoryFile(pathName, moduleDir.name);
    return { name, storySections, questions: [] };
  }

  private _readStoryFile(pathName: string, mod: string): [string, string[]] {
    const md = fs.readFileSync(path.resolve(`./content/paths/${pathName}/${mod}/story.md`)).toString();
    const { body, attributes } = fm<{title: string}>(md);
    return [attributes.title, MD.render(body).split('<hr>')];
  }
}
