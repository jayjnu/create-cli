import {prompt} from 'inquirer';
import {defaultOptions, Options} from './options';

export const questions = [
  {
    type: 'input',
    name: 'dir',
    message: 'Choose directory to bootstrap project',
    default: process.cwd(),
  },
  {
    type: 'confirm',
    name: 'git',
    message: 'Initialize a git repository?',
    default: false
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name?',
    validate(input: string) {
      return typeof input !== 'undefined' && 
        input.length > 0 && 
        input.startsWith('create-');
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
