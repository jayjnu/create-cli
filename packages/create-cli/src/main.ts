import {prompt} from './argvs';
import Listr from 'listr';

export async function cli(argv: string[] = process.argv) {
  const opts = await prompt(argv);
  const tasks = new Listr([
    {
      title: 'Git - initialize git project...',
      task: () => {
        return new Promise((res) => {
          setTimeout(res, 5000);
        });
      }
    },
    {
      title: 'NPM - install dependencies',
      task: () => {
        return new Promise((res) => {
          setTimeout(res, 5000);
        })
      }
    },
    {
      title: 'Template - Generating Scaffolds',
      task: () => {
        return new Promise((res) => {
          setTimeout(res, 5000);
        })
      }
    }
  ]);

  try {
    await tasks.run();
  } catch(e) {
    console.error(e);
  }
};
