import { parse } from './argvs';

export const cli = (argv: string[]) => {
  const opts = parse(argv).opts();

  console.log(opts);
};
