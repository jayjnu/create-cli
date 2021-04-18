import {prompt} from './argvs';
import Listr from 'listr';

export async function cli(argv: string[] = process.argv) {
  console.log(argv);
  const opts = await prompt(argv);
  const tasks = new Listr([
    {
      title: 'Git',
      task: () => Promise.resolve('Initialized Git project')
    }
  ]);
};
