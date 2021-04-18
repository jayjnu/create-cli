import {Command} from 'commander';

export interface Options {
  yes: boolean;
  git: boolean;
  install: boolean;
  project: boolean;
}

export function createOptions(argvs: string[]): Partial<Options> {
  const program = new Command();

  program.option('-y, --yes', 'create with default config', false)
        .option('-gt, --git', 'initialize git project')
        .option('-i, --install', 'install npm packages')
        .option('-p, --project', 'project name');

  return program.parse(argvs).opts();
}
