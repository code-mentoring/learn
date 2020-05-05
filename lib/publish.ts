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
  let bump;
  let extraFlags: string[] = [];

  switch (branch) {
    case 'master':
      tag = 'stable';
      bump = 'minor';
      break;

    case 'develop':
      tag = 'beta';
      bump = 'patch';
      break;

    default:
      if (!branch.startsWith('feature/')) throw new Error(`Unknown branch ${branch}`);
      tag = branch.replace(/[/\s]/g, '-');
      bump = 'prepatch';
      extraFlags = extraFlags.concat(`--preid=${tag}`);
  }

  console.log(`Publishing to tag: ${tag}`);


  const subprocess = execa('yarn', [
    'lerna',
    'publish',
    bump,
    '-y',
    `--dist-tag=${tag}`,
    '--force-publish=*',
    `--registry="https://npm.pkg.github.com/:_authToken=${npmToken}"`,
    ...extraFlags
  ]);

  subprocess.stdout!.pipe(process.stdout);

  const { exitCode } = await subprocess;
  if (exitCode) process.exit(exitCode);

})();
