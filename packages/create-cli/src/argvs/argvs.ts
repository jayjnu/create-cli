import {Command} from 'commander';
import inquirer, {Question} from 'inquirer';
import type {Argvs, PromptOptions, Options} from './interfaces';

interface QuestionDescription<T = unknown> {
  test: (value: T) => boolean;
  question: Question;
}

export const defaultOptions = Object.freeze({
  git: true
});

export async function prompt(argvs: string[]): Promise<Options> {
  const opts = parse(argvs);
  const promptOpts = fromArgvs(opts);

  if (promptOpts.skipPrompt) {
    return defaultOptions;
  }

  const questions: Question[] = _filterQuestions(promptOpts);
  const answers: Options = await inquirer.prompt(questions);

  return {
    ...promptOpts.argvs,
    ...answers
  };
}

export function parse(argvs: string[]): Argvs {
  const program = new Command();

  program.option('-y, --yes', 'create with default config', false)
        .option('-gt, --git', 'initialize git project');

  return program.parse(argvs).opts() as Argvs;
}


export function fromArgvs(argvs: Argvs): PromptOptions {
  const {yes, ...opts} = argvs;
  
  return {
    skipPrompt: argvs.yes,
    argvs: opts
  };
}

export function _filterQuestions(opts: PromptOptions) {
  const questions: Record<keyof Options, QuestionDescription> = {
    git: {
      test: (value?: boolean) => typeof value === 'undefined',
      question: {
        type: 'confirm',
        name: 'git',
        message: 'Initialize a git repository?',
        default: true
      }
    }
  };

  return Object.entries<QuestionDescription>(questions)
    .filter(([name, {test}]) => test(opts[name]))
    .map(([, {question}]) => question);
}