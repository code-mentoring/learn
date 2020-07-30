1. Get list of paths (an array of strings)
2. For a path, get list of modules
3. Pull in markdown story, and split into pages by the `---`
4. Read the `questions.yml` file for EACH module and convert to JSON
5. Optional: Validate the `questions.yml`

```ts
import fs from 'fs-extra';
import path from 'path';

interface FSStorySection {
  markdown: string;
}

interface FSLesson {
  name: string;
  story: FSStorySection[];
}

class FileSystemService {
  paths: string[] = [];
  lessons: {[name: string]: FSLesson}

  getPaths() {
    if (this.paths) return this.paths;
    return this.paths = await fs.readDir(path.resolve('../content/paths/)'));
     // ...
  }

  getLesson(pathName: string, lessonName: string) {
    // Same as above, and checking it's a lesson
  }

  // getAssignment(pathName: string, assignmentName: string) {
    // Skip for now
  // }
}
```
