import {Command} from 'commander';

export interface Options {
  yes: boolean;
  git: boolean;
  install: boolean;
  projectName: string;
  lang: string;
}

export const defaultOptions = Object.freeze({
  yes: true,
  git: true,
  install: true,
  lang: 'typescript',
  projectName: 'create-project'
});

export function createOptions(argvs: string[]): Options {
  const program = new Command();

  program.option('-y, --yes', 'create with default config', false)
        .option('-gt, --git', 'initialize git project')
        .option('-i, --install', 'install npm packages')
        .option('-p, --project', 'project name');

  return program.parse(argvs).opts() as Options;
}
