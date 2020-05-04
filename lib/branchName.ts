/* eslint-disable import/prefer-default-export */
/* eslint-disable no-console */
import execa from 'execa';

/**
 * Returns the current git branch
 */
export const branchName = async () => (
  await execa('git', ['rev-parse', '--abbrev-ref', 'HEAD'])
).stdout;


/**
 * Returns formatted version of the current git branch
 */
export const formattedBranchName = async () => {
  let branch = (await module.exports.branchName())
    .replace(/[/\s]/g, '-');

  // Add the short SHA of current commit if branch is master
  // EG: 'master-ddbfd38f'
  if (branch === 'master') {
    const { stdout } = await execa('git', ['rev-parse', '--short', 'HEAD']);
    branch = `master-${stdout}`;
  }

  return branch;
};


if (require.main === module) {
  (async () => {
    console.log(await formattedBranchName());
  })();
}
