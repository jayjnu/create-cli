import {createOptions} from './options';
import {openPrompt} from './questions';
import {createTasks} from './tasks';

export async function cli(argv: string[] = process.argv) {
  const initialOptions = createOptions(argv);
  const options = await openPrompt(initialOptions);
  const tasks = createTasks(options);

  try {
    await tasks.run();
  } catch(e) {
    console.error(e);
  }
};
