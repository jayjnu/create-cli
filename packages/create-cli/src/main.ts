import {prompt} from './argvs';

export async function cli(argv: string[]) {
  const opts = await prompt(argv);
  
  console.log(opts);
};
