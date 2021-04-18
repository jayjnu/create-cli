import {promisify} from 'util';
import {resolve, join} from 'path';
import {writeFile} from 'fs';
import Listr from 'listr';
import { Options } from './options';
import {ncp} from 'ncp';
import execa from 'execa';

const copy = promisify(ncp);
const writeFileP = promisify(writeFile);

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
        const sourcePath = resolve(__dirname, '../templates', options.lang);

        return new Listr([
          {
            title: `creating ${options.lang} templates..`,
            task: async() => {              
              return await copy(sourcePath, options.dir);
            }
          },
          {
            title: `building package.json...`,
            task: async() => {
              const filePath = join(options.dir, 'package.json');
              const pkgJson = require(filePath);
              pkgJson.name = options.projectName;
              pkgJson.bin = {
                [options.projectName]: 'bin/cli'
              };
              
              return await writeFileP(filePath, JSON.stringify(pkgJson, null, 2));
            }
          }
        ])
      }
    },
    {
      title: 'NPM - install dependencies',
      task: () => {
        return new Listr([
          {
            title: 'install npm packages',
            task: async () => {
              return execa('npm', ['install', '--prefix', options.dir]);
            }
          },
          {
            title: 'build project',
            task: async () => {
              return execa('npm', ['run', 'build', '--prefix', options.dir]);
            }
          }
        ]);
      },
      skip: () => !options.install
    }
  ]);
}