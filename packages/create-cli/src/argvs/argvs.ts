import {Command} from 'commander';
import inquirer, {Answers} from 'inquirer';
import {questions} from './questions';
import type {Argvs, PromptOptions, Options} from './interfaces';

export const defaultOptions = Object.freeze({
  git: true,
  install: true
});

export async function prompt(argvs: string[]): Promise<Options> {
  const opts = parse(argvs);
  const promptOpts = fromArgvs(opts);

  if (promptOpts.skipPrompt) {
    return defaultOptions;
  }

  console.log('initialAnswers', promptOpts.argvs);

  const answers = await inquirer.prompt<Options>(questions, promptOpts.argvs);

  console.log(answers);
  
  return answers;
}

export function parse(argvs: string[]): Argvs {
  const program = new Command();

  program.option('-y, --yes', 'create with default config', false)
        .option('-gt, --git', 'initialize git project')
        .option('-i, --install', 'install npm packages');

  return program.parse(argvs).opts() as Argvs;
}

export function fromArgvs(argvs: Argvs): PromptOptions {
  const {yes, ...opts} = argvs;
  
  return {
    skipPrompt: argvs.yes,
    argvs: opts
  };
}
