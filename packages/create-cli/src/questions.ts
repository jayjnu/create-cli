import {prompt} from 'inquirer';
import {defaultOptions, Options} from './options';

export const questions = [
  {
    type: 'confirm',
    name: 'git',
    message: 'Initialize a git repository?',
    default: false,
    when(answers: Options) {
      return typeof answers.git === 'undefined';
    }
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name?',
    validate(input: string) {
      return typeof input !== 'undefined' && input.length > 0;
    }
  },
  {
    type: 'list',
    name: 'lang',
    message: 'Choose main project language',
    choices: [
      'Typescript'
    ],
    filter(answer: string) {
      return answer.toLowerCase();
    }
  },
  {
    type: 'confirm',
    name: 'install',
    message: 'Install dependencies?',
    default: true
  }
];

export async function openPrompt(options: Partial<Options>) {
  if (options.yes) {
    return defaultOptions;
  }
  // pass options retrieved from cli arguments to skip prompt from printing already answered questions
  return await prompt<Options>(questions, options);
}
