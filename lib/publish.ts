import execa from 'execa';


(async () => {
  const [,,
    branch = process.env.BRANCH
  ] = process.argv;

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
      bump = undefined;
      extraFlags = extraFlags.concat(
        `--preid=${tag}`,
        '--canary',
        '--exact'
      );
  }

  console.log(`Publishing to tag: ${tag}`);

  const args = [
    'lerna',
    'publish',
    bump,
    '-y',
    `--dist-tag=${tag}`,
    '--force-publish=*',
    ...extraFlags
  ].filter(f => f) as string[];

  const subprocess = execa('yarn', args);

  subprocess.stdout!.pipe(process.stdout);

  const { exitCode } = await subprocess;
  if (exitCode) process.exit(exitCode);

})();
