import execa from 'execa';

export type GitExecOptions = {
  targetDirectory: string;
};

export async function init(options: GitExecOptions) {
  const result = await execa('git', ['init'], {
    cwd: options.targetDirectory
  });

  if (result.failed) {
    return Promise.reject(new Error('Git init failed'));
  }
}