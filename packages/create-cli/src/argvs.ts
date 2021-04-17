import {Command} from 'commander';

export function parse(argvs: string[]) {
  const program = new Command();

  program
    .option('--git', 'create git cli project', true)
    .option('-y, --yes', 'create with default config', false);

  return program.parse(argvs).opts();
}
