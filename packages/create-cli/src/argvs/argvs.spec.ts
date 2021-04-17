import {parse, defaultOptions, prompt} from './argvs';
import inquirer from 'inquirer';

jest.mock('inquirer');

const mockPrompt = inquirer.prompt as unknown as jest.MockedFunction<typeof inquirer.prompt>;

function command(...flags: string[]) {
  return ['/usr/local/bin/node', '/usr/local/bin/create-cli', ...flags];
}

describe('parsing user arguments', () => {
  describe('when no argument is passed', () => {
    it('should return default argvs', () => {
      const opts = parse(command());
      const result = {
        yes: false
      };

      expect(opts).toEqual(result);
    });
  });
});


describe('prompt generation', () => {
  it.each([
    ['-y'],
    ['--yes']
  ])('should skip prompt and return default option if user passed %s', async (flag) => {
    const cmd = command(flag);
    const opts = await prompt(cmd);

    expect(opts).toEqual(defaultOptions);
  });

  it.each([
    [['--git'], {lang: 'typescript'}]
  ])('should return merged result of initial flag + prompt', async (init, answer) => {
    await mockPrompt.mockResolvedValueOnce(answer);

    const cmd = command(...init);
    const opts = await prompt(cmd);

    expect(opts).toEqual({
      git: true,
      ...answer
    });
  });
});