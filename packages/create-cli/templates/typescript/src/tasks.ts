import { Options } from './options';
import Listr from 'listr';
import execa from 'execa';

export function createTasks(options: Options) {
  return new Listr([
    {
      title: 'Git',
      task: () => execa('git', ['init']),
      skip: () => {
        if (!options.git) {
          return `not a git project`;
        }
        return false;
      }
    },
    {
      title: 'Install Packages',
      task: () => Promise.resolve({}),
      skip: () => {
        return !options.install;
      }
    }
  ]);
}