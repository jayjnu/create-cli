import {Command} from 'commander';


export function parse(argvs: string[]) {
  const program = new Command();

  program.option('--git', 'create git cli project', true);

  return program.parse(argvs);
}
