import execa from 'execa';


(async () => {
  const [,,
    branch = process.env.BRANCH,
    npmToken = process.env.NPM_TOKEN
  ] = process.argv;
  if (!npmToken) throw new Error('No NPM_TOKEN configured');

  if (!branch) throw new Error('No branch supplied!');
  const isCI = Boolean(process.env.CI);
  if (!isCI) throw new Error('Do not run this command in a non CI environment');

  let tag = branch.replace(/[/\s]/g, '-');
  switch (branch) {
    case 'master':
      tag = 'stable';
      break;
    case 'develop':
      tag = 'beta';
      break;
    default:
      if (branch.startsWith('feature/')) {
        tag = branch.replace(/[/\s]/g, '-');
      } else throw new Error(`Unknown branch ${branch}`);
  }

  console.log(`Publishing to tag: ${tag}`);

  const subprocess = execa('yarn', [
    'lerna',
    'publish',
    'prepatch',
    '-y',
    `--preid=${tag}`,
    `--dist-tag=${tag}`,
    '--force-publish=*',
    `--registry="https://npm.pkg.github.com/:_authToken=${npmToken}"`
  ]);
  subprocess.stdout!.pipe(process.stdout);

  const { exitCode } = await subprocess;
  if (exitCode) process.exit(exitCode);

})();
