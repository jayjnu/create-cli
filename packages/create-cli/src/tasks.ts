import Listr from 'listr';
import { Options } from './options';

export function createTasks(options: Options): Listr {
  return new Listr([
    {
      title: 'Git - initialize git project...',
      task: () => {
        return new Promise((res) => {
          setTimeout(res, 5000);
        });
      },
      skip: () => {
        return !options.git;
      }
    },
    {
      title: 'Template - Generating Scaffolds',
      task: () => {
        return new Listr([
          {
            title: `creating ${options.lang} templates..`,
            task: async() => {
              return 'Good';
            }
          },
          {
            title: `building package.json...`,
            task: async() => {
              return 'Good';
            }
          }
        ])
      }
    },
    {
      title: 'NPM - install dependencies',
      task: () => {
        return new Promise((res) => {
          setTimeout(res, 5000);
        })
      },
      skip: () => !options.install
    }
  ]);
}