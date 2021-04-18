

// prompt questions
import {openPrompt} from './questions';
import {createTasks} from './tasks';
import {createOptions} from './options';

export async function cli(argvs: string[]) {
  const options = createOptions(argvs);
  const finalOptions = await openPrompt(options);
  const tasks = createTasks(finalOptions);

  await tasks.run();
}
