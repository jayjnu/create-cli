import { Question } from 'inquirer';

export const questions: Question[] = [
  {
    type: 'confirm',
    name: 'git',
    message: 'Initialize a git repository?',
    default: false,
    when(answers) {
      console.log('when: git answer', answers);
      return typeof answers.git === 'undefined';
    }
  },
  {
    type: 'confirm',
    name: 'install',
    message: 'Install dependencies?',
    default: true
  },
  {
    type: 'input',
    name: 'projectName',
    message: 'Project name?',
    when(answers) {
      return answers.install;
    },
    validate(input) {
      return typeof input !== 'undefined';
    }
  }
];
